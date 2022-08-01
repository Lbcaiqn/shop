<template>
  <div class="navBar">
    <div class="left"><slot name="left" /></div>
    <div class="center"><slot name="center" /></div>
    <div class="right"><slot name="right" /></div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.navBar {
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 44px;
  line-height: 44px;
  text-align: center;
  background-color: orange;
  .left {
    width: 60px;
  }
  .center {
    flex: 1;
  }
  .right {
    width: 60px;
  }
}
</style>
