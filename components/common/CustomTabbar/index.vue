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
				color: '#aaaaaa',
				selectedColor: '#2B303B',
				tabbarList: [
					{
						label: '流水',
						pagePath: '/pages/Turnover/index',
						iconName: 'icon-turnover'
					},
					{
						label: '账户',
						pagePath: '/pages/Account/index',
						iconName: 'icon-account'
					},
					{
						label: '添加',
						pagePath: '/pages/Add/index'
					},
					{
						label: '统计',
						pagePath: '/pages/Statistic/index',
						iconName: 'icon-statistic'
					},
					{
						label: '我的',
						pagePath: '/pages/Me/index',
						iconName: 'icon-me'
					}
				]
			}
		},
		methods: {
			onSwitchTab(pagePath) {
				if (pagePath === '/pages/add/add')
					uni.navigateTo({ url: pagePath })
				else
					uni.redirectTo({ url: pagePath });
				
			}
		}
	}
</script>

<style scoped>

	.tabbar-container {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		height: 100rpx;
	}
	
	.tabbar-item {
		flex: 1;
		text-align: center;
		position: relative;
		font-size: 24rpx;
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
		font-size: 40rpx;
	}

</style>
