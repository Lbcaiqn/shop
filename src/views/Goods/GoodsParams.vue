<template>
  <div id="GoodsParams" ref="GoodsParams">
    <div class="paramsInfo">
      <div class="paramsTitle">{{data?.info?.key}}</div>
      <table>
        <tr
          v-for="(i,iIndex) in data?.info?.set"
          :key="iIndex"
        >
          <td>{{i.key}}</td>
          <td>{{i.value}}</td>
        </tr>
      </table>
    </div>

    <div class="paramsRule">
      <div class="paramsTitle">{{data?.rule?.key}}</div>
      <table v-for="(i,iIndex) in data?.rule?.tables" :key="iIndex">
        <tr
          v-for="(j,jIndex) in i"
          :key="iIndex"
        >
          <td v-for="(k,kIndex) in j" :key="kIndex">{{k == '' ? '-': k}}</td>
        </tr>
      </table>
      <div class="paramsDesc">{{data?.rule?.desc}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,onMounted} from 'vue'
const props = defineProps<{ data: any }>();
const emit = defineEmits(['getDom'])
let GoodsParams = ref<HTMLElement>(null)
onMounted(() => {
  emit('getDom',{
    name: 'params',
    Dom: GoodsParams
  })
})
</script>

<style scoped lang="less">
#GoodsParams {
  margin: 5vw;
  margin-top: 15vw;
  font-size: 6vw;
}
.paramsTitle {
  margin: 15vw 0 5vw 0;
  font-size: 8vw;
}

td {
  padding: 2vw;
  text-align: center;
}
.paramsInfo {
  td {
    width: 60%;
  }
  td:nth-child(1) {
    width: 40%;
    text-align: left;
    font-weight: bold;
  }
}
.paramsRule {
  td {
    width: 20%;
  }
  td:nth-child(1){
    text-align: left;
    font-weight: bold;
  }
  
}
.paramsDesc {
  margin: 5vw 0;
  font-size: 6vw;
}
</style>
