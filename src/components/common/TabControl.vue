<template>
  <div ref="tabControl" class="TabControl">
    <div 
      class="TabControlItem" 
      v-for="i in title" :key="i.id" 
      @click="switchTabControl(i.id,iIndex)"  
    >
      <div class="ItemBox" :class="{'active':i.id == modelValue}">{{i.text}}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref,reactive,onMounted} from 'vue'
import EventBus from '../../EventBus/index'
interface TabControlDataInt {
  title: Array<{
    id: string,
    text: string
  }>
  modelValue: string
}
const props = defineProps<TabControlDataInt>()
const emit = defineEmits(['update:modelValue','provideTabControl'])

let tabControl = ref<HTMLElemnt>(null)
onMounted(() => {
  emit('provideTabControl',tabControl)
})
function switchTabControl(id: string){
  emit('update:modelValue',id)
  EventBus.emit('switchTabControl',id)
}
</script>

<style scoped lang="less">
.TabControl {
  display: flex;
  width: 100%;
  background-color: #fff;
  .TabControlItem {
    flex: 1;
    display: flex;
    justify-content: center;
    padding: 3vw;
  }
  .ItemBox {
    width: 70%;
    padding-bottom: 3vw;
    text-align: center;
    font-size: 7vw;
  }
  .active {
     border-bottom: 3px solid #000;
  }
}

</style>
