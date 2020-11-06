<script>
    
    import AccountBookModel from '@/model/AccountBookModel'
    import AccountModel from '@/model/AccountModel'
    import {
        TOKEN,
        UPDATE_ACCOUNT
    } from '@/store/mutation-types'
    import {mapState } from 'vuex'


    const accountBookModel = new AccountBookModel()
    const accountModel = new AccountModel()

	export default {
        name: 'App',
        data() {
            return {
                lock: false
            }
        },
        created() {

            const token = uni.getStorageSync('token')
            this.$store.commit(TOKEN, token)

            this.init()
        },
        computed: {
            ...mapState(['currentAccountBook'])
        },
		methods: {
            init() {

                accountBookModel.getAccountBooks().then(res => {
                    this.initAccountBook(res)
                    this.$store.dispatch('currentAccountBook', this.$store.state.accountBooks[0])

                    const abId = res[0].id

                    return Promise.all([
                        accountBookModel.getCategory(abId),
                        accountModel.getAccountList(abId)
                    ])
                }).then((res) => {
                    this.initCategory(res[0])
                    this.initAccount(res[1])
                })
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

<style>

	@import url("./common/iconfont/iconfont.css");

	page {
        background-color: #f2f2f7;
        color: #2B303B;
	}
	
	.center {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	.page-padding {
		padding: 0 32rpx;
	}
	
</style>
