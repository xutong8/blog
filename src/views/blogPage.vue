<template>
  <div class="blog-root">
    <div class="userInfo"></div>
    <div class="blog">
      <h2><strong>{{ blog != undefined ? blog.title: blog }}</strong></h2>
      <span>
          <a-button type="link" style="cursor: text">转载</a-button>
          <span>XU Tong</span>
          <span>2019/01/05</span>
          <span>阅读数：10</span>
          <span><a-icon type="star" theme="twoTone" twoToneColor="orange"/><strong style="color: orange; margin-left: 5px;">收藏</strong></span>
      </span>
      <a-divider />
      <div class="content">
          {{ blog != undefined ? blog.content : blog }}
      </div>
    </div>
    <div class="classify"></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Button, Icon, Divider } from 'ant-design-vue'
Vue.use(Button)
Vue.use(Icon)
Vue.use(Divider)

export default {
  name: "blogPage",
  data() {
    return {
      blog: undefined
    };
  },
  mounted() {
    const blogId = this.$route.params.id;
    console.log("welcome to blog page", blogId);
    const self = this;
    this.$axios
      .get("api/blog/findById", {
        params: {
          id: blogId
        }
      })
      .then(function(response) {
        self.blog = response.data;
        console.log("blog findById...", self.blog);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  }
};
</script>

<style lang="less">
.blog-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 20px 300px 0 300px;
  .userInfo {
    flex: 1;
    background: pink;
    margin-right: 10px;
  }
  .blog {
    flex: 3;
    // background: green;
    h2 {
        padding: 15px;
    }
    span {
        margin: 0 5px 0 5px;
    }
    .content {
        width: 100%;
        height: 100%;
        padding: 15px;
        font-size: 16px;
        // background: purple;
    }
  }
  .classify {
    flex: 1;
    background: red;
    margin-left: 10px;
  }
}
</style>