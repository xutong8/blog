<template>
  <div id="app">
      <layout></layout>
  </div>
</template>

<script>
import 'ant-design-vue/dist/antd.css';
import Vue from 'vue'
import layout from './components/layout'
Vue.use(layout)


export default {
  name: "app",
  components: {
    layout
  }
};
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  display: -webkit-flex;
  display: flex;
}
</style>
