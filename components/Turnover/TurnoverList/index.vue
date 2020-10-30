<template>
	<view class="turnover_list-container">
		<template v-for="(item, index) in turnovers">
			<turnover-of-day
				v-if="item.list.length"
				:day-data="item"
				:key="index" />
		</template>
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
		components: {
			TurnoverOfDay
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
