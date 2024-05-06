<script setup lang="ts">

import { ref } from "vue";
import emitter from '@/utils/eventBus'
import {navs} from "@/api/api"

let layout = ref<any>([])

/*let items = localStorage.getItem('items')
if (items == null || items == '' || (typeof items === 'undefined')) {
  layout.value = [
    {"x":0,"y":0,"w":2,"h":1,"i":"0","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":0,"y":1,"w":2,"h":1,"i":"1","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":0,"y":2,"w":2,"h":1,"i":"2","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":0,"y":3,"w":2,"h":1,"i":"3","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":2,"y":0,"w":2,"h":1,"i":"4","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":2,"y":1,"w":2,"h":1,"i":"5","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":2,"y":2,"w":2,"h":1,"i":"6","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":2,"y":3,"w":2,"h":1,"i":"7","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":4,"y":0,"w":2,"h":1,"i":"8","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":4,"y":1,"w":2,"h":1,"i":"9","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":4,"y":2,"w":2,"h":1,"i":"10","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":4,"y":3,"w":2,"h":1,"i":"11","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":6,"y":0,"w":2,"h":1,"i":"12","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":6,"y":1,"w":2,"h":1,"i":"13","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":6,"y":2,"w":2,"h":1,"i":"14","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":6,"y":3,"w":2,"h":1,"i":"15","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":8,"y":0,"w":2,"h":1,"i":"16","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":8,"y":1,"w":2,"h":1,"i":"17","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":8,"y":2,"w":2,"h":1,"i":"18","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"},
    {"x":8,"y":3,"w":2,"h":1,"i":"19","title": "百度","url":"https://www.baidu.com","img":"src/assets/imgs/navs/baidu.png"}
  ]
  localStorage.setItem('items', JSON.stringify(layout.value));
}else {
  layout.value = JSON.parse(items)
}*/

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
