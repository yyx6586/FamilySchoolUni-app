<template>
	<view>
		<swiper class="swiper" 
			:indicator-dots="indicatorDots" 
			:autoplay="autoplay" 
			:interval="interval" 
			:duration="duration"	>
			<swiper-item v-for="(item , index) in homeSlide" :key="index">
				<image class="img" :src="item.url" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default{
		props:{
			homeSlide: {
				type: Array,
				default() {
					return []
				}
			}
		},
		
		data(){
			return{
				indicatorDots: true,
				autoplay: true,
				interval: "5000",
				duration: "1500"
			}
		},
	}
</script>

<style>
	.swiper{
		height: 20%;
		width: 100%;
	}
	/* swiper-item 里面的图片高度 */
	.img{
		width: 100%;
		height: 20%;
	}
</style>
