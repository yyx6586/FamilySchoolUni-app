<template>
	<view class="big-view">
		<view class="login-text">登录</view>
		
		<!-- 账号 -->
		<view class="first-view">
			<view class="title-view">账号:</view>
			<input class="value-view" type="text" placeholder="请输入工号或学号" placeholder-style="padding-left:20rpx;"/>
		</view>
		
		<!-- 姓名 -->
		<view class="first-view">
			<view class="title-view">姓名:</view>
			<input class="value-view" type="text" placeholder="请输入姓名" placeholder-style="padding-left:20rpx;"/>
		</view>
		
		<!-- 密码 -->
		<view class="first-view">
			<view class="title-view">密码:</view>
			<input class="value-view" password="true" placeholder="请输入密码" placeholder-style="padding-left:20rpx;"/>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login-btn">登录</view>
	</view>
</template>

<script>
</script>

<style>
	.big-view{
		display: flex;
		flex-direction: column;
		align-items:center;
	}
	.login-text{
		font-size: 80rpx;
		margin-top: 50rpx;
		font-style: italic;
	}
	.first-view{
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-top: 80rpx;
		background-color: #FFFFFF;
	}
	.title-view{
		font-size: 45rpx;
		color: #333333;
		margin-right: 30rpx;
	}
	.value-view{
		height: 100rpx;
		width: 500rpx;
		border: 1rpx solid #BEBEBE;
		border-radius: 5%;
	}
	.login-btn{
		width: 700rpx;
		height: 100rpx;
		color: #FFFFFF;
		font-size: 50rpx;
		line-height: 100rpx;
		text-align: center;
		vertical-align: center;
		margin-top: 100rpx;
		background-color: #007AFF;
		border-radius: 5%;
	}
</style>
