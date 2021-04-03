import request from '../../../utils/request.js'
import * as config from '../../../common/config.js'

const actions = {
	
	//登录
	signIn({commit,state},data){
		return new Promise(async (resolve,reject) =>{
			let res = await request.requestNoToken(config.LOGIN_API,data)
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