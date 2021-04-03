import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//根据账号查找班级
	selectGrade({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.GRADE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	//根据班级 id 查询该班级的所有教师和学生
	selectPeople({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.PEOPLE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据账号查询个人信息详情
	personalDetails({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.PERSONALDETAILS_API,data)
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