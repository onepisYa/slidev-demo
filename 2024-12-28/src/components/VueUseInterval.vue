<script setup lang="ts">
import { useInterval, useIntervalFn } from '@vueuse/core'

import { rand } from '@vueuse/shared'
import { ref } from 'vue'

const { counter, reset, pause, resume } = useInterval(200, { controls: true, immediate: false })

// Fn
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(500)

const { pause: pauseFn, resume: resumeFn, isActive: isActiveFn } = useIntervalFn(() => {
  /* your function do something */
  word.value = greetings[rand(0, greetings.length - 1)]
}, interval, {immediate: false})

</script>

<template>
  <div>
    <h5> useInterval </h5>
    <span> {{ counter }} </span>
    <div class="demo space-x-2">
      <button @click="reset">
        reset
      </button>
      <button @click="pause">
        pause
      </button>
      <button @click="resume">
        resume
      </button>
    </div>
    <h5> useIntervalFn </h5>

    <p>{{ word }}</p>
    <p>
      interval:
      <input v-model="interval" type="number" placeholder="interval">
    </p>
    <div class="demo text-2">
      <button v-if="isActiveFn" class="orange" @click="pauseFn">
        Pause
      </button>
      <button v-if="!isActiveFn" @click="resumeFn">
        Resume
      </button>

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
</style>
