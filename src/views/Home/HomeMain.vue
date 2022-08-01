<template>
  <Swiper :swiperData="bannerList" />
  <div class="Recommend">
    <div class="RecommendItem" v-for="(i,iIndex) in recommendData" :key="iIndex">
      <div><img :src="i.image" alt=""></div>
      <div>{{i.title}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Swiper from '../../components/common/Swiper.vue'
import {HomeRequestMultidata} from '../../network/Home.ts'
let data = (await HomeRequestMultidata()).data.data
let bannerData = data.banner.list
let recommendData = data.recommend.list

let bannerList: Array<string> = []
for(let i of bannerData)  bannerList.push(i.image)



</script>

<style scoped lang="less">
.Recommend {
  display: flex;
  margin: 10vw 0;
  .RecommendItem {
    flex: 1;
    text-align: center;
    font-size: 1.5vw;
    img {
      margin-bottom: 2vw;
      width: 15vw;
      border-radius: 7.5vw;
    }
  }
}
</style>
