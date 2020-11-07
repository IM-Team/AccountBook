<template>
	<view class="add-container">
		<view class="content">
			<tally-type :type="billDetail.type" @toggle="onToggle" />
			<edit-area :input="digitList" @change-date="onChangeDate"  />
			<type-swiper class="type-swiper" />
		</view>
		
		<view class="sub-container">
			<view class="note">
				<text class="iconfont icon-beizhu"></text>
				<text class="note-name">备注:</text>
				<input
                    class="input"
                    type="text"
                    :value="billDetail.comment"
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
    import { mapState } from 'vuex'
    import TurnoverModel from '@/model/TurnoverModel'
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
				oldDate: ''
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
            ...mapState(['billDetail'])
        },
		methods: {
			init() {

                this.isFromBillDetail = this.$store.state.isFromBillDetail

                if (this.isFromBillDetail) {
                    this.$store.commit(IS_FROM_BILLDETAIL, false)
                    
                    const _billDetail = this.$store.state.billDetail
                    this.digitList = _billDetail.amount.toString().split('')

                    // 记录旧的时间
					this.oldDate = _billDetail.timestamp
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

				this.fixDecimalPoint()

                const turnoverModel = new TurnoverModel()
                const cabId = this.$store.getters.currentAccountBookId

				turnoverModel.postBill(this.billDetail, cabId).then((id) => {
                    this.billDetail.id = id
                    this.isFromBillDetail ? this.updateInfo() : this.addTurnoverItem()
                    uni.navigateBack()
				}).catch(() => {
					uni.showToast({
						title: '请检查网络连接',
						icon: 'none',
						duration: 2000
					})
                })

                this.changAccount()
            },
            onChangeDate(timestamp) {
                this.billDetail.timestamp = timestamp
            },
            changAccount() {

                const accounts = this.$store.state.accounts
                const thatAccount = this.billDetail.account.name

                let index = accounts['capitals'].findIndex(item => item.name === thatAccount)
                let type = 1

                if (index === -1) {
                    type = 2
                    index = accounts['credits'].findIndex(item => item.name === thatAccount)
                }

                this.$store.commit(
                    this.billDetail.type === 1 ? INC_ACCOUNT : DEC_ACCOUNT, { 
                    account_type: type, 
                    index,
                    amount: parseFloat(this.digitList.join(''))
                })
            },
            fixDecimalPoint() {
                this.billDetail.amount = this.digitList.join('')
                const pointIndex = this.billDetail.amount.indexOf('.')

				if (pointIndex === -1) {
					this.billDetail.amount += '.00'
				} else if (pointIndex !== this.billDetail.amount.length - 3) {
                    this.billDetail.amount += '0'
                }
            },
			updateInfo() {
				
				const turnoverData = this.$store.state.turnoverData,
					  turnovers = turnoverData.turnovers,
					  tId = this.billDetail.id
				
				const isUpdateDate = this.billDetail.timestamp !== this.oldDate
				
				// 不需更新日期
				const modifyPos = this.findTurnoverOfLocal(turnovers, 'id', tId)
				if (!isUpdateDate) {

                    this.$store.commit(UPDATE_TURNOVER_ITEM, {
                        turnoverIndex: modifyPos[0],
                        itemIndex: modifyPos[1],
                        data: this.billDetail
                    })

					return
				}
				
                // ========== Need Update Date ==========
                
				const targetDate = this.formatDateToObj(this.billDetail.timestamp)

				// 3 目标日期是否在本地
				const isInLocal = targetDate.year === turnoverData.year &&
                                  targetDate.month === turnoverData.month;

				// 清除修改的对象
				if (turnovers[modifyPos[0]].list.length === 1) {
                    this.$store.commit(REMOVE_TURNOVER, modifyPos[0])
				} else {
                    this.$store.commit(REMOVE_TURNOVER_ITEM, {
                        turnoverIndex: modifyPos[0],
                        itemIndex: modifyPos[1]
                    })
                }

                // 4 找到目标日期位置
                const targetIndex = turnovers.findIndex(item => item.day === targetDate.day)

				// 在本地但没有对应的日期对象
				if (isInLocal && targetIndex === -1) {

                    const maxLength = turnovers.length - 1
                    let insertIndex = turnovers.findIndex(item => item.day < targetDate.day)
                    if (insertIndex === -1) insertIndex = turnovers.length

                    this.$store.commit(INSERT_TURNOVER, {
                        turnoverIndex: insertIndex,
                        data: {
                            day: targetDate.day,
                            list: [this.billDetail]
                        }
                    })
				} else if (isInLocal && targetIndex !== -1) {
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
			 * @return {Array} turnoverPos	返回这个流水在 turnover 对象中的位置：[level1, level2]
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

                if (turnoverData.year == date.getFullYear() &&
                    turnoverData.month == (date.getMonth() + 1)) {

                    // 查找 day
                    const index = turnoverData.turnovers.findIndex(item => item.day == day)

                    if (index === -1) {
                        this.$store.commit(INSERT_TURNOVER, {
                            day,
                            list: [this.billDetail]
                        })
                    } else {
                        this.$store.commit(PUSH_TURNOVER_ITEM, {
                            turnoverIndex: index,
                            data: this.billDetail
                        })
                    }
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
