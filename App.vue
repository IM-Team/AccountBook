<script>
    
    import AccountBookModel from '@/model/AccountBookModel'
    import AccountModel from '@/model/AccountModel'

    import { mapState } from 'vuex'

    const accountBookModel = new AccountBookModel()
    const accountModel = new AccountModel()

	export default {
        name: 'App',
        data() {
            return {
                lock: false
            }
        },
        async created() {
            this.init()
        },
        computed: {
            ...mapState(['currentAccountBook'])
        },
		methods: {
            init() {
                const abId = this.$store.state.currentAccountBook.id || 1

                Promise.all([
                    accountBookModel.getCategory(abId),
                    accountBookModel.getAccountBooks(),
                    accountModel.getAccountList(abId)
                ]).then(res => {
                    this.initCategory(res[0])
                    this.initAccountBook(res[1])
                    this.initAccount(res[2])
                    this.$store.dispatch('currentAccountBook', this.$store.state.accountBooks[0])
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
