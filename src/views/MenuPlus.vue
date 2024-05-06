<script setup lang="ts">

import { ref } from "vue";

</script>

<template>
  <el-popover placement="right-end" :width="300" trigger="click" :show-arrow="false" :offset="10" popper-class="menu-plus">
    <template #reference>
      <component class="menu-plus-button" is="plus"></component>
    </template>

    <el-row>
      <el-input style="width: 260px;"></el-input>
    </el-row>
    <br>
    <el-row :gutter="4" style="text-align: center">
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
    </el-row>
    <br>
    <el-row :gutter="4" style="text-align: center">
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
    </el-row>
    <br>
    <el-row :gutter="4" style="text-align: center">
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
    </el-row>
    <br>
    <el-row :gutter="4" style="text-align: center">
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
      <el-col :span="3"> <component class="classifyIcon" is="plus"></component></el-col>
    </el-row>
    <br>
    <el-row>
      <el-button type="primary" size="small">确定</el-button>
      <el-button size="small">取消</el-button>
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
</style>
