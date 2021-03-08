<template>
	<view class="pull_down">
		<view class="pull">
			<text class="pull_text">{{text}}</text>
			<view class="pull_input" @click.stop="showHidden = !showHidden">{{textList[count]}}</view>
			<image class="pull_image" src="../../static/index/xiala.png" @click.stop="showHidden = !showHidden"></image>
		</view>
		<view class="pull-select" v-if="showHidden">
			<text class="pull_select_text" @click="getValue($event,index)" v-for="(item,index)  in textList" :key="index">{{item}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			textList: {
				type: Array,
				default() {
					return []
				}
			},
			text:{
				type: String,
				default(){
					return ''
				}
			},
			count:{
				type:Number,
				default(){
					return 0
				}
			},
		},
		
		data(){
			return{
				showHidden:false,
				inputValue:"",
			}
		},
		
		methods:{
			// 点击页面事件 隐藏需要隐藏的区域
			hiddenClick () {
			    this.showHidden = false;
			},
			getValue(e,i){
				this.inputValue = this.textList[i];
				this.showHidden = false;
				console.log(this.inputValue);
				
				 this.$emit("click",this.inputValue,i);
			},
		}
	}
</script>

<style>
	.pull_down{
		display: flex; 
		flex-direction: column;
		align-items: center; 
		z-index: 1;
		/* margin-top: 40rpx; */
	}
	
	.pull{
		display: flex; 
		flex-direction: row; 
		justify-content: center;
		margin-top: 15rpx; 
		/* margin-bottom: 15rpx; */
	}
	
	.pull_text{
		font-size: 35rpx;
		margin-right: 20rpx; 
		line-height: 50rpx; 
		text-align: center;
	}
	
	.pull_input{
		width: 150rpx;
		height: 50rpx; 
		font-size: 35rpx;
		border: 1rpx solid #BEBEBE; 
		border-radius: 30rpx; 
		padding-right: 50rpx;
		text-align: center;
	}
	.pull_image{
		width: 30rpx; 
		height: 30rpx; 
		margin-left: -50rpx;
		margin-top: 9rpx;
	}
	.pull-select{
		text-align: center;
		left: 0rpx;
		right: 0rpx;
		position: fixed;
		bottom: 0rpx;
		background-color: #F4F5F6; 
		border-radius: 40rpx;
		z-index: 999;
	}
	.pull_select_text{
		display: block; 
		margin-top: 15rpx;
		font-size: 35rpx; 
		border-bottom: 1rpx solid #DCDCDC;
	}
</style>
