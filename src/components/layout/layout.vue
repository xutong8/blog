<template>
  <div class="layout-root">
    <a-layout theme="light" v-if="navMode == 'homePage'">
      <a-layout-header class="header">
        <div class="logo"></div>
        <div class="login" @click="loginHandler">登录/注册</div>
        <topmenu :data="topData" />
      </a-layout-header>
      <router-view></router-view>
    </a-layout>
    <a-tabs defaultActiveKey="1" @change="callback" class="tabs" v-else>
      <a-tab-pane tab="账号登录" key="1">
        <a-form :form="form" @submit="submitHandler">

        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="免密登录" key="2" forceRender>Content of Tab Pane 2</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import { Layout, Icon, Breadcrumb, Carousel, List, Tabs, Form } from "ant-design-vue";
import topmenu from "../topmenu";
import sidemenu from "../sidemenu";
import { FORMERR } from 'dns';

Vue.use(Breadcrumb);
Vue.use(sidemenu);
Vue.use(Carousel);
Vue.use(Layout);
Vue.use(List);
Vue.use(Tabs);
Vue.component("a-layout-header", Layout.Header);
Vue.component("a-layout-sidebar", Layout.Sider);
Vue.use(topmenu);
Vue.use(Icon);
Vue.use(Form);

export default {
  name: "layout",
  data() {
    return {
      topData: undefined,
      navMode: "homePage",
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'login' })
    };
  },
  mounted() {
    const self = this;
    this.$axios
      .get("api/topmenu/findAll")
      .then(function(response) {
        self.topData = response.data;
        console.log("topmenu findAll...", response);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  },
  methods: {
    loginHandler() {
      this.navMode = "loginPage";
    },
    callback(key) {
      console.log("key", key);
    },
    submitHandler() {
      console.log('handler...')
    }
  }
};
</script>

<style lang="scss" scoped>
.layout-root {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .header {
    background: #ffffff;
    .logo {
      background-image: url("../../assets/blog-logo.png");
      background-size: cover;
      width: 120px;
      height: 64px;
      float: left;
      margin-right: 50px;
    }
    .login {
      float: right;
      margin-right: 50px;
      height: 64px;
      line-height: 64px;
      // background: red;
      font-size: 16px;
      font-weight: 600px;
      cursor: pointer;
    }
  }
  .tabs {
    margin-top: 200px;
  }
}
</style>