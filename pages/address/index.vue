<template>
	<!-- 手风琴效果 -->
	<uni-collapse accordion="true">
	    <uni-collapse-item title="教师通讯录">
	        <view class="text-view" v-for="item in teacherList" @click="goToDetailsInformation(item)">
	            {{item}}
	        	<image class="img" src="../../static/return_right.png"></image>
	        </view>
	    </uni-collapse-item>
	    <uni-collapse-item title="家长通讯录">
	        <view class="text-view" v-for="item in parentList" @click="goToDetailsInformation(item)">
	            {{item}}
	        	<image class="img" src="../../static/return_right.png"></image>
	        </view>
	    </uni-collapse-item>
	</uni-collapse>
</template>

<script>
	export default{
		data() {
			return{
				teacherList:["杨运行","s","d","f","g","h"],
				parentList:["a","s","d","f","g","h"]
			}
		},
		methods:{
			goToDetailsInformation(item){
				console.log(item)
				uni.navigateTo({
					url:"../detailsInformation/index?item="+item,
				})
			}
		}
	}
</script>

<style>
	.text-view{
		padding: 30rpx; 
		font-size: 38rpx;
		color: #333333;
		display: flex;
		flex-direction: row;
		justify-content:space-between;
		border-bottom: 1rpx solid #999999;
	}
	.img{
		width: 35rpx;
		height: 25rpx;
	}
</style>
