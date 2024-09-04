<script setup lang="ts">

import { ref } from "vue";
import emitter from '@/utils/eventBus'
import {navs} from "@/api/api"

let layout = ref<any>([])

function layoutUpdatedEvent(newLayout: any){
  // localStorage.setItem('items', JSON.stringify(newLayout));
}

let carousels = ref<any>([])
emitter.on('menus', (data: any) => {
  carousels.value = data.menus
})

let currentNav = ref<number>(0)
const swiper = ref<any>(null);
emitter.on('navSwitch', (data: any) => {
  layout.value = []
  currentNav.value = data.index
  swiper.value.setActiveItem(data.index.toString())
  navs(data.index).then(res=>{
    layout.value = res.data
  })
})

const myDivs = ref(null)
function isScrolledNav(deltaY: number) {
  let myDiv =  myDivs.value[currentNav.value-1]
  let scrollUp = myDiv.scrollTop === 0
  let scrollDown = Math.abs(myDiv.scrollHeight - myDiv.scrollTop - myDiv.clientHeight) <= 1;
  emitter.emit('scroll', {scrollDown: scrollDown, scrollUp: scrollUp})
}

function redirectToUrl(url){
  window.location.href = url;
}

</script>

<template>
  <div style="height: 100%; padding-left: 10%; padding-right: 10%">
    <el-carousel ref="swiper" indicator-position="none" :loop="true" direction="vertical" :autoplay="false" style="height: 100%">
      <el-carousel-item :name="carousel.index" v-for="carousel in carousels">
        <div class="overflow" ref="myDivs"  @wheel="isScrolledNav">
          <grid-layout :layout="layout" :auto-size="false" :col-num="24" :row-height="80" :max-rows="6" :is-draggable="true" :is-resizable="false" :margin="[30, 30]" :use-css-transforms="true" @layout-updated="layoutUpdatedEvent">
            <grid-item v-for="item in layout" :key="item.i" :x="item.x" :y="item.y" :w="item.w" :h="item.h" :i="item.i" >
              <div style="text-align: center;" @click="redirectToUrl(item.url)">
                <el-image style="width: 60px; height: 60px;" :src="item.img"/>
                <p style="color: white;font-size: 13px;margin-top: 5px;">{{item.title}}</p>
              </div>
            </grid-item>
          </grid-layout>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
/deep/ .el-carousel__container {
  min-height: 100% !important;
  height: 100%!important;
}

.overflow{
  height: 100% !important;
  overflow: auto!important;
}

.overflow::-webkit-scrollbar {
  /* 隐藏滚动条 */
  width: 0px!important;
  background-color: transparent!important;
}

.overflow::-webkit-scrollbar-thumb {
  /* 隐藏滚动条拇指 */
  background-color: transparent!important;
}
/*.vue-grid-layout>div {
  position: absolute;
  background: indianred;
}*/
</style>
