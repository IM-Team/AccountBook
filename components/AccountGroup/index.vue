<template>
	<view class="account-group">
		<view class="title">{{ title }}</view>
		<view class="group-wrap">
			<im-cell
				class="cell"
				v-for="(item, index) in accounts.list"
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
				type: Object,
				required: true
			}
		},
		created() {
			console.log(this.accounts);
		},
		components: {
			ImCell
		},
		methods: {
			handleAccount(item) {
				
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
