import {
	apiService
} from './prefix';

export default (options) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: apiService.musicServer + options.url,
			method: options.method || 'GET',
			data: options.data || {},
			header: options.header || {},
			success: (res) => {
				resolve(res.data);
			},
			fail: (err) => {
				console.log('请求失败，失败原因' + err);
				reject(err);
			}
		});
	});
}
