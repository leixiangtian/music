<template>
  <view class="content">
    <!-- 背景 -->
    <image class="bg" src="~@/static/images/bg.jpg"></image>
    <!-- 头部区域 -->
		<searchBox :value="keywords" :defaultKeywords="defaultKeywords" @input="getSearchSuggest"></searchBox>
    <!-- <view class="header">
      <view class="search">
        <i class="icon icon-sousuo"></i>
        <input
          class="search-word"
          focus
          v-model="keywords"
          confirm-type="search"
          :placeholder="defaultKeywords"
          @input="getSearchSuggest"
        />
        <i
          v-if="keywords !== ''"
          class="icon icon-ziyuanxhdpi"
          style="font-size: 25rpx"
          @tap="clear"
        ></i>
      </view>
      <view class="search-input" @tap="search">搜索</view>
    </view> -->
    <!-- 搜索内容展示 -->
    <block v-if="keywords">
      <view class="search-content-box">
        <!-- <view class="search-content">搜索内容：{{ keywords }}</view> -->
        <view class="list">
          <view
            class="item"
            v-for="item in searchSuggestList"
            :key="item.id"
            @tap="search"
          >
            <text class="icon icon-sousuo"></text>
            <text class="content" :id="item.feature">{{ item.keyword }}</text>
          </view>
        </view>
      </view>
    </block>
    <block v-else style="background-color: transparent">
      <!--搜索历史记录 -->
      <!-- <view class="history-box" v-if="historyList">
				<view class="title">历史</view>
				<view class="historyItem" v-for="(item, index) in historyList" :key="index" @tap="searchHistory" data-historyword="{{item}}">{{item}}</view>
				<text class="icon icon-shanchu delete" @tap="deleteSearchHistory"></text>
			</view> -->
      <!-- 热搜榜 -->
      <view class="hotContainer" v-if="searchHotList">
        <view class="title">热搜榜</view>
        <view class="hotList">
          <view
            class="hotItem"
            v-for="(item, index) in searchHotList"
            :key="index"
          >
            <text class="order">{{ index + 1 }}</text>
            <text @tap="selectHot(item)">{{ item.searchWord }}</text>
            <image
              class="iconImg"
              v-if="item.iconUrl"
              :src="item.iconUrl"
            ></image>
          </view>
        </view>
      </view>
    </block>
  </view>
</template>

<script>
import request from '../../api/request'
import searchBox from '../../components/search-box/search-box'
export default {
	components: {
		searchBox
	},
  data() {
    return {
      keywords: '', // 搜索关键词
      defaultKeywords: '', // 默认热搜关键词
      searchHotList: [], // 热搜榜歌曲列表
      searchSuggestList: [], // 搜索建议列表
      historyList: [], // 历史搜索记录
      topList: [], // 排行榜列表
      isInputFocus: true,
    }
  },
  onLoad(options) {
    const params = JSON.parse(decodeURIComponent(options.params))
    console.log(params)
    this.searchHotList = params.searchHotList
    this.defaultKeywords = params.searchHotCurrent || params.keywords
  },
  methods: {
    clear() {
      this.keywords = ''
    },
    search(keywords) {
			console.log(keywords)
			console.log(this.keywords)
      // request.getSearchSong({
      // 	// type: 1,
      // 	keywords: item.searchWord || this.keywords,
      // 	limit: 30,
      // 	offset: (1-1) * 30
      // }).then(result => {
      // 	if (result && result.code === 200) {
      // 		console.log(result)
      // 	}
      // })

      this.goByPath('/pages/list/list', {
        keywords: this.keywords,
        searchHotList: this.searchHotList,
      })
    },
    selectHot(item) {
      this.keywords = item.searchWord
			console.log(this.keywords)
      this.getSearchSuggest(this.keywords)
    },
    // 获取搜索建议
    getSearchSuggest(keywords) {
			this.keywords = keywords
      this.searchSuggestList = []
      request
        .getSearchSuggest({
          keywords: this.keywords || this.defaultKeywords,
          type: 'mobile',
        })
        .then((result) => {
          if (result && result.code === 200) {
            console.log(result)
            this.searchSuggestList = result.result.allMatch
            console.log(this.searchSuggestList)
          }
        })
    },
    // 删除搜索历史记录
    deleteSearchHistory() {
      wx.showModal({
        content: '确认删除吗？',
        success: (res) => {
          if (res.confirm) {
            // 点击确认删除
            this.historyList = []
            wx.removeStorageSync('searchHistory')
          }
        },
      })
    },
    // 获取热搜列表
    getSearchHot() {
      request.getSearchHot().then((result) => {
        if (result && result.code === 200) {
          this.searchHotList = result.data
          // this.searchHotCurrent = this.searchHotList[0].searchWord
          console.log('热搜：', this.searchHotList)
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './search_style.scss';
</style>
