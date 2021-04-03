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
		    <!-- 数据列表 -->
		    <uni-list v-for="(item, index) in informationList" :key="index"> 
		        <uni-list-item  :title="item.title" badgeType="error" badgeText="1" :rightText="item.update_time | formatDate" :note="item.homework" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
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
				pageSize: 20,   // 一页多少条记录
				gradeclass_id:"",
				showBadge: true,  //是否显示未读提示点,  数据库是true,第一次点击时，修改数据库里的showBadge为false,点击是判断showBadge为true时修改数据库，如果为false时则不修改数据库
				informationList:[],    //每一次加载的数据，长度为20条数据， 到达20条数据时再次进行加载20条数据	
				
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
		
		filters: {
		      formatDate: function (value) {
		        let date = new Date(value);
		        let y = date.getFullYear();
		        let MM = date.getMonth() + 1;
		        MM = MM < 10 ? ('0' + MM) : MM;
		        let d = date.getDate();
		        d = d < 10 ? ('0' + d) : d;
		        let h = date.getHours();
		        h = h < 10 ? ('0' + h) : h;
		        let m = date.getMinutes();
		        m = m < 10 ? ('0' + m) : m;
		        let s = date.getSeconds();
		        s = s < 10 ? ('0' + s) : s;
		        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
		    }
		},
		
		onLoad(option) {
			this.gradeclass_id = option.gradeclass_id
			console.log(this.gradeclass_id) 
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			})
			
			await this.getHomeworkList()
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				homeworkList:'homework/homeworkList'
			}),
			
			//根据班级与年级 id 查询发布的作业信息列表
			getHomeworkList(){
				this.homeworkList({
					"gradeclass_id":this.gradeclass_id,
					"curPage": this.curPage,
					"pageSize": this.pageSize
				}).then(res => {
					console.log(res)
					if(res.data != null){
						for(var i = 0; i < res.data.length; i ++){
							if(res.data[i].showBadge == "true"){
								res.data[i].showBadge = true
							}
							
							if(res.data[i].showBadge == "false"){
								res.data[i].showBadge = false
							}
							
							if(res.data[i].title.length > 9){
								res.data[i].title = res.data[i].title.slice(0,9) + "..."
							}
							
							if(res.data[i].homework.length > 19){
								res.data[i].homework = res.data[i].homework.slice(0,19) + "......"
							} 
						}
						this.informationList = res.data
					}else{
						uni.showToast({
						    title: "教师还没有发布作业哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}
				})
			}, 
			
			goToNoticeDetails(e) {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				})
				
				uni.navigateTo({
					url:"homeworkDetails?id=" + this.informationList[e].id + "&gradeclass_id=" + this.informationList[e].gradeclass_id + "&account=" + this.informationList[e].account + "&showBadge=" + this.informationList[e].showBadge,
				})
				
				//关闭加载框
				uni.hideLoading();
			},
			
			//下拉刷新
			handlePullDown(stopLoad) {
				this.curPage = 0
				//获取作业信息
				this.getHomeworkList()
				console.log(this.informationList)
				
			    stopLoad ? stopLoad() : '';
			},        
			
			//上拉加载更多	
		    handleLoadMore(stopLoad) {
			    const size = this.informationList.length;
			    if (size < 1000) {
					this.curPage = this.curPage + 20
					
					//获取作业信息
					this.homeworkList({
						"gradeclass_id":this.gradeclass_id,
						"curPage": this.curPage,
						"pageSize": this.pageSize
					}).then(res => {
						console.log(res)
						for(var i = 0; i < res.data.length; i ++){
							if(res.data[i].showBadge == "true"){
								res.data[i].showBadge = true
							}
							
							if(res.data[i].showBadge == "false"){
								res.data[i].showBadge = false
							}
							
							if(res.data[i].title.length > 9){
								res.data[i].title = res.data[i].title.slice(0,9) + "..."
							}
							
							if(res.data[i].homework.length > 19){
								res.data[i].homework = res.data[i].homework.slice(0,19) + "......"
							}
						}
						this.informationList = this.informationList.concat(res.data);
					})
					
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
