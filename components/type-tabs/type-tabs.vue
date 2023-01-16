<template>
  <view>
    <scroll-view
      v-show="isShow"
      :class="{ fixed: isFixed }"
      scroll-x="true"
      class="scroll-view d-flex bg-white position-relative"
    >
      <view
        class="item text-center nowarp"
        v-for="(item, index) in sources"
        :key="index"
        :style="'width:' + (!isScroll ? 100 / sources.length + '%' : 'auto')"
        :class="{ 'active font-weight-bold': type == item.type }"
        @click="clickType(item, index)"
      >
        {{ item.name }}
      </view>
      <!-- 滚动条 -->
      <view class="line-box" :style="'left:' + activeLeft + 'px;'"></view>
    </scroll-view>
    <!-- 当固定顶部时，占位元素，高度可修改 -->
    <view v-show="isFixed && isShow" :style="'height:' + height + 'px'"></view>
  </view>
</template>

<script>
export default {
  name: 'typeTabs',
  props: {
    sources: Array, //数据源
    isShow: {
      //是否显示（默认展示，不用可以删除）
      type: Boolean,
      default: true,
    },
    isFixed: {
      //是否固定在顶部
      type: Boolean,
      default: false,
    },
    isScroll: {
      //是否可以横向滚动  值false:每项宽度为(100/sources.length)%
      type: Boolean, //值true: 宽度自适应
      default: false,
    },
    currentType: {
      //默认选项，不传为第一项
      type: Object,
      default: () => {
        {
        }
      },
    },
  },

  data() {
    return {
      activeLeft: 0, //滚动条的X值
      type: '', //当前选项
      height: '44',
    }
  },

  mounted: function () {
    //赋默认值
    this.type = this.currentType
      ? this.currentType.type
      : this.sources.length
      ? this.sources[0].type
      : ''
    setTimeout(() => {
      this.$nextTick(() => {
        this.getActiveElementY()
      })
    }, 200)
    if (this.isFixed) {
      uni
        .createSelectorQuery()
        .in(this)
        .select('.fixed') //目标节点
        .boundingClientRect((target) => {
          if (target.height) {
            this.height = target.height
          }
        })
        .exec()
    }
  },
  methods: {
    clickType(item, index, isUpate) {
      this.type = item.type
      setTimeout(() => {
        if (!isUpate) {
          this.$emit('clickItem', item, index)
        }
        this.$nextTick(() => {
          this.getActiveElementY()
        })
      }, 200)
    },
    // 获取当前选项和scroll-view的scrollLeft值计算得出滚动条位置
    getActiveElementY(element = '.item.active') {
      let query = uni.createSelectorQuery().in(this)
      var promise1 = new Promise((resolve, reject) => {
        query
          .select('.scroll-view')
          .fields(
            {
              scrollOffset: true,
            },
            (res) => {
              if (res) {
                resolve(res.scrollLeft)
              }
              resolve(0)
            }
          )
          .exec()
      })

      var promise2 = new Promise((resolve, reject) => {
        query
          .select(element)
          .boundingClientRect(async (res) => {
            if (res) {
              resolve(res.left + res.width / 2)
            }
            resolve(0)
          })
          .exec()
      })
      Promise.all(
        [promise1, promise2].map((item) => item.catch((error) => ''))
      ).then((res) => {
        var left = 0
        res.map((item) => {
          left += item
        })
        this.activeLeft = left
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.line-box {
  position: absolute;
  width: 56rpx;
  height: 4rpx;
  // background-color: #2B323C;
  background-color: #0d6ed9;
  // bottom: 48rpx;
  top: 74rpx;
  transform: translateX(-50%);
  transition: all 0.1s;
}

.item {
  display: inline-block;
  max-width: 400rpx;
  padding: 16rpx 40rpx;
}

.item.active {
  color: #0d6ed9;
}

.fixed {
  position: fixed;
  top: 0;
  /* #ifdef H5 */
  top: 44px;
  /* #endif */
  left: 0;
  right: 0;
  z-index: 2;
  box-shadow: 0rpx 2rpx 6rpx 0rpx rgba(0, 0, 0, 0.06);
}
</style>
