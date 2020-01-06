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
    <a-tabs defaultActiveKey="1" @change="callback" class="tabs" v-else-if="navMode == 'loginPage'">
      <a-tab-pane tab="账号登录" key="1">
        <a-form :form="loginForm" @submit="submitHandler">
          <a-form-item :validate-status="usernameError(loginForm) ? 'error' : ''">
            <a-input
              v-decorator="['username',{ rules: [{ required: true, message: 'Please input your username!' }] },]"
              placeholder="username"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item :validate-status="passwordError(loginForm) ? 'error' : ''">
            <a-input
              v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] },]"
              type="password"
              placeholder="password"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="hasErrors(loginForm.getFieldsError())"
              style="margin-right: 50px;"
            >Log in</a-button>
            <a-button type="default" html-type="button" @click="navMode = 'registerPage'">Register</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="免密登录" key="2" forceRender>Sorry，此模块暂未开发!</a-tab-pane>
    </a-tabs>
    <a-tabs
      defaultActiveKey="1"
      @change="callback"
      class="tabs"
      v-else-if="navMode == 'registerPage'"
    >
      <a-tab-pane tab="账号注册" key="1">
        <a-form :form="registerForm" @submit="registerHandler">
          <a-form-item :validate-status="usernameError(registerForm) ? 'error' : ''">
            <a-input
              v-decorator="['username',{ rules: [{ required: true, message: 'Please input your username!' }] },]"
              placeholder="username"
            >
              <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item :validate-status="passwordError(registerForm) ? 'error' : ''">
            <a-input
              v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }] },]"
              type="password"
              placeholder="password"
            >
              <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              type="primary"
              html-type="submit"
              :disabled="hasErrors(registerForm.getFieldsError())"
            >Confirm</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import Vue from "vue";
import {
  Layout,
  Icon,
  Breadcrumb,
  Carousel,
  List,
  Tabs,
  Form,
  Input,
  Button
} from "ant-design-vue";
import topmenu from "../topmenu";
import sidemenu from "../sidemenu";

Vue.use(Button);
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
Vue.use(Input);

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
export default {
  name: "layout",
  data() {
    return {
      topData: undefined,
      navMode: "homePage",
      formLayout: "horizontal",
      loginForm: this.$form.createForm(this, { name: "login" }),
      registerForm: this.$form.createForm(this, { name: "register" }),
      hasErrors
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
    //处理点击登录/注册按钮
    loginHandler() {
      this.navMode = "loginPage";
    },
    callback(key) {
      console.log("pane conversed", key);
    },
    submitHandler(event) {
      console.log("submit handler...");
      event.preventDefault();
      this.loginForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
        } else {
          console.log("error", err);
        }
      });
    },
    usernameError(form) {
      const { getFieldError, isFieldTouched } = form;
      return isFieldTouched("username") && getFieldError("userNusernameame");
    },
    // Only show error after a field is touched.
    passwordError(form) {
      const { getFieldError, isFieldTouched } = form;
      return isFieldTouched("password") && getFieldError("password");
    },
    registerHandler(event) {
      console.log("register handler...");
      event.preventDefault();
      const self = this;
      this.registerForm.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);

          //注册模块，向后台发送请求注册用户....
           self.$axios
              .post("api/user/register", JSON.stringify({
                id: null,
                username: values.username,
                password: values.password
              }))
              .then(function(response) {
                console.log('注册success', response.data)
                self.$message.info('注册成功!')
                self.$message.loading('正在返回登陆页面', 2.5)
                              .then(function(){
                                self.$message.success('Loading finished', 2.5)
                                self.navMode = 'loginPage'
                              })
              })
              .catch(function(error) {
                console.log('注册fail', error)
              })
          
        } else {
          console.log("error", err);
        }
      })
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