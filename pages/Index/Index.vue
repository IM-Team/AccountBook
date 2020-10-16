<template>
	<view class="index-container">
		<!-- Tab pages -->
		<turnover v-if="currentIndex === 0" />
		<account v-else-if="currentIndex === 1" />
		<statistic v-else-if="currentIndex === 3" />
		<me v-else-if="currentIndex === 4" />
		
		<bill-detail
			:is-show="isShowBillDetail"
			:hide-handle="hideBillDetail" />
		
		<!-- Tabbar -->
		<custom-tabbar
			:tab-index="currentIndex"
			@tab-tap="onTabTap" />
	</view>
</template>

<script>
	
	import Turnover 	from '@/pages/Turnover'
	import Account 		from '@/pages/Account'
	import Statistic 	from '@/pages/Statistic'
	import Me 			from '@/pages/Me'
	import CustomTabbar from '@/components/CustomTabbar'
	import BillDetail	from '@/components/BillDetail'
	
	export default {
		name: 'Index',
		data() {
			return {
				currentIndex: 0,
				isShowBillDetail: false
			}
		},
		components: {
			Turnover,
			Account,
			Statistic,
			Me,
			BillDetail,
			CustomTabbar
		},
		methods: {
			hideBillDetail() {
				this.isShowBillDetail = false
			},
			showBillDetail() {
				this.isShowBillDetail = true
			},
			onTabTap(index) {
				if (2 === index)
					uni.navigateTo({ url: '/pages/Add/index'})
				else
					this.currentIndex = index
			}
		}
	}
	
</script>

<style scoped>

	.index-container {
		padding-bottom: 54px;
	}

</style>
