<template>
	<view>
		<!-- 教师 -->
		<view>
			<form class="teacher-form" @submit="formSubmit" @reset="formReset">
				<!-- 通知班级 -->
				<view class="first-view">
					<view class="title-view">通知年级与班级</view>
					<view style="display: flex;flex-direction: row;justify-content:flex-start;background-color: #F4F5F6;padding-top: 20rpx;padding-bottom: 30rpx;margin-top: 15rpx;">
						<view style="margin-left: 20rpx;">
							<pullDown :text="grade" :textList="gradeList" :count="gradeCount" @click="getGradeValue"></pullDown>
						</view>
						<view style="margin-left: 60rpx;">
							<pullDown :text="banji" :textList="banjiList" :count="banjiCount" @click="getBanJiValue"></pullDown>
						</view>
					</view>
				</view>
				
				<!-- 通知标题 -->
				<view class="first-view">
					<view class="title-view">标题</view>
					<textarea class="textarea-value" placeholder="请输入通知标题" style="height: 150rpx;"></textarea>
				</view>
				
				<!-- 通知内容 -->
				<view class="first-view">
					<view class="title-view">内容</view>
					<textarea class="textarea-value" placeholder="请输入通知内容"></textarea>
				</view>
				
				<!-- 按钮 -->
				<view class="first-view-btn">
					<button class="submit-btn" form-type="submit">发布</button>
					<button class="reset-btn" type="default" form-type="reset">重置</button>
				</view>
			</form>
			
			<!-- 查看已发布通知 -->
			<view class="release-btn" @click="release">查看已发布通知</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				grade:"年级",
				gradeList:["一年级","二年级","三年级","四年级","五年级","六年级"],
				gradeCount:0,
				
				banji:"班级",
				banjiList:["1班","2班","3班","4班","5班","6班"],
				banjiCount:0,
			}
		},
		methods:{
			formSubmit: function(e) {
			    console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
			    var formdata = e.detail.value
			    uni.showModal({
			        content: '表单数据内容：' + JSON.stringify(formdata),
			        showCancel: false
			    });
			},
			formReset: function(e) {
			    console.log('清空数据')
			},
			release(){
				uni.navigateTo({
					url:"./release",
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
