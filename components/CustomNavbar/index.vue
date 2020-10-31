<template>
	<view class="navbar"
        :style="{ paddingTop: top + 'px' }"
        @click="gotoAccountBook">
		<text>{{ currentAccountBook.name }}</text>
        <text class="iconfont icon-right"></text>
	</view>
</template>

<script>
    
    import {
        ACCOUNT_BOOKS,
        CURRENT_ACCOUNT_BOOK
    } from '@/store/mutation-types.js'
    import { mapState } from 'vuex'

    import res from './data.json'
	
	export default {
		name: 'Navbar',
		props: {
			top: {
				type: Number,
				required: true
			}
		},
		created() {
            this.$store.commit(ACCOUNT_BOOKS, res.data)
            this.$store.commit(CURRENT_ACCOUNT_BOOK, this.$store.state.accountBooks[0])
        },
        computed: {
            ...mapState(['currentAccountBook'])
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
