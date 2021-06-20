<template>
  <scroll class="category-menu">
    <div class="menu">
      <div class="menu-list" v-for="(item,index) in categoryList"
           @click="menuClick(index)"
           :class="{active:currentIndex === index}"
           :key="index">
        {{item.title}}
      </div>
    </div>

  </scroll>

</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  export default {
    name: "CategoryMenu",
    components: {
      Scroll
    },
    props: {
      categoryList: {
        type:Array,
        default: []
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      menuClick(index) {
        this.currentIndex = index
        this.$emit('menuClick',index)
      }
    }
  }
</script>

<style scoped>

  .category-menu {
    background-color: #f6f6f6;
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    width: 20%;
    box-sizing: border-box;
  }
  .menu-list {
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
  }
  .active {
    font-weight: 700;
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 3px solid var(--color-high-text);
  }

</style>
