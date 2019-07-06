<template>
  <div id="app">
    <BaseHeader />
    <div class="main-content">
      <nuxt />
      <nuxt name="aside" />
    </div>
  </div>
</template>

<script>
import BaseHeader from '@/views/BaseHeader'

export default {
  name: 'App',
  components: {
    BaseHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-size: 13px;
}
.main-content {
  width: 936px;
  margin: 0 auto;
}
</style>
