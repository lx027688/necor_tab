<script setup lang="ts">

import {ref} from "vue";
import emitter from '@/utils/eventBus'
import NavItem from '@/components/navigation/NavItem.vue'

let layout = ref<any>([])

let carousels = ref<any>([])
emitter.on('menus', (data: any) => {
  carousels.value = data.menus
})

let currentNav = ref<number>(0)
const swiper = ref<any>(null)
emitter.on('navSwitch', (data: any) => {
  currentNav.value = data.index
  swiper.value.setActiveItem(data.index.toString())
  // navs(data.index).then(res=>{
  //   layout.value = res.data
  // })
})

const myDivs = ref(null)
function isScrolledNav(deltaY: number) {
  let myDiv =  myDivs.value[currentNav.value-1]
  let scrollUp = myDiv.scrollTop === 0
  let scrollDown = Math.abs(myDiv.scrollHeight - myDiv.scrollTop - myDiv.clientHeight) <= 1;
  emitter.emit('scroll', {scrollDown: scrollDown, scrollUp: scrollUp})
}
</script>

<template>
  <div style="height: 100%; padding-left: 10%; padding-right: 10%">
    <el-carousel ref="swiper" indicator-position="none" :loop="true" direction="vertical" :autoplay="false" style="height: 100%">
      <el-carousel-item :name="carousel.index" v-for="carousel in carousels">
        <div class="overflow" ref="myDivs"  @wheel="isScrolledNav">
          <NavItem/>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped>
.overflow{
  height: 100% !important;
  overflow: auto!important;
}
</style>