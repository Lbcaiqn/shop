<template>
  <tabBar v-show="['/Home','/Classification','/Shopcart','/Profile'].includes($route.path)" :tabBarData="data" />
  <div class="GoodsTabBar" v-show="/^(\/Goods)/.test($route.path)">
    <div class="GoodsTabBarOpt">
      <div>客服</div>
      <div>店铺</div>
      <div>收藏</div>
    </div>
    <div class="GoodsTabBarBtn">
      <div>加入购物车</div>
      <div>立即购买</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import tabBar from '../common/TabBar.vue'
const data = [
  {
    title: '首页',
    icon: 'aaa',
    activeIcon: 'bbb',
    route: '/Home'
  },
  {
    title: '分类',
    icon: 'aaa',
    activeIcon: 'bbb',
    route: '/Classification'
  },
  {
    title: '购物车',
    icon: 'aaa',
    activeIcon: 'bbb',
    route: '/Shopcart'
  },
  {
    title: '我的',
    icon: 'aaa',
    activeIcon: 'bbb',
    route: '/Profile'
  }
]
</script>

<style scoped lang="less">
.GoodsTabBar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  line-height: 49px;
  text-align: center;
  width: 100%;
  .GoodsTabBarOpt {
    width: 50%;
    display: flex;
    >div {
      flex: 1;
    }
  }
  .GoodsTabBarBtn {
    width: 50%;
    display: flex;
    >div  {
      flex: 1;
    }
  }
}
</style>
