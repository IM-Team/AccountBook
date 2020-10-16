<template>
	<view class="add_category-container">
		<view class="sub-container">
			<view class="iconfont icon-canyin center icon_preview"></view>
			<input type="text" placeholder="请输入分类名">
		</view>
		<view class="color-pick">
			<view class="title">选择图标颜色</view>
			<view class="color-pick-wrap">
				<view
					class="color-wrap center cell-5"
					v-for="item in 10"
					@click="changePickColor(item)"
					:class="{ 'active': item === currentPickColor }"
					:key="item">
					<view class="color"></view>
				</view>
			</view>
		</view>
		<view class="icon-pick">
			<view class="title">选择图标</view>
			<view class="icon-pick-wrap">
				<view
					class="icon center cell-5 iconfont icon-canyin"
					v-for="item in 10"
					@click="changePickIcon(item)"
					:class="{ 'active': item === currentPickIcon }"
					:key="item"></view>
			</view>
		</view>
		<view class="center submit">保存</view>
	</view>
</template>

<script>
	
	export default {
		name: 'AddCategory',
		data() {
			return {
				currentPickIcon: 0,
				currentPickColor: 0
			}
		},
		methods: {
			changePickColor(index) {
				this.currentPickColor = index
			},
			changePickIcon(index) {
				this.currentPickIcon = index
			}
		}
	}
	
</script>

<style scoped>

	.add_category-container { padding: 0 32rpx; }
	
	.sub-container {
		display: flex;
		align-items: center;
		background-color: #fff;
		margin: 32rpx 0;
		padding: 20rpx;
		border-radius: 10px;
	}
	
	.title {
		margin-bottom: 20rpx;
		color: #666;
	}
	
	.icon_preview {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
		margin-right: 20rpx;
	}
	
	.color-pick-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}
	
	.color-wrap { position: relative; }
	
	.color-wrap::after {
		content: '';
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transition: .2s;
		border: 2px solid #188AFF;
	}
	
	.color-wrap.active::after { transform: scale(1.1); }

	.color {
		width: 100%;
		height: 100%;
		transition: .2s;
		border-radius: 50%;
		background-color: #188AFF;
	}
	
	.color-wrap.active .color { transform: scale(.8); }
	
	.icon-pick-wrap {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.icon {
		box-sizing: border-box;
		border-radius: 50%;
		border: 1px solid #E28D32;
		color: #E28D32;
		font-size: 36rpx;
		transition: .2s;
	}
	
	.icon.active {
		background-color: #E28D32;
		color: #fff;
	}
	
	.cell-5 {
		margin: 0 calc(calc(100% - 464rpx) / 4) 20rpx 0;
		width: 80rpx;
		height: 80rpx;
	}

	.cell-5:nth-child(5n) { margin: 0 0 20rpx 0; }
	
	.submit {
		margin: 32rpx auto 0;
		width: 340rpx;
		height: 80rpx;
		background-color: #188AFF;
		color: #fff;
		border-radius: 170rpx;
	}
	
</style>
