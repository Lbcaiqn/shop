<template>
  <div id="GoodsComment" ref="GoodsComment">
    <div class="title">
      用户评价({{data?.cRate}})
      <div class="right">查看更多&gt;</div>
    </div>
    <div
      class="CommentTitle"
      v-if="data?.list"
    >
      <div class="left"><img :src="data?.list[0]?.user?.avatar" /></div>
      <div class="mid">{{data?.list[0]?.user?.uname}}</div>
    </div>

    <div
      class="CommentContent"
      v-if="data?.list"
    >
      <div class="time">{{formatDatetime(data?.list[0]?.created,'yyyy-0M-0d 0h:0m:0s')}}</div>

      <div class="info">
        <div class="infoStyle">{{data?.list[0]?.style}}</div>

        <div
          class="infoUser"
          v-if="data?.list[0]?.extraInfo"
        >
          <div>{{data?.list[0]?.extraInfo[0]}}</div>
          <div>{{data?.list[0]?.extraInfo[2]}}</div>
          <div>{{data?.list[0]?.extraInfo[1]}}</div>

        </div>
      </div>
      <div class="content">{{data?.list[0]?.content}}</div>
      <div class="imgs" v-if="data?.list[0]?.images">
        <div v-for="(i,iIndex) in data?.list[0]?.images" :key="iIndex"><img :src="i" /></div>
      </div>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {formatDatetime} from '../../tools/index'
const props = defineProps<{ data: any }>();
const emit = defineEmits(['getDom'])
let GoodsComment = ref<HTMLElement>(null)

onMounted(() => {
  emit('getDom',{
    name: 'comment',
    Dom: GoodsComment
  })
})
</script>

<style scoped lang="less">
#GoodsComment {
  margin: 5vw;
  margin-top: 15vw;
}
.title {
  margin: 4vw 0;
  font-size: 7vw;
  .right {
    float: right;
  }
}
.CommentTitle {
  overflow: hidden;
  .left {
    float: left;
    width: 6vw;
    height: 6vw;
    img {
      height: 100%;
      border-radius: 3vw;
    }
  }
  .mid,
  .right {
    margin-left: 2vw;
    float: left;
    height: 6vw;
    line-height: 6vw;
    font-size: 5vw;
  }
}
.CommentContent {
  margin-top: 5vw;
  .info {
    display: flex;
    font-size: 1vw;
    .infoStyle {
      margin-right: 8vw;
    }
    .infoUser {
      display: flex;
      >div {
        margin-right: 2vw;
      }
    }
  }
  .content {
    margin: 5vw 0;
    font-size: 5vw;
  }
  .imgs {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    width: 100%;
    >div {
      width: 25%;
    }
    img {
      margin: 5vw 0;
      width: 100%;
    }
  }
  .time {
    margin-bottom: 2vw;
    font-size: 4vw;
  }
}
</style>
