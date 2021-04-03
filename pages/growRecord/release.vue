<template>
	<view>
		<!-- 请选择发布的图片或者视频 -->
		<view style="background-color: #FFFFFF;padding-bottom: 10rpx;display: flex;flex-direction: row;justify-content:flex-start;">
			<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">请选择</view>
			<!-- <view>
				<pullDown :textList="statusList" @click="getStatusValue"></pullDown>
			</view> -->
		    <radio-group @change="radioChange">
				<label class="radio"><radio value="图片" checked="true" />图片</label>
				<label class="radio"><radio value="视频" />视频</label>
			</radio-group>
		</view>
		
		<!-- 图片 -->
		<view v-if="imgOrVideo == 0">
			<!-- 发布者 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">发布者</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{name}}</view>
			</view>
			
			<!-- 发布对象 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布对象</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{grade_name + " " + class_name}}</view>
			</view>
			
			<view>
				<!-- 发布者时间 -->
				<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
					<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布时间</view>
					<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{imgList[0].update_time | formatDate}}</view>
				</view>
				
				<!-- 图片描述 -->
				<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
					<view style="background-color: #FFFFFF;padding-left: 30rpx;border-bottom: 1rpx solid #F8F8F8;height: 100rpx;line-height: 100rpx;vertical-align: center;width: 150rpx;">图片描述</view>
					<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 250rpx;line-height: 250rpx;vertical-align: center;" v-if="status == 0">{{descriptionImg}}</view>
					<textarea v-if="status == 1 && role == 1" v-model="descriptionImg" placeholder="请输入内容" style="background-color: #FFFFFF;width: 100%;padding-left: 30rpx;padding-top: 15rpx;height:300rpx;border-bottom: 1rpx solid #F8F8F8;"></textarea>
				</view>
				
				<!-- 图片显示 -->
				<view>
					<view v-if="status == 0" style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;">
						<view class="img" v-for="(item, index) in imgList" :key='index'>
								<image style="width: 100%;height: 100%;" :src="item.name"></image>
						</view>
					</view>
					
					<view v-if="status == 1" style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;text-align: center;border-bottom: 1rpx solid #F8F8F8;padding-bottom: 15rpx;">
						<view class="img" v-for="(item, index) in imgList" :key='index' @click="ViewImage(index)">
								<image style="width: 100%;height: 100%;" :src="item.name"></image>
								<view @click.stop="DelImg(index)" style="display: inline;">
									<uni-icons type="closeempty" class="close" size="20"></uni-icons>
								</view>
						</view>
						<view class="camera" @tap="ChooseImage">
							<uni-icons type="camera" size="40"></uni-icons>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 视频 -->
		<view style="margin-top: 50rpx;" v-if="imgOrVideo == 1">
			<!-- 发布者 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">发布者</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{name}}</view>
			</view>
			
			<!-- 发布对象 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布对象</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{grade_name + " " + class_name}}</view>
			</view>
			
			<!-- 发布者时间 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布时间</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{videoList[0].update_time | formatDate}}</view>
			</view>
			
			<!-- 视频描述 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="background-color: #FFFFFF;padding-left: 30rpx;border-bottom: 1rpx solid #F8F8F8;height: 100rpx;line-height: 100rpx;vertical-align: center;width: 150rpx;">视频描述</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 250rpx;line-height: 250rpx;vertical-align: center;" v-if="status == 0">{{descriptionVedio}}</view>
				<textarea v-if="status == 1 && role == 1" v-model="descriptionVedio" placeholder="请输入内容" style="background-color: #FFFFFF;width: 100%;padding-left: 30rpx;padding-top: 15rpx;height:300rpx;border-bottom: 1rpx solid #F8F8F8;"></textarea>
			</view>
			
			<!-- 视频显示 -->
			<view>
				<view v-if="status == 0" style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;margin-top: 20rpx;">
					<view class="img" v-for="(item, index) in videoList" :key='index'>
							<video style="width: 100%;height: 100%;" :src="item.name"></video>
					</view>
				</view>
				
				<view v-if="status == 1 && role == 1" style="margin-top: 20rpx;margin-left: 20rpx;margin-right: 20rpx;text-align: center;border-bottom: 1rpx solid #F8F8F8;padding-bottom: 15rpx;">
					<view class="img" v-for="(item, index) in videoList" :key='index'>
							<video style="width: 100%;height: 100%;" :src="item.name"></video>
							<view @click.stop="DelVideo(index)" style="display: inline;">
								<uni-icons type="closeempty" class="close" size="20"></uni-icons>
							</view>
					</view>
					<view class="camera" @tap="ChooseVideo">
						<uni-icons type="camera" size="40"></uni-icons>
					</view>
				</view>
			</view>
		</view>
		
		<!-- 按钮 -->
		<view class="first-view-btn" v-if="status == 0 && role == 1">
			<button class="submit-btn" @click="update">修改</button>
		</view>
		
		<!-- 按钮 -->
		<view class="first-view-btn" v-if="status == 1 && role == 1">
			<button class="submit-btn" @click="back" style="width: 300rpx; background-color: #F8F8F8;color: #3F536E;">返回</button>
			<button class="reset-btn" @click="confirm">确认</button>
		</view>
	</view>
</template>

<script>
	import pullDown from '@/components/pull-down/pull-down.vue'
	import * as config from '@/common/config.js'
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	
	export default{
		components: {
			pullDown
		},
		
		data() {
			return{
				curPage: 0,     //当前第几条记录
				pageSize: 10,   // 一页多少条记录 图片
				pageSizeVideo: 10,   // 一页多少条记录 视频
				showBadgeImg:"1",   //表示图片  
				showBadgeVideo:"2",   //表示视频 
				status:0,
				token:"",
				role:"",
				account:"",
				gradeclass_id:"",
				grade_name:"",
				class_name:"",
				name:"",
				update_time:"",
				descriptionImg:"",
				descriptionImgBack:"",
				descriptionVedio:"",
				descriptionVedioBack:"",
				imgList:[],
				videoList:[],
				imgName:"",
				videoName:"",
				statusList:["图片","视频"],
				imgOrVideo:0,
				r1:"",
				r2:""
			}
		},
		
		filters: {
		      formatDate: function (value) {
		        let date = new Date(value);
		        let y = date.getFullYear();
		        let MM = date.getMonth() + 1;
		        MM = MM < 10 ? ('0' + MM) : MM;
		        let d = date.getDate();
		        d = d < 10 ? ('0' + d) : d;
		        let h = date.getHours();
		        h = h < 10 ? ('0' + h) : h;
		        let m = date.getMinutes();
		        m = m < 10 ? ('0' + m) : m;
		        let s = date.getSeconds();
		        s = s < 10 ? ('0' + s) : s;
		        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		    }
		},
		
		onLoad(option) {
			this.status = 0
			this.gradeclass_id = option.gradeclass_id
			this.token = uni.getStorageSync('token')
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			console.log(this.gradeclass_id)
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据 gradeclass_id 获取成长记录
			if(this.imgOrVideo == 0){
				await this.getRecordInformationImg()   //图片
			}
			
			if(this.imgOrVideo == 1){
				await this.getRecordInformationVideo()   //视频
			}
			
			// 根据 grade_id 获取年级与班级名称
			await this.getGradeClassName()
			
			// 根据 account 获取成长记录发布者信息 
			await this.getPersonalDetails()
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				saveImg:'growRecord/saveImg',
				recordInformation:'growRecord/recordInformation',
				updateRecord:'growRecord/updateRecord',
				deleteRecord:'growRecord/deleteRecord',
				gradeClassName:'index/gradeClassName',
				personalDetails:'address/personalDetails'
			}),
			
			radioChange(e){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				this.imgOrVideo = "0"
				console.log(e.target.value)
				if(e.target.value == "图片"){
					this.imgOrVideo = "0"
					this.getRecordInformationImg()
				}else{
					this.imgOrVideo = "1"
					this.getRecordInformationVideo()
				}
				//关闭加载框
				uni.hideLoading();
				
			},
			
			getStatusValue(e,i){
				if(e == "图片"){
					this.imgOrVideo = "0"
				}else{
					this.imgOrVideo = "1"
				}
			},
			
			// 根据 gradeclass_id 获取成长记录  图片
			getRecordInformationImg(){
				console.log(this.gradecalss_id)
				this.recordInformation({
					"gradeclass_id":this.gradeclass_id,
					"showBadge":this.showBadgeImg,
					"curPage":this.curPage,
					"pageSize":this.pageSize,
					"status":"0"
				}).then(res => {
					console.log(res)
					if(res.data.length == 0){
						uni.showToast({
						    title: "教师还没有发布图片哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
						uni.navigateTo({
						    url:"../growRecord/index",
						})
					}else{
						for(let i = 0; i < res.data.length; i ++){
							res.data[i].name = config.BASIC_API + res.data[i].name
						}
						this.imgList = res.data
					}
				})
			},
			
			// 根据 gradeclass_id 获取成长记录  视频
			getRecordInformationVideo(){
				console.log(this.gradeclass_id)
				this.recordInformation({ 
					"gradeclass_id":this.gradeclass_id,
					"showBadge":this.showBadgeVideo,
					"curPage":this.curPage,
					"pageSize":this.pageSizeVideo,
					"status":"1"
				}).then(res => {
					console.log(res)
					if(res.data == null){
						uni.showToast({
						    title: "教师还没有发布视频哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}else{
						for(let i = 0; i < res.data.length; i ++){
							res.data[i].name = config.BASIC_API + res.data[i].name
						}
						this.videoList = res.data
					}
				})
			},
			
			// 根据 gradeclass_id 获取年级与班级名称
			getGradeClassName(){
				this.gradeClassName({"gradeclass_id":this.gradeclass_id}).then(res => {
					console.log(res)
					this.grade_name = res.data.grade_name
					this.class_name = res.data.class_name
				})  
			},
			
			// 根据 account 获取通知发布者信息
			getPersonalDetails(){
				this.personalDetails({"account":this.account}).then(res => {
					console.log(res)
					this.name = res.data.name
				})
			},
			
			update(){
				this.status = 1
			},
			
			back() {
				this.status = 0
				this.descriptionImg = this.descriptionImgBack
				this.descriptionVedio = this.descriptionVedioBack
			},
			
			// 根据 gradeclass_id 与 描述 修改成长记录
			confirm() {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				// 根据 gradeclass_id 与 描述 修改成长记录    图片
				this.updateRecord({
					"gradeclass_id": this.gradeclass_id,
					"description":this.descriptionImg,
					"showBadge":"1"
				}).then(res => {
					console.log(res)
					if(res.code == 1){
						this.status = 0
					}
					
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					});
				})
				
				// 根据 gradeclass_id 与 描述 修改成长记录    视频
				this.updateRecord({
					"gradeclass_id": this.gradeclass_id,
					"description":this.descriptionVedio,
					"showBadge":"2"
				}).then(res => {
					console.log(res)
					if(res.code == 1){
						this.status = 0
					}
					
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					});
				})
				
				// 上传图片
				this.imgUpload()
				
				// 上传视频
				this.videoUpload()
				
				//关闭加载框
				uni.hideLoading();
			},
			
			//根据 id 删除成长记录
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
							console.log(this.imgList[index].id)
							this.deleteRecord({         
								"id":this.imgList[index].id
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
					}
				})
			},
			
			//根据 id 删除成长记录
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
							console.log(this.videoList[index].id)
							
							this.deleteRecord({
								"id":this.videoList[index].id
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
					}
				})
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
						count: 7, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album','camera'], //从相册或相机选择
					    success: (chooseImageRes) => {
					        const tempFilePaths = chooseImageRes.tempFilePaths;
							this.imgList.push({"name":tempFilePaths[0]})
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
					    count: 4,
					    sourceType: ['camera', 'album'],
					    success: (res) => { 
							console.log(res.tempFilePath)
							const tempFilePath = res.tempFilePath;
							// this.video = tempFilePath
							this.videoList.push({"name":tempFilePath})
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
						"showBadge":"1"
					}).then(res => {
						console.log(res) 
					})
				}
				//关闭加载框
				uni.hideLoading();
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
						"showBadge":"2"
					}).then(res => {
						console.log(res) 
					})
				}
				
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
	.first-view-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 50rpx;
	}
	.submit-btn{
		width: 100%;
		height: 80rpx;
		color: #FFFFFF;
		line-height: 80rpx;
		vertical-align: center;
		border-radius: 5%;
		background-color: #007AFF;
	}
	.reset-btn{
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		vertical-align: center;
		border-radius: 5%;
	}
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
		background-color: rgba(0, 0, 0, .4);
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
