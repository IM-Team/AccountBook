<template>
	<view class="add_category-container">
		<view class="sub-container">
			<view
				class="iconfont center icon_preview"
				:class="icons[type - 1][currentPickIcon]"
				:style="{ backgroundColor: pickColor }"></view>
			<input type="text" placeholder="请输入1-4个字的分类名" maxlength="4" v-model="name">
		</view>
		<view class="color-pick">
			<view class="title">选择图标颜色</view>
			<view class="color-pick-wrap">
				<view
					class="color-wrap center cell-5"
					v-for="(item, index) in colors"
					@click="changePickColor(index)"
					:class="{ 'active': index === currentPickColor }"
					:key="index">
					<view class="color-circle" :style="{ borderColor: item }"></view>
					<view class="color" :style="{ backgroundColor: item }"></view>
				</view>
			</view>
		</view>
		<view class="icon-pick">
			<view class="title">选择图标</view>
			<view class="icon-pick-wrap">
				<view
					class="icon center cell-5 iconfont"
					v-for="(item, index) in icons[type - 1]"
					:class="item"
					@click="changePickIcon(index)"
					:style="{
						borderColor: pickColor,
						backgroundColor: currentPickIcon === index ? pickColor : '#fff',
						color: currentPickIcon === index ? '#fff' : pickColor
					}"
					:key="index"></view>
			</view>
		</view>
		<view class="center submit" @click="onConfirm">保存</view>
	</view>
</template>

<script>

    import AccountBookModel from '@/model/AccountBookModel'
    import { 
		ADD_CATEGORY,
		UPDATA_CATEGORY
	} from '@/store/mutation-types'
	
	export default {
        name: 'AddCategory',
		data() {
			return {
				type: 1,
				currentPickIcon: 0,
				currentPickColor: 0,
				category_edit: null,
				name: '',
				colors: [
					"#92CDCF",
					"#4BB5C1",
					"#91C46C",
					"#42BA78",
					"#BFA4D2",
					"#FFA0B1",
					"#2185C5",
					"#188AFF",
					"#F58653",
					"#F2385A",
				],
				icons: [
					[
						'icon-qiandai',
						'icon-hongbaomian',
						'icon-shizhong',
						'icon-shangdian',
						'icon-shoutibao',
						'icon-zhuanzhang',
						'icon-gongzuotai',
						'icon-jiangpai',
						'icon-huobi',
						'icon-ziyuan'
					],
					[
						'icon-liwu',
						'icon-canyin',
						'icon-xiazai50',
						'icon-yifu',
						'icon-fangzi',
						'icon-dache',
						'icon-shenghuo',
						'icon-yaopin',
						'icon-yanjiu',
						'icon-shuiqian'
					]
				]
			}
		},
		created() {
			this.initModify();
		},
		onLoad(param) {
            if (param.type) this.type = param.type * 1;
		},
		computed: {
			iconActive() {
				return {
					backgroundColor: this.colors[this.currentPickColor],
					color: '#fff',
					borderColor: this.colors[this.currentPickColor]
				}
			},
			pickColor() {
				return this.colors[this.currentPickColor]
			}
		},
		methods: {
			changePickColor(index) {
				this.currentPickColor = index
			},
			changePickIcon(index) {
				this.currentPickIcon = index
			},
			onConfirm() {
				// 去除字符串前后的留白
				this.name = this.name.trim();
				if(!this.name.length) {
					uni.showToast({
						icon: "none",
						title: "请输入分类名"
					})
					return;
				} 
				
				if(this.category_edit) {
					this.handleConfirmModify();
				} else {
					this.handleConfirmCreate();
				}

            },
			handleConfirmModify() {
				this.category_edit.name = this.name;
				this.category_edit.color = this.colors[this.currentPickColor];
				this.category_edit.icon = this.icons[this.type - 1][this.currentPickIcon];
				
				;(new AccountBookModel()).postCategory(this.category_edit).then(() => {
					
					this.$store.commit(UPDATA_CATEGORY, {
						type: this.category_edit.type,
						id: this.category_edit.id,
						data: this.category_edit
					});
					
					uni.navigateBack();
				});
				
			},
			handleConfirmCreate() {
				const accountBookId = this.$store.state.currentAccountBook.id
				const targetCategory = {
				    id: -1,
				    bookId: accountBookId,
				    type: this.type,
				    name: this.name,
				    color: this.pickColor,
				    icon: this.icons[this.type - 1][this.currentPickIcon]
				}
				
				;(new AccountBookModel()).postCategory(targetCategory).then(id => {
				    targetCategory.id = id
					
				    this.$store.commit(ADD_CATEGORY, {
				        type: this.type,
				        data: targetCategory
				    })
					 uni.navigateBack();
				});
			},
			initModify() {
				this.category_edit = uni.getStorageSync("category_edit");
				uni.removeStorage({ key: "category_edit" });
				
				if(this.category_edit) {
					this.name = this.category_edit.name;
					this.type = this.category_edit.type;
					this.currentPickIcon = this.icons[this.category_edit.type - 1].findIndex(item => item == this.category_edit.icon);
					this.currentPickColor = this.colors.findIndex(item => item == this.category_edit.color);
				}
				
			}
		}
	}
	
</script>

<style scoped>

	.add_category-container { padding: 0 32rpx; }
	
	.sub-container {
		display: flex;
		align-items: center;
		background-color: #fff;
		margin: 32rpx 0;
		padding: 20rpx;
		border-radius: 10px;
	}
	
	.title {
		margin-bottom: 20rpx;
		color: #666;
	}
	
	.icon_preview {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
		margin-right: 20rpx;
	}
	
	.color-pick-wrap {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-bottom: 40rpx;
	}
	
	.color-wrap { position: relative; }
	
	.color-circle {
		box-sizing: border-box;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border-radius: 50%;
		transition: .2s;
		border: 2px solid #188AFF;
	}
	
	.color-wrap.active .color-circle { transform: scale(1.1); }

	.color {
		width: 100%;
		height: 100%;
		transition: .2s;
		border-radius: 50%;
		background-color: #188AFF;
	}
	
	.color-wrap.active .color { transform: scale(.8); }
	
	.icon-pick-wrap {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.icon {
		box-sizing: border-box;
		border-radius: 50%;
		border: 1px solid #E28D32;
		color: #E28D32;
		font-size: 36rpx;
		transition: .2s;
	}
	
	.icon.active {
		background-color: #E28D32;
		color: #fff;
	}
	
	.cell-5 {
		margin: 0 calc(calc(100% - 464rpx) / 4) 20rpx 0;
		width: 80rpx;
		height: 80rpx;
	}

	.cell-5:nth-child(5n) { margin: 0 0 20rpx 0; }
	
	.submit {
		margin: 32rpx auto 0;
		width: 340rpx;
		height: 80rpx;
		background-color: #188AFF;
		color: #fff;
		border-radius: 170rpx;
	}
	
</style>
