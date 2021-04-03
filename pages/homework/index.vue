<template>
	<view>
		<!-- 教师 -->
		<view>
			<view class="teacher-form">
				
				<!-- 科目 -->
				<view class="first-view" style="display: flex;flex-direction: row;justify-content:flex-start;text-align: center;">
					<view class="title-view">科目</view>
					<view style="margin-top: 30rpx;">
						<pullDown :textList="subjectList" @click="getSubjectValue"></pullDown>
					</view>
				</view>
				
				<!-- 知识点 -->
				<view class="first-view">
					<view class="title-view">知识点</view>
					<textarea class="textarea-value" v-model="title" placeholder="请输入知识点" style="height: 150rpx;"></textarea>
				</view>
				
				<!-- 作业内容 -->
				<view class="first-view">
					<view class="title-view">内容</view>
					<textarea class="textarea-value" v-model="content" placeholder="请输入作业内容"></textarea>
				</view>
				
				<!-- 按钮 -->
				<view class="first-view-btn">
					<button class="submit-btn" @click="submit">发布</button>
					<button class="reset-btn" @click="reset">重置</button>
				</view>
			</view>
			
			<!-- 查看已布置作业 -->
			<view class="release-btn" @click="release">查看已布置作业</view>
		</view>
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
		data() {
			return {
				subjectList:["语文","数学","英语","科学","美术","音乐","体育"],
				subject_name:"语文",
				title:"",
				content:"",
				account:"",
				gradeclass_id:""
			}
		},
		onLoad(option) {
			this.account = uni.getStorageSync('account')
			this.gradeclass_id = option.gradeclass_id
			
			console.log(this.account)
			console.log(this.gradeclass_id)
		},
		
		methods:{
			...mapActions({
				homework:'homework/homework'
			}),
			
			getSubjectValue(e,i){
				this.subject_name = e
				console.log(e)
			},
			
			submit(){
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.account)){
					uni.showToast({
					    title: '作业发布失败，请退出重新登录！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: '作业发布失败，请退出重新登录！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				if(string.isNullAndEmpty(this.subject_name)){
					uni.showToast({
					    title: '作业发布失败，请退出重新登录！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				if(string.isNullAndEmpty(this.content)){
					uni.showToast({
					    title: '作业内容不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				console.log(this.subject_name)
				console.log(this.gradeclass_id)
				this.homework({
					"account":this.account,
					"gradeclass_id":this.gradeclass_id,
					"title":this.title,
					"subject_name":this.subject_name,
					"homework":this.content,
					"showBadge":"true" 
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
			
			reset() {
			    this.title = "",
				this.content = ""
			},
			release(){
				uni.navigateTo({
					url:"./release?gradeclass_id=" + this.gradeclass_id,
				})
			}
		}
	}
</script>

<style>
	.first-view{
		padding-left: 30rpx;
		margin-right: 30rpx;
	}
	.title-view{
		margin-top: 40rpx;
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
	.release-btn{
		height: 100rpx;
		width: 100%;
		color: #FFFFFF;
		line-height: 100rpx;
		text-align: center;
		vertical-align: center;
		margin-top: 30rpx;
		background-color: #007AFF;
	}
</style>
