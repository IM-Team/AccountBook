<template>
	<view class="account-group">
		<view class="title">{{ title }}</view>
		<view class="group-wrap">
			<im-cell
				class="cell"
				v-for="(item, index) in accounts.list"
				:icon="item.icon"
				:title="item.name"
				:content="item.balance"
				:key="index" 
				@click.native="handleAccount(item)"
			/>
		</view>
	</view>
</template>

<script>
	import ImCell from "../common/ImCell"
	export default {
		name: "AccountGroup",
		props: {
			title: {
				type: String,
				required: true
			},
			accounts: {
				type: Object,
				required: true
			}
		},
		components: {
			ImCell
		},
		methods: {
			handleAccount(item) {
				uni.setStorage({
				    key: 'account',
				    data: {
						account_type: [item.name, item.icon],
						account_form: {
							name: item.name,	// 绑定账户名称input
							balance: item.balance,	// 绑定账户余额input
							note: ''	// 绑定账户备注input
						}
					},
				    success: () => {
						uni.navigateTo({
							url: '/pages/AccountEdit/index'
						});
				    }
				});
			}
		}
	}
</script>

<style scoped>
	.group-wrap {
		border-radius: 16px;
		background-color: #fff;
	}
	.title {
		padding-bottom: 10rpx;
		font-size: 24rpx;
		color: #999;
	}
 	
	.cell {
		border-bottom: 10px solid  #0EA391;
	}
	
	
</style>
