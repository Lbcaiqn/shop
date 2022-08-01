<template>
  <div id="GoodsRecommend" ref="GoodsRecommend">
    <div class="title">商品推荐</div>
    <div
      class="content"
      v-if="data?.list"
    >
      <div
        class="contentItem"
        v-for="(i,iIndex) in data?.list"
        :key="iIndex"
      >
        <div><img
            :src="i.image"
            @imgLoad="debunce.debunce(() => emit('imgLoad'),100)()"
          /></div>
        <div class="text">{{i.title}}</div>
        <div class="price">￥{{i.price}}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive,onMounted } from "vue";
import { GoodsRequestRecommend } from "../../network/Goods";
import { Debunce } from "../../optimization/index";

let GoodsRecommend = ref<HTMLElement>(null)
onMounted(() => {
  emit('getDom',{
    name: 'recommend',
    Dom: GoodsRecommend
  })
})

let debunce = new Debunce();
const emit = defineEmits(["imgLoad",'getDom']);
let data: any = reactive({});
GoodsRequestRecommend().then(res => {
  data.list = res.data.data.list;
});

</script>

<style scoped lang="less">
#GoodsRecommend {
  margin: 5vw;
}
.title {
  margin: 5vw 0;
  font-size: 8vw;
  text-align: center;
}
.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .contentItem {
    width: 45%;
    img {
      width: 100%;
    }
    .text {
      margin: 3vw 0;
      font-size: 5vw;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .price {
      margin-bottom: 5vw;
      font-size: 5vw;
      color: red;
    }
  }
}
</style>
