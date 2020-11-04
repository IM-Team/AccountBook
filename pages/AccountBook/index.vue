<template>
	<view class="account_book-container">
        <view class="account_book"
            v-for="item in accountBooks" :key="item.id"
            :class="{ active: item.id === currentId }"
            :style="{
                backgroundImage: `linear-gradient(to top, ${item.color[0]} 0%, ${item.color[1]} 100%)`
            }"
            @click="onToggle(item)">
            <text class="name">{{ item.name }}</text>
        </view>
        <view class="account_book account_book-add" @click="onAdd">
            <text class="name">添加账本</text>
        </view>
	</view>
</template>

<script>

    import { mapState } from 'vuex'
    import AccountBookModel from '@/model/AccountBookModel'
    import AccountModel from '@/model/AccountModel'
    import {
        CURRENT_ACCOUNT_BOOK,
        ACCOUNT_BOOKS
    } from '@/store/mutation-types'
    import { turnoverMixin } from '@/utils/mixins'

    const accountBookModel = new AccountBookModel()
    const accountModel = new AccountModel()
	
	export default {
        name: 'AccountBook',
        mixins: [turnoverMixin],
		data() {
			return {
                currentId: 0
			}
        },
        created() {
			this.currentId = this.$store.state.currentAccountBook.id
        },
        computed: {
            ...mapState(['accountBooks', 'currentAccountBook'])
        },
		methods: {
            onToggle(accountBook) {
                this.currentId = accountBook.id
                this.$store.commit(CURRENT_ACCOUNT_BOOK, accountBook)
                this.refreshData(accountBook.id)

                uni.navigateBack()
            },
            onAdd() {
                uni.navigateTo({ url: '/pages/AccountBookAdd/index' })
            },
            refreshData(id) {
                Promise.all([
                    accountBookModel.getCategory(id),
                    accountBookModel.getAccountBooks(),
                    accountModel.getAccountList(id)
                ]).then(res => {
                    this.initCategory(res[0])
                    this.initAccountBook(res[1])
                    this.initAccount(res[2])
                })

                const date = new Date()
                this.switchTurnoverDate(date.getFullYear(), date.getMonth() + 1, id)
            },
            initCategory(res) {
				const tmpCate = { 1: [], 2: [] }
                res.forEach(item => tmpCate[item.type].push(item))
                
				this.$store.dispatch('category', tmpCate)
            },
			initAccountBook(res) {
				res.forEach(item => item.color = item.color.split(','))
				
				this.$store.dispatch('accountBooks', res)
            },
            initAccount(res) {
                const tmpAcount = {
                    capitals: [],
                    credits: []
                }

                for(const account of res.accountList) {
                    if (account.categoryId === 1) {
                        tmpAcount.capitals.push(account);
                    } else if (account.categoryId === 2) {
                        tmpAcount.credits.push(account);
                    }
                }

                this.$store.dispatch('account', tmpAcount)
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
