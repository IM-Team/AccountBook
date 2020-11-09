<template>
	<view class="account-group">
		<view class="title">{{ title }}</view>
		<view class="group-wrap">
			<view class="account" v-for="(item, index) in accounts" :key="index">
				<im-cell
					:icon="mixin_accounts[item.icon].icon"
					:color="mixin_accounts[item.icon].color"
					:title="item.name"
					@click.native="handleAccount(item)"
				>
					<view slot="content">{{ 
                        formattingBalance(item.balance = Math.round(item.balance * 100)/100)
                    }}</view>
				</im-cell>
			</view>
		</view>
	</view>
</template>

<script>

    import ImCell from "../common/ImCell"
	
    import { accountMapMixin } from '@/utils/mixins'
	import { ruleOfThirds } from '@/utils/utils'

	export default {
        name: "AccountGroup",
		mixins: [accountMapMixin],
		props: {
			title: {
				type: String,
				required: true
			},
			accounts: {
				type: Array,
				required: true
			},
			account_type: {
				type: Number,
				required: true
			}
		},
		components: {
			ImCell
        },
		methods: {
			formattingBalance(num) {
				return ruleOfThirds(num);
			},
			handleAccount(item) {
				uni.setStorageSync("account_edit", item);
				uni.navigateTo({ url: "/pages/AccountEdit/index" });
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
/* 	.account {
		position: relative;
	}
	.account::after {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
		content: "";
		display: block;
		width: calc(100vw - (32rpx * 2) - (32rpx * 2));
		height: 1px;
		background: linear-gradient(to left, #eee, #fff);
	}
	.account:last-child::after {
		height: 0;
	} */
	
</style>
