<template>
  <view class="content">
    <!-- 背景 -->
    <image class="bg" src="~@/static/images/bg.jpg"></image>
    <!-- 头部区域 -->
    <view class="header">
      <view class="search">
        <i class="icon icon-sousuo"></i>
        <input
          class="search-word"
          :focus="false"
          v-model="keywords"
          confirm-type="search"
          :placeholder="keywords"
          @tap="goToSearch(keywords)"
        />
      </view>
      <view class="tabs">
        <scroll-view
          :show-scrollbar="false"
          class="scroll-view"
          scroll-x="true"
          @scroll="scroll"
        >
          <view
            class="scroll-view-item"
            :class="item.type == tabsType ? 'selected' : ''"
            v-for="(item, index) in tabsList"
            :key="index"
            @tap="selectType(item)"
            >{{ item.label }}</view
          >
        </scroll-view>
      </view>
    </view>
    <!-- 内容展示 -->
    <view class="content-box">
      <!-- <view class="search-content">搜索内容：{{ keywords }}</view>
      <view class="list">
        <view class="item" v-for="item in songList" :key="item.id">
          <text class="icon icon-sousuo"></text>
          <text class="content" :id="item.feature">{{ item.keyword }}</text>
        </view>
      </view> -->

      <!-- <keep-alive>
        <component :is="tabsName" :ref="tabsName" />
      </keep-alive> -->

      <uni-load-more iconType="circle" status="more"></uni-load-more>
    </view>
  </view>
</template>

<script>
import request from '../../api/request'
import Song from './components/Song.vue'
import PlayList from './components/PlayList.vue'
export default {
  components: {
    Song,
    PlayList,
  },
  data() {
    return {
      keywords: '', // 搜索关键词
      searchHotList: [], // 热搜榜歌曲列表
      songList: [], // 歌曲列表
      pageIndex: 1, // 当前页码
      scrollTop: 0,
      old: {
        scrollTop: 0,
      },
      tabsName: 'Song', // tabs名称(显示的组件) 默认单曲Song
      tabsType: 1, // 类型 默认单曲
      tabsList: [
        {
          type: 1,
          name: 'Song',
          label: '单曲',
        },
        {
          type: 10,
          name: 'Album',
          label: '专辑',
        },
        {
          type: 100,
          name: 'Singer',
          label: '歌手',
        },
        {
          type: 1000,
          name: 'PlayList',
          label: '歌单',
        },
      ],
    }
  },
  onLoad(options) {
    const params = JSON.parse(decodeURIComponent(options.params))
    console.log(params)
    this.keywords = params.keywords
    this.searchHotList = params.searchHotList
  },
  methods: {
    scroll: function (e) {
      console.log(e)
      this.old.scrollTop = e.detail.scrollTop
    },
    // 跳转到搜索页面
    goToSearch(keywords) {
      // this.goByPath('/pages/search/search', {
      //   keywords: keywords,
      //   searchHotList: this.searchHotList
      // })
      this.goBack()
    },
    getSearchSong() {
      request
        .getSearchSong({
          type: this.type,
          keywords: this.searchWord || this.keywords,
          limit: 30,
          offset: (this.pageIndex - 1) * 30,
        })
        .then((result) => {
          if (result && result.code === 200) {
            console.log(result)
          }
        })
    },
    // 选择类型
    selectType(item) {
      this.tabsType = item.type
      this.tabsName = item.name
      this.getSearchSong()
    },
  },
}
</script>

<style lang="scss" scoped>
@import './list_style.scss';
</style>
