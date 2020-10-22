<template>
	<view class="add_account_form-container">
		<view class="form-header">
			<view class="iconfont" :class="account.account_type[1]"></view>
			<view class="form-header-text">{{ account.account_type[0] }}</view>
		</view>
		<view class="form-wrap">
			<view class="form-item">
				<view class="form-title">账户名称</view>
				<im-cell>
					<input 
						class="input-account" 
						type="text" 
						v-model="account.account_form.name" 
						slot="title" 
						maxlength="10"
						placeholder="请输入账户名称" 
					/>
					<view slot="content">{{ accountNameLength }}/10</view>
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户信息</view>
				<im-cell title="账户余额">
					<input 
						v-model="account.account_form.balance"
						class="input-balance" 
						type="number"
						slot="content" 
						placeholder="0" 
						maxlength="10"
					/>
				</im-cell>
				<im-cell title="备注">
					<input 
						v-model="account.account_form.note"
						class="input-note" 
						type="text" 
						slot="content" 
						placeholder="请输入" 
					/>
				</im-cell>
			</view>
			
			<view class="form-item">
				<view class="form-title">账户设置</view>
				<im-cell title="关联账本" content="默认账本 &gt;">
				</im-cell>
			</view>
			
			<view class="form-commit" @click="handleCommit">确认</view>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	
	export default {
		name: 'AccontEdit',
		data() {
			return {	
				account: {
					account_type: null,
					account_form: {
						name: '',	// 绑定账户名称input
						balance: 0,	// 绑定账户余额input
						note: ''	// 绑定账户备注input
					}
				}
			}
		},
		created() {
			setTimeout(() => {
				uni.getStorage({
					key: "account",
					success: res => {
						console.log(res);
						this.account = res.data;
					}
				})
			}, 100);
		},
		computed: {
			accountNameLength() {
				return this.account.account_form.name.split('').length;
			}
		},
		components: {
			ImCell
		},
		methods: {
			handleCommit() {
				if(this.account.account_form.name === '') {
					uni.showToast({
					    title: '账本名称不可为空',
						icon: "none",
					    duration: 1200
					});
				} else {
					uni.setStorage({
						key: 'account',
						data: this.account,
						success: res => {
							console.log(res);
						}
					});
				}
			}
		}
	}
	
</script>

<style scoped>
	.add_account_form-container {
		padding: 32rpx;
		color: #333;
	}
	.form-header {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.form-header-text {
		padding: 16rpx 0 48rpx 0;
		font-size: 32rpx;
	}
	.form-header .iconfont {
		width: 120rpx;
		height: 120rpx;
		line-height: 120rpx;
		border-radius: 50%;
		font-size: 60rpx;
		text-align: center;
		color: #fff;
		background-color: #188AFF;
	}
	.form-item {
		margin-bottom: 48rpx;
	}
	.form-item .form-title {
		padding-bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}
	.form-commit {
		padding: 32rpx 0;
		border-radius: calc((100vw - 32 * 2rpx) / 2);
		text-align: center;
		font-size: 32rpx;
		color: #fff;
		background-color: #188AFF;
	}
	.input-account,
	.input-balance,
	.input-note {
		width: 500rpx;
	}

</style>
