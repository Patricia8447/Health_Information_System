<template>
  <div class="container has-text-left">
    <h1>Drug Delivery Form</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <el-form-item label="Drugsage" prop="drugsage">
        <el-input
          type="input"
          v-model.trim="alldoctordetails.drugsage"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item label="Receiver Name" prop="name">
        <el-input type="input" v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Contact Number" prop="phone">
        <el-input type="phone" v-model.trim="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="Delivery Date" prop="deliverDate">
        <el-date-picker
          v-model.trim="ruleForm.deliverDate"
          type="date"
          placeholder="please choose the deliver date"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="Delivery Time" prop="period">
        <el-time-select
          v-model.trim="ruleForm.period"
          :picker-options="{
            start: '06:00',
            step: '01:00',
            end: '23:30',
          }"
          placeholder="please choose the deliver time"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="Remark" prop="other">
        <el-input type="textarea" v-model.trim="ruleForm.other"></el-input>
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
import Service from "@/service/common.service.js";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        phone: "",
        period: "",
        deliverDate: "",
        other: "",
      },
      value1: "",
      rules: {},
      tableData: [{ doctorId: "" }],
      alldoctordetails: [
        {
          name: "",
          hospitalName: "",
          hospitalLevel: "",
          hospitalAddress: "",
          departmentId: "",
          job: "",
          strength: "",
          selfIntro: "",
          symptoms: "",
          drugsage: "",
          remark: "",
          inquiryId: "",
        },
      ],
    };
  },
  methods: {
    async alertResults() {
      console.log("??????????????????");
      console.log(JSON.stringify(this.ruleForm));
      Service.createDistribution(this.ruleForm)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            alert("submitted successfully");
            console.log(res.data.info);
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
  created() {
    console.log(this.$route.params.id);
  },
  mounted() {
    this.alldoctordetails.inquiryId = this.$route.params.id;
    console.log(this.alldoctordetails.inquiryId);

    Service.getVisitRecordList()
      .then((res) => {
        if (res.data.code === 1) {
          this.tableData = res.data.info; //?????????doctor id
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let datas = {
      doctorId: this.tableData.doctorId,
      inquiryId: this.alldoctordetails.inquiryId,
    };

    Service.getVisitRecordList2(datas)
      .then((res) => {
        if (res.data.code === 1) {
          this.alldoctordetails = res.data.info; //?????????doctor id
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
</style>
