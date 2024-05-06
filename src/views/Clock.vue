<script setup lang="ts">
import { ref, onMounted, onBeforeMount  } from 'vue'
let time = ref('16:47:08')
let date = ref('2023-12-01')
let week = ref('星期五')
let timerHelper = ref(null)

function zeroPadding(num, digit) {
  let zero = "";
  for (let i = 0; i < digit; i++) {
    zero += "0";
  }
  return (zero + num).slice(-digit);
}
function updateTime() {
  const weeks = [
    "星期天",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  const cd = new Date();
  time.value = zeroPadding(cd.getHours(), 2) + ":" + zeroPadding(cd.getMinutes(), 2) + ":" +  zeroPadding(cd.getSeconds(), 2);
  date.value = zeroPadding(cd.getFullYear(), 4) + "-" + zeroPadding(cd.getMonth() + 1, 2) + "-" + zeroPadding(cd.getDate(), 2);
  week.value = weeks[cd.getDay()];
}

onMounted(() => {
  timerHelper.value = setInterval(updateTime, 1000)
})
onBeforeMount(() => {
  if (timerHelper.value) {
    clearInterval(timerHelper.value);
    timerHelper.value = false;
  }
})

</script>

<template>
  <div class="crayon-clock">
    <div class="crayon-clock-time">{{ time }}</div>
    <div class="crayon-clock-date">
      <span class="date">{{ date }}</span>
      <span class="week">{{ week }}</span>
    </div>
  </div>
</template>

<style scoped>
.crayon-clock {
  font-family: -apple-system, BlinkMacSystemFont, Roboto, Open Sans, Helvetica Neue, sans-serif;
  color: #fff;
  text-align: center;
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);
}
.crayon-clock-time {
  letter-spacing: 0.05em;
  font-size: 60px;
  padding: 20px 0 0;
}
.crayon-clock-date {
  letter-spacing: 0.1em;
  font-size: 20px;
}
</style>
