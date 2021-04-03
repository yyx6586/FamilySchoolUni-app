<template>
	<view>
		<view>
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
			
			<!-- 发布科目 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布科目</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{subject_name}}</view>
			</view>
			
			<!-- 发布知识点 -->
			<view v-if="status == 0" style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 200rpx;line-height: 80rpx;vertical-align: center;">发布知识点</view>
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{title}}</view>
			</view>
			
			<!-- 发布知识点 -->
			<view v-if="status == 1 && role == 1" style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 200rpx;line-height: 80rpx;vertical-align: center;">发布知识点</view>
				<textarea class="textarea-value" v-model="title" placeholder="请输入通知标题" style="height: 150rpx;"></textarea>
			</view>
			
			<!-- 发布内容 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;margin-top: 50rpx;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 150rpx;line-height: 80rpx;vertical-align: center;">发布内容</view>
				<view v-if="status == 0" style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">{{homework}}</view>
				<textarea class="textarea-value" v-if="status == 1 && role == 1" v-model="homework" placeholder="请输入通知内容"></textarea>
			</view>
			
			<!-- 按钮 -->
			<view class="first-view-btn" v-if="status == 0 && role == 1">
				<button class="submit-btn" @click="update">修改</button>
				<button class="reset-btn" @click="deleteHomework">删除</button>
			</view>
			
			<!-- 按钮 -->
			<view class="first-view-btn" v-if="status == 1 && role == 1">
				<button class="submit-btn" @click="back">返回</button>
				<button class="reset-btn" @click="confirm">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	export default{
		data() {
			return{
				showBadge:"",
				status:0,
				role:"",
				id:"",
				account:"",
				gradeclass_id:"",
				name:"",
				grade_name:"",
				class_name:"",
				update_time:"",
				title:"",
				titleBack:"",
				subject_name:"",
				homework:"",
				homeworkBack:""
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
		
		onLoad(option){                               //opthin为object类型，会序列化上页面传递的参数
		    this.id = option.id
			this.account = option.account
			this.showBadge = option.showBadge
			this.gradeclass_id = option.gradeclass_id
			this.role = uni.getStorageSync('role')
			console.log(this.id)      //打印出上页面传递的参数
			console.log(this.account)
			console.log(this.gradeclass_id)
			console.log(this.showBadge)
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据 id 获取通知信息
			await this.getHomeworkDetails()
			
			// 根据 grade_id 获取年级与班级名称
			await this.getGradeClassName()
			
			// 根据 account 获取通知发布者信息
			await this.getPersonalDetails()
			
			// 修改数据库里的 showBadge 属性
			await this.getUpdateShowBadge()
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				homeworkById:'homework/homeworkById',
				deletehomework:'homework/deletehomework',
				updatehomeworkById:'homework/updatehomeworkById',
				gradeClassName:'index/gradeClassName',
				personalDetails:'address/personalDetails',
				updateShowBadge:'homework/updateShowBadge'
			}),
			
			
			// 修改数据库里的 showBadge 属性
			getUpdateShowBadge(){
				if(this.showBadge == "true"){
					this.showBadge = "false"
					
					this.updateShowBadge({
						"id":this.id,
						"showBadge":this.showBadge
					}).then(res => {
						console.log(res)
					})
				}
			},
			
			// 根据 id 获取作业信息
			getHomeworkDetails(){
				this.homeworkById({"id":this.id}).then(res => {
					console.log(res)
					this.update_time = res.data.update_time
					this.title = res.data.title
					this.titleBack = res.data.title
					this.subject_name = res.data.subject_name 
					this.homework = res.data.homework
					this.homeworkBack = res.data.homework
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
				this.title = this.titeBack
				this.homework = this.homeworkBack
				
				this.getHomeworkDetails()
			},
			
			confirm() {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				// 根据 id 修改作业信息
				this.updatehomeworkById({
					"id": this.id,
					"title":this.title,
					"homework":this.homework,
					"showBadge":"true"
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
			
			//根据 id 删除作业记录
			deleteHomework(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				this.deletehomework({
					"id":this.id
				}).then(res => {
					console.log(res)
					uni.showToast({
					    title: res.msg,
						icon:'none',
						mask:true,
					    duration: 2000
					});
				})
				
				uni.navigateTo({
					url:"./release"
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
