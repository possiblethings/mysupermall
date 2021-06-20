<template>
  <div class="category-content">
    <div class="content" v-for="(item,index) in contentList" :key="index">
      <a :href="item.link">
        <img class="content-img" :src="item.image" alt="">
        <div class="content-text">{{item.title}}</div>
      </a>

    </div>
  </div>

</template>

<script>
  export default {
    name: "CategoryContent",
    props: {
      contentList: {
        type:Array,
        default: []
      }
    }
  }
</script>

<style scoped>
  .category-content {
    right: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
  .content {
    width: 50%;
    margin: 20px 0;
    text-align: center;
  }
  .content-img {
    width: 50%;
  }
  .content-text {
    margin-top: 15px;
    font-size: 14px;
  }
</style>
