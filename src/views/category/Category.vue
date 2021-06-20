<template>
  <div class="wrapper" ref="aaaa">
    <nav-bar class="category-nav">
      <div slot="center">商品分类</div>
    </nav-bar>
    <div class="content">
      <category-menu :category-list="menuList"
                     @menuClick="selectMenu"/>

      <scroll class="content-right"
              :probe-type="3"
              :pull-up-load="true"
              @scroll="categoryScroll"
              @pullingUp="contentTosat()"
              ref="scroll">
        <category-content :content-list="contentList"></category-content>
        <tab-control  :titles="['综合', '新品', '销量']"
                      @tabClick="itemClick"/>
        <category-detail :content-detail="showDetails"/>

      </scroll>
      <back-top @click.native="backTopClick" v-show="isShowBackTop"></back-top>
    </div>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";
  import TabControl from "../../components/content/tabControl/TabControl";
  import BackTop from "components/content/backTop/BackTop"

  import CategoryMenu from "./childCopms/CategoryMenu";
  import CategoryContent from "./childCopms/CategoryContent";
  import CategoryDetail from "./childCopms/CategoryDetail";

  import {getCategoryMenus, getSubcategory,getCategoryDetail} from "network/category";
  import {backTopMixin, itemListenerMixin} from "common/mixin"

  export default {
    name: "Category",
    components: {
      BackTop,
      NavBar,
      Scroll,
      TabControl,

      CategoryMenu,
      CategoryContent,
      CategoryDetail
    },
    data() {
      return {
        menuList: [],
        contentList: [],
        currentIndex: -1,
        contentDetail:{
        },
        currentType: 'pop'
      }
    },
    created() {
      this._getCategoryMenus()
    },
    computed: {
      showDetails() {
        if (this.currentIndex === -1) return []
         return this.contentDetail[this.currentIndex][this.currentType];
      }
    },
    mixins:[backTopMixin, itemListenerMixin],
    methods: {
      itemClick(dex) {
        switch (dex) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
        }
      },
      categoryScroll(position) {
        this.BackTop(position)
      },

      // 1.获取商品分类
      _getCategoryMenus() {
        getCategoryMenus().then(res => {
          // console.log(res);
          // 1.获取分类数据
          this.menuList = res.data.category.list
          for (let i = 0; i < this.menuList.length; i++) {
            this.contentDetail[i] = {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
          this._getSubcategory(0)
        })
      },
      //获取分类中的二次分类数据
      _getSubcategory(index) {
        this.currentIndex = index
        // console.log(this.currentIndex);
        const mailKey = this.menuList[index].maitKey
        getSubcategory(mailKey).then(res => {
          // console.log(res);
          this.contentList = res.data.list
          this._getCategoryDetail('pop')
          this._getCategoryDetail('new')
          this._getCategoryDetail('sell')
        })
      },

      _getCategoryDetail(type) {
        // 1.获取请求的miniWallkey
        const miniWallkey = this.menuList[this.currentIndex].miniWallkey;
        // 2.发送请求,传入miniWallkey和type
        getCategoryDetail(miniWallkey, type).then(res => {
          // console.log(res);
          // 3.将获取的数据保存下来
          this.contentDetail[this.currentIndex][type] = res
          this.contentDetail = {...this.contentDetail}

          //调用finishPullUp（），多次上拉进行加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      selectMenu(index) {
        this._getSubcategory(index)
        this.$refs.scroll.scrollTo(0,0,0)
        this.$refs.scroll.refresh()
      },
      contentTosat() {
        this.$toast.show('人家是有底线的~',2000)
      },
    },

    destroyed() {
      // 当页面离开商品分类页时，取消全局事件监听。在其他页进行刷新时，不会刷新商品分类页
      this.$bus.$off('itemImageLoad', this.categoryImgListener)
    }
  }

</script>

<style scoped>

  .category-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content-right {
    position: absolute;
    width: 80%;
    top: 44px;
    bottom: 49px;
    right: 0;
    flex: 1;
    overflow: hidden;
  }
</style>
