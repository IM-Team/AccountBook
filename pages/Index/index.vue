<template>
	<view class="index-container">
		<custom-navbar :top="navbarTop" />
		
		<view class="main" :style="{ paddingTop: navbarTop + 44 + 'px' }">
			<!-- Tab pages -->
			<turnover v-if="currentIndex === 0" />
			<account v-else-if="currentIndex === 1" />
			<statistic v-else-if="currentIndex === 3" />
			<me v-else-if="currentIndex === 4" />
		</view>
		
		<!-- Tabbar -->
		<custom-tabbar
			:tab-index="currentIndex"
			@tab-tap="onTabTap" />
	</view>
</template>

<script>
	
	import CustomNavbar from '@/components/CustomNavbar'
	import Turnover 	from '@/pages/Turnover'
	import Account 		from '@/pages/Account'
	import Statistic 	from '@/pages/Statistic'
	import Me 			from '@/pages/Me'
	import CustomTabbar from '@/components/CustomTabbar'

	export default {
		name: 'Index',
		data() {
			return {
				currentIndex: 0,
				navbarTop: 0,
				billDetailData: {}
			}
		},
		components: {
			CustomNavbar,
			Turnover,
			Account,
			Statistic,
			Me,
			CustomTabbar
        },
		created() {
			this.navbarTop = (uni.getMenuButtonBoundingClientRect()).top
		},
		methods: {
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
	
	.main {
		width: 100%;
		height: 100%;
	}

</style>
