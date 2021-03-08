<template>
	<view>
		<!-- 轮播图 -->
		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
		
		<!-- 年级与班级 -->
		<!-- 教师 -->
		<view style="display: flex;flex-direction: row;justify-content:flex-start;margin-top: 20rpx;">
			<view style="margin-left: 70rpx;">
				<pullDown :text="grade" :textList="gradeList" :count="gradeCount" @click="getGradeValue"></pullDown>
			</view>
			<view style="margin-left: 60rpx;">
				<pullDown :text="banji" :textList="banjiList" :count="banjiCount" @click="getBanJiValue"></pullDown>
			</view>
		</view>
		
		<!-- 家长 -->
		<!-- <view style="margin-left: -360rpx;margin-top: 20rpx;">
			<pullDown :text="banji" :textList="banjiList" :count="banjiCount" @click="getBanJiValue"></pullDown>
		</view> -->
		
		<!-- 功能选择 -->
		<view style="margin-top: 20rpx;">
			<grid :gridList="gridList" @click="goToVue"/> 
		</view>
	</view> 
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import grid from '@/components/grid/grid.vue'
	
	export default { 
		components: {
		    carousel,
			grid
		},
		data() {
			return {
				imgList: [{
				                    url: '../../static/index/one.jpeg',
				                    id: 1
				                },{
				                    url: '../../static/index/two.jpeg',
				                    id: 2
				                },{
				                    url: '../../static/index/three.jpg',
				                    id: 3
				                }],
				gridList:[
					{
						text:"成绩",
						url:'../../static/index/grid/chengji.png'
					},
					{
						text:"成长记录",
						url:'../../static/index/grid/jilu.png'
					},
					{
						text:"通讯录",
						url:'../../static/index/grid/tongxunlu.png'
					},
					{
						text:"通知",
						url:'../../static/index/grid/tongzhi.png'
					},
					{
						text:"作业",
						url:'../../static/index/grid/zuoye.png'
					}
				],
				grade:"年级",
				gradeList:["一年级","二年级","三年级","四年级","五年级","六年级"],
				gradeCount:0,
				
				banji:"班级",
				banjiList:["1班","2班","3班","4班","5班","6班"],
				banjiCount:0,
				
				role:2,  //1为教师，2为家长
			}
		},
		onLoad() {

		},
		methods: {
			goToVue(e,i){
				if(i == 0){
					uni.navigateTo({
						url:"../grade/index",
					})
				}
				if(i == 1){
					uni.navigateTo({
						url:"../growRecord/index",
					})
				}
				if(i == 2){
					uni.navigateTo({
						url:"../address/index",
					})
				}
				if(i == 3){
					if(this.role == 1) {
						uni.navigateTo({
							url:"../notice/index",
						})
					}else{
						uni.navigateTo({
							url:"../notice/release",
						})
					}
				}
				if(i == 4){
					if(this.role == 1) {
						uni.navigateTo({
							url:"../homework/index",
						})
					}else{
						uni.navigateTo({
							url:"../homework/release",
						})
					}
				}
			},
			getGradeValue(e,i){
			},
			
			getBanJiValue(e,i){
			},
		} 
	}
</script>

<style>
</style>
