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
    import TurnoverModel from '@/model/TurnoverModel'
    import config from '../../utils/config'
    import { turnoverMixin } from '@/utils/mixins'

	let pieCanvas = null

	export default {
        name: 'Statistic',
        mixins: [turnoverMixin],
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
            this.initChartData(this.turnoverData.turnovers)
			this.currentData = this.data.income
        },
		mounted() {
			this.createPie(this.deReactive(this.currentData))
        },
        computed: {
            ...mapState(['turnoverData']),
            isShowPie() {
                return this.currentData.length > 0
            }
        },
		watch: {
			currentIndex(newData) {
                this.updatePie(newData)
			}
		},
		methods: {
			async onChangeDate(date) {
				this.date = date

                const cabId = this.$store.getters.currentAccountBookId
                const [year, month] = date.split('-')

                const res = await this.switchTurnoverDate(year, month, cabId, false)

                this.initChartData(res)
                this.updatePie(this.currentIndex)
			},
			onChangeIndex(index) {
				this.currentIndex = index
			},
            initChartData(turnovers = []) {

                const flatArr = [];
                const pieData = {
                    income: [],
                    expense: []
                }

                // 扁平化
                turnovers.forEach(dayTurnover => flatArr.push(...dayTurnover.list))

                // 分类
                flatArr.forEach(dayTurnover => {
                    this.addTo({
                        arr: dayTurnover.type === 1 ? pieData.income : pieData.expense,
                        name: dayTurnover.billCategory.name, 
                        price: dayTurnover.amount
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
                        data: parseFloat(price).toFixed(2) * 1
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
            },
            updatePie(index) {
                const currentPieDate = index ? this.data.expense : this.data.income
                this.currentData = this.deReactive(currentPieDate)

                const tmp = this.isShowPie ? this.currentData : []

                pieCanvas.updateData({ series: tmp })
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

        /* opacity: 0; */
	}
	
</style>
