<template>
	<view class="index-container">
		<!-- Tab pages -->
		<turnover v-if="currentIndex === 0" />
		<account v-else-if="currentIndex === 1" />
		<statistic v-else-if="currentIndex === 3" />
		<me v-else></me>
		
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
	
	export default {
		name: 'Index',
		data() {
			return {
				currentIndex: 0,
				pageName: ['流水', '账户', '添加','统计', '我的']
			}
		},
		components: {
			Turnover,
			Account,
			Statistic,
			Me,
			CustomTabbar
		},
		methods: {
			onTabTap(index) {
				// uni.setNavigationBarTitle({ title: this.pageName[index] })
				
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
