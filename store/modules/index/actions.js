import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	// 根据班级与年级名称查询班级与年级的 id
	gradeClassId({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.GRADECLASS_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据班级与年级id查询年级与班级名称
	gradeClassName({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.GRADECLASSNAME_API,data)
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