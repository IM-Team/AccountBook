<template>
	<view class="statistic-container">
		<view class="form-wrap">
			<cell>
				<view slot="title" class="statistic-type">
					<view class="income actvie-btn">收入</view>
					<view class="spend">支出</view>
				</view>
				<view slot="value" class="calendar">2020-10</view>
			</cell>
		</view>
		
		<view class="chart-wrap"></view>
		
		<view class="account-group"> </view>
		
		<!-- <custom-tabbar tab-index="3"></custom-tabbar> -->
	</view>
</template>

<script>
	import Cell from "../../components/common/cell/Cell.vue";
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		components: {
			Cell
		}
	}
</script>

<style scoped>
	
	.statistic-type {
		display: flex;
		width: 206rpx;
		height: 54rpx;
		line-height: 54rpx;
		border: solid 1px #188aff;
		border-radius: 26rpx;
		overflow: hidden;
	}
	
	.income,
	.spend {
		flex: 1;
		height: 100%;
		font-size: 28rpx;
		text-align: center;
		color: #188AFF;
	}
	.actvie-btn {
		color: #fff;
		background-color: #188AFF;
	}
	
	.calendar {
		width: 200rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		text-align: center;
		border: solid 1px #188aff;
		border-radius: 26rpx;
		color: #188AFF;
	}
	
</style>
