<template>
	<view>
		<!-- 头像 -->
		<view class="img-first-view">
			<image class="img" src="../../static/index/three.jpg"></image>
			<view class="img-btn" @click="updatePhone">更换头像</view>
		</view>
		
		<!-- 工号或学号 -->
		<view class="first-view">
			<view class="title-view">工号</view>
			<view class="title-view">学号</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 姓名 -->
		<view class="first-view">
			<view class="title-view">姓名</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 性别 -->
		<view class="first-view">
			<view class="title-view">性别</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 科目 教师-->
		<view class="first-view">
			<view class="title-view">科目</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 班级 学生-->
		<view class="first-view">
			<view class="title-view">班级</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 电话 -->
		<view class="first-view">
			<view class="title-view">电话</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view> 
		
		<!-- QQ -->
		<view class="first-view">
			<view class="title-view">QQ</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 微信 -->
		<view class="first-view">
			<view class="title-view">微信</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">通讯地址</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长姓名 -->
		<view class="first-view">
			<view class="title-view">家长姓名</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长电话 -->
		<view class="first-view">
			<view class="title-view">家长电话</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长QQ -->
		<view class="first-view">
			<view class="title-view">家长QQ</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长微信 -->
		<view class="first-view">
			<view class="title-view">家长微信</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 与学生关系 -->
		<view class="first-view">
			<view class="title-view">与学生关系</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">家长通讯地址</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家庭地址 -->
		<view class="first-view">
			<view class="title-view">家长家庭地址</view>
			<input class="value-view" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 保存按钮 -->
		<view class="save">保存</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {}
		},
		methods:{
			updatePhone() {
				console.log("1111")
			}
		}
	}
</script>

<style>
	page{
		background-color: #F5F7FA;
	}
	.img-first-view{
		display: flex;
		flex-direction: row;
		justify-content:space-between;
		align-items:center;
	}
	.img{
		width: 200rpx;
		height: 200rpx;
		border-radius: 100%;
		margin-left: 20rpx;
	}
	.img-btn{
		height: 100rpx;
		width: auto;
		text-align: center;
		line-height: 100rpx;
		vertical-align: center;
		margin-right: 50rpx;
	}
	.img-btn:active{
		color: #F0AD4E;
	}
	.first-view{
		height: 130rpx;
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-top: 30rpx;
		background-color: #FFFFFF;
	}
	.title-view{
		color: #333333;
		margin-left: 20rpx;
		margin-right: 40rpx;
	}
	.value-view{
		color: #333333;
		font-size: 38rpx;
		word-break: break-word;
	}
	.save{
		width: 100%;
		height: 80rpx;
		color: white;
		line-height: 80rpx;
		margin-top: 60rpx;
		text-align: center;
		vertical-align:middle;
		background-color: #007AFF;
	}
</style>
