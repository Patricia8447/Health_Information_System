<template>
  <el-form class="container" ref="form" :model="form" label-width="160px" :rules="rules">
    <el-form-item label="Hospital Name" prop="hospitalName">
      <el-input v-model.trim="form.hospitalName"></el-input>
    </el-form-item>
    <el-form-item label="Hospital Level" prop="hospitalLevel">
      <el-select v-model.trim="form.hospitalLevel">
        <el-option label="Govern Hospital" value="GovernHospital"></el-option>
        <el-option label="personal Hospital" value="personalHospital"></el-option>
        <el-option label="Clinic" value="Clinic"></el-option>
        <el-option label="Service Station" value="ServiceStation"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Hospital Address" prop="hospitalAddress">
      <el-input v-model.trim="form.hospitalAddress"></el-input>
    </el-form-item>
    <el-form-item label="Department" prop="departmentId">
      <el-select v-model.trim="form.departmentId">
        <el-option label="pharmacy department" value="medicine"></el-option>
        <el-option label="pediatric department" value="children"></el-option>
        <el-option label="dermatology department" value="skin"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Job" prop="job">
      <el-select v-model.trim="form.job">
        <el-option label="doctor" value="doctor"></el-option>
        <el-option label="nurse" value="nurse"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Strength" prop="strength">
      <el-input v-model.trim="form.strength"></el-input>
    </el-form-item>
    <el-form-item label="Self Introduction" prop="selfIntro">
      <el-input v-model.trim="form.selfIntro"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="submit" @click="onSubmit('form')">UPDATE</el-button>
      <el-button type="danger" plain @click="handleup('form')">CANCEL</el-button>
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
import adminService from "@/service/admin.service.js";

let json = ref({});
export default {
  data() {
    return {
      imageUrl: "",
      json: JSON.parse(localStorage.getItem("user")),
      form: {
        hospitalName: "",
        hospitalLevel: "",
        hospitalAddress: "",
        departmentId: "",
        job: "",
        strength: "",
        selfIntro: "",
      },
      rules: {
        hospitalName: [{ required: true, message: "cannot be null", trigger: "blur" }],
        hospitalLevel: [{ required: true, message: "cannot be null", trigger: "blur" }],
        hospitalAddress: [{ required: true, message: "cannot be null", trigger: "blur" }],
        departmentId: [{ required: true, message: "cannot be null", trigger: "blur" }],
        job: [{ required: true, message: "cannot be null", trigger: "blur" }],
        strength: [{ required: true, message: "cannot be null", trigger: "blur" }],
        selfIntro: [{ required: true, message: "cannot be null", trigger: "blur" }],
      },
    };
  },
  methods: {
    async onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          console.log("发送修改doctor个人信息接口");
          Service.resaveDoctorInfo(this.form)
            .then((res) => {
              console.log("test" + JSON.stringify(this.form));
              if (res.data.code === 1) {
                alert(res.data.info);
                // localStorage.setItem("user", JSON.stringify(this.json));
                location.assign("/dpersonalcenter");
              } else {
                alert(res.data.info);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //校验不通过
          alert("please check the email format");
          return false;
        }
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
  mounted() {
    let data = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    console.log(data);
    adminService
      .getaDoctorbyUserId(data)
      .then((res) => {
        if (res.data.code === 1) {
          // alert(JSON.stringify(res.data.info));
          this.form = res.data.info;
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin-left: 20%;
  margin-top: 3%;
  text-align: left;
  width: 1000px;
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
