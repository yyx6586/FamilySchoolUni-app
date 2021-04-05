<template>
	<view>
		
		<!-- 考试名称 -->
		<view class="first-view" style="margin-top: 30rpx;">
			<view class="title-view">考试名称</view>
			<input class="value-view" v-model="score_name" type="text" placeholder="如:第一次月考" placeholder-style="font-size:35rpx"/>
		</view>
		
		<!-- 考试时间 -->
		<view class="first-view">
			<view class="title-view">考试时间</view>
			<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
				
				<!-- 年 -->
				<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:flex-start;">
					<input type="text" v-model="year" placeholder="如:2021" placeholder-style="font-size:35rpx" style="width: 120rpx;"/>
					<view>年</view> 
				</view>
				
				<!-- 月 -->
				<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
					<input type="text" v-model="month" placeholder="如:01" placeholder-style="font-size:35rpx" style="width: 80rpx;margin-left: 10rpx;"/>
					<view>月</view>
				</view>
				
				<!-- 日 -->
				<view style="display: flex; flex-direction: row; justify-content:flex-start; align-items:center;">
					<input type="text" v-model="day" placeholder="如:01" placeholder-style="font-size:35rpx" style="width: 80rpx;margin-left: 10rpx;"/>
					<view>日</view>
				</view>
			</view>
		</view>
		
		<!-- 考试科目 -->
		<view class="first-view">
			<view class="title-view">考试科目</view>
			<pullDown class="value-view" :textList="subjectList" @click="getSubjectValue"></pullDown>
		</view>
		
		<!-- 考生 -->
		<view>
			<view style="padding-left: 20rpx;margin-top: 60rpx;background-color: #F5F5F5;height: 80rpx;line-height: 80rpx;vertical-align: center;">学生分数</view>
			<view class="first-view" v-for="(item,index) in studentList" :key="index">
				<view class="title-view">{{item.id}}</view>
				<input class="value-view" v-model="score[index]" type="text" placeholder="请输入分数" placeholder-style="font-size:35rpx"/>
			</view>
		</view>
		
		<!-- 保存 -->
		<view class="save" @click="save">保存</view>
		
		<!-- 查看已发布成绩 -->
		<view class="release" @click="goToRelease">查看已发布成绩</view>
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import pullDown from '@/components/pull-down/pull-down.vue'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	export default{	
		components: {
			pullDown
		},
		data(){
			return{
				account:"",
				gradeclass_id:"",
				subject:"语文",
				subjectList:["语文","数学","英语","科学","美术","音乐","体育"],
				
				score_name:"",
				score_time:"",
			    year:"",
				month:"",
				day:"",
				studentList:[],
				score:[],
				allScore:"",
				accountList:""
			}
		},
		
		
		onLoad(option) {
			this.account = uni.getStorageSync('account'),
			this.gradeclass_id = option.gradeclass_id
			
			this.allScore = "",
			console.log(this.account)
			console.log(this.gradeclass_id)
		},
		
		onShow() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			this.account = uni.getStorageSync('account')
			
			//根据班级与年级 gradeclass_id 查询该班级学生的人数
			this.getPeople() 
			
			//关闭加载框
			uni.hideLoading();
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			//根据班级与年级 gradeclass_id 查询该班级学生的人数
			await this.getPeople() 
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				selectPeople:'address/selectPeople',
				insertScore:'grade/insertScore'
			}),
			
			//获取科目名称
			getSubjectValue(e,i){
				this.subject = e
				console.log(this.subject)
			},
			
			//根据班级与年级 gradeclass_id 查询该班级学生的人数
			getPeople(){
				this.selectPeople({"grade_id":this.gradeclass_id}).then(res => {
					console.log(res)
					if(res.data != null){
						for(let i = 0; i < res.data.length; i ++){
							if(res.data[i].role == 2){
								this.studentList.push(res.data[i])
								
								this.accountList = this.studentList[0].id
								for(let i = 1; i < this.studentList.length; i ++){
									this.accountList = this.accountList + "," + this.studentList[i].id
								}
							}
							
							console.log(this.studentList)
							console.log(this.accountList)
						}
					}
				})
			},
			
			//保存
			save(){
				// 显示加载框
				uni.showLoading({
				    title: '保存中...'
				});
				
				this.score_time = this.year + "-" + this.month + "-" + this.day
				this.allScore = this.score[0]
				for(let i = 1; i < this.score.length; i ++){
					this.allScore = this.allScore + "," + this.score[i]
				}
				
				if(string.isNullAndEmpty(this.score_name)){ 
					uni.showToast({
					    title: '考试名称不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				// 添加成绩
				this.insertScore({
					"teacher_account":this.account,
					"student_account":this.accountList,
					"gradeclass_id":this.gradeclass_id,
					"score_name":this.score_name,
					"score_subject":this.subject,
					"score_time":this.score_time,
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
			
			goToRelease(){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				uni.navigateTo({
					url:"./release?gradeclass_id=" + this.gradeclass_id,
				})
				
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
	
	.release{
		width: 100%;
		height: 80rpx;
		color: white;
		line-height: 80rpx;
		margin-top: 60rpx;
		text-align: center;
		vertical-align:middle;
		background-color: #4CD964;
	}
</style>
