<script setup lang="ts">

import MenuPlus from '@/views/MenuPlus.vue'
import { ref, onMounted } from "vue";
import emitter from '@/utils/eventBus'
import {menus} from "@/api/api";

let menuData = ref<Array<any>>([])
menus().then(res=>{
  menuData.value = res.data
  emitter.emit('menus', {menus: menuData.value})
})

let active = ref<string>('1');
setTimeout(function(){
  activeNav(active.value)
}, 500);

const isScrollDown = ref<boolean>(false);
const isScrollUp = ref<boolean>(false);
emitter.on('scroll', (data: any) => {
  isScrollDown.value = data.scrollDown
  isScrollUp.value = data.scrollUp
})

const goWheel = (deltaY: number) => {
  activeMenu(deltaY)
}
defineExpose({ goWheel })

function activeMenu(deltaY: number) {
  // 向下滚动
  if (deltaY > 0 && isScrollDown.value) {
    let next = parseInt(active.value)+1
    let activeIndex = next % menuData.value.length == 0 ? menuData.value.length.toString() : (next % menuData.value.length).toString()
    // 处理选中菜单对应的导航
    activeNav(activeIndex)
  }
  // 向上滚动
  if (deltaY < 0 && isScrollUp.value) {
    let pre = parseInt(active.value)-1
    let activeIndex = pre <= 0 ? menuData.value.length.toString() : (pre % menuData.value.length).toString()
    // 处理选中菜单对应的导航
    activeNav(activeIndex)
  }
}
function activeNav(activeMenu: number) {
  active.value = activeMenu.toString()
  emitter.emit('navSwitch', {index: active.value})
}

</script>

<template>
  <div class="navClass">
    <el-menu text-color="#FFFFFFFF" active-text-color="#FFFFFFFF" background-color="#ffffff26" :default-active="active" class="el-menu-vertical-custom" :collapse="true" @select="activeNav">
      <el-menu-item :index="menu.index" v-for="menu in menuData">
        <component :is="menu.icon" class="menuIcon"></component>
        <template  #title> {{ menu.name }} </template>
      </el-menu-item>
    </el-menu>
  </div>

  <div class="option">
    <MenuPlus />

    <div class="select next">
      <el-icon><setting /></el-icon>
    </div>
  </div>
</template>

<style scoped>
.navClass {
  margin-top: 40px;
  height: 75%;
}
.el-menu-vertical-custom {
  border-right: 0px!important;
  background-color: transparent;
  height: auto;
}

.el-menu-item .is-active {
  background-color: #ffffff26!important;
}
.menuIcon {
  width: 20px;
  height: 20px;
}

.option{
  text-align: center;
  font-size: 20px;
  color: white;
}
.option .select {
  cursor: pointer;
}
.option .next {
  margin-top: 20px;
}
</style>
