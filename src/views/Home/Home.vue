<template>
  <div id="Home">
    <Scroller
      ref="scroller"
      :size="scrollData.size"
      :config="scrollData.config"
      @provideScroll="getScroll($event)"
    >
   
      <Suspense>
        <HomeMain />
      </Suspense>
      <Suspense>
        <HomeGoods @getGoodsDataScrollY="getGoodsDataScrollY" />
      </Suspense>

    </Scroller>
    <div class="BackTop" v-show="isShowBackTop" @click="backTop"><img src="../../assets/img/backTop.png" /></div>
    
  </div>

</template>

<script setup lang="ts">
import Scroller from "../../components/common/Scroller.vue";
import {
  ref,
  reactive,
  onMounted,
  onUnmounted,
  onBeforeUnmount,
  onActivated,
  onDeactivated,
  defineAsyncComponent
} from "vue";
import {onBeforeRouteLeave} from 'vue-router'
const HomeMain = defineAsyncComponent(() => import("./HomeMain.vue"));
const HomeGoods = defineAsyncComponent(() => import("./HomeGoods.vue"));

import EventBus from "../../EventBus/index";


let scroller = ref<HTMLElement>(null);
let scroll: any = null;
let scrollData = {
  size: {
    top: "44px",
    right: 0,
    bottom: "49px",
    left: 0
  },
  config: {
    probeType: 3,
    click: true,
    pullUpLoad: true
  }
};
let isShowBackTop = ref(false)
let deactivatedY = ref<number>(0)

function getScroll(i: any) {
  scroll = i;
}
function refresh() {
  if (scroll) scroll.refresh();
}
function backTop(){
  scroll.scrollTo(0,0,1000)
}
function scrolling(e){
  if(-e.y >= 400) isShowBackTop.value = true
  else isShowBackTop.value = false
  deactivatedY.value = e.y == 0 ? deactivatedY.value : e.y
}

let goodsDataScrollY = ref(0)
function switchTabControl(isActive: any){
  if(goodsDataScrollY != 0){
    scroll.refresh()
    scroll.scrollTo(0,goodsDataScrollY.value)
  }
}
function getGoodsDataScrollY(scrollY: any){
  goodsDataScrollY.value = scrollY
}

onMounted(() => {
  EventBus.on("refreshHome", refresh);
  EventBus.on("scrolling", scrolling);
  EventBus.on('switchTabControl',switchTabControl)
});
onBeforeUnmount(() => {
  EventBus.off("refreshHome", refresh);
  EventBus.off("scrolling", scrolling);
  EventBus.off('switchTabControl',switchTabControl)
});

onActivated(() => {
  scroll.refresh()
  scroll.scrollTo(0,deactivatedY.value)
})
onDeactivated(() => {
  scroll.scrollTo(0,0)
})
</script>


<style scoped lang="less">
.BackTop {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30vw;
  right: 10vw;
  z-index: 999;
  width: 20vw;
  height: 20vw;
  border-radius: 10vw;
  background-color: #fff;
  img {
    width: 50%;
  }
}

</style>
