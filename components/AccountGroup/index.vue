<template>
	<view class="account-group">
		<view class="title">{{ title }}</view>
		<view class="group-wrap">
			<im-cell
				class="cell"
				v-for="(item, index) in accounts"
				:icon="item.icon"
				:title="item.custom_name || item.name"
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
				type: Array,
				required: true
			}
		},
		components: {
			ImCell
		},
		methods: {
			handleAccount(item) {
				console.log(item);
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
 	
	.cell {
		border-bottom: 10px solid  #0EA391;
	}
	
	
</style>
