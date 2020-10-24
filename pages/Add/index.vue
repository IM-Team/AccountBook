<template>
	<view class="add-container">
		<view class="content">
			<view class="tally-type">
				<view class="income"
					:class="{active: info.turnover_type === 1}"
					@click="info.turnover_type = 1">收入</view>
				<view class="spend"
					:class="{active: info.turnover_type === 2}"
					@click="info.turnover_type = 2">支出</view>
			</view>
			<edit-area
				:turnover-type="info.turnover_type"
				:input="digitList"
				:timestamp="info.date"
				:account="info.account" />
			<type-swiper
				class="type-swiper"
				:icon-id="info.category.id"
                :turnover-type="info.turnover_type"
				@changeIcon="onChangeIcon" />
		</view>
		
		<view class="sub-container">
			<view class="note">
				<text class="iconfont icon-beizhu"></text>
				<text class="note-name">备注:</text>
				<input class="input" type="text" :value="info.note" placeholder="请输入备注" />
			</view>
			<keyboard
				class="keyboard"
				:digit-list="isFromBillDetail ? digitList : null"
				@change="onChange"
                @confirm="onConfirm" />
		</view>
	</view>
</template>

<script>
	
	import EditArea 	from '@/components/Add/EditArea'
	import TypeSwiper 	from '@/components/Add/TypeSwiper'
    import Keyboard 	from '@/components/Add/Keyboard'
    
	export default {
		data() {
			return {
                isFromBillDetail: false,
                digitList: ['0'],
				info: {
                    id: 0,
					turnover_type: 1,
                    price: "0.00",
					note: '',
					date: -1,
					account: '现金',
					category: {
                        id: 1,
                        name: '餐饮',
                        icon: 'icon-canyin',
                        color: '#188AFF'
                    }
				}
			}
		},
		created() {
			this.init()
		},
		mounted() {
			uni.removeStorage({ key: 'tmpBillDetail' })
		},
		components: {
			EditArea,
			TypeSwiper,
			Keyboard
		},
		methods: {
			init() {
				const res = uni.getStorageSync('tmpBillDetail')

				if (res) {
                    this.isFromBillDetail = true
                    this.digitList = res.price.split('')
                    this.info = res
				} else {
					this.info.date = Date.now()
				}
            },
            updateInfo(id) {
                const turnoverData = getApp().globalData.turnoverData

                turnoverData.turnovers.some(turnover => {
                    const index = turnover.list.findIndex(item => item.id === id)

                    if (index !== -1) {
                        this.$set(turnover.list, index, this.info)
                        return true
                    }

                    return false
                })
            },
            saveInfo() {
                
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
			onChangeIcon(id) {
				this.info.category.id = id
			},
			onChange(v) {
				this.digitList = v
            },
            onConfirm() {
				
				this.fixDicimalPoint()

                const id = this.info.id
                id ? this.updateInfo(id) : this.saveInfo()

                uni.navigateBack()
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
	
	.tally-type {
		display: flex;
		border: solid 1px #188AFF;
		border-radius: calc(calc(100vw - 64rpx) / 2);
		font-size: 28rpx;
		overflow: hidden;
	}
	
	.tally-type .income,
	.tally-type .spend {
		flex: 1;
		height: 74rpx;
		line-height: 74rpx;
		text-align: center;
		color: #188AFF;
	}
	
	.tally-type .active {
		color: #fff;
		background-color: #188AFF;
	}
	
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
