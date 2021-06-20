<template>
  <div class="detail-navbar">
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="navbar">
        <div v-for="(item,index) in titles"
             class="navbarItem"
             :class="{active:index === currentIndex}"
             @click="itemClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "detailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0
      }
    },
    methods:{
      itemClick(index){
        this.currentIndex = index;
        this.$emit('titleClick',index)
      },
      backClick(){
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .navbar{
    display: flex;
  }
  .navbarItem{
    flex: 1;
    font-size: 14px;
  }
  .active{
     color: var(--color-high-text);
  }
  .back img {
    margin-top: 12px;
  }
</style>
