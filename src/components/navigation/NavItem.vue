<script setup lang="ts">

import {onMounted,onBeforeMount, ref} from "vue";
import emitter from '@/utils/eventBus'
import {navs} from "@/api/api"
import Sortable from 'sortablejs';
//
// let layout = ref<any>([])
// onBeforeMount(async () => {
//   try {
//     const res = await navs(1);
//     layout.value = res.data;
//   } catch (error) {
//     console.error('Error fetching data:', error);
//   }
// });

onMounted(() => {


const grid = document.getElementById("grid");
// const addItemButton = document.getElementById("addItem");

function getNextId() {
  const order = JSON.parse(localStorage.getItem("gridOrder"));
  if (order && order.length > 0) {
    return Math.max(...order.map(id => parseInt(id))) + 1;
  }
  return grid.children.length + 1;
}

let nextId = getNextId();

// addItemButton.addEventListener("click", function() {
//   const newItem = document.createElement("div");
//   newItem.className = "grid-item";
//   newItem.setAttribute("data-id", nextId);
//   newItem.innerText = `Item ${nextId}`;
//   grid.appendChild(newItem);
//   nextId++;
//   saveOrder(); // Save the new order including the new item
// });

function saveOrder() {
  const order = Array.from(grid.children).map(item => item.getAttribute("data-id"));
  localStorage.setItem("gridOrder", JSON.stringify(order));
}

async function loadOrder() {
  const res = await navs(1);
  let ns = res.data;
  if (ns) {
    ns.forEach(x => {
      const item = grid.querySelector(`[data-id='${x.i}']`);
      if (item) {
        grid.appendChild(item);
      } else {
        // Handle case where an item in the order is missing in the grid
        const newItem = createGridItem(x);
        grid.appendChild(newItem);
      }
    });
  }
  /*const order = JSON.parse(localStorage.getItem("gridOrder"));
  console.log(order)
  if (order) {
    order.forEach(id => {
      const item = grid.querySelector(`[data-id='${id}']`);
      console.log(item)
      if (item) {
        grid.appendChild(item);
      } else {
        // Handle case where an item in the order is missing in the grid
        const newItem = createGridItem(id);
        grid.appendChild(newItem);
      }
    });
  }*/
}


function createGridItem(x) {
  const item = document.createElement("div");
  item.className = "grid-item";
  item.setAttribute("data-id", x.i);
  item.innerText = `${x.title}`;
  return item;
}

loadOrder();

  const sortable = new Sortable(grid, {
    animation: 150,
    onEnd: function() {
      saveOrder();
    }
  });
})
</script>

<template>
  <div class="grid-container" id="grid">
<!--
    <div class="grid-item" v-for="item in layout" :data-id="item.i" >{{item.title}}</div>
-->
  </div>
</template>


<style>
.grid-container {
  width: 100%; /* 宽度自适应父元素 */
  height: 100%; /* 高度自适应父元素 */
  display: grid;
  grid-template-columns: repeat(auto-fill, 80px); /* 设置列宽为 45px，自动填充 */
  grid-auto-rows: 80px; /* 设置行高为 45px */
  gap: 20px;
}

.grid-item {
  text-align: center;
  border: 1px solid #e5e4e9;
  grid-column:  span 1;
  grid-row:  span 1;
}

.grid-item2 {
  background-color: #ef342a;
  grid-column:  span 2;
  grid-row:  span 2;
}
</style>