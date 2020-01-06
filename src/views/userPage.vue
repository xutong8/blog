<template>
    <div class="user-root">
        <h2><b>个人资料</b></h2>
        <a-divider />
    </div>
</template>

<script>
import Vue from 'vue'
import { Divider } from 'ant-design-vue'
Vue.use(Divider)

export default {
    name: 'userPage'    
}
</script>

<style lang="less">
    .user-root {
        width: 1000px;
        height: 500px;
        background: #fff;
        margin: 30px 0 0 0;
        padding: 30px;
        transform: translateX(70%);
    }
</style>