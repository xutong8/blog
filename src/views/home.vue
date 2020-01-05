<template>
  <a-layout theme="light" class="sidebar">
    <a-layout-sidebar width="200" style="background: #ffffff; margin-left: 200px;">
      <sidemenu :data="sideData" />
    </a-layout-sidebar>
    <a-layout style="padding: 0 24px 24px">
      <a-layout-content
        class="content"
        :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px', margin: '16px 200px 16px 0' }"
      >
        <!-- 显示content上方的图片 -->
        <div class="img-container">
          <div class="topImg">
            <img src="../assets/topone.png" style="flex: 7" />
            <img src="../assets/toptwo.jpg" style="flex: 3" />
          </div>
          <div class="bottomImg">
            <div class="bottomLeft">
              <div style="flex: 4;">
                <a-carousel autoplay>
                  <img src="../assets/left1.jpg" />
                  <img src="../assets/left2.jpg" />
                  <img src="../assets/left3.jpg" />
                </a-carousel>
              </div>
              <div style="flex: 6; display: flex;">
                <div style="flex: 1; display: flex; flex-direction: column;">
                  <img src="../assets/right1.jpg" width="773.64" height="280" />
                </div>
              </div>
            </div>
            <div class="bottomRight">
              <div style="flex: 1;">
                <a-carousel autoplay>
                  <img src="../assets/left1.jpg" width="552.59" height="280" />
                  <img src="../assets/left2.jpg" width="552.59" height="280" />
                  <img src="../assets/left3.jpg" width="552.59" height="280" />
                </a-carousel>
              </div>
            </div>
          </div>
        </div>

        <!-- 显示博文列表 -->
        <a-list itemLayout="vertical" size="large" :pagination="pagination" :dataSource="blogData">
          <div slot="footer">
            <b>My CSDN Blog Footer Part</b>
          </div>
          <a-list-item slot="renderItem" slot-scope="item" key="item.title">
            <template slot="actions" v-for="{type, text} in actions">
              <span :key="type">
                <a-icon :type="type" style="margin-rightL 8px;" />
                {{ text }}
              </span>
            </template>
            <a-list-item-meta :description="item.description">
              <a slot="title" href="#" @click="itemClick(item, $event)">{{ item.title }}</a>
            </a-list-item-meta>
            <!-- {{ item.content }} -->
          </a-list-item>
        </a-list>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      sideData: undefined,
      actions: [
        { type: "eye", text: "156" },
        { type: "like-o", text: "156" },
        { type: "message", text: "2" },
        { type: "user", text: "xutong" }
      ],
      blogData: undefined,
      pagination: {
        onChange: page => {
          console.log("page", page);
        },
        pageSize: 5
      }
    };
  },
  mounted() {
    const self = this;
    this.$axios
      .get("api/sidemenu/findAll")
      .then(function(response) {
        self.sideData = response.data;
        console.log("sidemenu findAll...", response);
      })
      .catch(function(error) {
        console.log("error", error);
      });

    this.$axios
      .get("api/blog/findAll")
      .then(function(response) {
        self.blogData = response.data;
        console.log("blog findAll...", response);
      })
      .catch(function(error) {
        console.log("error", error);
      });
  },
  methods: {
    itemClick(item, event) {
      console.log('item clicked ...', item, event, this.$router)
      this.$router.push({name: 'blogPage', params: {id: item.id}})
    }
  }
};
</script>

<style lang="less">
.sidebar {
  flex: 1;
  .content {
    .img-container {
      width: 100%;
      height: 420px;
      // background: red;
      display: flex;
      display: -webkit-flex;
      flex-direction: column;
      margin: 0 0 5px 0;
      .topImg {
        flex: 3;
        //   background: red;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        img {
          margin: 0 5px;
        }
      }
      .bottomImg {
        margin: 10px 0;
        flex: 7;
        //   background: yellow;
        display: -webkit-flex;
        display: flex;
        flex-direction: row;
        .bottomLeft {
          flex: 7;
          display: -webkit-flex;
          display: flex;
          // background: red;
          margin: 0 5px;
          .ant-carousel {
            width: 500px;
            height: 280px;
          }
        }
        .bottomRight {
          flex: 3;
          display: -webkit-flex;
          display: flex;
          // background: green;
          margin: 0 5px;
          .ant-carousel {
            width: 552.59px;
            height: 280px;
          }
        }
      }
    }
  }
}
</style>