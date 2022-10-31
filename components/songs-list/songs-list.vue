<template>
	<view class="container">
		<view class="nav-head">
			<text class="title">{{title}}</text>
			<text class="more" @click="goToMore">
				{{more}}
				<text class="icon icon-xiayiyeqianjinchakangengduo"></text>
			</text>
		</view>
		<scroll-view class="scroll-view" @scroll="scroll" enable-flex scroll-x>
			<block v-for="(item, index) in dataList" :key="index">
				<view class="rec-song-item">
					<image :src="item.picUrl" mode=""></image>
					<text>{{item.name}}</text>
				</view>
			</block>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		name: "songs-list",
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
				scrollTop: 0,
				old: {
					scrollTop: 0
				}
			};
		},
		methods: {
			upper: function(e) {
				console.log("滚动到顶部：", e) //滚动到顶部/左边，达到阈值会触发 scrolltoupper 事件
			},
			lower: function(e) {
				console.log("滚动到底部：", e) //滚动到底部/右边，达到阈值会触发 scrolltolower 事件
			},

			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail
					.scrollTop //滚动时触发，event.detail = {scrollLeft, scrollTop, scrollHeight, scrollWidth, deltaX, deltaY}
			},
			goTop: function(e) {
				// 解决view层不同步的问题
				this.scrollTop = this.old.scrollTop
				this.$nextTick(function() {
					this.scrollTop = 0
				});
				uni.showToast({
					icon: "none",
					title: "纵向滚动 scrollTop 值已被修改为 0"
				})
			},
			// 跳转到更多
			goToMore() {
				console.log('跳转更多，待写')
			},
		},
	}
</script>

<style lang="scss" scoped>
	@import './songs-list.scss';
</style>
