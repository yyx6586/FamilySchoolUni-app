<template>
	<view>
		<!-- 顶部图片 -->
		<view>
			<image src="../../static/index/two.jpeg" style="height: 350rpx;width: 100%;"></image>
		</view>
		
		<!-- 头像 -->
		<view class="phone-view" @click="goToPersonalInformation">
			<image class="phone-left-img" :src="src"></image>
			<view style="margin-left: 30rpx;">{{name}}</view>
			<image class="phone-right-img" src="../../static/return_right.png"></image>
		</view>
		
		<!-- 功能选择 -->
		<view style="margin-top:20rpx;">
			<!-- 使用帮助 -->
			<view class="first-view">
				<image class="left-img" src="../../static/my/useHelp.png"></image>
				<view>使用帮助</view>
				<image class="right-img" src="../../static/return_right.png"></image>
			</view>
			
			<!-- 版本说明 -->
			<view class="first-view">
				<image class="left-img" src="../../static/my/versionInformation.png"></image>
				<view>版本说明</view>
				<image class="right-img" src="../../static/return_right.png"></image>
			</view>
			
			<!-- 修改密码 -->
			<view @click="goToUpdatePassword" class="first-view">
				<image class="left-img" src="../../static/my/updatepassword.png"></image>
				<view>修改密码</view>
				<image class="right-img" src="../../static/return_right.png"></image>
			</view>
			
			<!-- 退出登录 -->
			<view class="first-view">
				<image class="left-img" src="../../static/my/returnLogin.png"></image>
				<view @click="returnLogin">退出登录</view>
				<!-- <uni-popup ref="popup" type="top"></uni-popup> -->
				<uni-popup ref="popup">
				    <uni-popup-dialog type="center" content="确定退出登录？" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
				</uni-popup>
			</view>
		</view>
	</view>
</template>

<script>
	import * as config from '@/common/config.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	export default {
		data() {
			return {
				name: "",
				src:"../../static/index/three.jpg",
				account:""
			}
		},
		
		onLoad() {
			this.name = uni.getStorageSync('name'),
			this.account = uni.getStorageSync('account')
			console.log(this.account)
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 查询头像
			await this.selectUrl({"account":this.account}).then(res => {
					console.log(res)
					if(res.data != null){
						this.src = config.BASIC_API + res.data.url
						console.log(this.src)
					}else{
						this.src = "../../static/index/three.jpg" 
					}
				})
			
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				selectUrl:'personalInformation/selectUrl'
			}),
			
			goToUpdatePassword(){
				uni.navigateTo({
					url:"../updatePassword/index",
				})
			},
			goToPersonalInformation(){
				uni.navigateTo({
					url:"../personalInformation/index",
				})
			},
			returnLogin(){
				// 通过组件定义的ref调用uni-popup方法
				this.$refs.popup.open()
			},
			/**
			 * 点击取消按钮触发
			 * @param {Object} done
			 */
			 close(done){
			    // TODO 做一些其他的事情，before-close 为true的情况下，手动执行 done 才会关闭对话框
			    uni.navigateTo({
			    	url:"../my/index",
			    })
			    done()
			},
			/**
			 * 点击确认按钮触发
			 * @param {Object} done
			 * @param {Object} value
			 */
			confirm(done,value){
				// 清空本地缓存
				uni.clearStorageSync();	
				
			    // TODO 做一些其他的事情，手动执行 done 才会关闭对话框
			    uni.navigateTo({
			    	url:"../login/index",
			    })
			    done()
			}
		}
	}
</script>

<style lang="scss">
	// page{
	// 	background-color: #F1F1F1;
	// }
	.phone-view{
		display: flex; 
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-left: 40rpx;
		margin-top: 50rpx;
	}
	.phone-left-img{
		height: 200rpx;
		width: 200rpx;
		border-radius: 100%;
	}
	.phone-right-img{
		width: 50rpx;
		height: 40rpx;
		margin-left: 350rpx;
	}
	.first-view{
		display: flex; 
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		padding-left: 80rpx;
		margin-top: 30rpx;
	}
	.left-img{
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}
	.right-img{
		width: 45rpx;
		height: 25rpx;
		margin-left: 390rpx;
	}
</style>
