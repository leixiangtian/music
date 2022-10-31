<template>
	<view class="content">
		<!-- 背景 -->
		<image class="bg" src="~@/static/images/bg.jpg"></image>
		<!-- 头部区域 -->
		<view class="header">
			<view class="search">
				<i class="icon icon-sousuo"></i>
				<input class="search-word" focus v-model="keywords" confirm-type="search" :placeholder="defaultKeywords" @input="getSearchSuggest"/>
			</view>
			<view class="serach-input" @tap="serachMusic">搜索</view>
		</view>
	</view>
</template>

<script>
	import request from '../../api/request';
	export default {
		data() {
			return {
				keywords: '', // 搜索关键词
				defaultKeywords: '', // 默认热搜关键词
			}
		},
		onLoad(options) {
			// 路由参数
			console.log(options)
			this.keywords = options.keywords;
			// 获取搜索建议
			this.getSearchSuggest();
			// 获取默认搜索词语
			this.getSearchDefault();
		},
		methods: {
			serachMusic() {
				
			},
			// 获取默认搜索词
			getSearchDefault() {
				request.getSearchDefault().then(result => {
					if (result && result.code === 200) {
						this.defaultKeywords = result.data.realkeyword;
					}
				})
			},
			// 获取搜索建议
			getSearchSuggest() {
				request.getSearchSuggest({
					keywords: this.keywords || this.defaultKeywords,
					type: 'mobile'
				}).then(result => {
					if (result && result.code === 200) {
						console.log(result)
					}
			
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	@import './search_style.scss';
</style>
