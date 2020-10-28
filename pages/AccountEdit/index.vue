<template>
	<view class="add_account_form-container">
		<view class="form-header">
			<view class="iconfont" :class="account.icon" :style="{ backgroundColor: account.color }"></view>
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
				<im-cell :title=" isCapitalAccount ? '账户余额' : '负债额度' ">
					<input 
						v-model="account.balance"
						class="input-balance" 
						type="digit"
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
			
			<!-- commit button -->
			<block v-if="isModifyAccount">
				<view class="form-commit" @click="handleSave">保存修改</view>
			</block>
			<block v-else>
				<view class="form-commit" @click="handleCommit">新建账户</view>
			</block>
		</view>
	</view>
</template>

<script>
	
	import ImCell from '@/components/common/ImCell'
	import { accountMapMixin } from '@/utils/mixins'
	import { ruleOfThirds } from '@/utils/utils'

	export default {
		name: 'AccontEdit',
		mixins: [accountMapMixin],
		onLoad(option) {
			// 资金账户 or 信用账户
			this.isCapitalAccount = option.account_type == 1 ? true : false;
			// 修改账户 or 新建账户 相关处理
			if(option.hasOwnProperty('id')) {
				// 切换按钮为保存修改
				this.isModifyAccount = true;
				// 以ID为索引在inmo-vuex中找到对应的账户并复制给当前的this.account
				this.$store.getters.getAccountData()[['capitalAccount', 'creditAccount'][option.account_type - 1]].findIndex(item => item.id == option.id ? this.account = item : '');
			} else {
				// 新建账户根据type映射mixin的相关信息
				const { icon, name, color } = { ...this.mixin_accounts[option.type] }
				this.account.icon = icon;
				this.account.name = name;
				this.account.color = color;
				this.account.type = option.type;
				this.account.account_type = Number(option.account_type);
				this.account.id = Math.ceil(Math.random()*1000);
			}
		},
		data() {
			return {	
				account: {
					id: -1,
					type: 0,
					name: '',
					custom_name: '',
					icon: '',
					balance: '',
					account_type: 1,
				},
				isModifyAccount: false,	// 修改账户 or 新建账户
				isCapitalAccount: true	// 资金账户 or 信用账户
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
				this.commit(true);
			},
			// 点击保存修改的处理函数
			handleSave() {
				this.commit(false);
			},
			commit(isAddAccount) {
				// balance重排数位格式
				this.account.balance = ruleOfThirds(this.account.balance);
				// 资金账户 or 信用账户 相关处理
				switch(this.account.account_type) {
					case 1: 
						if(isAddAccount) {
							// 向inmo-vuex的资金账户栈中推入新建账户
							this.$store.mutations.pushCapitalAccount(this.account);
						} else {
							// 根据账户ID在inmo-vuex中修改账户相关新
							this.$store.mutations.setCapitalAccountAttribute(this.account);
						}
						break;
					case 2:
						if(isAddAccount) {
							// 向inmo-vuex的资金账户栈中推入新建账户
							this.$store.mutations.pushCreditAccount(this.account);
						} else {
							// 根据账户ID在inmo-vuex中修改账户相关新
							this.$store.mutations.setCreditAccountAttribute(this.account);
						}
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
