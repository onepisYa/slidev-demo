<script setup>
import {compute_total_years} from '../utils/compute-year.js'

const rate = ref(3.5);
const deposit = ref(100_0000);
const annual_expenditure = ref(10_0000);

const rate_percent = computed(() => {
  return rate.value / 100;
});


const years = computed(()=>{
  return compute_total_years(deposit, annual_expenditure, rate_percent)
})

</script>
<script>
import { defineComponent, ref, computed, unref, nextTick } from 'vue';
export default defineComponent({
  name: "Free", components: {}, data() { return {} }, watch: {}, computed: {}, created() { }, mounted() { }, methods: {}
});
</script>
<template>
  <div class="foo">
    利率(%)：<input v-model.number="rate">
    初始资金： <input v-model.number="deposit">
    年度消费：<input v-model.number="annual_expenditure">
  </div>
  可以使用的总年数为：{{ years }}
</template>
  
  
<style scoped>
.foo {
  width: 760px;
  display: flex;
  justify-content: center;
  ;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  flex-direction: column;
}

.table {
  width: 760px;
  border: 1px;
}

table {
  border-collapse: collapse;
  /* 设置边框合并，使得相邻边框无间隙 */
}

td {
  width: 150px;
  height: 80px;
}

tr {

  height: 80px;
}

table,
th,
td {
  border: 1px solid aliceblue;
  /* 设置边框宽度和颜色 */
}



/* th单元格 */
.slash-wrap {
  position: relative;
  box-sizing: border-box;
  width: 150px;
  height: 80px;
}

/* 斜线 */
.slopingside {
  position: absolute;
  display: block;
  top: 0;
  left: 0;
  /* 斜边边长 */
  /* Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2)) */
  /* Math.sqrt(Math.pow(150, 2) + Math.pow(80, 2)) = 170 */
  width: 170px;
  height: 1px;
  background-color: aliceblue;
  /* 旋转角度计算公式 */
  /*  Math.atan(height / width) * 180 / Math.PI  */
  /*  Math.atan(80 / 150) * 180 / Math.PI  = 28.072486935852954 */
  transform: rotate(28.072486935852954deg);
  transform-origin: top left;
}

/* 左下角文字 */
.left {
  position: absolute;
  /* 左下角 left:0; bottom: 0; */
  left: 15px;
  bottom: 15px;
  font-size: 12px;
}

/* 右上角文字 */
.right {
  position: absolute;
  /* 右上角 right:0; top: 0; */
  right: 15px;
  top: 15px;
  font-size: 12px;
}
</style>