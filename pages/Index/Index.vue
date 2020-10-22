<template>
	<view class="index-container">
		<navbar :top="navbarTop" />
		<view class="main" :style="{ paddingTop: navbarTop + 44 + 'px' }">
			<!-- Tab pages -->
			<turnover v-if="currentIndex === 0" />
			<account v-else-if="currentIndex === 1" />
			<statistic v-else-if="currentIndex === 3" />
			<me v-else-if="currentIndex === 4" />
		</view>
		
		<bill-detail
			:is-show="isShowBillDetail"
			:hide-handle="hideBillDetail"
			:info="billDetailData" />
		
		<!-- Tabbar -->
		<custom-tabbar
			:tab-index="currentIndex"
			@tab-tap="onTabTap" />
	</view>
</template>

<script>
	
	import Navbar 		from '@/components/Navbar'
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
				isShowBillDetail: false,
				navbarTop: 0,
				billDetailData: {}
			}
		},
		components: {
			Navbar,
			Turnover,
			Account,
			Statistic,
			Me,
			BillDetail,
			CustomTabbar
		},
		created() {
			this.navbarTop = (uni.getMenuButtonBoundingClientRect()).top
		},
		methods: {
			hideBillDetail() {
				this.billDetailData = null
				this.isShowBillDetail = false
			},
			showBillDetail(data) {
				if (data) this.billDetailData = data
				
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
		display: flex;
		flex-direction: column;
		padding-bottom: 54px;
	}
	
	.sub-container {
		height: ;
		flex: 1;
		overflow: hidden auto;
	}
	
	.main {
		width: 100%;
		height: 100%;
	}

</style>
