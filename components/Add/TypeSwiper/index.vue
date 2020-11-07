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
								backgroundColor: calcBg(item.id, item.color),
								color: calcColor(item.id)
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
    import { mapState } from 'vuex'
	
	export default {
		name: 'TypeSwiper',
        data() {
            return {
                info: {}
            }
        },
		computed: {
            ...mapState(['billDetail', 'category']),
			isShowDot() {
				return this.typePages.length > 1
			},
			typePages() {
				return pagination(this.category[this.billDetail.type], 8)
            },
            billId() {
                return this.billDetail.billCategory.id
            }
		},
		methods: {
			onCheckItem(pageIndex, itemIndex) {
                this.billDetail.billCategory = this.typePages[pageIndex][itemIndex]
            },
            calcBg(id, color) {
                return id === this.billId ? color : '#ddd'
            },
            calcColor(id) {
                return id === this.billId ? '#fff' : '#111'
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
