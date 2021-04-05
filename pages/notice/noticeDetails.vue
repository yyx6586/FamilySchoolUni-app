<template>
	<view>
		<view v-if="deleteScuess == 0">
			<!-- 发布者 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">发布者</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{name}}</view>
			</view>
			
			<!-- 发布时间 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布时间</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{update_time | formatDate}}</view>
			</view>
			
			<!-- 发布年级与班级 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布对象</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{grade_name + " " + class_name}}</view>
			</view>
			
			<!-- 发布标题 -->
			<view class="title-view" v-if="status == 0">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布标题</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{title}}</view>
			</view>
			
			<!-- 发布标题 -->
			<view v-if="status == 1" style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布标题</view>
				<textarea class="textarea-value" v-model="title" placeholder="请输入通知标题" style="height: 150rpx;"></textarea>
			</view>
			
			<!-- 发布内容 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布内容</view>
				<view v-if="status == 0" style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{information}}</view>
				<textarea class="textarea-value" v-if="status == 1" v-model="information" placeholder="请输入通知内容"></textarea>
			</view>
			
			<!-- 按钮 -->
			<view class="first-view-btn" v-if="status == 0 && role == 1">
				<button class="submit-btn" @click="update">修改</button>
				<button class="reset-btn" @click="deleteNotice">删除</button>
			</view>
			
			<!-- 按钮 -->
			<view class="first-view-btn" v-if="status == 1 && role == 1">
				<button class="submit-btn" @click="back">返回</button>
				<button class="reset-btn" @click="confirm">确认</button>
			</view>
		</view>
		
		<view v-if="deleteScuess == 1"></view>
	</view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import string from '@/utils/string.js'
	
	export default{
		data() {
			return{
				showBadge:"",
				id:"",
				role:"",
				grade_id:"",
				account:"",
				name:"",
				title:"",
				titeBack:"",
				information:"",
				informationBack:"",
				update_time:"",
				grade_name:"",
				class_name:"",
				status:0,
				deleteScuess:0
			}
		},
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.status = 0
			this.deleteScuess = 0
		    this.id = option.id
			this.grade_id = option.grade_id
			this.account = option.account
			this.role = uni.getStorageSync('role')
			console.log(this.id)      //打印出上页面传递的参数
			
		},
		
		onShow() {
			this.role = uni.getStorageSync('role')
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据 id 获取通知信息
			await this.getInformationDetails()
			
			// 根据 grade_id 获取年级与班级名称
			await this.getGradeClassName()
			
			// 根据 account 获取通知发布者信息
			await this.getPersonalDetails()
			
			// // 修改数据库里的 showBadge 属性
			// await this.getUpdateShowBadge()
			
			//关闭加载框
			uni.hideLoading();
			
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
		
		methods:{
			...mapActions({
				informationById:'notice/informationById',
				updateInformationById:'notice/updateInformationById',
				deleteInformation:'notice/deleteInformation',
				gradeClassName:'index/gradeClassName',
				personalDetails:'address/personalDetails',
				updateShowBadge:'notice/updateShowBadge'
			}),
			
			// 根据 id 获取通知信息
			getInformationDetails() {
				this.informationById({"id":this.id}).then(res => {
					console.log(res)
					this.title = res.data.title
					this.titeBack = res.data.title
					this.information = res.data.information
					this.informationBack = res.data.information
					this.update_time = res.data.update_time
					
					if(this.role == 1){
						if(res.data.show_teacher == "1"){
							this.updateShowBadge({
								"id":this.id, 
								"show_teacher":"0",
								"show_student":res.data.show_student
							}).then(res => {
								console.log(res) 
							})
						}
					}
					
					if(this.role == 2){
						if(res.data.show_student == "1"){
							this.updateShowBadge({
								"id":this.id, 
								"show_teacher":res.data.show_teacher,
								"show_student":"0"
							}).then(res => {
								console.log(res) 
							})
						}
					}
				})
			},
			
			// 根据 grade_id 获取年级与班级名称
			getGradeClassName(){
				this.gradeClassName({"gradeclass_id":this.grade_id}).then(res => {
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
				this.title = this.titeBack
				this.information = this.informationBack
				
				this.getInformationDetails()
			},
			
			confirm() {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				// 根据 id 修改通知信息
				this.updateInformationById({
					"id": this.id,
					"title":this.title,
					"information":this.information,
					"show_teacher":"1"
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
				
				//关闭加载框
				uni.hideLoading();
			},
			
			//根据 id 删除通知记录
			deleteNotice(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				this.deleteInformation({
					"id":this.id
				}).then(res => {
					console.log(res)
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					});
					if(res.code == 1){
						this.deleteScuess = 1
					}
				})
				
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
	.title-view{
		height: 100rpx;
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-top: 30rpx;
		padding-left: 20rpx;
		background-color: #FFFFFF;
	}
	.value-view{
		margin-left: 20rpx;
		word-break: break-word;
		/* text-align: center; */
	}
	.first-view-btn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: 50rpx;
	}
	.submit-btn{
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		vertical-align: center;
		border-radius: 5%;
		background-color: #DCDCDC;
	}
	.reset-btn{
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		vertical-align: center;
		border-radius: 5%;
	}
	
	.textarea-value{
		color: #333333;
		font-size: 35rpx;
		margin-top: 15rpx;
		padding: 20rpx;
		resize: none;
		background-color: #F4F5F6;
		width: auto;
	}
</style>
