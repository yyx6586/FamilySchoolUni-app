<template>
	<view>
		<!-- 原始密码 -->
		<view class="first-view">
			<view class="passwordText">旧密码:</view>
			<input class="password-input" v-model="oldPassword" password="true"/>
		</view>
		
		<!-- 新密码 -->
		<view class="first-view">
			<view class="passwordText">新密码:</view>
			<input class="password-input" v-model="newPassword" password="true" placeholder="6-10位字母和数字组成" placeholder-style="font-size:30rpx"/>
		</view>
		
		<!-- 确认新密码 -->
		<view class="first-view">
			<view class="passwordText">确认新密码:</view>
			<input class="password-input" v-model="confirmPassword" password="true" placeholder="请重新输入新密码" placeholder-style="font-size:30rpx"/>
		</view>
		
		<!-- 修改按钮 -->
		<view class="update" @click="update">修改</view>
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import md5 from '@/utils/md5.js'
	export default{
		data() {
			return{
				oldPassword:"",
				newPassword:"",
				confirmPassword:"",
				account:""
			}
		},
		
		onShow() {
			this.account = uni.getStorageSync('account')
		},
		
		methods:{
			...mapActions({
				updatePassword:'updatePassword/updatePassword'
			}),
			
			update(){
				if(string.isNullAndEmpty(this.oldPassword)){
					uni.showToast({
					    title: '原密码不能为空！',  
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.newPassword)){
					uni.showToast({
					    title: '新密码不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.confirmPassword)){
					uni.showToast({
					    title: '确认密码不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isEqual(this.newPassword,this.confirmPassword)){
					uni.showToast({
					    title: '新密码与确认密码不一样！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.updatePassword({
					"account": account,
					"password":md5(this.oldPassword),
					"resetPassword":md5(this.newPassword) 
				}).then(res => {
					console.log(res)
				})
				
			}
		}
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
	.passwordText{
		margin-left: 30rpx;
		margin-right: 20rpx;
	}
	.password-input{
		width: 300rpx;
		font-size: 40rpx;
		color: #333333;
		border-bottom: 1rpx solid #C8C7CC;
	}
	.update{
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
