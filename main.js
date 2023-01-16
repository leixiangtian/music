import App from './App';
import SongsList from './components/songs-list/songs-list';
import TopDetail from './components/top-detail/top-detail';

Vue.component('songs-list', SongsList);
Vue.component('top-detail', TopDetail);


// openType 默认值为 navigate；animationType 默认值为pop-in；animationDuration 默认值为300毫秒
Vue.prototype.goByPath = function (path, params, openType = 'navigate', animationType = 'pop-in', animationDuration =
	300) {
	// 有参数执行这里的逻辑
	if (params !== undefined && params !== null) {
		if (openType == 'navigate') {
			// 如果跳转方式为navigate，则使用navigateTo方式跳转，保留当前页面，跳转到应用内的某个页面
			uni.navigateTo({
				url: path + "?params=" + encodeURIComponent(JSON.stringify(params)),
				animationType: animationType,
				animationDuration: animationDuration
			})
		} else {
			// 如果跳转方式不为navigate，则使用redirectTo方式跳转，关闭当前页面，跳转到应用内的某个页面
			uni.redirectTo({
				url: path + "?params=" + encodeURIComponent(JSON.stringify(params)),
				animationType: animationType,
				animationDuration: animationDuration
			})
		}
	} else {
		// 没有参数直接使用navigateTo方式跳转，保留当前页面，跳转到应用内的某个页面
		uni.navigateTo({
			url: path,
			animationType: animationType,
			animationDuration: animationDuration
		})
	}
}
// 返回上一页
Vue.prototype.goBack = function () {
	uni.navigateBack({
		delta: 1
	});
}

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
