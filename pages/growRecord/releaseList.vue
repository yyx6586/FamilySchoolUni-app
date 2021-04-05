<template>
	<view>
		<k-scroll-view
		    ref="k-scroll-view"
		    :refreshType="refreshType"
		    :refreshTip="refreshTip"
		    :loadTip="loadTip"
		    :loadingTip="loadingTip"
		    :emptyTip="emptyTip"
		    :touchHeight="touchHeight"
		    :height="height"
		    :bottom="bottom"
		    :autoPullUp="autoPullUp"
		    @onPullDown="handlePullDown"
		    @onPullUp="handleLoadMore"
		    >
			
			<!-- 请选择发布的图片或者视频 -->
			<view style="background-color: #FFFFFF;padding-bottom: 10rpx;display: flex;flex-direction: row;justify-content:flex-start;height: 80rpx;line-height: 80rpx;vertical-align: cenetr;">
				<view style="margin-left: 30rpx;border-bottom: 1rpx solid #F5F5F5;height: 80rpx;width: 120rpx;line-height: 80rpx;vertical-align: center;">请选择</view>
			    <radio-group @change="radioChange">
					<label class="radio"><radio value="图片" checked="true" />图片</label>
					<label class="radio"><radio value="视频" />视频</label>
				</radio-group>
			</view>
			
		    <!-- 数据列表 -->
		    <uni-list v-for="(item, index) in informationList" :key="index"> 
		        <uni-list-item v-if="role == 1" badgeType="error" badgeText="1" :rightText="item.release_time" :note="item.description" :showBadge="item.show_teacher" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
				<uni-list-item v-if="role == 2" badgeType="error" badgeText="1" :rightText="item.release_time" :note="item.description" :showBadge="item.show_student" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
		    </uni-list>
		</k-scroll-view>
		
	</view>
</template>

<script>
	import string from '@/utils/string.js'
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	export default{
		components: {
		    kScrollView
		},
		
		data() {
			return{
				curPage: 0,     //当前第几条记录
				pageSize: 10,   // 一页多少条记录 图片
				pageSizeVideo: 10,   // 一页多少条记录 视频
				account:"",
				role:"",
				gradeclass_id:"",
				informationList:[],
				allInformationList:[],
				release_time:"",
				imgOrVideo:0,
				
				refreshType: 'custom',
				refreshTip: '正在下拉',
				loadTip: '获取更多数据',
				loadingTip: '正在加载中...',
				emptyTip: '--我是有底线的--', 
				touchHeight: 50,
				height: 0,
				bottom: 50,
				autoPullUp: true,
				stopPullDown:true, // 如果为 false 则不使用下拉刷新，只进行上拉加载
			}
		},
		
		onLoad(option) {
			this.gradeclass_id = option.gradeclass_id
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
		},
		
		onShow() {
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			console.log(this.role)
			
			// 显示加载框
			uni.showLoading({ 
			    title: '加载中...'
			});
			
			// 根据 gradeclass_id 获取成长记录
			if(this.imgOrVideo == 0){
				this.getRecordInformationImg()   //图片
			}
			
			if(this.imgOrVideo == 1){
				this.getRecordInformationVideo()   //视频
			}
			
			//关闭加载框
			uni.hideLoading();
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({ 
			    title: '加载中...'
			});
			
			// 根据 gradeclass_id 获取成长记录
			if(this.imgOrVideo == 0){
				await this.getRecordInformationImg()   //图片
			}
			
			if(this.imgOrVideo == 1){
				await this.getRecordInformationVideo()   //视频
			}
			
			//关闭加载框
			uni.hideLoading();
			
		},
		
		methods:{
			...mapActions({
				recordInformation:'growRecord/recordInformation'
			}),
			
			radioChange(e){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				});
				
				if(e.target.value == "图片"){
					this.imgOrVideo = 0
					this.getRecordInformationImg()
				}else{
					this.imgOrVideo = 1
					this.getRecordInformationVideo()
				}
				console.log(this.imgOrVideo)
				//关闭加载框
				uni.hideLoading();
				
			},
			
			// 根据 gradeclass_id 获取成长记录  图片
			getRecordInformationImg(){
				console.log(this.gradecalss_id)
				this.recordInformation({
					"gradeclass_id":this.gradeclass_id,
					"status":"0"
				}).then(res => {
					console.log(res)
					if(res.data.length == 0){
						uni.showToast({
						    title: "教师还没有发布图片哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}else{
						this.allInformationList = res.data.reverse()
						console.log(this.allInformationList)
						
						if(this.allInformationList.length > 20){
							for(let i = 0; i < 20; i ++ ){
								this.informationList.push(this.allInformationList[i])
							}
						}else{
							this.informationList = this.allInformationList
						}
						
						for(var i = 0; i < this.informationList.length; i ++){
							if(this.account == this.informationList[i].account){
								this.informationList[i].show_teacher = false
							}
							
							if(this.informationList[i].show_teacher == "1"){
								this.informationList[i].show_teacher = true
							}
							 
							if(this.informationList[i].show_teacher == "0"){
								this.informationList[i].show_teacher = false
							}
							
							if(this.informationList[i].show_student == "1"){
								this.informationList[i].show_student = true
							}
							
							if(this.informationList[i].show_student == "0"){
								this.informationList[i].show_student = false
							}
							
							if(this.informationList[i].description.length > 19){
								this.informationList[i].description = this.informationList[i].description.slice(0,19) + "......"
							}
							
							if(this.informationList[i].description == null || this.informationList[i].description == null){
								this.informationList[i].description = "未命名"
							}
						}
						
						console.log(this.informationList)
					}
				})
			},
			
			// 根据 gradeclass_id 获取成长记录  视频
			getRecordInformationVideo(){
				console.log(this.gradeclass_id)
				this.recordInformation({ 
					"gradeclass_id":this.gradeclass_id,
					"status":"1"
				}).then(res => {
					console.log(res)
					if(res.data == null){
						uni.showToast({
						    title: "教师还没有发布视频哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}else{
						this.allInformationList = res.data.reverse()
						console.log(this.allInformationList)
						
						if(this.allInformationList.length > 20){
							for(let i = 0; i < 20; i ++ ){
								this.informationList.push(this.allInformationList[i])
							}
						}else{
							this.informationList = this.allInformationList
						}
						
						for(var i = 0; i < this.informationList.length; i ++){
							if(this.account == this.informationList[i].account){
								this.informationList[i].show_teacher = false
							}
							
							if(this.informationList[i].show_teacher == "1"){
								this.informationList[i].show_teacher = true
							}
							 
							if(this.informationList[i].show_teacher == "0"){
								this.informationList[i].show_teacher = false
							}
							
							if(this.informationList[i].show_student == "1"){
								this.informationList[i].show_student = true
							}
							
							if(this.informationList[i].show_student == "0"){
								this.informationList[i].show_student = false
							}
							
							if(this.informationList[i].description.length > 19){
								this.informationList[i].description = this.informationList[i].description.slice(0,19) + "......"
							}
							
							if(this.informationList[i].description == null || this.informationList[i].description == null){
								this.informationList[i].description = "未命名"
							}
						}
						console.log(this.informationList)
					}
				}) 
			},
			
			goToNoticeDetails(e){
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				})
				
				uni.navigateTo({
					url:"../growRecord/release?gradeclass_id=" + this.gradeclass_id + "&release_time=" + this.informationList[e].release_time +"&imgOrVideo=" + this.imgOrVideo,
				})
				//关闭加载框
				uni.hideLoading();
			},
			
			//下拉刷新
			handlePullDown(stopLoad) {
				if(this.imgOrVideo == 0){
					this.getRecordInformationImg()
				}
				
				if(this.imgOrVideo == 1){
					this.getRecordInformationVideo()
				}
				console.log(this.informationList)
				
			    stopLoad ? stopLoad() : '';
			},        
			
			//上拉加载更多	
			handleLoadMore(stopLoad) {
			    const size = this.informationList.length;
				const start = size - 1
				const end = size + 20
				const list = []
			    if (size < 1000) {
					
					//获取作业信息
					for(let i = start; i < end; i ++){
						list.push(this.allInformationList[i])
						
						if(this.account == list[i].account){
							list[i].show_teacher = false
						}
						
						if(list[i].show_teacher == "1"){
							list[i].show_teacher = true
						}
						 
						if(list[i].show_teacher == "0"){
							list[i].show_teacher = false
						}
						
						if(list[i].show_student == "1"){
							list[i].show_student = true
						}
						
						if(list[i].show_student == "0"){
							list[i].show_student = false
						}
						
						if(list[i].description.length > 19){
							list[i].description = list[i].description.slice(0,19) + "......"
						}
						
						if(list[i].description == null || list[i].description == null){
							list[i].description = "未命名"
						}
					}
					this.informationList = this.informationList.concat(list)
					console.log(this.informationList)
			            stopLoad ? stopLoad() : '';
			    }else{
			        stopLoad ? stopLoad({ isEnd: true }) : '';
			    }
			},
			        
			// 回到顶部		
			handleGoTop() {
			    this.$refs['k-scroll-view'].goTop();
			}
		}
	}
</script>

<style>
</style>
