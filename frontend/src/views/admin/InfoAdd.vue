<template>
  <div class="container has-text-left">
    <h1>Adding Health Information</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <el-form-item label="Display Title" prop="title">
        <el-input type="input" v-model.trim="ruleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="Link" prop="link">
        <el-input type="url" v-model.trim="ruleForm.link"></el-input>
      </el-form-item>
      <el-form-item label="Cover Link" prop="coverLink">
        <el-input type="url" v-model.trim="ruleForm.coverLink"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click="alertResults()">Submit</el-button>
        <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import adminService from "@/service/admin.service.js";

export default {
  data() {
    return {
      ruleForm: {
        title: "",
        link: "",
        coverLink: "",
      },
      rules: {
        title: [{ required: true, message: "cannot be null", trigger: "blur" }],
        link: [
          {
            type: "url",
            message: "please check the format ",
            required: true,
            trigger: "blur",
          },
        ],
        coverLink: [
          {
            type: "url",
            required: true,
            message: "please check the format",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async alertResults() {
      adminService
        .addPushInfo(this.ruleForm)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          if (res.data.code === 1) {
            alert(res.data.info);
            if (res.data.info == "Please input the form completely") {
              console.log("not yet submitted");
            } else {
              location.assign("/healthinformation");
            }
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
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

.container h1 {
  font-size: 2em;
  text-align: center;
  margin-top: 5%;
}

.ruleForm {
  width: 780px;
  margin-top: 50px;
  margin-left: 10%;
}
</style>
