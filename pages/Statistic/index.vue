<template>
	<view class="statistic-container">
		<statistic-header
			:current-index="currentIndex"
			@changeIndex="onChangeIndex"
			@changeDate="onChangeDate" />
		<view class="sub-container">
			<canvas
				class="charts"
				canvas-id="pie-canvas"
				@touchstart="touchPie"></canvas>
		</view>
		<statistic-list :series="currentData" />
	</view>
</template>

<script>
	
	import uCharts from '@/common/charts/u-charts.min.js'
	import StatisticHeader from '@/components/Statistic/StastisticHeader'
    import StatisticList from '@/components/Statistic/StatisticList'
    import { mapState } from 'vuex'

	let pieCanvas = null

	export default {
		data() {
			return {
                data: {},
                currentIndex: 0,
				cWidth: 335,
				cHeight: 300,
				pixelRatio: 1,
				currentData: []
			}
		},
		components: {
			// StatisticChart
			StatisticHeader,
			StatisticList
		},
		created() {
            this.initChartData()
			this.currentData = this.deReactive(this.data.income)
        },
		mounted() {
			this.createPie(this.currentData)
        },
        computed: {
            ...mapState(['turnoverData'])
        },
		watch: {
			currentIndex(newData) {
				const tmpVal = this.currentIndex ? this.data.expense : this.data.income
				const tmpData = this.deReactive(tmpVal)

				this.currentData = tmpData
				pieCanvas.updateData({ series: tmpData })
			}
		},
		methods: {
			onChangeDate(date) {
				this.date = date
			},
			onChangeIndex(index) {
				this.currentIndex = index
			},
            initChartData() {

                const flatArr = [];
                const pieData = {
                    income: [],
                    expense: []
                }

                // 扁平化
                this.turnoverData.turnovers.forEach(dayTurnover => flatArr.push(...dayTurnover.list))

                // 分类
                flatArr.forEach(dayTurnover => {
                    this.addTo({
                        arr: dayTurnover.turnover_type === 1 ? pieData.income : pieData.expense,
                        name: dayTurnover.category.name, 
                        price: dayTurnover.price
                    })
                })

                this.data = pieData
            },
            addTo({arr, name, price}) {
                const pieItem = arr.find(item => item.name === name)

                if (pieItem) {
                    pieItem.data = parseFloat(pieItem.data + parseFloat(price)).toFixed(2)
                } else {
                    arr.push({
                        name: name,
                        data: parseFloat(price).toFixed(2)
                    })
                }
            },
			createPie(series) {
				pieCanvas = new uCharts({
					$this: this,
					canvasId: 'pie-canvas',
					type: 'pie',
					fontSize: 12,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: this.pixelRatio,
					series: this.currentData,
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
                
                console.log(this.turnoverData)
			},
			touchPie(e){
				pieCanvas.showToolTip(e, {
					format: (item) => `${item.name} : ${item.data}`
				})
			},
			deReactive(data = []) {
				
				const result = []

				for (let item of data) {
					result.push({
						name: item.name,
						data: parseFloat(item.data)
					})
				}
				
				return result
			}
		}
	}
	
</script>

<style scoped>

	.statistic-container {
		padding: 16rpx 32rpx;
	}
	
	.charts {
		width: 100%;
		min-height: 580rpx;
		max-height: 50vh;
	}
	
</style>
