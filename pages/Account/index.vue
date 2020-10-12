<template>
	<view class="container-account">
		<view class="total-wrap">
			<cell height="160" backgroundColor="#188aff">
				<text slot="title" class="total">总资产：186,660,004.00</text>
			</cell>
		</view>
		<view class="account-group">
			<view class="account-item">
				<cell>
					<view slot="title">
						<icon-cell
							title="现金"
							source="../../static/img/account/xianjin.png"
						>
						</icon-cell>
					</view>
					<text slot="value">5,506.00</text>
				</cell>
				
				<cell>
					<view slot="title">
						<icon-cell
							title="银行卡"
							source="../../static/img/account/yinhangka.png"
						>
						</icon-cell>
					</view>
					<text slot="value">5,506.00</text>
				</cell>
				<cell>
					<view slot="title">
						<icon-cell
							title="支付宝"
							source="../../static/img/account/zhifubao.png"
						>
						</icon-cell>
					</view>
					<text slot="value">5,506.00</text>
				</cell>
				<cell>
					<view slot="title">
						<icon-cell
							title="微信"
							source="../../static/img/account/weixin.png"
						>
						</icon-cell>
					</view>
					<text slot="value">5,506.00</text>
				</cell>
				<cell>
					<view slot="title">
						<icon-cell
							title="信用卡"
							source="../../static/img/account/xinyongka.png"
						>
						</icon-cell>
					</view>
					<text slot="value">5,506.00</text>
				</cell>
			</view>
		</view>
		<!-- <custom-tabbar tab-index="1"></custom-tabbar> -->
	</view>
</template>

<script>
	import Cell from "../../components/common/cell/Cell.vue";
	import IconCell from "../../components/common/cell/IconCell.vue"
	
	export default {
		data() {
			return {
				
			};
		},
		components: {
			Cell,
			IconCell
		}
	}
</script>

<style lang="less">
	.container-account {
		.total-wrap {
			.total {
				color: #fff;
				font-size: 36rpx;
			}	
		}
		.account-group {
			.account-item {
				.icon-wrap {
					width: 42rpx;
					image {
						width: 100%;
					}
				}
			}
		}
	}
</style>
