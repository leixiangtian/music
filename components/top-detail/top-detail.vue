<template>
	<view class="container">
		<view class="nav-head">
			<text class="title">{{title}}</text>
			<text class="more" @click="goToMore">
				{{more}}
				<text class="icon icon-xiayiyeqianjinchakangengduo"></text>
			</text>
		</view>
		<view class="top-box">
			<swiper class="swiper" :autoplay="false" :interval="4000" previous-margin="40rpx" next-margin="30rpx">
				<swiper-item class="swiper-item" v-for="(item, index) in dataList" :key="index">
					<view class="top-item">
						<text class="title">
							{{item.name}}
							<text class="icon icon-xiayiyeqianjinchakangengduo"></text>
							<!-- <view style="flex: 1; text-align: right;">云村用户都在听</view> -->
						</text>
						<view class="music-item" v-for="(mitem, mindex) in item.tracks.slice(0, 3)" :key="mindex">
							<image :src="mitem.al.picUrl"></image>
							<text class="count">{{mindex+1}}</text>
							<text class="music-name">
								<text class="song">{{mitem.name}}</text>\n
								<text class="singer">{{mitem.ar[0].name}}</text>
							</text>
							<text class="detail">霸榜</text>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		name: "top-detail",
		props: {
			// 标题
			title: {
				type: String,
				default: '',
			},
			// 更多
			more: {
				type: String,
				default: '',
			},
			dataList: {
				type: Array,
				default: [],
			}
		},
		data() {
			return {

			};
		},
		mounted() {
			console.log(this.dataList)
		}
	}
</script>

<style lang="scss" scoped>
	@import './top-detail.scss';
</style>
