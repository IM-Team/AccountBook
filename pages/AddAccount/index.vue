<template>
	<view class="add_account-container">
		<view class="account-type">
			<view class="title">资金账户</view>
			<im-cell 
				v-for="(item, index) in capitalAccount" 
				:icon="item.icon" 
				:title="item.name" 
				:key="index"
				@click.native="onAccount(item)" 
			/>
		</view>

		<view class="account-type">
			<view class="title">信用账户</view>
			<im-cell 
				v-for="(item, index) in creditAccount" 
				:icon="item.icon" 
				:title="item.name" 
				:key="index"
				@click.native="onAccount(item)" 
			/>
		</view>

	</view>
</template>

<script>
	import ImCell from '@/components/common/ImCell'
	import { accountMapMixin } from '@/utils/mixins'

	export default {
		name: 'AddAccount',
		mixins: [accountMapMixin],
		data() {
			return {
				capitalAccount: [], 	// 资金账户
				creditAccount: []		//信用账户
			}
		},
		onLoad() {
			// Accounts分类为资金账户和信用账户
			for(let i in this.mixin_accounts) {
				if(this.mixin_accounts[i].account_type === 1) {
					this.capitalAccount.push({type: i, ...this.mixin_accounts[i]})
				} else {
					this.creditAccount.push({type: i, ...this.mixin_accounts[i]})
				}
			}
		},
		components: {
			ImCell
		},
		methods: {
			onAccount(item) {
				uni.navigateTo({
					url: `/pages/AccountEdit/index?type=${item.type}`
				});
			}
		}
	}
</script>

<style scoped>
	.add_account-container {
		padding: 32rpx;
	}

	.add_account-container .account-type {
		padding-bottom: 48rpx;
	}

	.account-type .title {
		padding-bottom: 10rpx;
		font-size: 28rpx;
		color: #999;
	}

</style>
