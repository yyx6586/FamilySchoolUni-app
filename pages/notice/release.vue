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
		        <uni-list-item v-if="role == 1"  :title="item.title" badgeType="error" badgeText="1" :rightText="item.update_time | formatDate" :note="item.information" :showBadge="item.show_teacher" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
				<uni-list-item v-if="role == 2"  :title="item.title" badgeType="error" badgeText="1" :rightText="item.update_time | formatDate" :note="item.information" :showBadge="item.show_student" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
		    </uni-list>
		</k-scroll-view>
		
	</view>
</template>

<script>
	import kScrollView from '@/components/k-scroll-view/k-scroll-view.vue';
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	import string from '@/utils/string.js'
	export default{
		components: {
		    kScrollView
		},
		
		data() {
			return{
				account:"",
				role:"",
				curPage: 0,     //当前第几条记录
				pageSize: 20,   // 一页多少条记录
				grade_id:"",
				title:"列表文字",       //通知的标题
				time:"2021-3-5",        //发布通知的时间
				note:"您收到一条新的消息......",        //通知的内容，限制一定的字数，超过部分用省略号表示
				showBadge: true,  //是否显示未读提示点,  数据库是true,第一次点击时，修改数据库里的showBadge为false,点击是判断showBadge为true时修改数据库，如果为false时则不修改数据库
				informationList:[],   //每一次加载的数据，长度为20条数据， 到达20条数据时再次进行加载20条数据
				
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
			console.log(this.curPage)
			console.log(this.pageSize)
			this.grade_id = option.gradeclass_id 
			console.log(option.gradeclass_id )
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			console.log(this.grade_id)
		},
		onShow() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			})
			
			this.role = uni.getStorageSync('role')
			this.account = uni.getStorageSync('account')
			
			//获取通知信息
			this.getNoticeInformation()
			
			//关闭加载框
			uni.hideLoading();
		},
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			})
			
			//获取通知信息
			await this.getNoticeInformation()
			
			//关闭加载框
			uni.hideLoading();
		},
		
		methods:{
			...mapActions({
				noticeList:'notice/noticeList'
			}),
			
			goToNoticeDetails(e) {
				// 显示加载框
				uni.showLoading({
				    title: '加载中...'
				})
				
				uni.navigateTo({
					url:"noticeDetails?id=" + this.informationList[e].id + "&grade_id=" + this.informationList[e].grade_id + "&account=" + this.informationList[e].account,
				})
				//关闭加载框
				uni.hideLoading();
			},
			
			//获取通知信息
			getNoticeInformation(){
				this.noticeList({
					"grade_id":this.grade_id,
					"curPage": this.curPage,
					"pageSize": this.pageSize
				}).then(res => {
					console.log(res)
					if(res.data != null){
						for(var i = 0; i < res.data.length; i ++){
							if(this.account == res.data[i].account){
								res.data[i].show_teacher = false
							}
							
							if(res.data[i].show_teacher == "1"){
								res.data[i].show_teacher = true
							}
							 
							if(res.data[i].show_teacher == "0"){
								res.data[i].show_teacher = false
							}
							
							if(res.data[i].show_student == "1"){
								res.data[i].show_student = true
							}
							
							if(res.data[i].show_student == "0"){
								res.data[i].show_student = false
							}
							
							if(res.data[i].title.length > 9){
								res.data[i].title = res.data[i].title.slice(0,9) + "..."
							}
							
							if(res.data[i].information.length > 19){
								res.data[i].information = res.data[i].information.slice(0,19) + "......"
							}
						}
						this.informationList = res.data
					}else{
						uni.showToast({
						    title: "教师还没有发布通知哦!",
							icon:'none',
							mask:true,
						    duration: 2000
						});
					}
				})
			},
			
			//下拉刷新
			handlePullDown(stopLoad) {
				this.curPage = 0
				//获取作业信息
				this.getNoticeInformation()
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
							if(this.account == res.data[i].account){
								res.data[i].show_teacher = false
							}
							
							if(res.data[i].show_teacher == "1"){
								res.data[i].show_teacher = true
							}
							
							if(res.data[i].show_teacher == "0"){
								res.data[i].show_teacher = false
							}
							
							if(res.data[i].show_student == "1"){
								res.data[i].show_student = true
							}
							
							if(res.data[i].show_student == "0"){
								res.data[i].show_student = false
							}
							
							if(res.data.title[i].length > 9){
								res.data[i].title = res.data[i].title.slice(0,9) + "..."
							}
							
							if(res.data[i].information.length > 19){
								res.data[i].information = res.data[i].information.slice(0,19) + "......"
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
