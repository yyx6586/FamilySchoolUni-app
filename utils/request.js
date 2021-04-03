
const errorResult = {
	jsonError:[
		{"_exceptionMessage":"系统异常，请与后台管理员联系"}
	]
}

// 无 token
const requestNoToken = (url = "", data = {}, type = 'POST') => {
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: url,
            data: data,
			header: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
            // dataType: 'json', 
        }).then((response) => {
            let [error, res] = response;        
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

// 有 token
const requestToken = (url = "", data = {}, type = 'POST') => {
	// // 请求头信息
	// var headers = {
	// 	'content-type': 'application/x-www-form-urlencoded',
	// 	'token': uni.getStorageSync('token')
	// };
	
	// 获取 token
	let userToken = uni.getStorageSync('token')
	
	// // 将 token 放入请求头中
 //    headers['token'] = userToken
		
    return new Promise((resolve, reject) => {
        uni.request({
            method: type,
            url: url,
            data: data,
			header: {
				'content-type': 'application/x-www-form-urlencoded',
				'token': userToken
			}
            // dataType: 'json', 
        }).then((response) => {
            let [error, res] = response;   
            resolve(res.data);
        }).catch(error => {
            let [err, res] = error;
            reject(err)
        })
    });
}

module.exports = {
	requestNoToken,
    requestToken
} 