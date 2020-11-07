<template>
    <view class="container">
        <view class="review" :style="bgColor">
            <text class="review-name">{{ input || "账本名称" }}</text>
        </view>
        <view class="name-wrap">
            <input class="name"
				v-model.trim="input"
				maxlength="6"
				type="text"
				placeholder="输入账本名称">
        </view>
        <view class="pick-color">
            <view
                class="color"
                v-for="(color, index) in colors"
                :style="{
                    backgroundImage: `linear-gradient(to right, ${color[0]} 0%, ${color[1]} 100%)`
                }"
                @click="onToggleColor(color)"
                :key="index"></view>
        </view>
        <view class="submit" @click="onSubmit">添加账本</view>
    </view>
</template>

<script>

    import { ADD_ACCOUNT_BOOK } from '@/store/mutation-types'
    import AccountBookModel from '@/model/AccountBookModel'

    export default {
        name: 'AccountBookAdd',
        data() {
            return {
                input: '',
                currentColor: ['#05a0ff', '#005bea'],
                colors: [
                    ['#05a0ff', '#005bea'],
                    ['#4481eb', '#04befe'],
                    ['#0072ff', '#00c6ff'],
                    ['#ec008c', '#fc6767'],
                    ['#ff5858', '#f09819'],
                    ['#dd2476', '#ff512f'],
                    ['#00cdac', '#8ddad5'],
                    ['#02aab0', '#00cdac'],
                    ['#1d976c', '#93f9b9'],
                    ['#c471f5', '#fa71cd'],
                    ['#868f96', '#596164'],
                    ['#29323c', '#485563']
                ]
            }
        },
        computed: {
            bgColor() {
                return `background-image: linear-gradient(to top, ${this.currentColor[0]} 0%, ${this.currentColor[1]} 100%)`                    
            }
        },
        methods: {
            onToggleColor(color) {
                this.currentColor = color
            },
            onSubmit() {
				
				this.input = this.input.trim();
				
				if(this.input.length > 0) {

                    const accountBook = {
                        id: -1,
                        name: this.input,
                        color: this.currentColor.join(',')
                    }

                    ;(new AccountBookModel()).postAccountBook(accountBook).then(id => {
                        accountBook['id'] = id
                        this.saveAccountBook(accountBook)
                    })
                } else {
					uni.showToast({
						icon: "none",
						title: "输入账本名称"
					})
				}
            },
            saveAccountBook(accountBook) {
                accountBook.color = accountBook.color.split(',')
                this.$store.commit(ADD_ACCOUNT_BOOK, accountBook)
				
                console.log(accountBook)

                uni.navigateBack()
            }
        }
    }

</script>

<style scoped>

    .container {
        padding: 0 32rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .review {
        display: inline-flex;
        justify-content: flex-end;
        align-items: center;
        width: 200rpx;
        height: 300rpx;
        margin: 60rpx 0;
        /* background-image: linear-gradient(to top, #05a0ff 0%, #005bea 100%); */
        border-radius: 6px;
    }

    .review-name {
        width: 14rpx;
        margin-right: 40rpx;
        text-align: center;
        font-size: 28rpx;
        color: #fff;
        writing-mode: horizontal-tb;
        word-wrap: break-word;
        word-break: break-all;
    }

    .name-wrap {
        border-radius: 40rpx;
        width: 100%;
        height: 80rpx;
        line-height: 80rpx;
        background-color: #fff;
    }

    .name {
        padding: 0 20rpx;
        height: 100%;
        line-height: 80rpx;
		text-align: center;
    }

    .pick-color {
        display: flex;
        margin-top: 20rpx;
        justify-content: space-around;
        flex-wrap: wrap;
    }

    .color {
        width: 140rpx;
        height: 80rpx;
        margin-top: 20rpx;
        border-radius: 10px;
    }

    .submit {
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        margin-top: 40rpx;
        text-align: center;
        border: none;
        color: #fff;
        background-color: #188AFF;
        border-radius: 40rpx;
    }

</style>
