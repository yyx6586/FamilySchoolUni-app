<template>
	<view>
		<!-- 头像 -->
		<view style="margin-left: 30rpx;">
			<image :src="src" style="width: 200rpx;height: 200rpx;border-radius: 100%;"></image>
		</view>
		
		<!-- 工号或学号 -->
		<view class="first-view">
			<view class="title-view" v-if="role == 1">工号</view>
			<view class="title-view" v-if="role == 2">学号</view>
			<view class="value-view">{{account}}</view>
		</view>
		
		<!-- 姓名 -->
		<view class="first-view">
			<view class="title-view">姓名</view>
			<view class="value-view">{{name}}</view>
		</view>
		
		<!-- 性别 -->
		<view class="first-view">
			<view class="title-view">性别</view>
			<view class="value-view">{{sex}}</view>
		</view>
		
		<!-- 电话 -->
		<view class="first-view">
			<view class="title-view">电话</view>
			<view class="value-view">{{phone}}</view>
		</view> 
		
		<!-- QQ -->
		<view class="first-view">
			<view class="title-view">QQ</view>
			<view class="value-view">{{qq}}</view>
		</view>
		
		<!-- 微信 -->
		<view class="first-view">
			<view class="title-view">微信</view>
			<view class="value-view">{{wechat}}</view>
		</view>
		
		<!-- email -->
		<view class="first-view" v-if="role == 1">
			<view class="title-view">email</view>
			<view class="value-view">{{email}}</view>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">通讯地址</view>
			<view class="value-view">{{address}}</view>
		</view>
		
		<!-- 家长姓名 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长姓名</view>
			<view class="value-view">{{informationList.parent_name}}</view>
		</view>
		
		<!-- 家长电话 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长电话</view>
			<view class="value-view">{{informationList.parent_phone}}</view>
		</view>
		
		<!-- 家长QQ -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长QQ</view>
			<view class="value-view">{{informationList.parent_qq}}</view>
		</view>
		
		<!-- 家长微信 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长微信</view>
			<view class="value-view">{{informationList.parent_wechat}}</view>
		</view>
		
		<!-- 家庭地址 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长家庭地址</view>
			<view class="value-view">{{informationList.parent_address}}</view>
		</view>
		
	</view>
</template>

<script>
	import * as config from '@/common/config.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	export default{
		data() {
			return{
				informationList:{},
				account: "",
				name:"",
				sex: "",
				role:"",
				phone:"",
				qq:"",
				wechat:"",
				email:"",
				address:"",
				parent_name:"",
				parent_phone:"",
				parent_qq:"",
				parent_wechat:"",
				parent_address:"",
				src:"../../static/index/three.jpg"
			}
		},
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.account = option.account
			this.role = uni.getStorageSync('role')
			console.log(this.account)      //打印出上页面传递的参数
			console.log(this.role)
			
		},
		
		onShow() {
			this.role = uni.getStorageSync('role')
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据账号查询个人信息详情
			await this.getPersonalDetails()
			
			//查询头像
			await this.getPicture()
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				personalDetails:'address/personalDetails',
				selectUrl:'personalInformation/selectUrl'
			}),
			
			//查询头像
			getPicture(){
				this.selectUrl({"account":this.account}).then(res => {  
						console.log(res)
						if(res.data != null){
							this.src = config.BASIC_API + res.data.url
							console.log(this.src)
						}else{
							this.src = "../../static/index/three.jpg" 
						}
					})
			},
			
			getPersonalDetails() {
				this.personalDetails({"account": this.account}).then(res => {
					console.log(res)
					if (res.code == 1){
						
						console.log(res.data.sex)
						this.sex = res.data.sex
						// if (res.data.sex == 1){
						// 	this.sex = "男"
						// }else{
						// 	this.sex = "女"
						// }
						this.informationList = res.data
						this.name = res.data.name
						this.role = res.data.role
						this.phone = res.data.phone
						this.qq = res.data.qq
						this.wechat = res.data.wechat
						this.email = res.data.email
						this.address = res.data.address
						this.parent_name = res.data.parent_name
						this.parent_phone = res.data.parent_phone
						this.parent_qq = res.data.parent_qq
						this.parent_wechat = res.data.parent_wechat
						this.parent_address = res.data.parent_address
						this.src = res.data.url
						
						if (res.data.name == null){
							this.name = ""
						}
						if (res.data.phone == null){
							this.phone = ""
						}
						if (res.data.qq == null){
							this.qq = ""
						}
						if (res.data.wechat == null){
							this.wechat = ""
						}
						if (res.data.email == null){
							this.email = ""
						}
						if (res.data.address == null){
							this.address = ""
						}
						if (res.data.parent_name == null){
							this.parent_name = ""
						}
						if (res.data.parent_phone == null){
							this.parent_phone = ""
						}
						if (res.data.parent_qq == null){
							this.parent_qq = ""
						}
						if (res.data.parent_wechat == null){
							this.parent_wechat = ""
						}
						if (res.data.parent_address == null){
							this.parent_address = ""
						}
						
					}else{
						uni.showToast({
						    title: res.msg,
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}
				})
			}
		},
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
