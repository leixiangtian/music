export default {
	// 发现页面数据
	getHomeData: '/homepage/block/page',
	// 获取banner信息
	getBanner: '/banner',
	// 获取热搜列表
	getSearchHot: '/search/hot/detail',
	// 获取默认搜索关键词
	getSearchDefault: '/search/default',
	/* 
	 * 获取推荐歌单（无需登录）
	 * 可选参数 : limit: 取出数量 , 默认为 30
	 */
	getRecSongList: '/personalized',
	// 获取推荐新音乐
	getPersonalizedNewsong: '/personalized/newsong',
	// 获取排行榜列表
	getTopList: '/toplist',
	// getTopList: '/top/list',
	// 获取排行榜摘要
	// getTopDetail: '/toplist/detail',
	// 获取歌单详情、排行榜
	getPlaylistDetail: '/playlist/detail',
	// 最新专辑
	getAlbumNewest: '/album/newest',
	/*
	 * 搜索建议
	 * 必选参数 : keywords : 关键词
	 * 可选参数 : type : 如果传 'mobile' 则返回移动端数据
	 */
	getSearchSuggest: '/search/suggest',
	/*
	 * 搜索
	 * 必选参数 : keywords : 关键词
	 */
	getSearchMultimatch: '/search/multimatch',
	/*
	 * 搜索歌曲
	 * 关键词 : keywords
	 * 数量 : limit
	 * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲, 10: 专辑, 100: 歌手, 1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频, 1018:综合, 2000:声音(搜索声音返回字段格式会不一样)
	 */
	// getSearchSong: '/search',
	getSearchSong: '/cloudsearch',
}
