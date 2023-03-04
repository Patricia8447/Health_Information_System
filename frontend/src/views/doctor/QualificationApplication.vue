<template>
  <div class="container has-text-left">
    <h1>Qualification Form</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="200px"
      class="ruleForm"
    >
      <el-form-item class="remind has-text-left">
        <label> *** Please complete your information carefully!! </label>
        <label> After you submitted the form, you are not allow to modify.</label>
      </el-form-item>

      <el-form-item label="Email" prop="email">
        <el-input v-model.trim="ruleForm.email" disabled></el-input>
      </el-form-item>
      <el-form-item label="Doctor Name" prop="doctorName">
        <el-input v-model.trim="ruleForm.doctorName"></el-input>
      </el-form-item>
      <el-form-item label="ID Card No" prop="identity">
        <el-input
          v-model.trim="ruleForm.identity"
          placeholder="please exclude the ()"
        ></el-input>
      </el-form-item>
      <el-form-item label="Gender" prop="gender">
        <el-select v-model.trim="ruleForm.gender" placeholder="please choose the gender">
          <el-option label="male" value="male"></el-option>
          <el-option label="female" value="female"></el-option>
        </el-select>
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
      <el-form-item label="Available Week" prop="availableWeek">
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
      <el-form-item label="Front Side of ID Card" prop="identityFront">
        <input
          type="file"
          accept=".pdf"
          @change="test($event, 'identityFront')"
          id="identityFront"
          name="identityFront"
        />
      </el-form-item>
      <el-form-item label="Back Side of ID Card" prop="identityBack">
        <input
          type="file"
          accept=".pdf"
          @change="test($event, 'identityBack')"
          id="identityBack"
          name="identityBack"
        />
      </el-form-item>
      <el-form-item label="Certification" prop="certification">
        <input
          type="file"
          accept=".pdf"
          @change="test($event, 'certification')"
          id="certification"
          name="certification"
      /></el-form-item>
      <el-form-item label="Work Certificate" prop="workCertificate">
        <input
          type="file"
          accept=".pdf"
          @change="test($event, 'workCertificate')"
          id="workCertificate"
          name="workCertificate"
      /></el-form-item>
      <el-form-item label="Recent Photo" prop="photo">
        <input
          type="file"
          accept=".pdf"
          @change="test($event, 'photo')"
          id="photo"
          name="photo"
      /></el-form-item>

      <el-form-item class="remind has-text-left">
        <label> *** Please check your information carefully!! </label>
        <label> After you submitted the form, you are not allow to modify.</label>
      </el-form-item>

      <el-form-item>
        <el-button type="submit" @click="submitForm('ruleForm')">Submit</el-button>
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
      ruleForm: {
        id: "",
        doctorName: "",
        gender: "",
        zoomlink: "",
        email: "",
        identity: "",
        hospitalName: "",
        hospitalLevel: "",
        hospitalAddress: "",
        departmentId: "",
        job: "",
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
        photo: "",
      },
      rules: {
        doctorName: [
          {
            required: true,
            pattern: /^[^\u4e00-\u9fa5]+$/,
            message: "cannot be null",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "cannot be null", trigger: "blur" }],
        zoomlink: [
          {
            type: "url",
            required: true,
            message: "wrong url format",
            trigger: "blur",
          },
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "wrong email format",
            trigger: ["blur", "change"],
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          },
        ],
        identity: [
          {
            required: true,
            pattern: /^[A-Z]{1,2}[0-9]{6,10}[0-9A-Z]$/,
            // 香港身份证：开头一位或两位大写字母，然后接上6-10位数字，最后一位数字或字母校验
            message: "wrong ID format",
            trigger: "blur",
          },
        ],
        hospitalName: [{ required: true, message: "cannot be null", trigger: "blur" }],
        hospitalLevel: [{ required: true, message: "cannot be null", trigger: "blur" }],
        hospitalAddress: [{ required: true, message: "cannot be null", trigger: "blur" }],
        departmentId: [{ required: true, message: "cannot be null", trigger: "blur" }],
        job: [{ required: true, message: "cannot be null", trigger: "blur" }],
        strength: [{ required: true, message: "cannot be null", trigger: "blur" }],
        selfIntro: [{ required: true, message: "cannot be null", trigger: "blur" }],
        availabletime: [{ required: true, message: "cannot be null", trigger: "blur" }],
        availableWeek: [{ required: true, message: "cannot be null", trigger: "blur" }],
        identityFront: [{ required: true, message: "cannot be null", trigger: "blur" }],
        identityBack: [{ required: true, message: "cannot be null", trigger: "blur" }],
        certification: [{ required: true, message: "cannot be null", trigger: "blur" }],
        workCertificate: [{ required: true, message: "cannot be null", trigger: "blur" }],
        photo: [{ required: true, message: "cannot be null", trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          console.log("发送成为医生接口");
          // console.log(JSON.stringify(this.ruleForm));
          Service.toBeDoctor(this.ruleForm)
            .then((res) => {
              if (res.data.code === 1) {
                alert(res.data.info);
                location.assign("/dpersonalcenter");
              } else {
                alert(res.data.info);
                this.resetForm(formName);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //校验不通过
          alert("please check the required item(s)");
          return false;
        }
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
    },
  },
  mounted() {
    this.testing = JSON.parse(localStorage.getItem("user"));
    console.log(this.testing.id);
    this.ruleForm.id = this.testing.id;
    this.ruleForm.doctorName = this.testing.name;
    this.ruleForm.email = this.testing.email;

    // if (!window.localStorage.getItem("storge")) {
    //   alert("弹窗");
    //   window.localStorage.setItem("storge", "true");
    // }
    this.$alert(
      '<strong>When you fill out the application form, you are aware of the platform privacy policy and are willing to become a user of the platform. Please refer <a href="http://localhost:8080/policy" target="_blank">Privacy policy</a> if necessary.</strong>',
      "warning",
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
  margin-left: 8%;
  width: 800px;
}

.container h1 {
  text-align: center;
  margin-left: 6%;
}

.remind {
  width: 1000px;
  color: red;
}
</style>
