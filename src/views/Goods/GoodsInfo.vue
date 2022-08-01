<template>
  <div id="GoodsInfo">
    <Swiper
      class='swiper"'
      v-if="data"
      :swiperData="data?.info?.topImages"
      @imgLoad="debunce.debunce(() => emit('imgLoad'),100)()"
    />
    <div class="title">{{data?.info?.title}}</div>

    <div class="price">
      <div class="newPrice">{{data?.info?.price}}</div>
      <div class="oldPrice">{{data?.info?.oldPrice}}</div>
      <div
        v-show="data?.info?.discountDesc"
        class="tagPrice"
        :style="{backgroundColor: data?.info?.discountColor}"
      >{{data?.info?.discountDesc}}</div>
    </div>

    <div class="sellData">
      <div
        class="sellDataItem"
        v-for="(i,iIndex) in data?.columns"
        :key="iIndex"
      >
        {{i}}
      </div>
    </div>

    <div class="services">
      <div
        class="servicesItem"
        v-for="(i,iIndex) in data?.shopInfo.services"
        :key="iIndex"
      >
        <img :src="i.icon">
        <div>{{i.name}}</div>
      </div>
    </div>

    <div class="shopInfo">
      <div class="shopTitle">
        <img :src="data?.shopInfo?.shopLogo" />
        <div>{{data?.shopInfo?.name}}</div>
      </div>
      <div class="shopData">
        <div class="shopSum">
          <div class="shopSumItem">
            <div>{{data?.shopInfo?.cGoods}}</div>
            <div>总宝贝</div>
          </div>
          <div class="shopSumItem">
            <div>{{data?.shopInfo?.cSells}}</div>
            <div>总销量</div>
          </div>
          <div class="shopSumItem">
            <div>{{data?.shopInfo?.cFans}}</div>
            <div>总粉丝</div>
          </div>
        </div>
        <div class="shopScore">
          <div
            class="shopScoreItem"
            v-for="(i,iIndex) in data?.shopInfo?.score"
            :key="iIndex"
          >
            <div class="left">{{i.name}}</div>
            <div class="mid" :class="{'isBetter':i.isBetter}">{{i.score}}</div>
            <div class="right" v-show="i.isBetter"><div style="background-color: red;">高</div></div>
            <div class="right" v-show="!i.isBetter"><div style="background-color: green;">低</div></div>
          </div>
        </div>
        <div class="gotoShop">进店看看</div>
      </div>
    </div>

    <div class="detail">
      <div class="desc">{{data?.detailInfo?.desc}}</div>
      <div class="imgs">
        <div class="imgsItem" v-for="(i,iIndex) in data?.detailInfo?.detailImage" :key="iIndex">
          <div class="imgsKey">{{i.key}}</div>
          <div class="imgsDesc">{{i.desc}}</div>
          <div class="imgsList" v-for="(j,jIndex) in i.list" :key="jIndex">
            <img :src="j" @load="debunce.debunce(() => emit('imgLoad'),100)()" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import Swiper from "../../components/common/Swiper.vue";
import {Debunce} from '../../optimization/index'
let debunce = new Debunce()
defineProps<{ data: any }>();
const emit = defineEmits(["imgLoad"]);
</script>

<style scoped lang="less">
.swiper {
}
.title {
  margin: 5vw;
  font-size: 7vw;
}
.price {
  display: flex;
  margin: 5vw;
  margin-top: 0;
  height: 10vw;
  .newPrice {
    margin-right: 4vw;
    font-size: 6vw;
    line-height: 10vw;
    color: red;
  }
  .oldPrice {
    margin-right: 4vw;
    font-size: 3vw;
    line-height: 12vw;
    text-decoration: line-through;
    color: red;
  }
  .tagPrice {
    width: 18vw;
    font-size: 5vw;
    line-height: 10vw;
    text-align: center;
    border-radius: 2vw;
    color: #fff;
    background-color: red;
  }
}

.sellData {
  margin: 5vw;
  margin-top: 0;
  display: flex;
  .sellDataItem {
    flex: 1;
    font-size: 5vw;
  }
}
.services {
  display: flex;
  flex-wrap: wrap;
  margin: 5vw;
  margin-top: 0;
  .servicesItem {
    display: flex;
    margin: 1vw 0;
    width: 30%;
    img {
      margin-right: 1vw;
      height: 3vw;
    }
    div {
      height: 3vw;
      line-height: 2.5vw;
      font-size: 2vw;
    }
  }
}
.shopInfo {
  margin: 5vw;
  margin-top: 0;
  .shopTitle {
    display: flex;
    img {
      margin-right: 3vw;
      width: 8vw;
    }
    div {
      height: 8vw;
      line-height: 8vw;
      font-size: 7vw;
    }
  }
  .shopData {
    .shopSum {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 30vw;
      .shopSumItem {
        flex: 1;
        text-align: center;
        font-size: 7.5vw;
      }
    }
    .shopScore {
      height: 30vw;
      .shopScoreItem {
        display: flex;
        div {
          flex: 1;
  
          margin: 1vw;
          text-align: center;
          font-size: 5vw;
          color: green;
          div {
            margin: 0 auto;
            width: 7vw;
            height: 7vw;
            line-height: 7vw;
            color: #fff;
          }
        }
        .left {
          color: #000;
        }
        .isBetter {
          color: red;
        }
        
      }
    }
    .gotoShop {
      margin: 3vw 0;
      font-size: 6vw;
      text-align: center;
    }
  }
}
.detail {
  margin: 10vw 5vw 5vw 5vw;
  .desc {
    font-size: 6vw;
  }
  .imgs {
    margin: 5vw 0;
    font-size: 5vw;
    .imgsKey, .imgsDesc {
      margin: 3vw 0;
    }
    img {
      width: 100%;
    }
  }
}
</style>
