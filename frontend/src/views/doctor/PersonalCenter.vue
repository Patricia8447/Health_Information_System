<template>
  <div class="container">
    <el-descriptions title="Personal Center" direction="vertical" :column="2" border>
      <template slot="extra">
        <el-button
          type="primary"
          size="small"
          plain
          @click="switchPage('EditDoctorPersonalInfo')"
          >Edit</el-button
        >
      </template>
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
            <i class="el-icon-user"></i>
            Available Time
          </div>
        </template>
        <div class="my-content">
          {{ availableTime.startTime }} - {{ availableTime.endTime }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-user"></i>
            Available Date
          </div>
        </template>
        <div class="my-content">
          {{ availableDate.Mon }} {{ availableDate.Tues }} {{ availableDate.Wed }}
          {{ availableDate.Thurs }} {{ availableDate.Fri }} {{ availableDate.Sat }}
          {{ availableDate.Sun }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-user"></i>
            Zoom Link Test
          </div>
        </template>
        <div class="my-content">
          {{ doctorPart.zoomlink }}
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
import doctorService from "@/service/doctor.service.js";
let personalInfos = ref({});
let doctorPart = ref({});

export default {
  data() {
    return {
      personalInfos: JSON.parse(localStorage.getItem("user")),
      availableTime: [{ startTime: "", endTime: "" }],
      availableDate: [
        { Mon: "", Tues: "", Wed: "", Thurs: "", Fri: "", Sat: "", Sun: "" },
      ],
      doctorPart: [
        {
          status: "",
          hospitalName: "",
          hospitalLevel: "",
          hospitalAddress: "",
          job: "",
          strength: "",
          selfIntro: "",
          departmentId: "",
          zoomlink: "",
          _id: "",
        },
      ],
      CS: {
        "text-align": "left", //????????????
        "min-width": "40px", //????????????
        "max-width": "250px", //????????????
        "word-break": "break-all", //?????????????????????
      },
    };
  },
  methods: {
    switchPage(str) {
      this.$router.push({ name: str });
    },
  },
  mounted() {
    console.log("??????????????????????????????");
    let data = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    console.log(data);
    adminService
      .getaDoctorbyUserId(data)
      .then((res) => {
        if (res.data.code === 1) {
          // alert(JSON.stringify(res.data.info));
          this.doctorPart = res.data.info;
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //??????????????????????????????
    doctorService
      .getTimeList()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.doctorPart._id) {
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

    //??????????????????????????????
    doctorService
      .getDateList()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.doctorPart._id) {
              console.log("test-1-time: " + JSON.stringify(res.data.info[i]));
              this.availableDate = res.data.info[i];
              if (res.data.info[i].Mon == true) {
                this.availableDate.Mon = "Monday / ";
              } else {
                this.availableDate.Mon = "";
              }
              if (res.data.info[i].Tues == true) {
                this.availableDate.Tues = "Tuesday / ";
              } else {
                this.availableDate.Tues = "";
              }
              if (res.data.info[i].Wed == true) {
                this.availableDate.Wed = "Wednesday / ";
              } else {
                this.availableDate.Wed = "";
              }
              if (res.data.info[i].Thurs == true) {
                this.availableDate.Thurs = "Thursday / ";
              } else {
                this.availableDate.Thurs = "";
              }
              if (res.data.info[i].Fri == true) {
                this.availableDate.Fri = "Friday / ";
              } else {
                this.availableDate.Fri = "";
              }
              if (res.data.info[i].Sat == true) {
                this.availableDate.Sat = "Saturday / ";
              } else {
                this.availableDate.Sat = "";
              }
              if (res.data.info[i].Sun == true) {
                this.availableDate.Sun = "Sunday / ";
              } else {
                this.availableDate.Sun = "";
              }
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
