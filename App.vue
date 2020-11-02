<script>
    
    import AccountBookModel from '@/model/AccountBookModel'

	export default {
        name: 'App',
        created() {
            const accountBookModel = new AccountBookModel()

            accountBookModel.getCategory(1).then(res => {

                const tmpCate = {
                    1: [],
                    2: []
                }

                res.data.forEach(item => tmpCate[item.type].push(item) )

                this.$store.dispatch('initCategory', tmpCate)
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
