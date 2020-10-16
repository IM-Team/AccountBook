<template>
	<view class="qiun-charts" >
		<canvas
			class="charts"
			canvas-id="canvasPie"
			@touchstart="touchPie"></canvas>
	</view>
</template>

<script>
	
	import uCharts from '@/components/u-charts/u-charts.js'
	
	export default {
		name: 'StatisticChart',
		data() {
			return {
				cWidth: 340,
				cHeight: 300,
				pixelRatio: 1
			}
		},
		mounted() {
			this.getServerData()
		},
		methods: {
			getServerData() {
				this.showPie("canvasPie", {
					"series": [{
						"name": "一班",
						"data": 50
					}, {
						"name": "二班",
						"data": 30
					}, {
						"name": "三班",
						"data": 20
					}, {
						"name": "四班",
						"data": 18
					}, {
						"name": "五班",
						"data": 8
					}]
				})
			},
			showPie(canvasId, chartData) {
				this.canvaPie = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 12,
					legend: {
						show: true
					},
					background: '#ffffff',
					pixelRatio: this.pixelRatio,
					series: chartData.series,
					animation: true,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					}
				});
			},
			touchPie(e) {
				this.canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
		}
	}
</script>

<style scoped>
	
	.qiun-padding {
		padding: 2%;
	}
	
	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}
	
	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}
	
	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}
	
	.qiun-common-mt {
		margin-top: 10upx;
	}
	
	.qiun-bg-white {
		background: #FFFFFF;
	}
	
	.qiun-title-bar {
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}
	
	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}
	
	.qiun-charts {
		height: 500upx;
		background-color: #FFFFFF;
	}
	
	.charts {
		height: 500upx;
		background-color: #FFFFFF;
	}

</style>
