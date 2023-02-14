<template>
  <div class="container has-text-left">
    <h1>Appointment Form</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <el-form-item label="Self Report" prop="selfReport">
        <el-input type="textarea" v-model.trim="ruleForm.selfReport"></el-input>
      </el-form-item>
      <el-form-item label="Allergy Medicine" prop="allergyMedicine">
        <el-input type="textarea" v-model.trim="ruleForm.allergyMedicine"></el-input>
      </el-form-item>
      <el-form-item label="Appointment Date" prop="appointmentDate">
        <el-input type="date" v-model.trim="ruleForm.appointmentDate"></el-input>
      </el-form-item>
      <el-form-item label="Appointment Time" prop="appointmentTime ">
        <el-select
          v-model.trim="ruleForm.appointmentTime"
          placeholder="please choose the time"
        >
          <!-- <el-option label="8" value="8"></el-option>
          <el-option label="9" value="9"></el-option> -->
          <el-option
            v-for="item in availableTime"
            :key="item.appointmentTime"
            :label="item.appointmentTime"
            :value="item.appointmentTime"
          >
          </el-option>
        </el-select>
      </el-form-item>
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
import Service from "@/service/common.service.js";
import Service2 from "@/service/upload.service.js";
import doctorService from "@/service/doctor.service.js";
export default {
  data() {
    return {
      ruleForm: {
        selfReport: "",
        allergyMedicine: "",
        appointmentTime: "",
        appointmentDate: "",
        doctorId: "",
      },
      // inquiryId: "",
      rules: {},
      options: [],
      availableTime: [{ startTime: "", endTime: "" }],
    };
  },
  methods: {
    async submitForm() {
      Service.personAskDoctor(this.ruleForm)
        .then((res) => {
          // console.log("test" + res.data);
          console.log("test1" + JSON.stringify(res.data));
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
            location.assign("/appointmentorderrecord");
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
  mounted() {
    console.log("2333");
    console.log(this.$route.params.id);
    this.ruleForm.doctorId = this.$route.params.id;

    //拿到该医生的出诊时间
    doctorService.getTimeList()
      .then((res) => {
        //  alert("test-1-time " + JSON.stringify(res.data));
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.tableData[0].doctorId) {
              console.log("test-1-time: " + JSON.stringify(res.data.info[i]));
              this.availableTime = res.data.info[i];
              break;
            }
          }
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
