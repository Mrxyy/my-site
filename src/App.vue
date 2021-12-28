<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Data { }

export default defineComponent({
})
</script>

<style lang="scss">
:root {
  font-size: 14px;
}

html,
body,
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
}
</style>
