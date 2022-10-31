import ApiConfig from './config';
import apiUrl from './url';

export default {
	/**
	 * 获取首页数据
	 **/
	getHomeData(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getHomeData,
			data: data
		});
	},
	/**
	 * 获取banner图片信息
	 **/
	getBanner(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getBanner,
			data: data
		});
	},
	/**
	 * 获取热搜列表
	 **/
	getSearchHot(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getSearchHot,
			data: data
		});
	},
	/**
	 * 获取热搜列表
	 * 可选参数 : limit: 取出数量 , 默认为 30
	 **/
	getRecSongList(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getRecSongList,
			data: data
		});
	},
	/**
	 * 获取推荐新音乐
	 **/
	getPersonalizedNewsong(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getPersonalizedNewsong,
			data: data
		});
	},
	/**
	 * 获取默认搜索关键词
	 **/
	getSearchDefault(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getSearchDefault,
			data: data
		});
	},
	/**
	 * 获取排行榜列表
	 **/
	getTopList(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getTopList,
			data: data
		});
	},
	/**
	 * 获取排行榜摘要
	 **/
	getTopDetail(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getTopDetail,
			data: data
		});
	},
	/**
	 * 获取歌单详情
	 * 必选参数 : id : 歌单 id
	 * 可选参数 : s : 歌单最近的 s 个收藏者,默认为 8
	 **/
	getPlaylistDetail(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getPlaylistDetail,
			data: data
		});
	},
	/**
	 * 获取最新专辑
	 **/
	getAlbumNewest(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getAlbumNewest,
			data: data
		});
	},
	/*
	 * 搜索建议
	 * 必选参数 : keywords : 关键词
	 * 可选参数 : type : 如果传 'mobile' 则返回移动端数据
	 */
	getSearchSuggest(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getSearchSuggest,
			data: data
		});
	},
	/*
	 * 搜索
	 * 必选参数 : keywords : 关键词
	 */
	getSearchMultimatch(data) {
		return ApiConfig({
			method: 'get',
			url: apiUrl.getSearchMultimatch,
			data: data
		});
	},
}
