<template>
  <navBar v-show="['/Home','/Classification','/Shopcart','/Profile'].includes($route.path)">
    <template v-slot:center>
      bilibili
    </template>
  </navBar>

  
  <navBar v-show="/^(\/Goods)/.test($route.path)" class="goodsNavBar">
    <template v-slot:left>
      <div class="back" @click="$router.back()">&lt;</div>
    </template>
    <template v-slot:center>
      <div class="goodsNavBarItem">
        <div
          class="goodsNavBarItemBox"
          v-for="i in goodsNavBarData"
          :key="i.iid"
          @click="goodsNavBarClick(i.iid)"
        >

        <div class="goodsNavBarItemBox" :class="{'isActive':i.iid == isActive}">
          {{i.title}}
          </div>
        </div>
      </div>
    </template>
  </navBar>
</template>

<script setup lang="ts">
import { ref, reactive,onUnmounted,watch } from "vue";
import navBar from "../common/NavBar.vue";
import EventBus from '../../EventBus/index'
let goodsNavBarData = reactive([
  {iid:'goodsInfo',title:'商品'},
  {iid:'params',title:'参数'},
  {iid:'comment',title:'评论'},
  {iid:'recommend',title:'推荐'}
]);
let isActive = ref<string>('goodsInfo')
function goodsNavBarClick(i){
  isActive.value = i
  EventBus.emit('goodsNavBarClick',isActive.value)

}

function GoodsUpdateActive(i){
  isActive.value = i
  EventBus.emit('GoodsUpdateActiveToo',isActive.value)
}
EventBus.on('GoodsUpdateActive',GoodsUpdateActive)
onUnmounted(() => {
  EventBus.off('GoodsUpdateActive',GoodsUpdateActive)
})
</script>

<style scoped lang="less">
.goodsNavBar{
  background-color: #fff;
}
.back {
  font-size: 44px;
  height: 44px;
  line-height: 35px;
}
.goodsNavBarItem {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 44px;
  .goodsNavBarItemBox {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .goodsNavBarItemBox {
      width: 70%;
      height: 25px;
      line-height: 25px;
      text-align: center;
    }
    .isActive {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>
