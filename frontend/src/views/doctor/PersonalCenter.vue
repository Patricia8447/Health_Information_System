<template>
  <div class="container">
    <h3 class="titleFormat">Personal Center</h3>
    <el-row>
      <el-col :span="6"
        ><div class="picture">
          <img
            class="carouselImage"
            alt="无图片"
            src="https://image.haoning.org.cn/tuba/2022-07-25/45871252318.jpg"
          /></div
      ></el-col>
      <el-col :span="18"
        ><div class="content">
          <el-descriptions
            title=""
            direction="vertical"
            :column="1"
            :contentStyle="CS"
            border
          >
            <template slot="extra">
              <el-button
                type="primary"
                plain
                @click="switchPage('EditDoctorPersonalInfo')"
                ><i class="el-icon-edit"></i>Edit</el-button
              >
            </template>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Username: {{ personalInfos.name }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-s-custom"></i>
                  Gender: {{ doctorPart.gender }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-message"></i>
                  Email: {{ personalInfos.email }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-star-on"></i>
                  Current Status: {{ doctorPart.status }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-office-building"></i>
                  Hospital Name: {{ doctorPart.hospitalName }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-s-data"></i>
                  Hospital Level: {{ doctorPart.hospitalLevel }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-add-location"></i>
                  Hospital Address: {{ doctorPart.hospitalAddress }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-coin"></i>
                  Department: {{ doctorPart.departmentId }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-ship"></i>
                  Job: {{ doctorPart.job }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Available Time: {{ availableTime.startTime }} -
                  {{ availableTime.endTime }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Available Date: {{ availableDate.Mon }} {{ availableDate.Tues }}
                  {{ availableDate.Wed }} {{ availableDate.Thurs }}
                  {{ availableDate.Fri }} {{ availableDate.Sat }}
                  {{ availableDate.Sun }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Zoom Link: {{ doctorPart.zoomlink }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-aim"></i>
                  Strength: {{ doctorPart.strength }}
                </div>
              </template>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-thumb"></i>
                  Self Introduction: {{ doctorPart.selfIntro }}
                </div>
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </div></el-col
      >
    </el-row>
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
          gender:"",
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
  methods: {
    switchPage(str) {
      this.$router.push({ name: str });
    },
  },
  mounted() {
    console.log("发送获取医生列表接口");
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

<style scoped>
.container {
  margin-top: 3%;
  margin-left: 10%;
}

.my-label {
  font-size: 1.5em;
  color: black;
  font-weight: bold;
}

.picture {
  float: left;
  margin: 10px;
}

.titleFormat {
  font-weight: bold;
  background-color: #87cefa;
  width: 500px;
  text-align: center;
  margin-left: 37%;
}
</style>
