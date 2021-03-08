import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from './store'

// 引入轮播图组件
import banner from './components/banner/banner.vue'
Vue.component('banner',banner)

//引入下拉框组件
import pullDown from './components/pull-down/pull-down.vue'
Vue.component("pull-down",pullDown)

Vue.config.productionTip = false

App.mpType = 'app'

Vue.use(Vuex)

const app = new Vue({
	store, 
    ...App
})
app.$mount()
