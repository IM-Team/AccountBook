<template>
	<view class="account-group">
		<view class="title">{{ title }}</view>
		<view class="group-wrap">
			<view class="account" v-for="(item, index) in accounts" :key="index">
				<im-cell
					:icon="item.icon"
					:title="item.custom_name || item.name"
					:content="item.balance"
					@click.native="handleAccount(item)"
				/>
			</view>
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
				type: Array,
				required: true
			}
		},
		components: {
			ImCell
		},
		methods: {
			handleAccount(item) {
				switch(item.account_type) {
					case 1:
						uni.navigateTo({ url: `/pages/AccountEdit/index?type=${item.type}&balance=${ item.balance }&custom_name=${ item.custom_name }` });
						break;
					case 2:
						uni.navigateTo({ url: `/pages/AccountEdit/index?type=${item.type}&balance=${ item.balance }&custom_name=${ item.custom_name }` });
						break;
				}
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
 	.account {
		position: relative;
	}
	/* .account::after {
		position: absolute;
		left: 50%;
		bottom: 0;
		transform: translate(-50%);
		content: "";
		display: block;
		width: calc(100vw - (32rpx * 2) - (32rpx * 2));
		border-bottom: solid 1px #eee;
	} */
	
</style>
