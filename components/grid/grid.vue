<template>
	<view class="grid">
		<view class="grid-item" v-for="(item,index) in gridList" :key="index">
			<view class="grid-view" @click="goToVue($event,index)">
				<image class="grid-img" :src="item.url"></image>
			</view>
			<text class="grid-text">{{item.text}}</text>
		</view>
	</view> 
</template>

<script>
	export default{
		props:{
			gridList: {
				type: Array,
				default() {
					return []
				}
			}
		},
		methods:{
			goToVue(e,i){
				this.$emit("click",e,i);
			}
		}
	}
</script>

<style>
	.grid{
		display: flex;
		display: -webkit-flex;
		width: 100%;
		height: 100%;
		flex-wrap: wrap;
	    justify-content: flex-start;
		align-content: space-between;
		/* background-color: #DBDBDB; */
	}
	.grid-item{
		display: flex;
		display: -webkit-flex;
		flex-direction: column;
		justify-content: center;
		width: 33%;
		height: 230rpx;
		text-align: center;
		box-sizing:border-box;
		/* border: 1rpx solid #3B4144; */
	}
	.grid-view{
		display: flex;
		display: -webkit-flex;
		flex-direction: row;
		justify-content: center;
		margin-bottom: 20rpx;
	}
	.grid-img{
		width: 140rpx;
		height: 140rpx;
	}
	.grid-text{
		font-size: 28rpx;
		width: 100%;
		line-height: 30rpx;
	}
</style>
