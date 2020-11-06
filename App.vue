<script>
    
    import { mapState } from 'vuex'
    import { initGlobalDataMixin } from './utils/mixins'
    import HttpServe from '@/utils/HttpServe'
    import LoginModel from '@/model/LoginModel'
    import {
        UPDATE_ACCOUNT,
        USER_ID,
        TOKEN,
        IS_LOGIN
    } from '@/store/mutation-types'

	export default {
        name: 'App',
        mixins: [initGlobalDataMixin],
        async created() {
            
            const wxLoginRes = await HttpServe.login()
            if (wxLoginRes.errMsg.endsWith('ok')) {

                const userInfo = uni.getStorageSync('userInfo')
                this.$store.commit(IS_LOGIN, true)

                // 能拿到本地 token
                let token = uni.getStorageSync('token')
                if (token) {
                    this.$store.commit(TOKEN, token)
                } else {
                    const loginModel = new LoginModel()
                    const res = await loginModel.login(wxLoginRes.code)
                    this.$store.commit(TOKEN, res.data.token)
                    this.$store.commit(USER_ID, res.data.userId)
                }

                await this.initGlobalData()
            } else {
                uni.showToast({
                    title: '请登录使用',
                    icon: 'none',
                    duration: 2000
                })
            }
        },
        computed: {
            ...mapState(['currentAccountBook'])
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
