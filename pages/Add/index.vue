<template>
	<view class="add-container">
		<view class="content">
			<tally-type :type="info.turnover_type" @toggle="onToggle" />
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
                    :value="info.note"
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
		methods: {
			init() {

                this.isFromBillDetail = this.$store.getters.getIsFromBillDetail()

                if (this.isFromBillDetail) {

                    this.$store.mutations.setIsFromBillDetail(false)

                    const bt = this.$store.getters.getBillDetail()
                    this.digitList = bt.price.split('')
                    this.info = bt
					
					// 记录旧的时间
					this.oldDate = bt.date
                } else {
                    this.info = this.$store.mutations.setBillDetail({
                        id: -1,
                        turnover_type: 1,
                        price: "0.00",
                        note: '还没有写!',
                        date: Date.now(),
                        account: '现金',
                        category: {
                            id: 1,
                            name: '餐饮',
                            icon: 'icon-canyin',
                            color: '#188AFF'
                        }
                    })
                }
            }, // end init
            
            onToggle(type) {
                this.info.turnover_type = type
            },
			onChange(v) {
				this.digitList = v
            },
            onConfirm() {
				this.fixDicimalPoint()
                this.isFromBillDetail ? this.updateInfo() : this.addTurnover()

                uni.navigateBack()
            },
            onChangeDate(timestamp) {
                this.info.date = timestamp
            },
            fixDicimalPoint() {
                this.info.price = this.digitList.join('')
                const pointIndex = this.info.price.indexOf('.')

				if (pointIndex === -1) {
					this.info.price += '.00'
				} else if (pointIndex !== this.info.price.length - 3) {
                    this.info.price += '0'
                }
            },
			updateInfo() {
				
				const turnoverData = this.$store.getters.getTurnoverData(),
					  turnovers = turnoverData.turnovers,
					  tId = this.info.id
				
				const isUpdateDate = this.info.date !== this.oldDate
				
				// 不需更新日期
				const modifyPos = this.findTurnvoerOfLocal(turnovers, 'id', tId)
				if (!isUpdateDate) {
					this.$set(turnovers[modifyPos[0]].list, modifyPos[1], this.info)
					return
				}
				
				// ========== Need Update Date ===========
				
				const targetDate = this.formatDateToObj(this.info.date)

				// 3 目标日期是否在本地
				const isInLocal = targetDate.year === turnoverData.year &&
								  targetDate.month === turnoverData.month;
				
				// 4 找到目标日期
				const targetIndex = turnovers.findIndex(item => item.day === targetDate.day)
				
				// 清除修改的对象
				if (turnovers[modifyPos[0]].list.length === 1) {
					this.$delete(turnovers, modifyPos[0])
				} else {
					this.$delete(turnovers[modifyPos[0]].list, modifyPos[1])
				}
				
				// 在本地但没有对应的日期对象
				if (isInLocal && targetIndex === -1) {
					turnovers.unshift({
						day: targetDate.day,
						list: [this.info]
					})
				} else if (isInLocal && targetIndex !== -1) {
					const offsetIndex = modifyPos[0] > targetIndex ? targetIndex : targetIndex - 1
					turnovers[offsetIndex].list.push(this.info)
				} else {
					// send request
					console.log('Send request');
				}
			},
			
			/**
			 * @param {Object} turnovers	总流水对象
			 * @param {String} key			根据流水的 key 查找：item[key]
			 * @param {String} value		预期的 value : item[key] === value
			 * @return {Array} turnoverPos	返回这个流水在 turnover 对象中的位置：[level1, level2]
			 */
			findTurnvoerOfLocal(turnovers, key, value) {
				
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
			modifyTurnvoer(turnover) {
				// 查找修改的元素
				const id = this.info.id
				const index = turnover.list.findIndex(item => item.id === id)
				if (index !== -1) {
					if (this.info.date !== this.oldDate) {
						this.$delete(turnover.list, index)
					} else {
						this.$set(turnover.list, index, this.info)
					}
			
					return true
				}

				return false
			},
            addTurnover() {
                const date = new Date(this.info.date)
                const day = date.getDate()

                // 找到对应的只账本、判断本地数据是否是当前的
                const turnoverData = this.$store.getters.getTurnoverData()
                
                if (turnoverData.year === date.getFullYear() &&
                    turnoverData.month === (date.getMonth() + 1)) {
                    // 查找 day
                    const index = turnoverData.turnovers.findIndex(item => item.day === day)

                    if (index === -1) {
                        turnoverData.turnovers.push({ day, list: [this.info] })
                    } else {
                        turnoverData.turnovers[index].list.push(this.info)
                    }
                } else {
                    // 发送网络请求
                }
            } // end addTurnover
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
