<template>
	<view class="add-body">
		<swiper class="swiper" :indicator-dots="true">
			<swiper-item v-for="(page, index) in typePages" :key="index">
				<view class="swiper-row">
					<view
						class="swiper-item"
						v-for="item in page"
						@click="onCheckItem(item)"
						:key="item">
						<view
							class="iconfont icon-qian"
							:class="{ active: item === current }"></view>
						<view class="name">{{ item }}</view>
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
				type: Array,
				default() {
					return ['薪资', '奖金', '礼金', '兼职', '红包', '分红', '借入',
							'11', '22', '33', '44', '55', '66', '77', '88', '99']
				}
			},
			singlePageCount: {
				type: Number,
				default: 8
			}
		},
		data() {
			return {
				current: '薪资'
			}
		},
		computed: {
			typePages() {
				return pagination(this.types, this.singlePageCount)
			}
		},
		methods: {
			onCheckItem(item) {
				this.current = item
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
