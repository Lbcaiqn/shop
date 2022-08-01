<template>
  
</template>

<script setup>
let m = new Map()
// m.set('1',1)
// m.set('1',m.get('1')+1 | 1)
// m.set('1',m.get('1')+1 | 1)
// m.set('1',m.get('1') | 1)
// m.set('1',1)
m.set('1',m.get('1')+1 || 1)
m.set('1',m.get('1')+1 || 1)


console.log(m.get('1'))
console.log(m)
</script>

<style>

</style>
