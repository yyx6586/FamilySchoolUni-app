<template>
	<view>
		<!-- 请选择发布的图片或者视频 -->
		<view style="background-color: #FFFFFF;padding-bottom: 10rpx;display: flex;flex-direction: row;justify-content:flex-start;height: 80rpx;line-height: 80rpx;vertical-align: cenetr;">
			<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">请选择</view>
		    <radio-group @change="radioChange">
				<label class="radio"><radio value="图片" checked="true"/>图片</label>
				<label class="radio"><radio value="视频" />视频</label>
			</radio-group>
		</view>
		
		<!-- 上传图片 -->
		<view v-if="imgOrVideo == 0">
			<!-- 上传时间 -->
			<view style="margin-left: 30rpx;display: flex;flex-direction: row;justify-content:flex-start;height: 80rpx;line-height: 80rpx;vertical-align: cenetr;border-bottom: 1rpx solid #F8F8F8;margin-top: 10rpx;">
			    <view style="margin-right: 15rpx;">发布时间</view>
			    <view>{{release_time}}</view>
			</view>
			
			<!-- 图片描述 -->
			<view>
				<view style="background-color: #FFFFFF;padding-left: 30rpx;border-bottom: 1rpx solid #F8F8F8;height: 100rpx;line-height: 100rpx;vertical-align: center;">添加图片描述</view>
				<textarea v-model="description" placeholder="请输入内容" style="background-color: #FFFFFF;width: 100%;padding-left: 30rpx;padding-top: 15rpx;height:300rpx;border-bottom: 1rpx solid #F8F8F8;"></textarea>
			</view>
			<view style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;text-align: center;border-bottom: 1rpx solid #F8F8F8;padding-bottom: 15rpx;">
				<view class="img" v-for="(item, index) in imgList" :key='index' @click="ViewImage(index)">
						<image style="width: 100%;height: 100%;" :src="item.url"></image>
						<view @click.stop="DelImg(index)" style="display: inline;">
							<uni-icons type="closeempty" class="close" size="20"></uni-icons>
						</view>
				</view>
				<view class="camera" @tap="ChooseImage">
					<uni-icons type="camera" size="40"></uni-icons>
				</view>
			</view>
			<view @click="imgUpload" style="height: 80rpx; background-color: #01AAED;width: 300rpx;text-align: center;line-height: 80rpx;vertical-align: center;border-radius: 7%;color: #FFFFFF;">确定上传图片</view>
		</view>
		
		<!-- 上传视频 -->
		<view v-if="imgOrVideo == 1" style="margin-top: 50rpx;">
			<!-- 上传时间 -->
			<view style="margin-left: 30rpx;display: flex;flex-direction: row;justify-content:flex-start;height: 80rpx;line-height: 80rpx;vertical-align: cenetr;border-bottom: 1rpx solid #F8F8F8;margin-top: 10rpx;">
			    <view style="margin-right: 15rpx;">发布时间</view>
			    <view>{{release_time}}</view>
			</view>
			
			<!-- 视频描述 -->
			<view>
				<view style="background-color: #FFFFFF;padding-left: 30rpx;border-bottom: 1rpx solid #F8F8F8;height: 100rpx;line-height: 100rpx;vertical-align: center;">添加视频描述</view>
				<textarea v-model="descriptionVideo" placeholder="请输入内容" style="background-color: #FFFFFF;width: 100%;padding-left: 30rpx;padding-top: 15rpx;height:300rpx;border-bottom: 1rpx solid #F8F8F8;"></textarea>
			</view>
			<view style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;text-align: center;border-bottom: 1rpx solid #F8F8F8;padding-bottom: 15rpx;">
				<view class="img" style="background-color: #F8F8F8;" v-for="(item, index) in videoList" :key='index'>
						<video style="width: 80%;height: 80%;margin-top: 20rpx;margin-right: 20rpx;" :src="item.url"></video>
						<view @click.stop="DelVideo(index)" style="display: inline;">
							<uni-icons type="closeempty" class="close" size="20"></uni-icons>
						</view>
				</view>
				<view class="camera" @tap="ChooseVideo">
					<uni-icons type="camera" size="40"></uni-icons>
				</view>
			</view>
			<view @click="videoUpload" style="height: 80rpx; background-color: #01AAED;width: 300rpx;text-align: center;line-height: 80rpx;vertical-align: center;border-radius: 7%;color: #FFFFFF;">确定上传视频</view>
		</view>
		
		<!-- 按钮 -->
		<view @click="goToRelease" style="margin-top: 50rpx; height: 80rpx;width: 100%;background-color: #F5F7FA;line-height: 80rpx; text-align: center;vertical-align: center;">已发布图片或视频</view>
	</view>
</template>

<script>
	import * as config from '@/common/config.js'
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	
	export default{
		data(){
			return{
				token:"",
				account:"",
				gradeclass_id:"",
				description:"",
				imgList:[],
				imgName:"",
				descriptionVideo:"",
				video:"",
				videoList:[],
				videoName:"",
				imgOrVideo:"0",
				showBadge:"",    // 0 表示未读  1 表示已读
				release_time:""
			}
		},
		
		onLoad(option) {
			this.token = uni.getStorageSync('token')
			this.account = uni.getStorageSync('account')
			this.gradeclass_id = option.gradeclass_id
			console.log(this.gradeclass_id)
		},
		
		onShow() {
			this.token = uni.getStorageSync('token')
			this.account = uni.getStorageSync('account')
			
			this.release_time = this.formatDateTime(new Date().getTime())
			console.log(this.release_time)
		},
		
		methods:{
			...mapActions({
				saveImg:'growRecord/saveImg'
			}),
			
			// 将时间戳转化成时间
			formatDateTime(inputTime) { //时间戳 转 YY-mm-dd HH:ii:ss 
				var date = new Date(inputTime);
				var y = date.getFullYear();
				var m = date.getMonth() + 1;
				m = m < 10 ? ('0' + m) : m;
				var d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				var h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				var minute = date.getMinutes();
				var second = date.getSeconds();
				minute = minute < 10 ? ('0' + minute) : minute;
				second = second < 10 ? ('0' + second) : second;
				return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		    },
			
			radioChange(e){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				if(e.target.value == "图片"){
					this.imgOrVideo = "0"
				}else{
					this.imgOrVideo = "1"
				}
				//关闭加载框
				uni.hideLoading();
				
			},
			
			// 选择图片
			ChooseImage(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				if (this.imgList.length > 7){
					uni.showToast({
					    title: '最多上传8张图片！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
				}else{
					uni.chooseImage({
						count: 1, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册或相机选择
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
							this.imgList.push({"url":tempFilePaths[0]})
					        uni.uploadFile({
					            url: config.IMGUPLOAD_API, //仅为示例，非真实的接口地址
					            filePath: tempFilePaths[0],
					            name: 'file',
								header: {
									"Content-Type": "multipart/form-data",
								    token: this.token
								},
								success: (res) => {
								    console.log(res.data);
									 if(this.imgName == ""){
										this.imgName = res.data
									 }else{
										 this.imgName = this.imgName + "," + res.data
									 }
									console.log(this.imgName)
								}
					        })
						} 
					})
				}
				//关闭加载框
				uni.hideLoading();
			},
			
			// 删除图片
			DelImg(index) {
				uni.showModal({
					title: '提示',
					content: '确定要删除照片吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						uni.showLoading({
						    title: '加载中...'
						})
						
						if(res.confirm) {
							this.imgList.splice(index, 1)
							console.log(this.imgList)
						}
						
						//关闭加载框
						uni.hideLoading();
					}
				})
			},
			
			// 确定上传图片
			imgUpload(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				if(this.imgName == null || this.imgName == undefined || this.imgName == ""){
					uni.showToast({
					    title: '上传图片不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
				}else{
					if(string.isNullAndEmpty(this.account)){
						uni.showToast({
						    title: '上传图片失败，请退出重新登录！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					
					if(string.isNullAndEmpty(this.gradeclass_id)){
						uni.showToast({
						    title: '上传图片失败，请退出重新登录！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					this.saveImg({
						"account":this.account,
						"gradeclass_id":this.gradeclass_id,
						"description":this.description,
						"name":this.imgName,
						"show_teacher":"1",
						"show_student":"1",
						"status":"0",
						"release_time":this.release_time
					}).then(res => {
						console.log(res) 
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
			
			// 选择视频
			ChooseVideo(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				if(this.videoList.length > 4){
					uni.showToast({
					    title: '最多上传4个视频！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
				}else{
					uni.chooseVideo({
					    count: 1,
					    sourceType: ['camera', 'album'],
					    success: (res) => { 
							console.log(res.tempFilePath)
							const tempFilePath = res.tempFilePath;
							// this.video = tempFilePath
							this.videoList.push({"url":tempFilePath})
							uni.uploadFile({
							    url: config.IMGUPLOAD_API, //仅为示例，非真实的接口地址
							    filePath: res.tempFilePath,
							    name: 'file',
								header: {
									"Content-Type": "multipart/form-data",
								    token: this.token 
								},
								success: (res) => {
								    console.log(res.data);
									 if(this.videoName == ""){
										this.videoName = res.data
									 }else{
										 this.videoName = this.videoName + "," + res.data
									 }
									console.log(this.videoName)
								}
							})
					    }
					});
				}
				//关闭加载框
				uni.hideLoading();
			},
			
			// 删除视频
			DelVideo(index){
				uni.showModal({
					title: '提示',
					content: '确定要删除视频吗？',
					cancelText: '取消',
					confirmText: '确定',
					success: res => {
						uni.showLoading({
						    title: '加载中...'
						})
						
						if(res.confirm) {
							// this.video = ""
							this.videoList.splice(index, 1)
							console.log(this.videoList)
						}
						
						//关闭加载框
						uni.hideLoading();
					}
				})
			},
			
			// 上传视频
			videoUpload(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				if(this.videoName == null || this.videoName == undefined || this.videoName == ""){
					uni.showToast({
					    title: '上传视频不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
				}else{
					if(string.isNullAndEmpty(this.account)){
						uni.showToast({
						    title: '上传视频失败，请退出重新登录！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					
					if(string.isNullAndEmpty(this.gradeclass_id)){
						uni.showToast({
						    title: '上传视频失败，请退出重新登录！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
					this.saveImg({
						"account":this.account,
						"gradeclass_id":this.gradeclass_id,
						"description":this.descriptionVideo,
						"name":this.videoName,
						"show_teacher":"1",
						"show_student":"1",
						"status":"1",
						"release_time":this.release_time
					}).then(res => {
						console.log(res) 
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
			
			goToRelease(){
				uni.showLoading({
				    title: '加载中...'
				})
				
				uni.navigateTo({
				    url:"../growRecord/releaseList?gradeclass_id=" + this.gradeclass_id,
				})
				
				//关闭加载框
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	/* page{
		background-color: #F5F7FA;
	} */
	/* 
		宽高自行调节
		因为锁定了图片的宽高所以上传的图片展示在页面上可能会变形，这个希望大神来个可行方案
	*/
	.img {
			position: relative;
			display: inline-block;
			width: 300rpx;
			height: 300rpx;
			vertical-align: top;
			margin-right: 20rpx;
			margin-bottom: 20rpx;
			text-align: center;
		}
	.close {
		position: absolute;
		right: 0;
		background-color: #fff;
		opacity: 0.5;
		color: #fff;
	}
	.camera {
		display: inline-block;
		width: 166rpx;
		height: 166rpx;
		text-align: center;
		line-height: 166rpx;
		font-size: 46rpx;
		border: 1rpx dotted #8C9697;
		color: #8C9697;
		margin-bottom: 10rpx;
	}
</style>
