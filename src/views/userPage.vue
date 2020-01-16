<template>
  <div class="user-root">
    <h2>
      <b>个人资料</b>
    </h2>
    <a-divider />
    <div class="image">
      <div class="clearfix">
        <a-upload
          action="api/user/upload"
          listType="picture-card"
          :fileList="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Divider, Upload, Modal } from "ant-design-vue";
Vue.use(Divider);
Vue.use(Upload);
Vue.component('a-modal', Modal);

export default {
  name: "userPage",
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: []
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    handlePreview(file) {
      this.previewImage = file.url || file.thumbUrl;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    }
  }
};
</script>

<style lang="less">
.user-root {
  width: 1000px;
  height: 500px;
  background: #fff;
  margin: 30px 0 0 0;
  padding: 30px;
  transform: translateX(70%);
  .image {
    width: 200px;
    height: 250px;
    .clearfix {
      .ant-upload-select-picture-card i {
        font-size: 32px;
        color: #999;
      }
      .ant-upload-select-picture-card .ant-upload-text {
        margin-top: 8px;
        color: #666;
      }
    }
  }
}
</style>