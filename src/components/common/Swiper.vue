<template>
  <!--
    1.左右轮播图
    布局：每个图片宽度100%，flex布局，overflow: hidden隐藏多出的
    js：只修改第一个图片的margin-left就行
    2.渐变轮播图
    布局：全部图片都绝对定位到同一个位置
    js：修改每个图片的透明度或z-index
  -->
  <div class="swiper">
    <img
      v-for="(i,iIndex) in swiperData"
      :key="iIndex"
      :src="i"
      @load="imgLoad"
    >
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

interface swiperDataInt {
  swiperData: Array<srting>;
}
const d = defineProps<swiperDataInt>();
const emit = defineEmits(["imgLoad"]);

let cnt = 0;
function imgLoad() {
  emit("imgLoad");
}
onMounted(() => {
  let imgs = document.querySelectorAll(".swiper img");
  if (imgs.length >= 2) {
    setInterval(() => {
      imgs[0].style.marginLeft = `${-100 * (cnt + 1)}%`;
      cnt++;
      if (cnt == imgs.length - 1) cnt = -1;
    }, 2500);
  }
});
</script>

<style scoped lang="less">
.swiper {
  display: flex;
  overflow: hidden;
  img {
    width: 100%;

    transition: all 1s;
  }
}
</style>
