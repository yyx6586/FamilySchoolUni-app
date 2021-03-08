import createLogger from 'vuex/dist/logger';
import VuexPersistence from 'vuex-persist';
import lodash from 'lodash';

import * as type from '@/common/config.js'

// 持久化插件
export const vuexLocal = new VuexPersistence({
	// key:"vuex",//将状态存储在存储中的键。默认: 'vuex'
	storage: localStorage,//可传localStorage, sessionStorage, localforage 或者你自定义的存储对象. 接口必须要有get和set. 默认是: window.localStorage
	// filter: mutation => mutation.type === type.LOGIN,
	modules:["user"],
})

// 状态快照插件
export const  myPluginWithSnapshot = () => {
	return function(store) {
		let prevState = lodash.cloneDeep(store.state)
		
		store.subscribe((mutation, state) => {
			// console.log('prevState', prevState);
			// console.log(mutation);
			console.log('currentState', state);
			prevState = lodash.cloneDeep(state);
			console.log('currentState', prevState);
		})
	}
}
