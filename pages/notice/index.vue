<template>
	<view>
		<!-- 教师 -->
		<view>
			<view class="teacher-form">
				
				<!-- 通知标题 -->
				<view class="first-view">
					<view class="title-view" v-model="title">标题</view>
					<textarea class="textarea-value" v-model="title" placeholder="请输入通知标题" style="height: 150rpx;"></textarea>
				</view>
				
				<!-- 通知内容 -->
				<view class="first-view">
					<view class="title-view" v-model="content">内容</view>
					<textarea class="textarea-value" v-model="content" placeholder="请输入通知内容"></textarea>
				</view>
				
				<!-- 按钮 -->
				<view class="first-view-btn">
					<button class="submit-btn" @click="submit">发布</button>
					<button class="reset-btn" @click="reset">重置</button>
				</view>
			</view>
			
			<!-- 查看已发布通知 -->
			<view class="release-btn" @click="release">查看已发布通知</view>
		</view>
	</view>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import string from '@/utils/string.js'
	export default{
		data() {
			return {
				title:"",
				content:"",
				gradeclass_id:"",
				account:""
			}
		},
		onLoad(option) {
			this.gradeclass_id = option.gradeclass_id
			this.account = uni.getStorageSync('account')
			console.log(this.gradeclass_id)
			console.log(this.account)
		},
		
		onShow() {
			this.title = ""
			this.content = ""
			this.account = uni.getStorageSync('account')
		},
		
		methods:{
			...mapActions({
				noticeInformation:'notice/noticeInformation'
			}),
			
			submit() {
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(string.isNullAndEmpty(this.account)){
					uni.showToast({
					    title: '通知发布失败，请退出重新登录！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				if(string.isNullAndEmpty(this.gradeclass_id)){
					uni.showToast({
					    title: '通知发布失败，请退出重新登录！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				if(string.isNullAndEmpty(this.content)){
					uni.showToast({
					    title: '通知内容不能为空！',
						icon:'none',
						mask:true,
					    duration: 2000
					});
					return;
				}
				
				this.noticeInformation({
					"account": this.account,
					"grade_id": this.gradeclass_id,
					"title": this.title,
					"information": this.content,
					"show_teacher":"1",
					"show_student":"1"
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
				this.title = ""
				this.content = ""
			    console.log('清空数据')
			},
			release(){
				console.log(this.gradeclass_id)
				uni.navigateTo({
					url:"./release?gradeclass_id=" + this.gradeclass_id,
				})
			},
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
