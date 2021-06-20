<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },

    mounted() {// 组件创建完后调用
      // 1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })

      // 2.监听滚动的位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          // console.log(position);
          this.$emit('scroll', position)
        })
      }

      // 3.监听scroll滚动到底部
      if (this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //页面滚动到某个位置
      scrollTo(x, y, time) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 页面刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 上拉加载动作完成时，自动加载;如果不自动加载，数据显示不出来
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // 获取Y轴方向上的值
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>

</style>
