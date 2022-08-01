<template>
  <navBar />
  <router-view v-slot:default="{route,Component}">
    <keep-alive exclude="Goods">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
  <tabBar />
</template>

<script setup lang="ts">
import navBar from "./components/content/NavBar.vue";
import tabBar from "./components/content/TabBar.vue";
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
</style>
