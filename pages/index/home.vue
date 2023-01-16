<template>
  <view class="content">
    <!-- 背景 -->
    <image class="bg" src="~@/static/images/bg.jpg"></image>
    <!-- 头部区域 -->
    <view class="header">
      <view class="user" v-show="false"
        ><i class="icon icon-morentouxiang"></i
      ></view>
      <view class="search" @tap="goToSearch(searchHotCurrent)">
        <i class="icon icon-sousuo"></i>
        <swiper
          v-if="searchHotList"
          class="search-word"
          circular
          :autoplay="true"
          :interval="4000"
          :vertical="true"
          @change="changeSearch"
        >
          <swiper-item v-for="(item, index) in searchHotList" :key="index">
            {{ item.searchWord }}
            <text class="search-content">{{ item.content }}</text>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <!-- banner -->
    <view class="banner">
      <swiper
        v-if="bannerList"
        class="swiper"
        circular
        :indicator-dots="true"
        :autoplay="true"
        :interval="4000"
        previous-margin="30rpx"
      >
        <swiper-item
          class="swiper-item"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <view class="banner-item">
            <image
              class="swiper-img"
              :src="item.imageUrl"
              mode="widthFix"
            ></image>
          </view>
        </swiper-item>
      </swiper>
    </view>
    <!-- 导航分类 -->
    <view class="nav">
      <view class="nav-item" bindtap="toRecommendSong">
        <view class="icon-box">
          <text class="icon icon-tuijian"></text>
        </view>
        <text>每日推荐</text>
      </view>
      <view class="nav-item">
        <view class="icon-box">
          <text class="icon icon-gedan"></text>
        </view>
        <text>歌单</text>
      </view>
      <view class="nav-item">
        <view class="icon-box">
          <text class="icon icon-paihangbang"></text>
        </view>
        <text>排行榜</text>
      </view>
      <view class="nav-item">
        <view class="icon-box">
          <text class="icon icon-diantai"></text>
        </view>
        <text>私人FM</text>
      </view>
      <view class="nav-item">
        <view class="icon-box">
          <text class="icon icon-zhibo1"></text>
        </view>
        <text>直播</text>
      </view>
    </view>
    <view class="line"></view>
    <!-- 推荐歌单 -->
    <songs-list
      title="推荐歌单"
      more="更多"
      :dataList="recSongList"
    ></songs-list>
    <!-- 最新专辑 -->
    <songs-list
      title="最新专辑"
      more="更多"
      :dataList="albumNewest"
    ></songs-list>
    <!-- 排行榜 -->
    <top-detail title="排行榜" more="更多" v-if="topList" :dataList="topList"></top-detail>
    <!-- 最新音乐 -->
    <songs-list
      title="最新音乐"
      more="更多"
      :dataList="newSongList"
    ></songs-list>
  </view>
</template>

<script>
import request from '../../api/request'
export default {
  data() {
    return {
      bannerList: [], // banner列表
      searchHotList: [], // 热搜列表
      searchHotCurrent: '', // 热搜当前词
      recSongList: [], // 推荐歌单列表
      topList: [], // 排行榜列表
      albumNewest: [], // 最新专辑
      newSongList: [], // 新音乐列表
    }
  },
  onLoad() {
    console.log('加载了')
    // 获取banner数据
    this.getBanner()
    // 获取热搜列表
    this.getSearchHot()
    // 获取推荐歌单（未登录）
    this.getRecSongList()
    // 获取排行榜
    this.getPlaylistDetail([19723756, 3779629, 2884035, 3778678, 5338990334])
    // 获取最新专辑
    this.getAlbumNewest()

    this.getTopList()
    // 获取推荐新音乐
    this.getPersonalizedNewsong()
  },
  methods: {
    // 获取推荐新音乐
    getPersonalizedNewsong() {
      request.getPersonalizedNewsong().then((result) => {
        console.log(12)
        if (result && result.code === 200) {
          console.log('最新音乐', result)
          this.newSongList = result.result
        }
      })
    },
    // 设置搜索关键词
    changeSearch(event) {
      const index = event.detail.current
      this.searchHotCurrent = this.searchHotList[index].searchWord
    },
    // 获取首页数据
    getTopList() {
      request.getTopList().then((result) => {
        if (result && result.code === 200) {
          console.log(result)
        }
      })
    },
    // 获取最新专辑
    getAlbumNewest() {
      request.getAlbumNewest().then((result) => {
        if (result && result.code === 200) {
          console.log('最新专辑：', result)
          this.albumNewest = result.albums
        }
      })
    },
    // 获取banner数据
    getBanner() {
      request.getBanner().then((result) => {
        if (result && result.code === 200) {
          this.bannerList = result.banners
        }
      })
    },
    // 获取热搜列表
    getSearchHot() {
      request.getSearchHot().then((result) => {
        if (result && result.code === 200) {
          this.searchHotList = result.data
          this.searchHotCurrent = this.searchHotList[0].searchWord
          console.log('热搜：', this.searchHotList)
        }
      })
    },
    // 获取推荐歌单（未登录）
    getRecSongList() {
      request
        .getRecSongList({
          limit: 10,
        })
        .then((result) => {
          if (result && result.code === 200) {
            console.log('推荐歌单：', result.result)
            this.recSongList = result.result
          }
        })
    },
    // 获取歌单详情
    getPlaylistDetail(ids) {
      console.log(ids)
      // this.topList = []
      // ids.forEach((item, index) => {
      //   console.log(index)
      //   request
      //     .getPlaylistDetail({
      //       id: item,
      //     })
      //     .then((result) => {
      //       console.log(result)
      //       if (result && result.code === 200) {
      //         this.topList.push(result.playlist)
      //         console.log(`排行榜${index}:`, this.topList)
      //       }
      //     })
      // })
      const topList = []
      ids.forEach((item, index) => {
        request
          .getPlaylistDetail({
            id: item,
          })
          .then((result) => {
            console.log(result)
            if (result && result.code === 200) {
              topList.push(result.playlist)
              console.log(`排行榜${index}:`, this.topList)
            }
          })
      })
      this.topList = topList
    },
    // 跳转到搜索页面
    goToSearch(searchHotCurrent) {
      this.goByPath('/pages/search/search', {
        searchHotCurrent: searchHotCurrent,
        searchHotList: this.searchHotList
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import './index_style.scss';
// @import '@/static/iconfont/iconfont.css';
</style>
