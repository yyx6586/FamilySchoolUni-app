import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//发布作业信息
	homework({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.HOMEWORK_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	//根据班级与年级 id 查询发布的信息列表
	homeworkList({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.HOMEWORKLIST_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 修改数据库里的 showBadge 属性
	updateShowBadge({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.SHOWBADGEHOMEWORK_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 id 获取作业信息
	homeworkById({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.HOMEWORKBYID_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 id 修改作业信息
	updatehomeworkById({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.UPDATEHOMEWORKBYID_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	//根据 id 删除作业记录
	deletehomework({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.DELETEHOMEWORK_API,data)
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