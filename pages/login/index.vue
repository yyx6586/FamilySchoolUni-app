<template>
	<view class="big-view">
		<view class="login-text">登录</view>
		
		<!-- 账号 -->
		<view class="first-view">
			<view class="title-view">账号:</view>
			<input class="value-view" type="text" v-model="account" placeholder="请输入工号或学号" placeholder-style="padding-left:20rpx;"/>
		</view>
		
		<!-- 密码 -->
		<view class="first-view">
			<view class="title-view">密码:</view>
			<input class="value-view" password="true" v-model="password" placeholder="请输入密码" placeholder-style="padding-left:20rpx;"/>
		</view>
		
		<!-- 登录按钮 -->
		<view class="login-btn" @click="login">登录</view>
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import md5 from '@/utils/md5.js'
	export default{
		data() {
			return{
				account:"",
				name:"",
				password:""
			}
		},
		methods:{
			...mapActions({ 
				signIn:'login/signIn'
			}),
			
			login(){
				if(string.isNullAndEmpty(this.account)){
					uni.showToast({
					    title: '账号不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.password)){ 
					uni.showToast({
					    title: '密码不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				uni.showLoading({
				    title: '加载中...'
				});
				
				this.signIn({
					"account":this.account,
					"password":md5(this.password)
				}).then(res => {
					console.log(res)
					
					if(res.code == 1) {
						uni.setStorageSync('account', res.data.userId);
						uni.setStorageSync('name', res.data.userName);
						uni.setStorageSync('token', res.data.token);
						uni.setStorageSync('role', res.data.role);
						
						uni.switchTab({
							url:"../index/index",
						})
						
						//关闭加载框
						uni.hideLoading();
					}else{
						//关闭加载框 
						uni.hideLoading();
						
						let msg = res.msg + "！"
						uni.showToast({
						    title: msg,
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}
				})
			}
		}
	}
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
		padding-left: 20rpx;
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
