<template>
  <Teleport to="#Home">
    <TabControl
      v-show="tabControlIsTop"
      :title="title"
      v-model="isActive"
      style="position: absolute; top: 44px; left: 0; right: 0; z-index:999"
    />
  </Teleport>
  <TabControl
    v-show="!tabControlIsTop.value"
    :title="title"
    v-model="isActive"
    @provideTabControl="provideTabControl"
  />
  <div class="GoodsArea">
    <div
      class="GoodsShow"
      v-for="(i,iIndex) in goodsData[isActive].list"
      :key="iIndex"
      @click="$router.push('/Goods/' + i.iid)"
    >
      <div class="GoodsImg">

        <img
          :src="i.show.img"
          @load="imgLoad"
        >

      </div>
      <div class="GoodsDesc">
        <div class="GoodsTitle">{{i.title}}</div>
        <div class="GoodsMessage">￥{{i.price}}</div>
      </div>
    </div>
  </div>
  <div
    class="GoodsLoading"
    v-show="!goodsData[isActive].isPullingUpNow && !goodsData[isActive].isLastPage"
  ></div>
  <div
    class="GoodsLoading"
    v-show="goodsData[isActive].isPullingUpNow && !goodsData[isActive].isLastPage"
  >正在加载.......</div>
  <div
    class="GoodsLoading"
    v-show="goodsData[isActive].isLastPage"
  >没有更多了</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { HomeRequestGoods } from "../../network/Home.ts";
import TabControl from "../../components/common/TabControl.vue";
import EventBus from "../../EventBus/index";
import { Debunce } from "../../optimization/index";

const emit = defineEmits(["isPullingUp",'getGoodsDataScrollY']);

let isActive = ref<string>("sell");
let title = [
  { id: "sell", text: "热门" },
  { id: "pop", text: "流行" },
  { id: "new", text: "新品" }
];
let goodsData = reactive({
  sell: {
    pageSum: 1,
    isPullingUpNow: false,
    isLastPage: false,
    list: (await HomeRequestGoods("sell", 1)).data.data.list,
  },
  pop: {
    pageSum: 1,
    isPullingUpNow: false,
    isLastPage: false,
    list: (await HomeRequestGoods("pop", 1)).data.data.list,
  },
  new: {
    pageSum: 1,
    isPullingUpNow: false,
    isLastPage: false,
    list: (await HomeRequestGoods("new", 1)).data.data.list,
  }
});
let debunce = new Debunce();
function imgLoad() {
  debunce.debunce(() => {
    EventBus.emit("refreshHome");
  }, 200)();
}
async function pullingUp() {
  if (
    !goodsData[isActive.value].isPullingUpNow &&
    !goodsData[isActive.value].isLastPage
  ) {
    //为了防止下拉加载A的时候切换到了B，此时isActive是B这种情况
    let tempIsActive = isActive.value;
    goodsData[tempIsActive].isPullingUpNow = true;
    try {
      let res = await HomeRequestGoods(
        tempIsActive,
        goodsData[tempIsActive].pageSum + 1
      );
    } catch {
      goodsData[tempIsActive].isPullingUpNow = false;
    }
    goodsData[tempIsActive].isPullingUpNow = false;
    if (res.status === 204) {
      goodsData[tempIsActive].isLastPage = true;
    }
    else if (res.status == 200) {
      goodsData[tempIsActive].list = reactive([
        ...goodsData[tempIsActive].list,
        ...res.data.data.list
      ]);
      
      goodsData[tempIsActive].pageSum++;
    }
  }
}
let tabControl = ref(null);
let tabControlIsTop = ref(false);
function scrolling(e: any) {
  if (-e.y >= tabControl.value.offsetTop && !tabControlIsTop.value){
    tabControlIsTop.value = true;
    emit('getGoodsDataScrollY',e.y)
  }
  else if(-e.y < tabControl.value.offsetTop && tabControlIsTop.value) {
    tabControlIsTop.value = false;
    emit('getGoodsDataScrollY',0)
  }
 
}
function provideTabControl(i) {
  tabControl = i;
}

onMounted(() => {
  EventBus.on("pullingUp", pullingUp);
  EventBus.on("scrolling", scrolling);
});
onBeforeUnmount(() => {
  EventBus.off("pullingUp", pullingUp);
  EventBus.off("scrolling", scrolling);
});
</script>

<style scoped lang="less">
.GoodsArea {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  .GoodsShow {
    display: flex;
      align-items: center;
    position: relative;
    margin-top: 5vw;
    width: 45%;
    .GoodsImg {
      width: 100%;
      img {
        width: 100%;
        padding-bottom: 30vw;
      }
    }
    .GoodsDesc {
      position: absolute;
      bottom: 0;
      .GoodsTitle {
        margin: 3vw;
        font-size: 5vw;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .GoodsMessage {
        margin: 3vw;
        font-size: 5vw;
        color: red;
      }
    }
  }
}
.GoodsLoading {
  height: 20vw;
  line-height: 20vw;
  text-align: center;
  font-size: 5vw;
}
</style>

