<script setup>
import {compute_total_years} from '../utils/compute-year.js'
const rate = ref(3.5);
const rate_percent = computed(() => {
  return rate.value / 100;
});

// 消费
const annual_expenditure_array = ref([10_0000, 20_0000, 30_0000, 40_0000, 50_0000, 75_0000, 100_0000])
// 存款
const deposit_array = ref([100_0000, 200_0000, 300_0000, 400_0000, 500_0000, 750_0000, 1000_0000])

</script>
<script>
import { defineComponent, ref, computed, unref, nextTick } from 'vue';
export default defineComponent({
  name: "Free", components: {}, data() { return {} }, watch: {}, computed: {}, created() { }, mounted() { }, methods: {}
});
</script>
<template>
  <div class="scrollable">
    <div class="p-y-4">利率: <input v-model.number="rate" placeholder="请输入利率"/></div>
  <table class="table">
    <caption
      style=" vertical-align: middle; text-align: center; line-height:80px;font-size: 40px;border: 1px solid aliceblue;height: 80px;;">
       你的存款能用多少年？(利率为{{ rate }}%)</caption>
    <thead>
      <tr>
        <th class="slash-wrap">
          <span class="left">年度花费(元)</span>
          <span class="slopingside"></span>
          <span class="right">初始存款(元)</span>
        </th>
        <th v-for="deposit in deposit_array " :key="annual_expenditure">
          {{ deposit }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="annual_expenditure in annual_expenditure_array " :key="deposit">
        <th>
          {{ annual_expenditure }}
        </th>
        <th v-for="deposit in deposit_array " :key="annual_expenditure">
          {{ compute_total_years(deposit, annual_expenditure, rate_percent) }}</th>
      </tr>
    </tbody>
  </table>
  </div>

</template>
  
  
<style scoped>
.foo {
  width: 760px;
  display: flex;
  justify-content: center;
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
  width: 153px;
  height: 1px;
  background-color: aliceblue;
  /* 旋转角度计算公式 */
  /*  Math.atan(height / width) * 180 / Math.PI  */
  /*  Math.atan(80 / 150) * 180 / Math.PI  = 28.072486935852954 */
  transform: rotate(31.072487deg);
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