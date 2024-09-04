<script setup lang="ts">

import {getMenuIcons, addMenu as addMenu2 } from "@/api/api";

import {onMounted, ref, defineEmits} from "vue";

// 获取menuIcon 并渲染
let icons = ref<Array<any>>([])
onMounted(async () => {
  try {
    let res = await getMenuIcons();
    icons.value = res.data
    // emitter.emit('menus', {menus: icons.value})
  } catch (error) {
    console.error('加载菜单icon数据时出错', error)
  }
});

// ---------------------- 处理选中的menuIcon --------------------------
// 当前选中的的menuIcon
let currentClickedElement = ref<any>(null)
// 新的menu
let newMenu = ref<any>({})
function selectMenuIcon(icon) {
  currentClickedElement.value = icon.index
  newMenu.value.name = icon.name
  newMenu.value.icon = icon.icon
}

// -------------------------------- 添加菜单 --------------------------------
// 定义添加窗口
const add = ref<any>(null);
const emit = defineEmits(['menuFrush']);

async function addMenu() {
  // 调用添加API
  await addMenu2(newMenu.value)
  // 刷新菜单
  emit('menuFrush');
  // 关闭 menuIcon 窗口
  add.value.hide()
}

</script>

<template>
  <el-popover ref="add" placement="right-end" :width="300" trigger="click" :show-arrow="false" :offset="10" popper-class="menu-plus">
    <template #reference>
      <component class="menu-plus-button" is="plus"></component>
    </template>

    <el-row style="text-align: center">
      <el-col :span="24">
        <el-input style="width: 260px;" v-model="newMenu.name"></el-input>
      </el-col>
    </el-row>
    <br>

    <el-row :gutter="4" style="text-align: center;margin-bottom: 10px;" v-for="groupIndex in Math.ceil(icons.length / 8)" :key="groupIndex" :index="groupIndex.toString()">
      <el-col :span="3" v-for="(icon, index) in icons.slice((groupIndex - 1) * 8, groupIndex * 8)" :key="index" :class="{'bg-gray-200': currentClickedElement === icon.index}">
        <component class="classifyIcon" :is="icon.icon" @click="selectMenuIcon(icon)"></component>
      </el-col>
    </el-row>

    <el-row>
      <el-button type="primary" size="small" @click="addMenu">确定</el-button>
    </el-row>

  </el-popover>
</template>

<style scoped>
.menu-plus .el-popover {
  color: red!important;
  background-color: #14e678 !important;
  border-color: #f56e48 !important;
}

.menu-plus-button {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.classifyIcon {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.bg-gray-200 {
  background-color: #e5e7eb;
}
</style>
