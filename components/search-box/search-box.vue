<template>
  <view class="header">
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
  </view>
</template>

<script>
export default {
  //import引入的组件需要注入到对象中
  components: {},
  props: {
    value: {
      type: String,
      default: () => {
        return ''
      }
    },
    defaultKeywords: {
      type: String,
      default: () => {
        return ''
      }
    }
  },
  data() {
    return {
      keywords: this.value
    }
  },
  watch: {
    value(val) {
      this.keywords = val
    }
  },
  //方法集合
  methods: {
    getSearchSuggest() {
      this.$emit('input', this.keywords)
    },
  },
  onload() {},
}
</script>
<style lang="scss" scoped>
@import './search-box.scss';
</style>
