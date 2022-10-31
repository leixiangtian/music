import App from './App';
import SongsList from './components/songs-list/songs-list';
import TopDetail from './components/top-detail/top-detail';

Vue.component('songs-list', SongsList);
Vue.component('top-detail', TopDetail);

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
