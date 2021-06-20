<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 ref="tabControl1"
                 class="tab-control"
                 v-if="isFixedTop"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "./childCompos/HomeSwiper";
  import RecommendView from "./childCompos/RecommendView";
  import FeatureView from "./childCompos/FeatureView";

  import NavBar from 'components/common/navbar/NavBar';
  import TabControl from "components/content/tabControl/TabControl";
  import GoodsList from "components/content/goods/GoodsList";
  import Scroll from "components/common/scroll/Scroll";
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata, getHomeGoods} from "network/home";
  import {backTopMixin, itemListenerMixin} from "common/mixin"


  export default {
    name: "Home",
    components: {
      HomeSwiper,
      RecommendView,
      FeatureView,

      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      BackTop

    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffSetTop: 0,
        isFixedTop: false,
        ScrollY: 0
      }
    },
    mixins: [backTopMixin, itemListenerMixin],

    //当组件被创建时，就会执行其中的函数
    created() {
      //1.调用函数请求多个数据
      this.getHomeMultidata()

      //2.调用函数请求商品数据
      this.getHomeGoodst('pop');
      this.getHomeGoodst('new');
      this.getHomeGoodst('sell');
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.ScrollY, 300)
      // 回到原来位置，需要刷新scroll，防止自动回到顶部位置
      this.$refs.scroll.refresh()
    },
    deactivated() {
      //保存离开首页时所在的位置
      this.ScrollY = this.$refs.scroll.getScrollY()
      // 当页面离开首页时，取消全局事件监听。在其他页进行刷新时，不会刷新首页
      this.$bus.$off('itemImageLoad', this.homeImgListener)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    mounted() {
    },

    //主要放逻辑处理的函数
    methods: {
      /**
       事件监听相关的方法
       */
      // 监听点击的是第几个标签，并且进行赋值
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
        //保证两个tabControl的选择类型是一致的
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      // backTopClick(){
      //   this.$refs.scroll.scrollTo(0,0,300)
      // },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        // this.isShowBackTop = (-position.y) > 1000
        this.BackTop(position)
        // 2.决定tabControl是否吸顶(position: fixed)
        this.isFixedTop = (-position.y) > this.tabOffSetTop
      },
      loadMore() {
        this.getHomeGoodst(this.currentType);
      },
      swiperImageLoad() {
        this.tabOffSetTop = this.$refs.tabControl2.$el.offsetTop;
      },

      /**
       网络请求相关的方法
       */
      //1.请求首页多个数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //将请求到的数据保存起来，防止函数调用后变量会被垃圾回收
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //2.请求首页商品数据
      getHomeGoodst(type) {
        //定义page用来记录获取商品的页数+1
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          //将请求到的数据保存起来，防止函数调用后变量会被垃圾回收
          //将一个数组添加到另一个数组中，...res可以依次将数组中的元素加入新的数组中
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page

          //调用finishPullUp（），多次上拉进行加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }
</style>
