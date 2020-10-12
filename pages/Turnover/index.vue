<template>
	<view class="turnover-container">
		<turnover-header></turnover-header>
		<turnover-list></turnover-list>
	</view>
</template>

<script>
	
	import TurnoverHeader from '../../components/TurnoverHeader'
	import TurnoverList from '../../components/TurnoverList'
	
	export default {
		components: {
			TurnoverHeader,
			TurnoverList
		}
	}
	
</script>

<style scoped>
	
	.turnover-container {
		padding: 32rpx;
	}

</style>
