<template>
  <div class="scroller" ref="scroller">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import bscroll from 'better-scroll'
import EventBus from '../../EventBus/index'
import {Debunce,Throttle} from '../../optimization/index'

interface ScrollDataInt {
  size: {
    top: string | number,
    right: string | number,
    bottom: string | number,
    left: string | number
  },
  config: {
    probeType: number,
    click: boolean,
    pullUpLoad: boolean
  }
}
const props = defineProps<ScrollDataInt>()
const emit = defineEmits(['provideScroll','scrolling'])

let scroller = ref<HTMLElement>(null)
let scroll: any = null
let debunce = new Debunce, throttle = new Throttle()

onMounted(() => {
  scroll = new bscroll(scroller.value,{
    probeType: props.config.probeType,
    click: props.config.click,
    pullUpLoad: props.config.pullUpLoad
  })
  emit('provideScroll',scroll)
  scroll.on('pullingUp',() => {
    EventBus.emit('pullingUp')
    scroll.finishPullUp()
  })
  scroll.on('scroll',e => {
    EventBus.emit('scrolling',e)
    emit('scrolling',e)
  })
})
</script>
<style scoped lang="less">
.scroller {
  position: absolute;
  top: v-bind('size.top');
  bottom: v-bind('size.bottom');
  left: v-bind('size.left');
  right: v-bind('size.right');
  overflow: hidden;
}
</style>
