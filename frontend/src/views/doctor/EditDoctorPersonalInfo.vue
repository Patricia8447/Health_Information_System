<template>
  <el-form class="container" ref="form" :model="json" label-width="120px">
    <!-- <el-form-item label="personal photo">
      <el-upload
        class="avatar-uploader"
        action="/img/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item> -->
    <el-form-item label="Name">
      <el-input v-model.trim="json.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input type="email" v-model.trim="json.email" disabled></el-input>
    </el-form-item>
    <el-form-item label="Hospital Name">
      <el-input v-model.trim="json.hospitalName"></el-input>
    </el-form-item>
    <el-form-item label="Hospital Level">
      <el-input v-model.trim="json.hospitalLevel"></el-input>
    </el-form-item>
    <el-form-item label="Hospital Address">
      <el-input v-model.trim="json.hospitalAddress"></el-input>
    </el-form-item>
    <el-form-item label="Department">
      <el-input v-model.trim="json.departmentId"></el-input>
    </el-form-item>
    <el-form-item label="Job">
      <el-input v-model.trim="json.job"></el-input>
    </el-form-item>
    <el-form-item label="Strength">
      <el-input v-model.trim="json.strength"></el-input>
    </el-form-item>
    <el-form-item label="Self Introduction">
      <el-input v-model.trim="json.selfIntro"></el-input>
    </el-form-item>
    <!-- <el-form-item label="photo">
      <label>Please upload the your photo:</label>
      <input
        type="file"
        accept=".jpg"
        @change="test($event, 'photo')"
        id="photo"
        name="photo"
      />
    </el-form-item> -->
    <el-form-item>
      <el-button type="submit" @click="onSubmit()">UPDATE</el-button>
      <el-button type="danger" plain @click="handleup()">CANCEL</el-button>
    </el-form-item>
    <router-view></router-view>
  </el-form>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/user.service.js";
import { ref } from "vue";
import Service2 from "@/service/upload.service.js";

let json = ref({});
export default {
  data() {
    return {
      imageUrl: "",
      json: JSON.parse(localStorage.getItem("user")),
      form: {
        name: "",
        gender: "",
        email: "",
        status: "",
        phone: "",
        identity: "",
        hospitalName: "",
        hospitalLevel: "",
        hospitalAddress: "",
        departmentId: "",
        job: "",
        strength: "",
        selfIntro: "",
        photo: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log("发送修改doctor个人信息接口");
      console.log(this.json);
      Service.resaveDoctorInfo(this.json)
        .then((res) => {
          console.log("test" + res.data);
          console.log("test1" + JSON.stringify(this.json));
          if (res.data.code === 1) {
            alert(res.data.info);
            localStorage.setItem("user", JSON.stringify(this.json));
            location.assign("/dpersonalcenter");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleup: function () {
      this.$router.replace("/dpersonalcenter");
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    test(e, type) {
      console.log(e, type, 123);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      Service2.uploadImg(formData, { files: e.target.files }).then((res) => {
        console.log(res, "res");
        this.ruleForm[type] = res.data.info;
        console.log(this.ruleForm[type], type);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin-left: 10%;
  margin-top: 3%;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
