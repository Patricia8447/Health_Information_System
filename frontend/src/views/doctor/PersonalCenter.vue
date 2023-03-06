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
          photo: "",
          _id: "",
        },
      ],
      CS: {
        "text-align": "left", //文本居中
        "min-width": "40px", //最小宽度
        "max-width": "250px", //最小宽度
        "word-break": "break-all", //过长时自动换行
      },
    };
  },
  mounted() {
    console.log("发送获取医生列表接口");
    // TODO 医生列表接口
    Service.getAllDoctor()
      .then((res) => {
        // console.log("test" + res.data);
        // console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (
              res.data.info[i].userInfo[0].name ==
              JSON.parse(localStorage.getItem("user")).name
            ) {
              this.doctorPart = res.data.info[i];
              console.log(JSON.stringify(this.doctorPart._id));

              let datas = {
                doctorId: this.doctorPart._id,
              };
              adminService
                .findDoc(datas)
                .then((res) => {
                  console.log("test_findDoc" + this.doctorPart._id);
                  if (res.data.code === 1) {
                    this.doctorPart.photo = res.data.info.photo;
                    console.log(JSON.stringify(this.doctorPart.photo));
                  } else {
                    alert(res.data.info);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //拿到该医生的出诊时间
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

    //拿到该医生出诊的日期
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
