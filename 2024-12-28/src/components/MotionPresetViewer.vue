<script setup="props" lang="ts">
import {
  fade,
  fadeVisible,
  fadeVisibleOnce,
  pop,
  popVisible,
  popVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  rollVisibleRight,
  rollVisibleTop,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
  slideVisibleRight,
  slideVisibleTop,
} from '@vueuse/motion'

import MotionPresetSection from './MotionPresetSection.vue';

const presets = {
  fade,
  fadeVisible,
  fadeVisibleOnce,
  rollBottom,
  rollLeft,
  rollRight,
  rollTop,
  rollVisibleBottom,
  rollVisibleLeft,
  rollVisibleRight,
  rollVisibleTop,
  rollVisibleOnceBottom,
  rollVisibleOnceLeft,
  rollVisibleOnceRight,
  rollVisibleOnceTop,
  pop,
  popVisible,
  popVisibleOnce,
  slideBottom,
  slideLeft,
  slideRight,
  slideTop,
  slideVisibleBottom,
  slideVisibleLeft,
  slideVisibleRight,
  slideVisibleTop,
  slideVisibleOnceBottom,
  slideVisibleOnceLeft,
  slideVisibleOnceRight,
  slideVisibleOnceTop,
}
</script>

<template>
  <div class="presetsViewer">
    <MotionPresetSection v-for="[key, preset] in Object.entries(presets)" :key="key" :name="key" :preset="preset" />
  </div>
</template>

<style scoped>
.presetsViewer {
  display: flex;
  flex-direction: column;
}
</style>