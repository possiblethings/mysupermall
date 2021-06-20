<template>
  <div id="detail">
    <detail-nav-bar @titleClick="titleClick" class="detail-nav" ref="detailNav"/>
    <scroll class="content"
            :probe-type="3"
            :pull-up-load="true"
            @scroll="contentScroll"
            ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods" ref="baseInfo"/>
      <detail-shop-info :shop="shops"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramInfo" ref="paramInfo"/>
      <detail-comment-info :comment-info="commentInfo" ref="commentInfo"/>
      <goods-list :goods="recommends" ref="recommends"/>
    </scroll>
    <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addtoCart"/>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";
  import DetailBottomBar from "./childComps/DetailBottomBar";

  import Scroll from "components/common/scroll/Scroll";
  import GoodsList from "components/content/goods/GoodsList";
  import BackTop from "components/content/backTop/BackTop";

  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "network/detail";
  import {backTopMixin, itemListenerMixin} from "common/mixin";
  import {mapActions} from 'vuex'

  export default {
    name: 'Detail',
    components: {
      DetailParamInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailCommentInfo,
      DetailBottomBar,

      Scroll,
      BackTop,
      GoodsList
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shops: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        themeTops: [],
        currentIndex: 0
      }
    },
    mixins: [backTopMixin, itemListenerMixin],
    methods: {
      ...mapActions(['addCart']),
      imageLoad() {
        this.$refs.scroll.refresh();

        this.themeTops = [];
        this.themeTops.push(0);
        this.themeTops.push(this.$refs.paramInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.commentInfo.$el.offsetTop);
        this.themeTops.push(this.$refs.recommends.$el.offsetTop);
        this.themeTops.push(Number.MAX_VALUE);
      },
      contentScroll(position) {
        // 1.判断BackTop是否显示
        this.BackTop(position)

        // 2.通过滚动内容改变主题颜色
        // 获取Y值
        const positionY = -position.y

        // 2.positionY和主题中值进行对比
        const length = this.themeTops.length
        for (let i = 0; i < length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTops[i] && positionY < this.themeTops[i + 1])) {
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTops[index], 200)
      },
      addtoCart() {
        //添加到购物车
        // 1，获取需要加入购物车的商品信息
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;//商品的唯一标识

        //2.将商品加入购物车里面,使用Vuex进行管理store/index.js，有三种方法
        //2.1使用mutations中的$store.commit调用addCart
        // this.$store.commit('addCart', product)
        //2.2使用actions中的$store.dispatch调用addCart
        // this.$store.dispatch('addCart',product).then(res =>{
        //   this.$toast.show(res, 1500)
        // })
        //2.3使用mapActions的映射关系，直接使用addCart调用自己.然后使用promise方法进行弹窗提示
        this.addCart(product).then(res => {
          this.$toast.show(res, 1500)
        })
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid;

      //2.根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result
        // 2.1获取顶部的图片轮播数据
        this.topImages = data.itemInfo.topImages
        // 2.2创建商品信息的对象
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 2.3创建店铺信息的对象
        this.shops = new Shop(data.shopInfo)
        // 2.4保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //2.5获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 2.6.取出评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
      })

      //3.请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

      //4.获取每个主题对应的位置
    },

    destroyed() {
      // 当页面离开详情页时，取消全局事件监听。在其他页进行刷新时，不会刷新详情页
      this.$bus.$off('itemImageLoad', this.detailImgListener)
    }
  }

</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    padding-top: 24px;
    height: calc(100% - 44px - 58px);
    background-color: #fff;
  }

</style>
