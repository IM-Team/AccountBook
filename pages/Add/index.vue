<template>
	<view class="add-container">
		<view class="content">
			<tally-type :type="billDetail.type" @toggle="onToggle" />
			<edit-area
                :input="digitList"
                @change-date="onChangeDate"  />
			<type-swiper class="type-swiper" />
		</view>
		
		<view class="sub-container">
			<view class="note">
				<text class="iconfont icon-beizhu"></text>
				<text class="note-name">备注:</text>
				<input
                    class="input"
                    type="text"
					v-model="billDetail.comment"
                    placeholder="请输入备注" />
			</view>
			<keyboard
				class="keyboard"
                :isFromBillDetail="isFromBillDetail"
				@change="onChange"
                @confirm="onConfirm" />
		</view>
	</view>
</template>

<script>
	
    import TallyType    from '@/components/Add/TallyType'
	import EditArea 	from '@/components/Add/EditArea'
	import TypeSwiper 	from '@/components/Add/TypeSwiper'
    import Keyboard 	from '@/components/Add/Keyboard'
    import TurnoverModel from '@/model/TurnoverModel'
    import { mapState } from 'vuex'
    import { deepClone } from '@/utils/utils'

    import {
        BILL_DETAIL,
        IS_FROM_BILLDETAIL,
        UPDATE_TURNOVER_ITEM,
        REMOVE_TURNOVER_ITEM,
        REMOVE_TURNOVER,
        PUSH_TURNOVER_ITEM,
        INSERT_TURNOVER,
        INC_ACCOUNT,
        DEC_ACCOUNT
    } from '@/store/mutation-types'

	export default {
		data() {
			return {
                isFromBillDetail: false,
                digitList: ['0'],
				info: {},
                oldDate: '',
                oldInfo: null
			}
		},
		created() {
			this.init()
		},
		components: {
            TallyType,
			EditArea,
			TypeSwiper,
			Keyboard
        },
        computed: {
            ...mapState(['billDetail', 'turnoverData'])
        },
		methods: {
			init() {

                this.isFromBillDetail = this.$store.state.isFromBillDetail

                if (this.isFromBillDetail) {
                    this.$store.commit(IS_FROM_BILLDETAIL, false)
                    
                    const _billDetail = this.$store.state.billDetail
                    this.digitList = _billDetail.amount.toString().split('')

                    // 记录旧值
                    this.oldDate = _billDetail.timestamp
                    this.oldInfo = {
                        amount: _billDetail.amount,
                        accountId: _billDetail.account.id
                    }

                } else {

                    const billCategory = { ...this.$store.state.category[1][0] }
                    const cabId = this.$store.getters.currentAccountBookId

                    this.$store.commit(BILL_DETAIL, {
                        id: -1,
                        type: 1,
                        amount: "0.00",
                        comment: '(空)',
                        timestamp: Date.now(),
                        bookId: cabId,
                        account: {
                            id: 1,
                            name: '现金'
                        },
                        billCategory: billCategory
                    })
                }

            }, // end init
            onToggle(type) {
                this.billDetail.type = type
            },
			onChange(v) {
				this.digitList = v
            },
            onConfirm() {

				this.billDetail.amount = this.fixDecimalPoint(this.digitList.join(''))

                const turnoverModel = new TurnoverModel()
                const cabId = this.$store.getters.currentAccountBookId

				turnoverModel.postBill(this.billDetail, cabId).then((id) => {
                    this.billDetail.id = id
					
					const { year, month } = this.formatDateToObj(this.billDetail.timestamp)
					const isInLocal = year === this.turnoverData.year &&
					                  month === this.turnoverData.month
                    
                    // 在本地
					if (isInLocal) {
						this.isFromBillDetail ? this.updateInfo() : this.addTurnoverItem()
					}
					
                    uni.navigateBack()
				})
				
                this.changAccount()
            },
            onChangeDate(timestamp) {
                this.billDetail.timestamp = timestamp
            },
            changAccount() {

                // 没有切换账户
                const thisAccountId = this.billDetail.account.id
                if (thisAccountId === this.oldInfo.accountId) return

                const accounts = this.$store.state.accounts

                // 查找原来的账本位置
                const targetInfo = {
                    targetType: 1,
                    index: -1
                }
                Object.keys(accounts).some((item, i) => {
                    const index = accounts[item].findIndex(account => account.id === this.oldInfo.accountId)

                    if (index === -1) {
                        return false
                    } else {
                        targetInfo.targetType = i + 1
                        targetInfo.index = index
                    }
                })

                // 查找是在哪个账户类型与目标账本位置
                let type = 1
                let index = accounts['capitals'].findIndex(item => item.id === thisAccountId)
                if (index === -1) {
                    type = 2
                    index = accounts['credits'].findIndex(item => item.id === thisAccountId)
                }

                // 更新原来账本信息
                this.$store.commit(
                    this.billDetail.type === 1 ? DEC_ACCOUNT : INC_ACCOUNT, { 
                    account_type: targetInfo.targetType,
                    index: targetInfo.index,
                    amount: parseFloat(this.digitList.join(''))
                })

                // 更新目标账本金额
                this.$store.commit(
                    this.billDetail.type === 1 ? INC_ACCOUNT : DEC_ACCOUNT, { 
                    account_type: type, 
                    index,
                    amount: parseFloat(this.digitList.join(''))
                })
            },
            /**
			 * 强制添加小数点：1 -> 1.00 | 1.1 -> 1.10
			 * @param {Number | String} targetNumber 要转化的数字字符串或数字
			 * @return {String} 格式: xx.xx
			 */
			fixDecimalPoint(targetNumber) {
				
				if (!targetNumber) return
				
				let numStr = targetNumber.toString()
                const pointIndex = numStr.indexOf('.')

				if (pointIndex === -1) {
					numStr += '.00'
				} else if (pointIndex !== numStr.length - 3) {
                    numStr += '0'
                }
				
				return numStr
            },
			updateInfo() {
				
				const turnovers = this.turnoverData.turnovers,
					  tId = this.billDetail.id
				
				// 是否更新了日期
				const isUpdatedDate = this.billDetail.timestamp !== this.oldDate
				
				// 查找更新的流水位置
				const modifyPos = this.findTurnoverOfLocal(turnovers, 'id', tId)
				
				// 不需更新日期
				if (!isUpdatedDate) {

                    this.$store.commit(UPDATE_TURNOVER_ITEM, {
                        turnoverIndex: modifyPos[0],
                        itemIndex: modifyPos[1],
                        data: this.billDetail
                    })

					return
				}
				
                // ========== Need Update Date ==========
                
				// 清除修改的对象
				if (turnovers[modifyPos[0]].list.length === 1) {
                    this.$store.commit(REMOVE_TURNOVER, modifyPos[0])
				} else {
                    this.$store.commit(REMOVE_TURNOVER_ITEM, {
                        turnoverIndex: modifyPos[0],
                        itemIndex: modifyPos[1]
                    })
                }
				
				// 更改后的日
				const { day } = this.formatDateToObj(this.billDetail.timestamp)
                // 4 找到目标日期位置
                const targetIndex = turnovers.findIndex(item => item.day === day)

				// 在本地但没有对应的日期对象
				if (targetIndex === -1) {

                    let insertIndex = turnovers.findIndex(item => item.day < day)
					
                    if (insertIndex === -1) insertIndex = turnovers.length

                    this.$store.commit(INSERT_TURNOVER, {
                        turnoverIndex: insertIndex,
                        data: {
                            day: day,
                            list: [this.billDetail]
                        }
                    })
				} else if (targetIndex !== -1) {
                    this.$store.commit(PUSH_TURNOVER_ITEM, {
                        turnoverIndex: targetIndex,
                        data: this.billDetail
                    })
				}
			}, // end updateInfo
			
			/**
			 * @param {Object} turnovers	总流水对象
			 * @param {String} key			根据流水的 key 查找：item[key]
			 * @param {String} value		预期的 value : item[key] === value
			 * @return {Array}          	返回这个流水在 turnover 对象中的位置：[level1, level2]
			 */
			findTurnoverOfLocal(turnovers, key, value) {
				
				const turnoverPos = []
				turnovers.some((turnover, _tIndex) => {
					
					const index = turnover.list.findIndex(item => item[key] === value)
					
					if (index !== -1) {
						turnoverPos.push(_tIndex)
						turnoverPos.push(index)
						return true
					}
				
					return false
				})
				
				return turnoverPos.length ?  turnoverPos : null
			},
			/**
			 * @param {Number} timestamp
			 * @return {Object} 格式: { yyyy, mm, dd }
			 */
			formatDateToObj(timestamp) {
				const date = new Date(timestamp)
				return {
					year: date.getFullYear(),
					month: date.getMonth() + 1,
					day: date.getDate()
				}
			},
            addTurnoverItem() {

                const date = new Date(this.billDetail.timestamp)
                const day = date.getDate()

                // 找到对应的只账本、判断本地数据是否是当前的
                const turnoverData = this.$store.state.turnoverData
				
				// 查找 day
				const index = turnoverData.turnovers.findIndex(item => item.day == day)

				if (index === -1) {
					
					// 查找插入的位置
					const insertIndex = turnoverData.turnovers.findIndex(item => item.day < day)
					
					this.$store.commit(INSERT_TURNOVER, {
						turnoverIndex: insertIndex,
						data: {
							day,
							list: [this.billDetail]
						}
					})
				} else {
					this.$store.commit(PUSH_TURNOVER_ITEM, {
						turnoverIndex: index,
						data: this.billDetail
					})
				}
            }, // end addTurnover
		}
	}
</script>

<style scoped>
	
	.add-container {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		overflow: hidden;
	}
	
	.content { padding: 0 32rpx; }
	
	.sub-container {
		flex: 1;
		max-height: 42%;
		display: flex;
		flex-direction: column;
	}
	
	.note {
		box-sizing: border-box;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		padding: 0 32rpx;
		border-bottom: 1px solid #eee;
		background-color: #fff;
		font-size: 28rpx;
		color: #808080;
	}
	
	.icon-beizhu { font-size: 32rpx; margin-right: 4px; }
	.note-name { margin-right: 12px; }
	.keyboard { height: calc(100% - 80rpx); }
	
	.input {
		height: 100%;
		flex: 1;
		line-height: 80rpx;
	}
	
</style>
