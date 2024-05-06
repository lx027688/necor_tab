<script setup lang="ts">
import Menu from '@/views/Menu.vue'
import Nav from '@/views/Nav.vue'
import Clock from "@/views/Clock.vue";
import Search from "@/views/Search.vue";
import { ref } from "vue";

const menuGoWheel = ref<any>();
function goWheel(event: any) {
  menuGoWheel.value.goWheel( event.deltaY);
}
</script>

<template>
  <div class="full-screen" @wheel="goWheel">
    <el-container class="container">
      <el-aside class="aside">
        <div class="avatar">
          <el-avatar/>
        </div>
        <Menu ref="menuGoWheel"/>
      </el-aside>
      <el-container>
        <el-header style="height: auto;">
          <Clock/>
          <Search/>
        </el-header>
        <el-main class="main">
          <Nav/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.full-screen {
  width: 100vw; /* 100% viewport宽度 */
  height: 100vh; /* 100% viewport高度 */
}

.container {
  height: 100%
}

.aside {
  width: 65px;
  background-color: rgba(128, 128, 128, 0.5);
}
.aside .avatar {
  text-align: center;
  margin-top: 30px;
}

.main {
  height: auto;
}

</style>
