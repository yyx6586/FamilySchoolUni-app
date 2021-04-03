<template>
	<view>
		<!-- 轮播图 -->
		<carousel :img-list="imgList" url-key="url" @selected="selectedBanner"/>
		
		<!-- 年级与班级 -->
		<!-- 教师 -->
		<view v-if="role == 1" style="display: flex;flex-direction: row;justify-content:flex-start;margin-top: 20rpx;">
			<view style="margin-left: 70rpx;">
				<pullDown :textList="gradeList" @click="getGradeValue"></pullDown>
			</view>
			<view style="margin-left: 60rpx;">
				<pullDown :textList="banjiList" @click="getBanJiValue"></pullDown>
			</view>
		</view>
		
		<!-- 家长 -->
		<view v-if="role == 2" style="margin-left: -360rpx;margin-top: 20rpx;">
			<view style="font-size: 40rpx;">{{ nianji + bnaji}}</view>
		</view>
		
		<!-- 功能选择 -->
		<view style="margin-top: 20rpx;">
			<grid :gridList="gridList" @click="goToVue"/>  
		</view>
	</view> 
</template>

<script>
	import carousel from '@/components/vear-carousel/vear-carousel'
	import grid from '@/components/grid/grid.vue'
	import pullDown from '@/components/pull-down/pull-down.vue'
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	
	export default { 
		components: {
		    carousel,
			grid,
			pullDown
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
				
				banjiText:"班级",
				banjiList:["1班","2班","3班","4班","5班","6班"],
				
				gradeValue: "一年级",  //年级
				banjiValue: "1班",  //班级
				role:"",
				nianji:"",
				banji:"",
				gradeclass_id:""
			}
		},
		onLoad() {
			this.role = uni.getStorageSync('role')
			console.log(uni.getStorageSync('token'))
		},
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			})
			
		    if(this.role == 2){
				await this.selectGrade({
					"account":uni.getStorageSync('account')
				}).then(res => {
					if (res.data != null) {
						this.gradeclass_id = res.data.gradeclass_id
						this.gradeClassName({
							"gradeclass_id":res.data.gradeclass_id
						}).then(re => {
							console.log(re)
							this.nianji = re.data.grade_name
							this.banji = re.data.class_name
						})
					}else{
						uni.showToast({
						    title: '获取年级与班级错误，请重新登录！',
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
				})
			}
			
			//关闭加载框
			uni.hideLoading();
		},
		methods: {
			...mapActions({
				gradeClassId:'index/gradeClassId',
				selectGrade:'address/selectGrade',
				gradeClassName:'index/gradeClassName'
			}),
			
			getGradeValue(e,i){
				this.gradeValue = e
				// console.log(e)
			},
			
			getBanJiValue(e,i){
				this.banjiValue = e
				// console.log(e)
			},
			
			goToVue(e,i){
				if(i == 0){
					uni.showLoading({
					    title: '加载中...'
					})
					
					if(this.role == 1){
						if(string.isNullAndEmpty(this.gradeValue)){
								uni.showToast({
								    title: '请选择年级！',
									icon:'none',
									mask:true,
								    duration: 2000
								});
								return;
							}
							
							if(string.isNullAndEmpty(this.banjiValue)){
								uni.showToast({
								    title: '请选择班级！',
									icon:'none',
									mask:true,
								    duration: 2000 
								});
								return;
							}
							
							this.gradeClassId({
								"grade_name": this.gradeValue,
								"class_name": this.banjiValue
							}).then(res => {
								console.log(res)
								if (res.data != null) {
									uni.navigateTo({
										url:"../grade/index?gradeclass_id=" + res.data.gradeclass_id,
									})
									//关闭加载框
									uni.hideLoading();
								}else{
									uni.showToast({
									    title: '获取数据错误，请重新点击！',
										icon:'none',
										mask:true,
									    duration: 2000
									});
									//关闭加载框
									uni.hideLoading();
									return;
								}
						
							})
						}else{
						    uni.navigateTo({
							    url:"../grade/release?gradeclass_id=" + this.gradeclass_id,
						    })
						    //关闭加载框
						    uni.hideLoading();
					}
					
					// uni.navigateTo({
					// 	url:"../grade/index",
					// })
				}
				if(i == 1){
					uni.showLoading({
					    title: '加载中...'
					})
					if(this.role == 1){
						if(string.isNullAndEmpty(this.gradeValue)){
								uni.showToast({
								    title: '请选择年级！',
									icon:'none',
									mask:true,
								    duration: 2000
								});
								return;
							}
							
							if(string.isNullAndEmpty(this.banjiValue)){
								uni.showToast({
								    title: '请选择班级！',
									icon:'none',
									mask:true,
								    duration: 2000 
								});
								return;
							}
							
							this.gradeClassId({
								"grade_name": this.gradeValue,
								"class_name": this.banjiValue
							}).then(res => {
								console.log(res)
								if (res.data != null) {
									uni.navigateTo({
										url:"../growRecord/index?gradeclass_id=" + res.data.gradeclass_id,
									})
									//关闭加载框
									uni.hideLoading();
								}else{
									uni.showToast({
									    title: '获取数据错误，请重新点击！',
										icon:'none',
										mask:true,
									    duration: 2000
									});
									//关闭加载框
									uni.hideLoading();
									return;
								}
						
							})
						}else{
						    uni.navigateTo({
							    url:"../growRecord/release?gradeclass_id=" + this.gradeclass_id,
						    })
						    //关闭加载框
						    uni.hideLoading();
					}
				}
				if(i == 2){
					uni.navigateTo({
						url:"../address/index",
					})
				}
				if(i == 3){
					uni.showLoading({
					    title: '加载中...'
					})
					
					if(this.role == 1) {
						if(string.isNullAndEmpty(this.gradeValue)){
							uni.showToast({
							    title: '请选择年级！',
								icon:'none',
								mask:true,
							    duration: 2000
							});
							return;
						}
						
						if(string.isNullAndEmpty(this.banjiValue)){
							uni.showToast({
							    title: '请选择班级！',
								icon:'none',
								mask:true,
							    duration: 2000 
							});
							return;
						}
						
						this.gradeClassId({
							"grade_name": this.gradeValue,
							"class_name": this.banjiValue
						}).then(res => {
							console.log(res)
							if (res.data != null) {
								uni.navigateTo({
									url:"../notice/index?gradeclass_id=" + res.data.gradeclass_id,
								})
								//关闭加载框
								uni.hideLoading();
							}else{
								uni.showToast({
								    title: '获取数据错误，请重新点击！',
									icon:'none',
									mask:true,
								    duration: 2000
								});
								//关闭加载框
								uni.hideLoading();
								return;
							}

						})
					}else{
						uni.navigateTo({
							url:"../notice/release?gradeclass_id=" + this.gradeclass_id,
						})
						//关闭加载框
						uni.hideLoading();
					}
				}
				if(i == 4){
					uni.showLoading({
					    title: '加载中...'
					})
					
					if(this.role == 1) {
						if(string.isNullAndEmpty(this.gradeValue)){
							uni.showToast({
							    title: '请选择年级！',
								icon:'none',
								mask:true,
							    duration: 2000
							});
							return;
						}
						
						if(string.isNullAndEmpty(this.banjiValue)){
							uni.showToast({
							    title: '请选择班级！',
								icon:'none',
								mask:true,
							    duration: 2000 
							});
							return;
						}
						
						this.gradeClassId({
							"grade_name": this.gradeValue,
							"class_name": this.banjiValue
						}).then(res => {
							console.log(res)
							if (res.data != null) {
								uni.navigateTo({
									url:"../homework/index?gradeclass_id=" + res.data.gradeclass_id,
								})
								//关闭加载框
								uni.hideLoading();
							}else{
								uni.showToast({
								    title: '获取数据错误，请重新点击！',
									icon:'none',
									mask:true,
								    duration: 2000
								});
								//关闭加载框
								uni.hideLoading(); 
								return;
							}
						})
					}else{
						uni.navigateTo({
							url:"../homework/release?gradeclass_id=" + this.gradeclass_id,
						})
						//关闭加载框
						uni.hideLoading();
					}
				}
			}
			
		} 
	}
</script>

<style>
</style>
