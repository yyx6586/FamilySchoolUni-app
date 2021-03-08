<template>
</template>

<script>
</script>

<style>
</style>
<template>
	<view>
		<uni-list v-for="(item, index) in informationList" :key="index">
		    <uni-list-item  :title="item.title" :showBadge="item.showBadge" badgeType="error" badgeText="1" :rightText="item.time" :note="item.note" clickable="true" @click="goToNoticeDetails(index)"></uni-list-item>
		</uni-list>
		<uni-load-more :status="loadmore" load-text="上啦"></uni-load-more>
	</view>
</template>

<script>
	export default{
		data() {
			return{
				title:"列表文字",       //通知的标题
				time:"2021-3-5",        //发布通知的时间
				note:"您收到一条新的消息......",        //通知的内容，限制一定的字数，超过部分用省略号表示
				showBadge: true,  //是否显示未读提示点,  数据库是true,第一次点击时，修改数据库里的showBadge为false,点击是判断showBadge为true时修改数据库，如果为false时则不修改数据库
				informationList:[    //每一次加载的数据，长度为20条数据， 到达20条数据时再次进行加载20条数据
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"},
					{title:"列表文字",showBadge:true,time:"2021-3-5",note:"您收到一条新的消息......"}
				],
				contentText:"contentdown",  //contentdown: "上拉显示更多",contentrefresh: "正在加载...",contentnomore: "没有更多数据了"
			}
		},
		methods:{
			goToNoticeDetails(e) {
				uni.navigateTo({
					url:"homeworkDetails?showBadge=" + this.informationList[e].showBadge,
				})
			},
			clickLoadMore(){
				if(this.informationList.length == 19){
					this.contentText = "contentdown"
					
					// 加载数据  将数据赋值给informationList
					// this.contentText = "contentrefresh"
					
				}
				
				if(this.informationList.length < 19) {
					this.contentText = "contentnomore" 
				}
			}
		}
	}
</script>

<style>
</style>
