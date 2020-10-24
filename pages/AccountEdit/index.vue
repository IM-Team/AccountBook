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
			this.account.type = option.type;
			this.account.icon = this.mixin_accounts[option.type].icon;
			this.account.name = this.mixin_accounts[option.type].name;
		},
		data() {
			return {	
				account: {
					category: 1,
					type: 0,
					name: '',
					custom_name: '',
					icon: '',
					balance: Number
				}
			}
		},
		created() {

		},
		computed: {
			accountNameLength() {
				return this.account.custom_name.split('').length;
			}
		},
		components: {
			ImCell
		},
		methods: {
			async handleCommit() {
				// console.log(this.accountNameLength);
				if(this.accountNameLength === 0) {
					uni.showToast({
						title: '账户名不可为空',
						icon: 'none',
						duration: 1200
					});
				} else {
					getApp().globalData.accountData = this.account;
					await uni.showToast({
						title: '保存成功',
						duration: 1200,
					});
					uni.navigateBack({
    				delta: 2
					});
					// uni.navigateTo({ url: '/pages/Index/index?currentIndex=1' });
					console.log(getApp().globalData.accountData);
				}
			}
		},
		watch: {
			test() {
				console.log('123');
			}
		},
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
