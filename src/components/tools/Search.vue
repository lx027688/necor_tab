<script setup lang="ts">
import { ref } from 'vue'

const cont = ref('')
const engine = ref('baidu')

function search(event) {
  switch (engine.value) {
    case  'baidu': {
      var win = window.open('https://www.baidu.com/s?ie=UTF-8&wd='+cont.value, '_blank');
      win.focus();
      break;
    }
    case  'bing': {
      var win = window.open('https://www.bing.com/search?q='+cont.value, '_blank');
      win.focus();
      break;
    }
    case  'google': {
      var win = window.open('https://www.google.com.hk/search?q='+cont.value, '_blank');
      win.focus();
      break;
    }
    default: {
      var win = window.open('https://www.baidu.com/s?ie=UTF-8&wd='+cont.value, '_blank');
      win.focus();
      break;
    }
  }
}
</script>

<template>
  <div class="search">
    <el-input v-model="cont" @keyup.enter="search" placeholder="请输入内容" class="search_input" style="height: 50px;">
      <template #prepend>
        <el-image style="width: 35px; height: 35px;min-width: 35px;margin-left: 5px;margin-bottom: 2px;" src="src/assets/imgs/baidu.png"></el-image>
      </template>
      <template #append>
        <el-button icon="Search" @click="search"/>
      </template>
    </el-input>
  </div>
</template>

<style lang="less">
.search {
  width: auto;
  text-align: center;
  margin-top: 10px;
}
.search .search_input {
  width: 600px;
  height: 50px;
  border:0px;
  --el-input-border-color: #f5f7fa;
  --el-input-focus-border-color: #f5f7fa;
  --el-input-hover-border-color: #f5f7fa;
  .el-input-group__prepend{
    width: 50px!important;
    border-top-left-radius: 33px;
    border-bottom-left-radius: 33px;
  }
  .el-input-group__append{
    border-top-right-radius: 33px;
    border-bottom-right-radius: 33px;
  }
  .el-input__wrapper{
    background-color: #f5f7fa;
  }
}

</style>