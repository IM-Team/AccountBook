<template>
	<view class="tabbar-container">
		<view
			class="tabbar-item"
			v-for="(item, index) in tabbarList"
			@click="onSwitchTab(item.pagePath)"
			:style="{ 'color': index === tabIndex ? selectedColor : color }"
			:key="index">
			<template v-if="item.iconName">
				<view class="iconfont" :class="item.iconName"></view>
				<text>{{ item.label }}</text>
			</template>
			<template v-else>
				<view class="tabbar-add">
					<view class="iconfont icon-write"></view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tabIndex: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				color: '#999999',
				selectedColor: '#2B303B',
				tabbarList: [
					{
						label: '流水',
						pagePath: '/pages/turnover/turnover',
						iconName: 'icon-turnover'
					},
					{
						label: '账户',
						pagePath: '/pages/account/account',
						iconName: 'icon-account'
					},
					{
						label: '添加',
						pagePath: '/pages/add/add'
					},
					{
						label: '统计',
						pagePath: '/pages/statistic/statistic',
						iconName: 'icon-statistic'
					},
					{
						label: '我的',
						pagePath: '/pages/me/me',
						iconName: 'icon-me'
					}
				]
			}
		},
		methods: {
			onSwitchTab(pagePath) {
				
				uni.redirectTo({
				    url: pagePath
				});
				
			}
		}
	}
</script>

<style scoped>
	
	@import './iconfont/iconfont.css';

	.tabbar-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
	}
	
	.tabbar-item {
		flex: 1;
		text-align: center;
		position: relative;
		padding: 10rpx 0;
		font-size: 34rpx;
	}
	
	.tabbar-add {
		position: absolute;
		left: 50%;
		bottom: 38.2%;
		transform: translateX(-50%);
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 100rpx;
		background-color: #188AFF;
		box-shadow: 0 0 12px rgba(24, 138, 255, .2);
		color: #fff;
		font-size: 46rpx;
	}
	
	.iconfont {
		font-size: 46rpx;
	}

</style>
