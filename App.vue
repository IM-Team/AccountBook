<script>
    
    import AccountBookModel from '@/model/AccountBookModel'

	export default {
        name: 'App',
        created() {
            const accountBookModel = new AccountBookModel()

            Promise.all([
                accountBookModel.getCategory(1),
                accountBookModel.getAccountBooks()
            ]).then(res => {

                const tmpCate = { 1: [], 2: [] }
                res[0].forEach(item => tmpCate[item.type].push(item))
                res[1].forEach(item => item.color = item.color.split(','))

                this.$store.dispatch('category', tmpCate)
                this.$store.dispatch('accountBooks', res[1])
                this.$store.dispatch('currentAccountBook', this.$store.state.accountBooks[0])
            })
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
