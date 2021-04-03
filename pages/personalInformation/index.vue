<template>
	<view>
		<!-- 头像 -->
		<view class="img-first-view">
			<image class="img" :src="src"></image>
			<view class="img-btn" v-if="status == 0" @click="updatePhone">更换头像</view>
			<view class="img-btn" v-if="status == 1" @click="confirm">确定</view>
		</view>
		
		<!-- 工号或学号 -->
		<view class="first-view">
			<view v-if="role == 1" class="title-view">工号</view>
			<view v-if="role == 2" class="title-view">学号</view>
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
			<pullDown class="value-view" :textList="sexList" @click="getSexValue"></pullDown>
		</view>
		
		<!-- 电话 -->
		<view class="first-view">
			<view class="title-view">电话</view>
			<input class="value-view" v-model="phone" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view> 
		
		<!-- QQ -->
		<view class="first-view">
			<view class="title-view">QQ</view>
			<input class="value-view" v-model="QQ" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 微信 -->
		<view class="first-view">
			<view class="title-view">微信</view>
			<input class="value-view" v-model="wechat" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- email -->
		<view class="first-view" v-if="role == 1">
			<view class="title-view">email</view>
			<input class="value-view" v-model="email" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 通讯地址 -->
		<view class="first-view">
			<view class="title-view">通讯地址</view>
			<input class="value-view" v-model="address" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长姓名 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长姓名</view>
			<input class="value-view" v-model="parentName" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长电话 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长电话</view>
			<input class="value-view" v-model="parenPhone" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长QQ -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长QQ</view>
			<input class="value-view" v-model="parentQQ" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家长微信 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长微信</view>
			<input class="value-view" v-model="parentWechat" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 家庭地址 -->
		<view class="first-view" v-if="role == 2">
			<view class="title-view">家长家庭地址</view>
			<input class="value-view" v-model="parentAddress" type="text" placeholder="请输入" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 保存按钮 -->
		<view class="save" @click="save">保存</view>
	</view>
</template>

<script>
	import * as config from '@/common/config.js'
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import pullDown from '@/components/pull-down/pull-down.vue';
	
	export default{
		components: {
			pullDown
		},
		data() {
			return {
				token:"",
				status:0,
				role:"",  // 1为教师  2为家长
				account:"",
				name:"", 
				sex:"1",
				phone:"",
				QQ:"",
				wechat:"",
				email:"",
				address:"",
				parentName:"",
				parenPhone:"",
				parentQQ:"",
				parentWechat:"",
				parentAddress:"",
				sexList:["男","女"],
				src:"../../static/index/three.jpg",
				url:""
			}
		},
		onLoad() {
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			this.name = uni.getStorageSync('name')
			this.token = uni.getStorageSync('token')
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
			}),
				
			// 根据账号查询个人信息详情
			await this.getPersonalDetails()	
			
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				informationFamily:'personalInformation/informationFamily',
				informationSchool:'personalInformation/informationSchool',
				insertUrl:'personalInformation/insertUrl',
				selectUrl:'personalInformation/selectUrl',
				updateUrl:'personalInformation/updateUrl',
				personalDetails:'address/personalDetails',
			}),
			
			//获取个人信息
			getPersonalDetails() {
				this.personalDetails({"account": this.account}).then(res => {
					console.log(res)
					if(res.data != null){
						if (res.code == 1){
							
							if (res.data.sex == 1){
								this.sex = "男"
							}else{
								this.sex = "女"
							}
							
							this.name = res.data.name
							this.role = res.data.role
							this.phone = res.data.phone
							this.QQ = res.data.QQ
							this.wechat = res.data.wechat
							this.email = res.data.email
							this.address = res.data.address
							this.parentName = res.data.parent_name
							this.parenPhone = res.data.parent_phone
							this.parentQQ = res.data.parent_QQ
							this.parentWechat = res.data.parent_wechat
							this.parentAddress = res.data.parent_address
							this.src = res.data.url
							
							if (res.data.name == null){
								this.name = ""
							}
							if (res.data.phone == null){
								this.phone = ""
							}
							if (res.data.QQ == null){
								this.QQ = ""
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
							if (res.data.parentName == null){
								this.parentName = ""
							}
							if (res.data.parentPhone == null){
								this.parentPhone = ""
							}
							if (res.data.parentQQ == null){
								this.parentQQ = ""
							}
							if (res.data.parentWechat == null){
								this.parentWechat = ""
							}
							if (res.data.parentAddress == null){
								this.parentAddress = ""
							}
							
						}else{
							uni.showToast({
							    title: res.msg,
								icon:'none',
								mask:true,
							    duration: 2000
							});
						}
					}
				})
			},
			
			getSexValue(e,i){
				if (e == "男"){
					this.sex = "1"
				}else{
					this.sex = "2"
				}
			},
			
			save(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				if(string.isNullAndEmpty(this.name)){
					uni.showToast({
					    title: '姓名不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.sex)){
					uni.showToast({
					    title: '性别不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if (this.role == 1){
					if(string.isNullAndEmpty(this.phone)){
						uni.showToast({
						    title: '电话不能为空！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					
					if(string.isNullAndEmpty(this.QQ)){
						uni.showToast({
						    title: 'QQ不能为空！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					
					if(string.isNullAndEmpty(this.wechat)){
						uni.showToast({
						    title: '微信不能为空！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					console.log(this.address)
					
					this.informationSchool({
						"account":this.account,
						"name":this.name,
						"sex":this.sex,
						"phone":this.phone,
						"QQ":this.QQ,
						"wechat":this.wechat,
						"address":this.address,
						"email":this.email
					}).then(res => {
						uni.showToast({
						    title: res.msg,
							icon:'none',
							mask:true,
						    duration: 2000
						});
					})
				}else{
					if(string.isNullAndEmpty(this.parentName)){
						uni.showToast({
						    title: '家长姓名不能为空！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					
					if(string.isNullAndEmpty(this.parentAddress)){
						uni.showToast({
						    title: '家长家庭地址不能为空！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					this.informationFamily({
						"account":this.account,
						"studentName":this.name,
						"studentSex":this.sex,
						"phone":this.phone,
						"QQ":this.QQ,
						"wechat":this.wechat,
						"address":this.address,
						"parentName":this.parentName,
						"parentPhone":this.parentPhone,
						"parentQQ":this.parentQQ,
						"parentWechat":this.parentWechat,
						"parentAddress":this.parentAddress
					}).then(res => {
						uni.showToast({
						    title: res.msg,
							icon:'none',
							mask:true,
						    duration: 2000
						});
					})
				}
				
				//关闭加载框
				uni.hideLoading();
			},
			
			
			// 查询头像
			getUrl(){
				this.selectUrl({"account":this.account}).then(res => {
					console.log(res)
					if(res.data == null){
						// 添加头像
						this.getInsertUrl()
					}else{
						// 修改头像
						this.getUpdateUrl()
					}
					
					this.selectUrl({"account":this.account}).then(res => {
						console.log(res)
						if(res.data != null){
							this.src = config.BASIC_API + res.data.url
							console.log(this.src)
						}
					})
				})
			},
			
			//更换头像
			updatePhone() {
				uni.showLoading({
				    title: '加载中...'
				})
				
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册或相机选择
				    success: (chooseImageRes) => {
				        const tempFilePaths = chooseImageRes.tempFilePaths;
						this.src = tempFilePaths[0]
				        uni.uploadFile({
				            url: config.IMGUPLOAD_API, //仅为示例，非真实的接口地址
				            filePath: tempFilePaths[0],
				            name: 'file',
							header: {
								"Content-Type": "multipart/form-data",
							    token: this.token
							},
							success: (res) => {
							    // console.log(res.data);
								this.url = res.data
								console.log(this.url)
								
								this.status = 1
							}
				        })
					} 
				})
				//关闭加载框
				uni.hideLoading();
			},
			
			// 添加头像
			getInsertUrl(){
				this.insertUrl({
					"account":this.account,
					"url":this.url
				}).then(res => {
					console.log(res)
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					});
				})
			},
			
			// 修改头像
			getUpdateUrl(){
				this.updateUrl({
					"account":this.account,
					"url":this.url
				}).then(res => {
					console.log(res)
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					}); 
				})
			},
			
			// 确定上传头像
			confirm(){
				console.log(this.url)
				uni.showLoading({
				    title: '加载中...'
				})
				
				this.getUrl()
				
				this.status = 0
				
				//关闭加载框
				uni.hideLoading();
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
