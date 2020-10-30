<template>
	<view class="container">
		<canvas class="charts" canvas-id="pie-canvas" @touchstart="touchPie"></canvas>
	</view>
</template>

<script>
	
	import uCharts from '@/common/charts/u-charts.min.js'
	
	let pieCanvas = null
	const series = [{
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
		}
	]
	
	export default {
		name: 'StatisticCharts',
		props: {
			series: {
				type: Array,
				required: true
			}
		},
		data() {
			return {
				cWidth: 335,
				cHeight: 300,
				pixelRatio: 1
			}
		},
		mounted() {
			this.createPie('pie-canvas')
		},
		methods: {
			createPie(cid) {
				pieCanvas = new uCharts({
					$this: this,
					canvasId: cid,
					type: 'pie',
					fontSize: 12,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: series,
					animation: true,
					width: this.cWidth,
					height: this.cHeight,
					dataLabel: true,
					extra: {
						pie: {
							labelWidth: 14
						}
					}
				})
			},
			touchPie(e){
				pieCanvas.showToolTip(e, {
					format: (item) => `${item.name} : ${item.data}`
				})
			}
		}
	}



	/*
	import uCharts from '@/components/u-charts/u-charts.js'
	
	export default {
        name: 'StatisticChart',
        props: {
            series: {
                type: Array,
                required: true
            }
        },
		data() {
			return {
				cWidth: 335,
				cHeight: 300,
                pixelRatio: 1,
                chartsHeight: 580,
                canvaPie: null
			}
        },
        created() {
            this.chartsHeight += Math.floor(this.series.length / 5) * 100
        },
		mounted() {
            this.showPie("canvasPie", this.series)
        },
		methods: {
            showPie(canvasId, series) {
				this.canvaPie = new uCharts({
					$this: this,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 12,
					legend: { show: true },
					background: '#ffffff',
					series: series,
					animation: true,
					pixelRatio: this.pixelRatio,
					width: this.cWidth * this.pixelRatio,
					height: this.cHeight * this.pixelRatio,
					dataLabel: true,
					extra: { pie: { lableWidth: 14 } }
				});
			},
			touchPie(e) {
				this.canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				})
			}
		}
    } */
</script>

<style scoped>

	.charts {
		box-sizing: border-box;
		width: 100%;
		height: 580rpx;
	}
	
</style>
