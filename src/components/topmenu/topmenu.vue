<template>
  <div class="topmenu-root">
    <a-menu mode="horizontal" :style="{lineHeight: '64px', fontSize: '20px'}" v-model="keys">
      <a-menu-item key="-1">首页</a-menu-item>
      <a-menu-item v-for="(item, index) in processedData" :key="index">{{ item.name }}</a-menu-item>
    </a-menu>
  </div>
</template>

<script>
import Vue from "vue";
import { Menu } from "ant-design-vue";
Vue.use(Menu);

export default {
  name: "topmenu",
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      keys: ["-1"]
    };
  },
  computed: {
      processedData() {
          const data = this.data
          return data.slice(1)
      }
  }
};
</script>

<style lang="less" scoped>
.topmenu-root {
  width: 100%;
  height: 100%;
}
</style>