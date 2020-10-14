<template>
	<view class="statistic-container">
		<view class="form-wrap">
			<view class="statistic-type">
				<view class="income active">收入</view>
				<view class="spend">支出</view>
			</view>
			<picker mode="date" fields="month" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="calendar">{{date}}</view>
			</picker>
		</view>
		
		<view class="chart-wrap"></view>
		
		<view class="classify-wrap">
			<view class="classify" v-for="(item, index) in 5" :key="index">
				<view class="title">
					<view class="iconfont icon-yaowan"></view>
					<view class="title-text">药品</view>
				</view>
				<view class="scale">33.5%</view>
				<view class="total">560.00</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
    data() {
      const currentDate = this.getDate({
        format: true
      })
      return {
        title: 'picker',
        index: 0,
        date: currentDate
      }
    },
    computed: {
       startDate() {
        return this.getDate('start');
       },
       endDate() {
        return this.getDate('end');
       }
    },
    methods: {
      bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.target.value)
        this.index = e.target.value
      },
      bindDateChange: function(e) {
        this.date = e.target.value
      },
      bindTimeChange: function(e) {
        this.time = e.target.value
      },
      // getDate(type) {
      //   const date = new Date();
      //   let year = date.getFullYear();
      //   let month = date.getMonth() + 1;
      //   let day = date.getDate();

      //   if (type === 'start') {
      //       year = year - 60;
      //   } else if (type === 'end') {
      //       year = year + 2;
      //   }
      //   month = month > 9 ? month : '0' + month;;
      //   day = day > 9 ? day : '0' + day;
      //   return `${year}-${month}-${day}`;
      // },
			getDate(type) {
			  const date = new Date();
			  let year = date.getFullYear();
			  let month = date.getMonth() + 1;
			  // let day = date.getDate();
			
			  if (type === 'start') {
			      year = year - 60;
			  } else if (type === 'end') {
			      year = year + 2;
			  }
			  month = month > 9 ? month : '0' + month;;
			  // day = day > 9 ? day : '0' + day;
			  return `${year}-${month}`;
			}
    }
}
</script>

<style scoped>
	.statistic-container {
		padding: 16rpx 32rpx;
	}
	.statistic-container .form-wrap {
		display: flex;
		justify-content: space-between;
		padding-bottom: 32rpx; 
	}
	.form-wrap .statistic-type {
		display: flex;
		width: 200rpx;
		border: solid 1px #188AFF;
		border-radius: 26px;
		overflow: hidden;
	}
	.form-wrap .calendar {
		width: 200rpx;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		text-align: center;
		border: solid 1px #188AFF;
		border-radius: 100rpx;
		color: #188AFF;
	}
	
	/* statistic in style */
	.statistic-type .income,
	.statistic-type .spend{
		flex: 1;
		height: 54rpx;
		line-height: 54rpx;
		font-size: 28rpx;
		text-align: center;
		color: #188AFF;
	}
	.statistic-type .active {
		color: #fff;
		background-color: #188AFF;
	}
	
	
	.chart-wrap {
		height: 400rpx;
		background-color: #eee;
	}
	
	.classify-wrap {
		padding-top: 32rpx;
	}
	.classify-wrap .classify {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		padding: 32rpx;
		line-height: 60rpx;
		border-radius: 16px;
		margin-bottom: 28rpx;
		background-color: #fff;
	}
	.classify .title {
		display: flex;
	}
	.title .iconfont {
		width: 60rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		border-radius: 50%;
		color: #fff;
		background-color: #188AFF;
	}
	.title .title-text{
		padding-left: 16rpx;
	}
</style>
