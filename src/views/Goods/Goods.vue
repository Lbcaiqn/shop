<template>
  <div id="Goods">
    <scroller
      :size="{top: '44px', right: 0, bottom: '49px', left: 0}"
      :config="{probeType: 3, click: true, pullUpLoad: true}"
      @provideScroll="getScroll"
      @scrolling="scrolling"
    >
      <GoodsInfo :data="data.info" @imgLoad="refresh" />
      <GoodsParams :data="data.params" @getDom="SonDom['params'] = $event.Dom" />
      <GoodsComment :data="data.rate" @getDom="SonDom['comment'] = $event.Dom" />
      <GoodsRecommend @getDom="SonDom['recommend'] = $event.Dom" />
    </scroller>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,onBeforeMount,onMounted,onBeforeUnmount} from 'vue'
import {useRoute,useRouter} from 'vue-router'
import {GoodsRequestDetail} from '../../network/Goods'

import Scroller from "../../components/common/Scroller.vue";
import GoodsInfo from './GoodsInfo.vue'
import GoodsParams from './GoodsParams.vue'
import GoodsComment from './GoodsComment.vue'
import GoodsRecommend from './GoodsRecommend.vue'

import EventBus from '../../EventBus/index'
import {Debunce} from '../../optimization/index'
const debunce = new Debunce()
let route = useRoute()
let data = reactive<{data: any}>({})
GoodsRequestDetail(route.params.iid).then(res => {
  
  data.info = reactive({
    info: res.data.result.itemInfo,
    columns: res.data.result.columns,
    shopInfo: res.data.result.shopInfo,
    detailInfo: res.data.result.detailInfo
  })
  data.params = res.data.result.itemParams
  data.rate = res.data.result.rate
})

let scroll: any
function getScroll(i){
  scroll = i
}
function refresh(){
  scroll.refresh()
}

let SonDom: any = {
  params: null,
  comment: null,
  recommend: null
}
let isActive = ref<string>('goodsInfo')
function goodsNavBarClick(i: any){
  isActive.value = i
  if(i == 'goodsInfo') scroll.scrollTo(0,0,1000)
  else scroll.scrollTo(0,-SonDom[i].value.offsetTop+100,1000)
}
function scrolling(e){
  if(-e.y >= 0 && -e.y < SonDom['params'].value.offsetTop - 100 && isActive.value != 'shopInfo'){
    EventBus.emit('GoodsUpdateActive','goodsInfo')
  }
  else if(-e.y >= SonDom['params'].value.offsetTop  - 100 && -e.y < SonDom['comment'].value.offsetTop  - 100 && isActive.value != 'params'){
    EventBus.emit('GoodsUpdateActive','params')  
  }
  else if(-e.y >= SonDom['comment'].value.offsetTop - 100 && -e.y < SonDom['recommend'].value.offsetTop  - 100 && isActive.value != 'recomment'){
    EventBus.emit('GoodsUpdateActive','comment')
  }
  else if(-e.y >= SonDom['recommend'].value.offsetTop - 100 && isActive.value != 'recommend'){
    EventBus.emit('GoodsUpdateActive','recommend')
    
  }
}

function GoodsUpdateActiveToo(i){
  isActive.value = i
}
onMounted(() => {
  EventBus.on('goodsNavBarClick',goodsNavBarClick)
  EventBus.on('GoodsUpdateActiveToo',GoodsUpdateActiveToo)

})
onBeforeUnmount(() => {
  EventBus.off('goodsNavBarClick',goodsNavBarClick)
  EventBus.off('GoodsUpdateActiveToo',GoodsUpdateActiveToo)
  EventBus.emit('GoodsUpdateActive','goodsInfo')
})


</script>

<style>

</style>
