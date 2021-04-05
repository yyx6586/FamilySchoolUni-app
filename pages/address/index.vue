<template>
	<!-- 手风琴效果 -->
	<uni-collapse accordion="true">
	    <uni-collapse-item title="教师通讯录">
	        <view class="text-view" v-for="item in teacherList" @click="goToDetailsInformation(item)">
	            {{item.id + "     " + "(" + " " + item.name + " " + ")"}}
	        	<image class="img" src="../../static/return_right.png"></image>
	        </view>
	    </uni-collapse-item>
	    <uni-collapse-item title="家长通讯录">
	        <view class="text-view" v-for="item in parentList" @click="goToDetailsInformation(item)">
	            {{item.id + "     " + "(" + " " + item.name + " " + ")"}}
	        	<image class="img" src="../../static/return_right.png"></image>
	        </view>
	    </uni-collapse-item>
	</uni-collapse>
</template>

<script>
	import {mapActions, mapMutations, mapState, mapGetters} from 'vuex';
	export default{
		data() {
			return{
				account:"1234",
				gradeId:"",
				teacherList:[],
				parentList:[]
			}
		},
		
		async mounted() {
			// 显示加载框
			uni.showLoading({
			    title: '加载中...'
			});
			
			// 根据账号查询班级
			await this.getGrade()
			
			//关闭加载框
			uni.hideLoading();
		},
		methods:{
			...mapActions({
				selectGrade:'address/selectGrade',
				selectPeople:'address/selectPeople'
			}),
			
			// 根据账号查询班级
			getGrade(){
				this.account = uni.getStorageSync('account')
			    this.selectGrade({"account":this.account}).then(res => {
					
					if (res.data != null) {
						// 根据班级 id 查询该班级的学生
						this.selectPeople({"grade_id":res.data.grade_id}).then(res => {
							console.log(res)
							for(let i = 0; i < res.data.length; i ++){
								if(res.data[i].role == 1){
									this.teacherList.push(res.data[i])
								}else{
									this.parentList.push(res.data[i])
								}
							}
						})
					}else{
						uni.showToast({
						    title: '获取数据错误，请重新登录！', 
							icon:'none',
							mask:true,
						    duration: 2000
						});
						return;
					}
				})
			}, 
			
			goToDetailsInformation(item){ 
				console.log(item)
				uni.navigateTo({
					url:"./detailsInformation?account="+item.id,
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
