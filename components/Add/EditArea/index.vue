<template>
	<view class="add-header">
		<view class="computed"
			:class="{
				is_icome: billDetail.type === 1,
				is_spend: billDetail.type === 2
			}">{{ input.join('') }}</view>
		<view class="form-wrap">
			<viewd class="form-right">
				<view class="date block_gray">
					<text class="iconfont icon-date">日期</text>
					<picker
						mode="date"
						fields="day"
						:value="date"
						:start="startDate"
						:end="endDate"
						@change="onDateChange">
						<view class="calendar">{{ date }}</view>
					</picker>
				</view>
				<view class="account-type block_gray">
					<text class="iconfont icon-zhanghu">账户</text>
					<picker mode="selector"
                        :value="selectdIndex"
                        :range="accounts"
                        range-key="name"
                        @change="onSelectAccount">
						<view>{{ billDetail.account.name }}</view>
					</picker>
				</view>
			</viewd>
		</view>
	</view>
</template>

<script>

    import { mapState } from 'vuex'
	
	export default {
		name: 'EditArea',
		props: {
			input: {
				type: Array,
				default() { return [] }
			}
		},
		data() {
			return {
                selectdIndex: 0,
				digitList: [0],
				date: '2000-01-01',
                startDate: '2000-01-01',
				endDate: '2000-01-01',
                info: {},
				accounts: []
			}
		},
		created() {
            this.init();
			this.initAccounts();
        },
        computed: {
            ...mapState(['billDetail'])
        },
		methods: {
            init() {
				this.date = this.dateFormat(this.billDetail.timestamp)
				
				// 非从 billDetail 进来
				if (this.billDetail.id === -1) {
					this.endDate = this.date
				} else {
					this.endDate = this.dateFormat()
				}
            },
			onDateChange(e) {
                this.date = e.target.value
                const date = new Date(e.target.value)
                this.$emit('changeDate', date.getTime())
			},
			dateFormat(timestamp) {
				timestamp = timestamp || Date.now()
				
				const date = new Date(timestamp)
				return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
			},
			onSelectAccount(e) {
                this.billDetail.account = this.accounts[e.target.value];
                
                const index = this.accounts.findIndex(item => item.id === this.billDetail.account.id)
                this.selectdIndex = index
			},
			initAccounts() {

				for(let key in this.$store.state.accounts) {
                    for(let item of this.$store.state.accounts[key]) {
                        this.accounts.push({id:item.id, name:item.name});
                    }
                }

                if (this.billDetail.id === -1) {
                    this.billDetail.account = this.accounts[0];
                    this.selectdIndex = 0
                } else {
                    const index = this.accounts.findIndex(item => item.id === this.billDetail.account.id)
                    this.selectdIndex = index
                }
			}
		}
	}
	
</script>

<style scoped>
	
	.add-header .computed {
		box-sizing: border-box;
		font-size: 96rpx;
		padding-top: 40rpx;
		padding-bottom: 16rpx;
		overflow: scroll hidden;
	}
	
	.add-header .form-wrap {
		display: flex;
		font-size: 24rpx;
	}
	.form-wrap .iconfont {
		padding-right: 10rpx;
		font-size: 24rpx;
		color: #999;
	}
	
	.form-wrap .note { margin-right: auto; }
	.form-wrap .form-right { display: flex; }
	
	.form-right .date {
		display: flex;
		margin-right: 32rpx;
	}
	.account-type {
		display: flex;
	}
	.block_gray {
		border-radius: 44rpx;
		padding: 8rpx 32rpx;
		background-color: #eee;
	}
	
	.is_icome { color: #0EA391; }
	.is_spend { color: #FF4949; }
	
</style>
