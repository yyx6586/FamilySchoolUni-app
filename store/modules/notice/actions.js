import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//发布通知信息
	noticeInformation({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.NOTICEINFORMATION_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	//根据班级与年级 id 查询发布的信息列表
	noticeList({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.NOTICELIST_API,data)
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
			let res = await request.requestToken(config.SHOWBADGE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 id 获取通知信息
	informationById({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.INFORMATIONBYID_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 id 修改通知信息
	updateInformationById({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.UPDATEINFORMATIONBYID_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	//根据 id 删除通知记录
	deleteInformation({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.DELETEINFORMATION_API,data)
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