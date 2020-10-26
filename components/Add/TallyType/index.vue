<template>
    <view class="tally-type">
        <view class="income"
            :class="{active: type === 1}"
            @click="onToggle(1)">收入</view>
        <view class="spend"
            :class="{active: type === 2}"
            @click="onToggle(2)">支出</view>
    </view>
</template>

<script>
    export default {
        name: 'TallyType',
        props: {
            type: {
                type: Number,
                required: true
            }
        },
        methods: {
            onToggle(type) {
                this.$emit('toggle', type)
            }
        }
    }
</script>

<style scoped>

    .tally-type {
		display: flex;
		border: solid 1px #188AFF;
		border-radius: calc(calc(100vw - 64rpx) / 2);
		font-size: 28rpx;
		overflow: hidden;
	}
	
	.tally-type .income,
	.tally-type .spend {
		flex: 1;
		height: 74rpx;
		line-height: 74rpx;
		text-align: center;
		color: #188AFF;
	}
	
	.tally-type .active {
		color: #fff;
		background-color: #188AFF;
	}

</style>
