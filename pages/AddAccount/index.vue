<template>
	<view class="add_account-container">
		<view class="account-type">
			<view class="title">资金账户</view>
			<view class="account" v-for="(item, index) in capitalAccount" :key="index">
				<im-cell 
					:icon="item.icon" 
					:title="item.name" 
					:color="item.color"
					@click.native="onAccount(item)" 
				/>
			</view>
		</view>

		<view class="account-type">
			<view class="title">信用账户</view>
			<view class="account" v-for="(item, index) in creditAccount" :key="index">
				<im-cell 
					:icon="item.icon" 
					:title="item.name" 
					:color="item.color"
					@click.native="onAccount(item)" 
				/>
			</view>
		</view>
	</view>
</template>

<script>
	import ImCell from '@/components/common/ImCell'
    import { accountMapMixin } from '@/utils/mixins'
    import { mapState } from 'vuex'

	export default {
		name: 'AddAccount',
		mixins: [accountMapMixin],
		data() {
			return {
				capitalAccount: [], 	// 资金账户
				creditAccount: []		//信用账户
			}
        },
        created() {
            for (const index in this.mixin_accounts) {
                if(this.mixin_accounts[index].account_type === 1) {
                    this.capitalAccount.push(this.mixin_accounts[index])
				} else {
                    this.creditAccount.push(this.mixin_accounts[index])
				}
            }
        },
		components: {
			ImCell
		},
		methods: {
			onAccount(item) {
				uni.setStorageSync("account_edit", {
					type: item.type,
					account_type: item.account_type
				});
				
				uni.navigateTo({ url: "/pages/AccountEdit/index" });
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
	.account-type .account {
		margin-bottom: 32rpx;
	}

</style>
