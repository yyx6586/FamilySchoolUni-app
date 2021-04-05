<template>
	<view>
		<view v-if="deleteScuess == 0">
			<!-- 考试科目 -->
			<view style="padding-left: 20rpx;margin-top: 30rpx;border-bottom: 1rpx solid #EAEAEA;">
				<view style="margin-bottom: 10rpx;">请选择考试科目</view>
				<picker @change="bindSubjectChange" :value="indexSubject" :range="subjectList" style="margin-bottom: 10rpx;">
				    <view class="uni-input">{{subjectList[indexSubject]}}
					    <image src="../../static/index/xiala.png" style="width: 35rpx;height: 30rpx;margin-left: 10rpx;"></image>
					</view>
				</picker>
			</view>
			
			<!-- 考试名称 -->
			<view style="padding-left: 20rpx;margin-top: 60rpx;border-bottom: 1rpx solid #EAEAEA;">
				<view style="margin-bottom: 10rpx;">请选择考试名称</view>
				<picker @change="bindNameChange" :value="indexName" :range="scoreNameList" style="margin-bottom: 10rpx;">
				    <view class="uni-input">{{scoreNameList[indexName]}}
					    <image src="../../static/index/xiala.png" style="width: 35rpx;height: 30rpx;margin-left: 10rpx;"></image>
					</view>
				</picker>
			</view>
			
			<!-- 发布年级与班级 -->
			<view class="first-view">
				<view class="title-view">班级</view>
				<view class="value-view">{{grade_name + " " + class_name}}</view>
			</view>
			
			
			
			<view v-if="status == 1 && role == 1">
				
				<!-- 考试时间 -->
				<view class="first-view" style="margin-left: 20rpx;">
					<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
						<view style="margin-right: 40rpx;">考试时间</view>
						<!-- 年 -->
						<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:flex-start;">
							<input type="text" v-model="time[0]" placeholder="如:2021" placeholder-style="font-size:35rpx" style="width: 120rpx;"/>
							<view>年</view> 
						</view>
						
						<!-- 月 -->
						<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
							<input type="text" v-model="time[1]" placeholder="如:01" placeholder-style="font-size:35rpx" style="width: 80rpx;margin-left: 10rpx;"/>
							<view>月</view>
						</view>
						
						<!-- 日 -->
						<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
							<input type="text" v-model="time[2]" placeholder="如:01" placeholder-style="font-size:35rpx" style="width: 80rpx;margin-left: 10rpx;"/>
							<view>日</view>
						</view>
					</view>
				</view>
				
				<!-- 考生 -->
				<view>
					<view style="padding-left: 20rpx;margin-top: 60rpx;background-color: #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">学生分数</view>
					<view class="first-view" v-for="(item,index) in scoreList" :key="index">
						<view class="title-view">{{item.student_account}}</view>
						<input class="value-view" v-model="item.score" type="text" placeholder="请输入分数" placeholder-style="font-size:35rpx"/>
					</view>
				</view>
				
				<!-- 按钮 -->
				<view class="first-view-btn">
					<button class="submit-btn" @click="back">返回</button>
					<button class="reset-btn" @click="confirm">确认</button>
				</view>
			</view>
			
			<view v-if="status == 0">
				
				<!-- 考试时间 -->
				<view class="first-view">
					<view class="title-view">考试时间</view>
					<view class="value-view">{{scoreList[0].score_time}}</view>
				</view>
				
				<!-- 考生 -->
				<view>
					<view style="padding-left: 20rpx;margin-top: 60rpx;background-color: #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">学生分数</view>
					<view class="first-view" v-for="(item,index) in scoreList" :key="index">
						<view class="title-view">{{item.student_account}}</view>
						<view class="value-view">{{item.score}}</view>
					</view>
				</view>
			</view>
			
			<view v-if="status == 0 && role == 1">
				<!-- 按钮 -->
				<view class="first-view-btn">
					<button class="submit-btn" @click="update">修改</button>
					<button class="reset-btn" @click="deleteHomework">删除</button> 
				</view>
			</view>
		</view>
		<view v-if="deleteScuess == 1"></view>
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import pullDown from '@/components/pull-down/pull-down.vue'
	export default{
		components: {
			pullDown
		},
		
		data(){
			return{
				status:0,
				gradeclass_id:"",
				role:"",
				account:"",
				grade_name:"",
				class_name:"",
				studentList:[],
				accountList:"",
				subjectList:["语文","数学","英语","科学","美术","音乐","体育"],
				subject:"语文",  
				scoreNameList:[],
				score_name:"",
				scoreList:[],
				time:[],
				score_subject:"",
				allScore:"",
				studentAccount:"",
				deleteScuess:0,
				indexSubject:0,
				indexName:0
			}
		},
		
		onLoad(option) {
			this.status = 0
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			this.gradeclass_id = option.gradeclass_id
			console.log(this.gradeclass_id)
			
			console.log(this.subjectList)
		},
		
		onShow() {
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据班级与年级 gradeclass_id 查询该班级学生的人数
			await this.getPeople() 
			
			// 根据 grade_id 获取年级与班级名称
			await this.getGradeClassName()
			
			// 根据班级与年级 gradeclass_id 与科目 查询该班级该科目近五次考试的考试名称
			await this.getSeclectScoreName() 
			
			// // 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
			// await this.getSelectStudentScore()
			
			console.log(this.subjectList)
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				gradeClassName:'index/gradeClassName',
				selectPeople:'address/selectPeople',
				seclectScoreName:'grade/seclectScoreName',
				selectStudentScore:'grade/selectStudentScore',
				deleteScore:'grade/deleteScore',
				updateScore:'grade/updateScore'
			}),
			
			
			bindSubjectChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.indexSubject = e.target.value
				this.subject = this.subjectList[e.target.value]
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
				this.getSelectStudentScore()
			},
			
			bindNameChange: function(e) {
			    console.log('picker发送选择改变，携带值为', e.target.value)
			    this.indexName = e.target.value 
				this.score_name = this.scoreNameList[e.target.value]
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
				this.getSelectStudentScore()
			},
					
			//获取科目名称
			getSubjectValue(e,i){
				this.subject = e
				console.log(this.subject)
				
				// 根据班级与年级 gradeclass_id 与科目 查询该班级该科目近五次考试的考试名称
				this.getSeclectScoreName()
			},
			
			//获取考试名称
			getScoreName(e,i){
				this.score_name = e
				
				console.log(this.score_name)
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
				this.getSelectStudentScore()
			},
			
			// 根据班级与年级 gradeclass_id 与科目 查询该班级该科目近五次考试的考试名称
			getSeclectScoreName(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.subject)){
					uni.showToast({
					    title: "科目名称不能为空，请选择科目!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.seclectScoreName({
					"gradeclass_id":this.gradeclass_id,
					"score_subject":this.subject
				}).then(res => {
					console.log(res)
					
					if(res.data == null){
						uni.showToast({
						    title: "还没有教师发布成绩哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}else{
						const index = res.data.length - 1
						this.score_name = res.data[index].score_name
						this.score_nameBack = this.score_name
						if(res.data.length > 5){
							for(let i = index; i > (index - 5); i --){
								this.scoreNameList.push(res.data[i].score_name)
							}
						}else{
							for(let i = index; i > -1; i --){
								this.scoreNameList.push(res.data[i].score_name)
							}
						}
						console.log(this.scoreNameList)
						console.log(this.score_name)
						this.getSelectStudentScore()
					}
				})
				
				//关闭加载框
				uni.hideLoading();
			},
			
			// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
			getSelectStudentScore(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.subject)){
					uni.showToast({
					    title: "科目名称不能为空，请选择科目!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.score_name)){
					uni.showToast({
					    title: "考试名称不能为空，请选择考试名称!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.selectStudentScore({
					"gradeclass_id":this.gradeclass_id,
					"score_subject":this.subject,
					"score_name":this.score_name 
				}).then(res => {
					console.log(res)
					this.scoreList = res.data
					this.scoreListBack = this.scoreList
					
					this.time = res.data[0].score_time.split("-");
					this.timeBack = this.time,
					this.score_subject = res.data[0].score_subject
					
					console.log(this.time) 
					console.log(this.score_subject)
					
					this.studentAccount = res.data[0].student_account
					for(let i = 1; i < res.data.length; i ++){
						this.studentAccount = this.studentAccount + "," +  res.data[i].student_account
					}
					
					console.log(this.studentAccount)
				})
				
				//关闭加载框
				uni.hideLoading();
			},
			
			// 根据班级与年级 gradeclass_id 、科目、考试名称 删除该班级所有学生的考试成绩
			getDeleteScore(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.subject)){
					uni.showToast({
					    title: "科目名称不能为空，请选择科目!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.score_name)){
					uni.showToast({
					    title: "考试名称不能为空，请选择考试名称!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.deleteScore({
					"gradeclass_id":this.gradeclass_id,
					"score_subject":this.subject,
					"score_name":this.score_name
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
			},
			
			// 根据班级与年级 gradeclass_id 、科目、考试名称 修改该班级所有学生的考试信息
			getUpdateScore(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.subject)){
					uni.showToast({
					    title: "科目名称不能为空，请选择科目!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				if(string.isNullAndEmpty(this.score_name)){
					uni.showToast({
					    title: "考试名称不能为空，请选择考试名称!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.allScore = this.scoreList[0].score
				
				for(let i = 1; i < this.scoreList.length; i ++) {
					this.allScore = this.allScore + "," + this.scoreList[i].score
				}
				console.log(this.allScore)
				
				const mm = this.time[0] + "-" + this.time[1] + "-" + this.time[2]
				console.log(mm)
				
				this.updateScore({
					"student_account": this.studentAccount,
					"gradeclass_id": this.gradeclass_id,
					"score_name": this.score_name,
					"score_subject": this.subject,
					"score_time":mm,
					 "score":this.allScore
				}).then(res => {
					console.log(res)
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
			
			// 根据 gradeclass_id 获取年级与班级名称
			getGradeClassName(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				this.gradeClassName({"gradeclass_id":this.gradeclass_id}).then(res => {
					console.log(res)
					this.grade_name = res.data.grade_name
					this.class_name = res.data.class_name
				})  
				//关闭加载框
				uni.hideLoading();
			},
			
			//根据班级与年级 gradeclass_id 查询该班级学生的人数
			getPeople(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: "获取信息错误,请退出重新进入!",
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.selectPeople({"grade_id":this.gradeclass_id}).then(res => {
					console.log(res)
					if(res.data != null){
						for(let i = 0; i < res.data.length; i ++){
							if(res.data[i].role == 2){
								this.studentList.push(res.data[i])
							}
							console.log(this.studentList)
						}
						
						this.accountList = res.data[0].id
						for(let i = 1; i < res.data.length; i ++){
							this.accountList = this.accountList + "," + res.data[i].id
						}
						console.log(this.accountList)
					}
				})
				//关闭加载框
				uni.hideLoading();
			},
			
			//修改
			update(){
				this.status = 1
			},
			
			//返回
			back() {
				this.status = 0
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
				this.getSelectStudentScore()
				
			},
			
			//确认
			confirm() {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 修改该班级所有学生的考试信息
				this.getUpdateScore()
				
				this.status = 0;
				//关闭加载框
				uni.hideLoading();
			},
			
			//删除
			deleteHomework(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				// 根据班级与年级 gradeclass_id 、科目、考试名称 删除该班级所有学生的考试成绩
				this.getDeleteScore()
				
				//关闭加载框
				uni.hideLoading();
			}
		}
	}
</script>

<style>
	.first-view{
		display: flex;
		flex-direction: row;
		justify-content:flex-start;
		align-items:center;
		margin-top: 60rpx;
		background-color: #FFFFFF;
		border-bottom: 1rpx solid #EAEAEA;
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
		margin-bottom: 10rpx;
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
