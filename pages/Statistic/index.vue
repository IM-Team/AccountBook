<template>
	<view class="statistic-container">
		<statistic-header
			:current-index="currentIndex"
			@changeIndex="onChangeIndex"
			@changeDate="onChangeDate" />
			
		<cover-view class="empty" :class="[status]"></cover-view>
		<view class="sub-container">
			<view>
				<canvas
					:style="{ 'z-index': isShowPie ? 9999 : -1 }"
					class="charts"
					canvas-id="pie-canvas"
					@touchstart="touchPie"></canvas>
			</view>
			<statistic-list :series="currentListData" />
		</view>
		
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
                currentData: [],
				listData: {},
				currentListData: []
			}
		},
		components: {
			// StatisticChart
			StatisticHeader,
			StatisticList
		},
		created() {
            this.initChartData(this.turnoverData.turnovers)
			
			this.currentListData = this.listData.income
			this.currentData = this.data.income
        },
		mounted() {
			this.createPie(this.deReactive(this.currentData))
        },
        computed: {
            ...mapState(['turnoverData']),
            isShowPie() {
                return this.currentData.length > 0
            },
			status() {
				if (this.isShowPie) {
					return 'no-empty'
				} else {
					return 'is-empty'
				}
			},
			// currentListData() {
			// 	return 
			// }
        },
		watch: {
			currentIndex(newData) {
				this.currentListData = this.currentIndex ? this.listData.expense : this.listData.income
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
				const listData = {
                    income: [],
                    expense: []
                }

                // 扁平化
                turnovers.forEach(dayTurnover => flatArr.push(...dayTurnover.list))

                // 对扁平化后的数据进行分类
                flatArr.forEach(dayTurnover => {
					
					if (dayTurnover.type === 1) {
						const findedTurnover = listData.income.find(item => item.name === dayTurnover.billCategory.name)
					   
						if (findedTurnover) {
							findedTurnover.amount = findedTurnover.amount + parseFloat(dayTurnover.amount)
						} else {
							const target = {
								amount: dayTurnover.amount,
								icon: dayTurnover.billCategory.icon,
								name: dayTurnover.billCategory.name,
								color: dayTurnover.billCategory.color
							}
							
							listData.income.push(target)
						}
					} else {
						const findedTurnover = listData.expense.find(item => item.name === dayTurnover.billCategory.name)

						if (findedTurnover) {
							findedTurnover.amount = findedTurnover.amount + parseFloat(dayTurnover.amount)
						} else {
							const target = {
								amount: dayTurnover.amount,
								icon: dayTurnover.billCategory.icon,
								name: dayTurnover.billCategory.name,
								color: dayTurnover.billCategory.color
							}
							
							listData.expense.push(target)
						}
					}
					
                    this.addTo({
                        arr: dayTurnover.type === 1 ? pieData.income : pieData.expense,
                        name: dayTurnover.billCategory.name, 
                        price: dayTurnover.amount
                    })
                })
				
				this.listData = listData
                this.data = pieData
            },
            addTo({arr, name, amount}) {
                const pieItem = arr.find(item => item.name === name)

                if (pieItem) {
                    pieItem.data = parseFloat(pieItem.data + parseFloat(amount)).toFixed(2)
                } else {
                    arr.push({
                        name: name,
                        data: parseFloat(amount).toFixed(2) * 1
                    })
                }
            },
			addToListData(arr) {
				
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
		position: relative;
	}
	
	.sub-container { }
	
	.charts {
		width: 100%;
		min-height: 580rpx;
		max-height: 50vh;
		position: relative;
		z-index: -1;
	}
	
	.empty {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 94rpx;
		background-color: #F2F2F7;
	}
	
	.is-empty {
		transition: 0;
		opacity: 1;
	}
	
	.no-empty {
		transition: all .2s;
		opacity: 0;
	}
	
</style>
