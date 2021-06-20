<template>
  <div class="category-detai">
    <goods-list :goods="contentDetail"/>
  </div>
</template>

<script>
  import GoodsList from "components/content/goods/GoodsList";
  export default {
    name: "CategoryDetail",
    components: {
      GoodsList
    },
    props: {
      contentDetail: {
        type:Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>

</style>
