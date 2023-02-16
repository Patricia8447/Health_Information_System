<template>
  <div class="container has-text-left">
    <h1>Qualification Form</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <!-- <el-form-item label="User ID" prop="id">
        <el-input v-model.trim="ruleForm.id" ></el-input>
      </el-form-item> -->
      <el-form-item label="Doctor Name" prop="doctorName">
        <el-input v-model.trim="ruleForm.doctorName"></el-input>
      </el-form-item>
      <el-form-item label="ID Card No" prop="identity">
        <el-input v-model.trim="ruleForm.identity"></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model.trim="ruleForm.gender" placeholder="please choose the gender">
          <el-option label="male" value="male"></el-option>
          <el-option label="female" value="female"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Phone No" prop="phone">
        <el-input v-model.trim="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="Zoom Link" prop="zoomlink">
        <el-input v-model.trim="ruleForm.zoomlink"></el-input>
      </el-form-item>
      <el-form-item label="Hospital Name" prop="hospitalName">
        <el-input v-model.trim="ruleForm.hospitalName"></el-input>
      </el-form-item>
      <el-form-item label="Hospital Level" prop="hospitalLevel">
        <el-select
          v-model.trim="ruleForm.hospitalLevel"
          placeholder="please choose the hospital level"
        >
          <el-option label="Govern Hospital" value="GovernHospital"></el-option>
          <el-option label="personal Hospital" value="personalHospital"></el-option>
          <el-option label="Clinic" value="Clinic"></el-option>
          <el-option label="Service Station" value="ServiceStation"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Hospital Address" prop="hospitalAddress">
        <el-input v-model.trim="ruleForm.hospitalAddress"></el-input>
      </el-form-item>
      <el-form-item label="Department" prop="departmentId">
        <el-select
          v-model.trim="ruleForm.departmentId"
          placeholder="please choose the department"
        >
          <el-option label="pharmacy department" value="medicine"></el-option>
          <el-option label="pediatric department" value="children"></el-option>
          <el-option label="dermatology department" value="skin"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Job" prop="job">
        <el-select v-model.trim="ruleForm.job" placeholder="please choose the job">
          <el-option label="doctor" value="doctor"></el-option>
          <el-option label="nurse" value="nurse"></el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="Available Week" prop="availableWeek">
        <el-date-picker
          type="date"
          placeholder="choose your available date"
          v-model="ruleForm.availableWeek"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item> -->

      <el-form-item label="Available Week">
        <!-- <el-checkbox-group > -->
        <el-checkbox label="Monday" v-model="ruleForm.availableWeek.Mon"></el-checkbox>
        <el-checkbox label="Tuesday" v-model="ruleForm.availableWeek.Tues"></el-checkbox>
        <el-checkbox label="Wednesday" v-model="ruleForm.availableWeek.Wed"></el-checkbox>
        <el-checkbox
          label="Thursday"
          v-model="ruleForm.availableWeek.Thurs"
        ></el-checkbox>
        <el-checkbox label="Friday" v-model="ruleForm.availableWeek.Fri"></el-checkbox>
        <el-checkbox label="Saturday" v-model="ruleForm.availableWeek.Sat"></el-checkbox>
        <el-checkbox label="Sunday" v-model="ruleForm.availableWeek.Sun"></el-checkbox>
        <!-- </el-checkbox-group> -->
      </el-form-item>

      <el-form-item label="Available Time" prop="availabletime">
        <el-time-picker
          is-range
          range-separator="~"
          value-format="HH:mm:ss"
          placeholder="choose your available time"
          v-model="ruleForm.availabletime"
          style="width: 100%"
        ></el-time-picker>
      </el-form-item>
      <el-form-item label="Strength" prop="strength">
        <el-input type="textarea" v-model.trim="ruleForm.strength"></el-input>
      </el-form-item>
      <el-form-item label="Self Introduction" prop="selfIntro">
        <el-input type="textarea" v-model.trim="ruleForm.selfIntro"></el-input>
      </el-form-item>

      <!-- 上传文件 -->
      <label for="identityFront">Please upload the front side of your ID card:</label>
      <input
        type="file"
        accept=".pdf"
        @change="test($event, 'identityFront')"
        id="identityFront"
        name="identityFront"
      /><br /><br />

      <label for="identityBack">Please upload the back side of your ID card:</label>
      <input
        type="file"
        accept=".pdf"
        @change="test($event, 'identityBack')"
        id="identityBack"
        name="identityBack"
      /><br /><br />

      <label for="certification">Please upload the your certification:</label>
      <input
        type="file"
        accept=".pdf"
        @change="test($event, 'certification')"
        id="certification"
        name="certification"
      /><br /><br />

      <label for="workCertificate">Please upload your working certificate:</label>
      <input
        type="file"
        accept=".pdf"
        @change="test($event, 'workCertificate')"
        id="workCertificate"
        name="workCertificate"
      /><br /><br />
      <el-form-item>
        <el-button type="submit" @click="submitForm()">Submit</el-button>
        <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/user.service.js";
import Service2 from "@/service/upload.service.js";
export default {
  data() {
    return {
      // testing: { id: "", name: "", email: "" },

      ruleForm: {
        // id: "",
        doctorName: "",
        gender: "",
        zoomlink: "",
        phone: "",
        email: "",
        identity: "",
        hospitalName: "",
        hospitalLevel: "",
        hospitalAddress: "",
        departmentId: "",
        job: "",
        departmentId: "",
        strength: "",
        selfIntro: "",
        availabletime: ["08:00:00", "12:00:00"],
        availableWeek: {
          Mon: false,
          Tues: false,
          Wed: false,
          Thurs: false,
          Fri: false,
          Sat: false,
          Sun: false,
        },
        identityFront: "",
        identityBack: "",
        certification: "",
        workCertificate: "",
      },
      rules: {},
    };
  },
  methods: {
    // submitForm(formName) {
    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       alert("submit!");
    //     } else {
    //       console.log("error submit!!");
    //       return false;
    //     }
    //   });
    // },
    submitForm() {
      console.log("发送成为医生接口");
      console.log(JSON.stringify(this.ruleForm));
      Service.toBeDoctor(this.ruleForm)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            // localStorage.setItem("doctor", JSON.stringify(res.data.info));
            alert("Submitted successfully, waiting for administrator review");
            localStorage.setItem("doctor", JSON.stringify(res.data.info));
            console.log(res.data.info);
            location.assign("/dpersonalcenter");
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
    test(e, type) {
      console.log(e, type, 123);
      let formData = new FormData();
      formData.append("file", e.target.files[0]);
      Service2.uploadImg(formData, { files: e.target.files }).then((res) => {
        console.log(res, "res");
        this.ruleForm[type] = res.data.info;
        console.log(this.ruleForm[type], type);
      });

      // console.log(JSON.stringify(formData));
      // console.log(e.target.files[0].name);
    },
  },
  mounted() {
    this.testing = JSON.parse(localStorage.getItem("user"));
    console.log(this.testing.name);
    this.ruleForm.id = this.testing.id;
    this.ruleForm.doctorName = this.testing.name;
    this.ruleForm.email = this.testing.email;

    // if (!window.localStorage.getItem("storge")) {
    //   alert("弹窗");
    //   window.localStorage.setItem("storge", "true");
    // }
    this.$alert(
      '<strong>当你填写资格申请表格时，即代表你已经了解该平台的隐私条款政策并自愿成为该平台的用户。如需要请参考 <a href="http://localhost:8080/policy" target="_blank">隐私条款</a></strong>',
      "提醒",
      {
        dangerouslyUseHTMLString: true,
      }
    );
  },
};
</script>
<style>
.ruleForm {
  margin-top: 5%;
  margin-left: 12%;
  width: 800px;
}

.container h1 {
  text-align: center;
  margin-left: 8%;
}
</style>
