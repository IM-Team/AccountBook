<template>
	<view class="add-body">
		<swiper class="swiper" :indicator-dots="isShowDot">
			<swiper-item v-for="(page, pageIndex) in typePages" :key="pageIndex">
				<view class="swiper-row">
					<view
						class="swiper-item"
						v-for="(item, itemIndex) in page"
						@click="onCheckItem(pageIndex, itemIndex)"
						:key="item.id">
						<view class="iconfont"
							:class="[item.icon]"
							:style="{
								backgroundColor: item.id === info.category.id ? item.color : '#ddd',
								color: item.id === info.category.id ? '#fff' : '#111'
							}"></view>
						<view class="name">{{ item.name }}</view>
					</view>
				</view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	
	import { pagination } from '@/utils/utils'
	
	export default {
		name: 'TypeSwiper',
		props: {
			types: {
				type: Object,
				default() {
					return {
                        1: [{
                            id: 1,
                            name: '薪资',
                            icon: 'icon-qian',
                            color: '#188AFF',
                        }, {
                            id: 2,
                            name: '奖金',
                            icon: 'icon-qian',
                            color: '#F2385A',
                        },  {
                            id: 3,
                            name: '礼金',
                            icon: 'icon-qian',
                            color: '#2185C5',
                        }, {
                            id: 4,
                            name: '兼职',
                            icon: 'icon-canyin',
                            color: '#42BA78',
                        }, {
                            id: 5,
                            name: '红包',
                            icon: 'icon-qian',
                            color: '#F58653',
                        }],
                        2: [{
                            id: 6,
                            name: '餐饮',
                            icon: 'icon-qian',
                            color: '#188AFF',
                        }, {
                            id: 7,
                            name: '娱乐',
                            icon: 'icon-qian',
                            color: '#F2385A',
                        }, {
                            id: 8,
                            name: '购物',
                            icon: 'icon-qian',
                            color: '#2185C5',
                        }, {
                            id: 9,
                            name: '交通',
                            icon: 'icon-canyin',
                            color: '#42BA78',
                        },  {
                            id: 10,
                            name: '医疗',
                            icon: 'icon-qian',
                            color: '#F58653',
                        }, {
                            id: 11,
                            name: '教育',
                            icon: 'icon-qian',
                            color: '#F58653',
                        }]
                    }
				}
            }
        },
        data() {
            return {
                info: {}
            }
        },
        created() {
            this.info = this.$store.getters.getBillDetail()
        },
		computed: {
			isShowDot() {
				return this.typePages.length > 1
			},
			typePages() {
				return pagination(this.types[this.info.turnover_type], 8)
			}
		},
		methods: {
			onCheckItem(pageIndex, itemIndex) {
                this.info.category = this.typePages[pageIndex][itemIndex]
			}
		}
	}
	
</script>

<style scoped>
	
	.add-body {
		padding-top: 32rpx;
	}
	
	.swiper {
		height: 320rpx;
	}
	
	.add-body .swiper-row {
		display: flex;
		justify-content: left;
		flex-wrap: wrap;
	}
	
	.add-body .swiper-item {
		width: 25%;
		text-align: center;
	}
	
	.swiper-item:nth-child(n + 5) {
		margin-top: 10rpx;
	}
	
	.swiper-item .iconfont {
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0 auto;
		width: 90rpx;
		height: 90rpx;
		border-radius: 50%;
		font-size: 40rpx;
		text-align: center;
		background-color: #ddd;
		color: #111;
	}
	
	.swiper-item .active {
		background-color: #188AFF;
		color: #fff;
	}
	
	.swiper-item .name {
		font-size: 24rpx;
	}
	
</style>
