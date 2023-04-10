<template>
  <div class="container has-text-left">
    <h3 class="titleFormat">Drug Delivery Form</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <el-form-item label="Drugsage" prop="drugsage">
        <el-input type="textarea" v-model.trim="ruleForm.drugsage" disabled></el-input>
      </el-form-item>
      <el-form-item label="Receiver Name" prop="name">
        <el-input type="input" v-model.trim="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="Contact Number" prop="phone">
        <el-input type="phone" v-model.trim="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="Delivery Date" prop="deliverDate">
       <date-picker
          v-model.trim="ruleForm.deliverDate"
          :disabledDate="disabledDate"
          value-format="yyyy-MM-dd"
          placeholder="please choose the deliver date"
          valueType="format"
          style="width: 570px"
        ></date-picker>
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
          style="width: 570px"
        >
        </el-time-select>
      </el-form-item>
      <el-form-item label="Delivery Address" prop="address">
        <el-input type="input" v-model.trim="ruleForm.address"></el-input>
      </el-form-item>
      <el-form-item label="Remark" prop="other">
        <el-input type="textarea" v-model.trim="ruleForm.other"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="submit"
          @click="alertResults('ruleForm')"
          :disabled="ruleForm.drugsage == ''"
          >Submit</el-button
        >
        <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/common.service.js";
import User from "@/service/user.service.js";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import dayjs from "dayjs";

export default {
  components: { DatePicker },
  data() {
    return {
      personalInfos: {
        name: "",
        gender: "",
        birth: "",
        email: "",
        address: "",
        allergy: "",
      },
      ruleForm: {
        name: "",
        phone: "",
        period: "",
        deliverDate: "",
        other: "",
        drugsage: "",
        address: "",
      },
      value1: "",
      rules: {
        drugsage: [{ required: true, message: "cannot be null", trigger: "blur" }],
        name: [{ required: true, message: "cannot be null", trigger: "blur" }],
        phone: [
          {
            required: true,
            message: "wrong format",
            trigger: "blur",
            pattern: /^([5|6|9])\d{7}$/,
          },
        ],
        address: [{ required: true, message: "cannot be null", trigger: "blur" }],
        deliverDate: [{ required: true, message: "cannot be null", trigger: "blur" }],
        period: [{ required: true, message: "cannot be null", trigger: "blur" }],
      },
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
      disabledDate: (deliverDate) => {
        return Date.parse(deliverDate) < new Date().getTime();
      },
    };
  },
  methods: {
    async alertResults(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          console.log("发送送药接口");
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
        } else {
          //校验不通过
          if (this.ruleForm.drugsage == "") {
            alert("you have no drug(s) to deliver");
          } else {
            alert("please check the required format");
          }

          return false;
        }
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
          this.tableData = res.data.info; //拿到了doctor id
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
          this.alldoctordetails = res.data.info; //拿到了doctor id
          this.ruleForm.drugsage = this.alldoctordetails.drugsage;
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    let datas1 = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    console.log(datas1);

    User.getUserInfo(datas1)
      .then((res) => {
        if (res.data.code === 1) {
          this.personalInfos = res.data.info;
          this.ruleForm.name = this.personalInfos.name;
          this.ruleForm.address = this.personalInfos.address;
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

.container {
  margin-left: 23%;
  margin-top: 3%;
  text-align: left;
  width: 750px;
}

.titleFormat {
  font-weight: bold;
  background-color: #ccddff;
  width: 650px;
  text-align: center;
  margin-left: 10%;
}
</style>
