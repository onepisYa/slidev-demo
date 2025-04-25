<script setup lang="ts">
// Define target.
const target = ref<HTMLElement>()

// Get the variant from target motion instance.
const { variant, stop, apply } = useMotion(target, {
  initial: {
    scale: 0.1,
    opacity: 0,
  },
  enter: {
    opacity: 0.5,
    scale: 0.5,
    transition: {
      // This will go to `custom` when enter is complete.
      onComplete: () => (variant.value = 'custom'),
    },
  },
  hovered: {
    scale: 1.5,
    transition: {
      delay: 1000,
      duration: 1000
    }
  },
  custom: {
    scale: 1.1,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 100,
    },
  },
})

const customApplyEvent = async () => {
  // Animate to a temporary variant.
  await apply({
    scale: 2,
    transition: {
      type: 'spring',
      damping: 100,
    },
  })

  // Revert back to enter state
  await apply('enter')
}

const customStopEvent = () => {
  // Stop the current animations.
  stop()
}

</script>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import { useMotion } from '@vueuse/motion'

export default defineComponent({
  name: "TestMotion", components: {}, data() { return {} }, watch: {}, computed: {}, created() { }, mounted() { }, methods: {}
});
</script>
<template>

  <div ref="target">
    Effect-1 hover me or other action
  </div>
  <div class="flex gap-2 mt-2">
    <button border-main border-1 w-20 @click="customApplyEvent">apply</button>
    <button border-main border-1 w-20 @click="customStopEvent">stop</button>
  </div>

  <!-- preset  -->
  <Motion is="p" preset="slideVisibleLeft">Text in Motion!</Motion>
  <Motion
    is="div"
    :initial="{ opacity: 0, y: 100 }"
    :enter="{ opacity: 1, y: 0, scale: 1 }"
    :variants="{ custom: { scale: 2 } }"
    :hovered="{ scale: 1.2 , transition:{
      delay: 200,
      duration: 500
    }}"
    :delay="200"
    :duration="1200"
  >
    Content to animate!
  </Motion>

</template>


<style lang='' scoped>

</style>