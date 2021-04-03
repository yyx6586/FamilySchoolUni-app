import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//个人信息 家长
	informationFamily({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.PERSONALINFORMATIONFAMILY_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 个人信息 学校
	informationSchool({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.PERSONALINFORMATIONSCHOOL_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 添加头像
	insertUrl({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.INSERTURL_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 查询头像
	selectUrl({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.SELECTURL_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 修改头像
	updateUrl({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.UPDATEURL_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
}

export default actions