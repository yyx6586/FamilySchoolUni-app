import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//保存图片到数据库
	saveImg({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.SAVEIMG_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 gradeclass_id 获取成长记录
	recordInformation({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.RECORDINFORMATION_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 gradeclass_id 与 描述 修改成长记录
	updateRecord({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.UPDATERECORD_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据 id 删除成长记录
	deleteRecord({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.DELETERECORD_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	}
}

export default actions