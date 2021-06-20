<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
<!--    动态绑定style-->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,//通过点击动态传入对应路径
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    computed: {
      isActive() {
        //判断被激活的路径是否包含当前页面动态传入的path，不等于-1时包含（true），等于-1时不包含（false）
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        //判断当前路径是否处于活跃，如果活跃，字体变为定义颜色
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        //通过监听点击，然后跳转到对应页面
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>
