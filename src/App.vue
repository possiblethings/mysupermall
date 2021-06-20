<template>
   <div class="app">
     <keep-alive exclude="Detail">
       <router-view/>
     </keep-alive>
     <main-tab-bar/>
<!--     添加矢量图-->
     <icon></icon>
     <svg-icon></svg-icon>
   </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  import Icon from 'components/common/Icon/Icon.vue'
  import SvgIcon from 'components/common/Icon/svg.vue'

  export default {
    name: 'app',
    components: {
      MainTabBar,
      Icon,
      SvgIcon
    }
  }
</script>

<style>
  @import "assets/css/base.css";
</style>
