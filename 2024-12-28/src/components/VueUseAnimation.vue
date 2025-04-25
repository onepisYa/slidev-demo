<script setup lang="ts">
import type { MaybeElement } from '@vueuse/core'
import { useAnimate } from '@vueuse/core'
import { reactive, shallowRef } from 'vue'

import { reactify } from '@vueuse/shared'
import YAML from 'js-yaml'

const stringify = reactify(
  (input: any) => YAML.dump(input, {
    skipInvalid: true,
    forceQuotes: true,
    condenseFlow: true,
    noCompatMode: true,
    quotingType: '\'',
  }),
)

const el = shallowRef<MaybeElement>()

const {
  play,
  pause,
  reverse,
  finish,
  cancel,
  startTime,
  currentTime,
  playbackRate,
  playState,
  replaceState,
  pending,
} = useAnimate(
  el,
  [
    { clipPath: 'circle(20% at 0% 30%)' },
    { clipPath: 'circle(20% at 50% 80%)' },
    { clipPath: 'circle(20% at 100% 30%)' },
  ],
  {
    duration: 3000,
    iterations: 5,
    direction: 'alternate',
    easing: 'cubic-bezier(0.46, 0.03, 0.52, 0.96)',
  },
)

const text = stringify(reactive({
  startTime,
  currentTime,
  playbackRate,
  playState,
  replaceState,
  pending,
}))

</script>

<template>
  <div>
    <div class="flex items-center justify-center w-full h-60">
      <p ref="el" class="text-5xl! text-$vp-c-brand font-800">
        VueUse useAnimate
      </p>
    </div>
    <div class="demo space-x-2">
      <button v-if="playState === 'running'" @click="pause">
        pause
      </button>
      <button v-else @click="play">
        play
      </button>
      <button @click="reverse">
        reverse
      </button>
      <button @click="finish">
        finish
      </button>
      <button @click="cancel">
        cancel
      </button>
      <pre class="code-block text-2">{{ text }}</pre>
    </div>
  </div>
</template>

<style lang="css" scoped>
.demo {
  font-size: 24px;
  background: #161618;
  padding: 2em;
  position: relative;
  margin-bottom: 10px;
  border-radius: 8px;
  transition: background-color .5s;
}

.demo p {
  margin: .5rem 0
}

.demo button {
  width: 7em;
  padding: 3px 15px;
  background-color: #44bd87;
  border: none;
  outline: none;
  color: #fff;
  margin: .5rem 0;
  border-bottom: 2px solid #249252;
  text-shadow: 1px 1px 1px #249252;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  vertical-align: middle
}

.code-block{
    background-color: #202127 !important;
    padding: 4px 8px;
    margin: 12px 0;
    border-radius: 4px;
}

</style>
