<template>
	<view class="turnover_list-container">
		<turnover-list-item v-for="item in 2"></turnover-list-item>
	</view>
</template>

<script>
	
	import TurnoverListItem from '../TurnoverListItem'
	
	export default {
		components: {
			TurnoverListItem
		}
	}
</script>

<style scoped>
	
	.turnover_list-container {
		margin-top: 60rpx;
		width: 100%;
		padding: 32rpx 0;
	}

</style>
