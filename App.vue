<script>
    
    import AccountBookModel from '@/model/AccountBookModel'
    import AccountModel from '@/model/AccountModel'

	export default {
        name: 'App',
        created() {

            const id = uni.getStorageSync('bookId')

            const accountBookModel = new AccountBookModel()
            const accountModel = new AccountModel()
            Promise.all([
                accountBookModel.getCategory(1),
                accountBookModel.getAccountBooks(),
                accountModel.getAccountList(1)
            ]).then(res => {
                this.initAccountBook(res)
                this.initAccount(res[2])
			})
        },
		methods: {
			initAccountBook(res) {
				const tmpCate = { 1: [], 2: [] }
				res[0].forEach(item => tmpCate[item.type].push(item))
				res[1].forEach(item => item.color = item.color.split(','))
				
				this.$store.dispatch('category', tmpCate)
				this.$store.dispatch('accountBooks', res[1])
				this.$store.dispatch('currentAccountBook', this.$store.state.accountBooks[0])
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
