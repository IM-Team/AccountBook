<template>
	<view class="add-container">
		<view class="content">
			<tally-type :type="info.turnover_type" @toggle="onToggle" />
			<edit-area :input="digitList" />
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
				info: {}
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
                } else {
                    this.info = this.$store.mutations.setBillDetail({
                        id: -1,
                        turnover_type: 1,
                        price: "0.00",
                        note: '',
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
            },
            onToggle(type) {
                this.info.turnover_type = type
            },
			onChange(v) {
				this.digitList = v
            },
            onConfirm() {
				
				this.fixDicimalPoint()

                const id = this.info.id
                id ? this.updateInfo(id) : this.addTurnover()

                uni.navigateBack()
            },
            updateInfo(id) {
                const turnoverData = this.$store.getters.getTurnoverData()
                turnoverData.turnovers.some(turnover => {
                    const index = turnover.list.findIndex(item => item.id === id)

                    if (index !== -1) {
                        this.$set(turnover.list, index, this.info)
                        return true
                    }

                    return false
                })
            },
            addTurnover() {
                // const turnoverData = getApp().globalData.turnoverData
                // turnoverData.turnovers.push({
                //     day: 
                // })


                // 找到对应的只账本、判断本地数据是否是当前的




                // 找到账本的年、月、日
                // 添加


                // "day": 1,
				// "list": [{
				// 	"id": 1,
				// 	"date": 1601550616000,
				// 	"turnover_type": 2,
				// 	"account_type": 1,
				// 	"price": "320.00",
				// 	"account": "支付宝",
                //     "note": "这是我写的备注",
				// 	"category": {
				// 		"id": 6,
                //         "name": "餐饮",
                //         "icon": "icon-canyin",
				// 		"color": "#188AFF"
                //     }
				// }]
            },
            fixDicimalPoint() {
                this.info.price = this.digitList.join('')
                const pointIndex = this.info.price.indexOf('.')

				if (pointIndex === -1) {
					this.info.price += '.00'
				} else if (pointIndex !== this.info.price.length - 3) {
                    this.info.price += '0'
                }
            }
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
