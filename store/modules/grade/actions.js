import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	// 添加成绩
	insertScore({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.INSERTSCORE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据班级与年级 gradeclass_id 与科目 查询该班级该科目近五次考试的考试名称
	seclectScoreName({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.SELECTSCORENAME_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据班级与年级 gradeclass_id 、科目、考试名称 查询该班级所有学生的考试成绩
	selectStudentScore({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.SELECTSTUDENTSCORE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据班级与年级 gradeclass_id 、科目、考试名称 删除该班级所有学生的考试成绩
	deleteScore({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.DELETESCORE_API,data)
			if(res.jsonError && res.jsonError.length > 0){
				reject(res.jsonError[0]._exceptionMessage);
			}else{
				resolve(res);
				// console.log(res);
			}
		})
	},
	
	// 根据班级与年级 gradeclass_id 、科目、考试名称 修改该班级所有学生的考试信息
	updateScore({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestToken(config.UPDATESCORE_API,data)
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