<template>
	<view>
		<!-- 头像 -->
		<view>
			<image src="../../static/index/three.jpg" style="width: 100rpx;height: 100rpx;border-radius: 100%;"></image>
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
			<view class="value-view">{{item}}</view>
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
			<view class="value-view"></view>
		</view> 
		
		<!-- QQ -->
		<view class="first-view">
			<view class="title-view">QQ</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 微信 -->
		<view class="first-view">
			<view class="title-view">微信</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">通讯地址</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 家长姓名 -->
		<view class="first-view">
			<view class="title-view">家长姓名</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 家长电话 -->
		<view class="first-view">
			<view class="title-view">家长电话</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 家长QQ -->
		<view class="first-view">
			<view class="title-view">家长QQ</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 家长微信 -->
		<view class="first-view">
			<view class="title-view">家长微信</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 与学生关系 -->
		<view class="first-view">
			<view class="title-view">与学生关系</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">家长通讯地址</view>
			<view class="value-view"></view>
		</view>
		
		<!-- 家庭地址 -->
		<view class="first-view">
			<view class="title-view">家长家庭地址</view>
			<view class="value-view"></view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data() {
			return{
				item: ""
			}
		},
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.item = option.item
			console.log(this.item)      //打印出上页面传递的参数
			
		},
		methods:{},
	}
</script>

<style>
	page{
		background-color: #F5F7FA;
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
</style>
