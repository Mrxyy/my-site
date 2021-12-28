<template>
  <resume :class="currenTheme"></resume>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import resume from "./modules/resume/index.vue";
import resumeMenu from "./components/menu/Circle.vue"

interface Data { }

export default defineComponent({
  components: {
    resume,
  },
})
</script>

<style lang="scss">
:root {
  font-size: 14px;
}

html,body,#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin:0;
  padding:0;
}
</style>
