<template>
	<view class="add_account_form-container">
		<view class="form-header">
			<view class="iconfont" :class="account.icon"></view>
			<view class="form-header-text">{{ account.name }}</view>
		</view>
		<view class="form-wrap">
			<view class="form-item">
				<view class="form-title">账户名称</view>
				<im-cell>
					<input 
						class="input-account" 
						type="text" 
						v-model="account.custom_name" 
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
						v-model="account.balance"
						class="input-balance" 
						type="number"
						slot="content" 
						placeholder="0" 
						maxlength="10"
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
	
	import { accountMapMixin } from '@/utils/mixins'

	export default {
		name: 'AccontEdit',
		mixins: [accountMapMixin],
		onLoad(option) {
			console.log(option);
			this.account.type = option.type;
			this.account.balance = option.balance || '';
			this.account.custom_name = option.custom_name || '';
			this.account.icon = this.mixin_accounts[option.type].icon;
			this.account.name = this.mixin_accounts[option.type].name;
		},
		data() {
			return {	
				account: {
					type: 0,
					name: '',
					custom_name: '',
					icon: '',
					balance: '',
					account_type: 1,
				}
			}
		},
			components: {
				ImCell
			},
		computed: {
			// 计算账户名称的字数
			accountNameLength() {
				return this.account.custom_name.split('').length;
			}
		},
		methods: {
			// 点击提交按钮的处理函数
			handleCommit() {
				if(this.accountNameLength === 0) {
					uni.showToast({
						title: '账户名不可为空',
						icon: 'none',
						duration: 1200
					});
				} else {
					// if(this.account.account_type === 1) {
					// 	getApp().globalData.accountData.capitalAccount.push(this.account);
					// } else {
					// 	getApp().globalData.accountData.creditAccount.push(this.account);
					// }

					switch(this.account.account_type) {
						case 1: 
							// getApp().globalData.accountData.capitalAccount.push(this.account);
							this.$store.mutations.pushCapitalAccount(this.account);
							break;
						case 2:
							// getApp().globalData.accountData.creditAccount.push(this.account);
							this.$store.mutations.pushCreditAccount(this.account);
							break;
					}

					uni.showToast({
						title: '保存成功',
						duration: 1200,
						success: () => {
							uni.navigateBack({ delta: 2 });
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
