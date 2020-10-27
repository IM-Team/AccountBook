<template>
	<view class="account_book-container">
        <view class="account_book"
            v-for="(item, index) in data" :key="item.id"
            :class="{ active: index === currentIndex}"
            :style="{
                backgroundImage: `linear-gradient(to top, ${item.color[0]} 0%, ${item.color[1]} 100%)`
            }"
            @click="onToggle(index)">
            <text class="name">{{ item.name }}</text>
        </view>
        <view class="account_book account_book-add" @click="onAdd">
            <text class="name">添加账本</text>
        </view>
	</view>
</template>

<script>

	import res from './data.json'
	
	export default {
		data() {
			return {
                data: [],
                currentIndex: 0
			}
        },
        created() {
            this.data = this.$store.mutations.setAccountBooks(res.data)
        },
		methods: {
            onToggle(index) {
                this.currentIndex = index
            },
            onAdd() {
                uni.navigateTo({ url: '/pages/AccountBookAdd/index' })
            }
		}
	}
	
</script>

<style scoped>

    .account_book-container {
        padding: 0 32rpx;
        display: flex;
        flex-wrap: wrap;
    }

    .account_book {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 200rpx;
        height: 300rpx;
        margin-top: 60rpx;
        margin-right: calc((100vw - 64rpx - 600rpx) / 2);
        background-image: linear-gradient(to top, #05a0ff 0%, #005bea 100%);
        border-radius: 6px;
        position: relative;
        overflow: hidden;
    }

    .account_book:nth-child(3n) {
        margin-right: 0;
    }

    .active::before {
        content: "已选";
        position: absolute;
        left: 0;
        top: 0;
        width: 160rpx;
        background-color: #f4c106;
        font-size: 28rpx;
        text-align: center;
        transform: rotate(-45deg) translate(-28%, -60%);
        color: #fff;
    }

    .name {
        width: 14rpx;
        margin-right: 40rpx;
        text-align: center;
        font-size: 28rpx;
        color: #fff;
        writing-mode: horizontal-tb;
        word-wrap: break-word;
        word-break: break-all;
    }

    .account_book-add {
        background-image: none;
        box-sizing: border-box;
        border: 2px solid #ccc;
    }

    .account_book-add  .name {
        color: #aaa;
    }
	
</style>
