<template>
  <div class="container">
    <el-descriptions title="Personal Center" direction="vertical" :column="2" border>
      <template slot="extra">
        <el-button type="primary" size="small" plain
          ><router-link to="/editdpersonalinfo">Edit</router-link></el-button
        >
      </template>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-picture"></i>
            photo
          </div>
        </template>
        <div class="my-content">
          <el-image
            style="width: 100px; height: 100px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0BKO2XDG9XrOr7w1MmVOm54oWonC-JB0jvg&usqp=CAU"
          ></el-image>
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-user"></i>
            username
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.name }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-s-custom"></i>
            gender
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.gender }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-mobile-phone"></i>
            phone
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.phone }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-message"></i>
            email
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.email }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-star-on"></i>
            current status
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.status }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-office-building"></i>
            hospital name
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.hospitalName }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-s-data"></i>
            hospital level
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.hospitalLevel }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-add-location"></i>
            hospital address
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.hospitalAddress }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-coin"></i>
            department
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.departmentId }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-ship"></i>
            job
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.job }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-timer"></i>
            available time
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.availabletime }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-aim"></i>
            strength
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.strength }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-thumb"></i>
            self introduction
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.selfIntro }}
        </div>
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
import Router from "vue-router";
import { ref } from "vue";
import Service from "@/service/common.service.js";
import adminService from "@/service/admin.service.js";
let personalInfos = ref({});
let doctorPart = ref({});

export default {
  data() {
    return {
      personalInfos: JSON.parse(localStorage.getItem("user")),
      doctorPart: {
        status: "",
        hospitalName: "",
        hospitalLevel: "",
        hospitalAddress: "",
        job: "",
        strength: "",
        selfIntro: "",
        departmentId: "",
        availabletime: "",
      },
      CS: {
        "text-align": "left", //文本居中
        "min-width": "40px", //最小宽度
        "max-width": "250px", //最小宽度
        "word-break": "break-all", //过长时自动换行
      },
      // extra: JSON.parse(localStorage.getItem("doctor")),

      // doctor: [
      //   {
      //     doctorname: "YUKI",
      //     tel: "61115667",
      //     email: "1234@qq.com",
      //     hospital: "xxx hospital",
      //     hospital_level: "personal hospital",
      //     work_add: "Hong Kong Shatin",
      //     pos: "dentist",
      //     job: "doctor",
      //     slots: "Tue 9-10 a.m",
      //     strength:
      //       "The main changes involved dentists receiving fixed capitation payments (scaled by age) covering all routine dental care for children.",
      //     dintro:
      //       "Family processes and peer relations recruited for par ticipation through preschools, newspaper announcements, and the offices of pediatric doctors and dentists.",
      //   },
      // ],
    };
  },
  mounted() {
    console.log("发送获取医生列表接口");
    // TODO 医生列表接口
    Service.getAllDoctor()
      .then((res) => {
        console.log("test" + res.data);
        console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            // alert(res.data.info[i].userInfo[0].name);
            // alert(JSON.parse(localStorage.getItem("user")).name);
            // alert("doctor" == JSON.parse(localStorage.getItem("user")).name);
            if (
              res.data.info[i].userInfo[0].name ==
              JSON.parse(localStorage.getItem("user")).name
            ) {
              // alert(JSON.stringify(res.data.info[0]));
              this.doctorPart = res.data.info[i];
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
  methods: {
    // editCenter() {
    //   console.log("ok");
    // },
  },
};
</script>

<style>
.container {
  margin-top: 3%;
  margin-left: 5%;
}

.my-label {
  background: #add8e6;
  font-size: 1.3em;
  color: #444444;
}

.my-content {
  font-size: 1.5em;
  color: black;
}
</style>
