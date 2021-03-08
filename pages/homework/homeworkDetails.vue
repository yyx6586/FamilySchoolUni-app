<template>
	<view>
		<view>
			<!-- 发布者 -->
			<view>
				<view class="title-view">发布者:</view>
				<view class="value-view"></view>
			</view>
			
			<!-- 发布时间 -->
			<view>
				<view class="title-view">发布时间:</view>
				<view class="value-view"></view>
			</view>
			
			<!-- 发布年级与班级 -->
			<view class="title-view">
				<view>发布对象:</view>
				<view class="value-view"></view>
			</view>
			
			<!-- 发布科目 -->
			<view class="title-view">
				<view>发布科目:</view>
				<view class="value-view"></view>
			</view>
			
			<!-- 发布知识点 -->
			<view style="height: auto;margin-top: 30rpx;padding-left: 20rpx;background-color: #FFFFFF;padding-bottom: 10rpx;">
				<view style="height: 100rpx;line-height: 100rpx;vertical-align: center;">发布知识点:</view>
				<view class="value-view"></view>
			</view>
			
			<!-- 发布内容 -->
			<view style="height: auto;margin-top: 30rpx;padding-left: 20rpx;background-color: #FFFFFF;padding-bottom: 10rpx;">
				<view style="height: 100rpx;line-height: 100rpx;vertical-align: center;">发布内容:</view>
				<view class="value-view"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				showBadge:""
			}
		},
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.showBadge = option.showBadge
			console.log(this.showBadge)      //打印出上页面传递的参数
			
		},
	}
</script>

<style>
	page{
		background-color: #F5F7FA;
	}
	.title-view{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-top: 30rpx;
		padding-left: 20rpx;
		background-color: #FFFFFF;
	}
	.value-view{
		margin-left: 20rpx;
		word-break: break-word;
	}
</style>
