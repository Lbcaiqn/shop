<template>
  <div id="tabBar">
    <div 
      class="tabBarItem" 
      v-for="(i,iIndex) in tabBarData" 
      :key="iIndex"
      @click="$router.replace(i.route)"
      >
      <div>{{i.title}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface tabBarDataInt {
  tabBarData: Array<{
    title: string,
    icon: string,
    activeIcon: string,
    route: string
  }>
}
defineProps<tabBarDataInt>()
</script>

<style scoped lang="less">
#tabBar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 49px;
  .tabBarItem {
    flex: 1;
    text-align: center;
  }
}
</style>
