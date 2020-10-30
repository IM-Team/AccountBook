<template>
	<view class="navbar"
        :style="{ paddingTop: top + 'px' }"
        @click="gotoAccountBook">
		<text>{{ currentAccountBook.name }}</text>
        <text class="iconfont icon-right"></text>
	</view>
</template>

<script>
	
	import res from './data.json'
	
	export default {
		name: 'Navbar',
		props: {
			top: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				currentAccountBook: {}
			}
		},
		created() {
			this.$store.mutations.setAccountBooks(res.data)
			this.currentAccountBook = this.$store.mutations.setCurrentAccountBook(res.data[0])
		},
		methods: {
			gotoAccountBook() {
				uni.navigateTo({
					url: '/pages/AccountBook/index'
				})
			}
		}
	}
	
</script>

<style scoped>
	
	.navbar {
		width: 100%;
		height: 44px;
		background-color: #fff;
		padding: 0 32rpx;
		position: fixed;
		top: 0;
		left: 0;
        display: flex;
        align-items: center;
	}
	
	.icon-right {
		margin: 2px 0 0 6px;
		font-size: 28rpx;
	}
	
</style>
