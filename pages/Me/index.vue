<template>
	<view class="me-container">

		<view class="header">
			<button class="login-btn" open-type="getUserInfo" @getuserinfo="onLogin">
				<image v-if="isLogin" class="avatar" :src="avatar" />
				<view v-else class="iconfont icon-my"></view>
			</button>
			<view class="name">{{ nickName }}</view>
		</view>

		<view class="profile-group">
			<view class="profile-item" @click="onGotoAccountBook">
				<im-cell icon="icon-date" title="账本">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
			<view class="profile-item" @click="onGotoCate">
				<im-cell icon="icon-fenlei" title="分类">
					<view slot="content" class="iconfont icon-gengduo"></view>
				</im-cell>
			</view>
			<view class="profile-item" @click="onGotoFeedback">
				<im-cell icon="icon-yijianfankui" title="意见反馈" />
			</view>
			<view class="profile-item" @click="onGotoAboutUs">
				<im-cell icon="icon-me" title="关于我们" />
			</view>

		</view>
	</view>
</template>

<script>
	import ImCell from '@/components/common/ImCell'
	import LoginModel from '@/model/LoginModel'
	import {
		USER_ID,
        TOKEN,
        IS_LOGIN
    } from '@/store/mutation-types'
    import { initGlobalDataMixin } from '@/utils/mixins'
    import HttpServe from '@/utils/HttpServe'

	export default {
        name: 'Me',
        mixins: [initGlobalDataMixin],
		data() {
			return {
				avatar: '',
				nickName: '请登录',
                isLogin: false,
                userId: -1
			}
		},
		created() {
            if (this.$store.state.isLogin) {
                uni.getSetting({ success: this.authorizedSuccess })
            } else {
                // uni.removeStorage({ key: 'userInfo' })
                console.log('无效')
            }
		},
		components: {
			ImCell
		},
		methods: {
			onGotoAccountBook() {
				uni.navigateTo({
					url: '/pages/AccountBook/index'
				});
			},
			onGotoCate() {
				uni.navigateTo({
					url: '/pages/CategoryList/index'
				})
			},
			onGotoFeedback() {
				uni.navigateTo({
					url: '/pages/Feedback/index'
				})
			},
			onGotoSetting() {
				uni.navigateTo({
					url: '/pages/Setting/index'
				})
			},
			onGotoAboutUs() {
				uni.navigateTo({
					url: '/pages/AboutUs/index'
				});
			},
			authorizedSuccess(res) {
				if (res.authSetting['scope.userInfo']) {
                    this.isLogin = true
                    
                    const info = uni.getStorageSync('userInfo')
					if (info) {
						this.setInfo(info)
					} else {
						uni.getUserInfo({
							success: (res) => this.setInfo(res.userInfo)
						})
					}
				}
			},
			async onLogin(event) {

				const info = event.detail.userInfo

				if (info) {
                    
                    this.isLogin = true
                    this.$store.commit(IS_LOGIN, true)
                    
                    const wxloginRes = await HttpServe.login()
                    await this.loginSuccessful(wxloginRes)

                    this.setInfo(info)
                    uni.setStorage({
                        key: 'userInfo',
                        data: {
                            avatarUrl: info.avatarUrl,
                            nickName: info.nickName,
                            userId: this.userId
                        }
                    })
				}
			},
			setInfo(info) {
				this.avatar = info.avatarUrl
                this.nickName = info.nickName
			},
			async loginSuccessful(res) {

				const loginModel = new LoginModel()
				const loginRes = await loginModel.login(res.code)

                this.userId = loginRes.data.userId
                this.$store.commit(TOKEN, loginRes.data.token)
                this.$store.commit(USER_ID, loginRes.data.userId)

                // 拉取数据
                this.initGlobalData()

                uni.setStorage({
                    key: 'token',
                    data: loginRes.data.token
                })
			}
		}
	}
</script>

<style scoped>
	.me-container {
		perspective: 800px;
		padding: 32rpx;
	}

	.header {
		padding: 0 32rpx;
		height: 300rpx;
		display: flex;
		align-items: center;
		border-radius: 10px;
		background-image: linear-gradient(to left, #4FC3F7, #188AFF);
	}

	.login-btn {
		width: 140rpx;
		height: 140rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin: 0;
		padding: 0;
		border: none;
		border-radius: 50%;
		font-size: 0;
	}

	.avatar {
		width: 100%;
		height: 100%;
	}

	.icon-my {
		font-size: 40rpx;
	}

	.name {
		margin-left: 32rpx;
		color: #fff;
		font-size: 40rpx;
	}

	.me-container .profile-group {
		margin-top: 64rpx;
	}

	.profile-group .profile-item {
		margin-bottom: 32rpx;
	}

	.user-info .iconfont {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		font-size: 60rpx;
		text-align: center;
		line-height: 120rpx;
		border-radius: 50%;
		color: #999;
		background-color: #fff;
	}

	.user-info .user-avatar-wrap {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 50%;
		background-color: #fff;
		overflow: hidden;
	}

	.user-avatar-wrap .user-avatar {
		width: 100%;
	}

	.user-info .login-tip {
		color: #fff;
	}

	.logout-btn {
		padding: 28rpx 0;
		margin-top: 48rpx;
		border-radius: calc(100vw - (32rpx * 2));
		text-align: center;
		color: #FF4949;
		background-color: #fff;
	}
</style>
