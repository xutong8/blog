<template>
  <div class="sidemenu-root">
      <a-menu mode="inline" :style="{ height: '100%', borderRight: 0 }" :defaultSelectedKeys="defaultSelectedKeys">
          <a-menu-item class="item" key="-1">推荐</a-menu-item>
          <a-menu-item v-for="(item, index) in processedData" :key="index" class="item">
              {{ item.name }}
          </a-menu-item>
      </a-menu>
  </div>
</template>

<script>
import Vue from 'vue'
import { Menu } from 'ant-design-vue'
Vue.use(Menu)

export default {
    name: 'sidemenu',
    props: {
        data: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            defaultSelectedKeys: ['-1']
        }
    },
    computed: {
        processedData() {
            const data = this.data;
            return data.slice(1);
        }
    }
};
</script>

<style lang="less" scoped>
.sidemenu-root {
  width: 100%;
  height: 100%;
  .item {
      font-size: 16px;
  }
}
</style>