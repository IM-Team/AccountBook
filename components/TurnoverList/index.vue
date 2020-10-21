<template>
	<view class="turnover_list-container">
		<turnover-of-day
			v-for="(item, index) in dataList"
			:day-data="item"
			:key="index" />
	</view>
</template>

<script>
	
	import TurnoverOfDay from '../TurnoverOfDay'
	
	export default {
		name: 'TurnoverList',
		props: {
			turnovers: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				dataList: []
			}
		},
		components: {
			TurnoverOfDay
		},
		created() {
			this.dataList = this.turnovers.sort((f, s) => s.day - f.day)
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
