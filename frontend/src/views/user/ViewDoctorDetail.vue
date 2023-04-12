<template>
  <div class="container">
    <h3 class="title">Doctor Detail</h3>
    <el-row>
      <el-col :span="18"
        ><div class="content">
          <el-descriptions
            title=""
            direction="vertical"
            :column="2"
            border
            :contentStyle="CS"
          >
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Doctor Name
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.name }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-message"></i>
                  Email
                </div>
              </template>
              <div class="my-content">
                {{ basicInfo.email }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-s-home"></i>
                  Hospital Name
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.hospitalName }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-menu"></i>
                  Hospital Level
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.hospitalLevel }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-location-information"></i>
                  Hospital Address
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.hospitalAddress }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-collection-tag"></i>
                  Department
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.departmentId }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-price-tag"></i>
                  Position
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.job }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-time"></i>
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
                  <i class="el-icon-date"></i>
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
                  <i class="el-icon-magic-stick"></i>
                  Strength
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.strength }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-coordinate"></i>
                  Self Introduction
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.selfIntro }}
              </div>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-link"></i>
                  Zoom Link Test
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.zoomlink }}
              </div>
            </el-descriptions-item>
          </el-descriptions>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import Service from "@/service/doctor.service.js";
import Doctor from "@/service/user.service.js";
import Common from "@/service/common.service.js";

export default {
  data() {
    return {
      CS: {
        "text-align": "left", //文本居中
        "min-width": "40px", //最小宽度
        "max-width": "250px", //最小宽度
        "word-break": "break-all", //过长时自动换行
      },
      tableData: [{ doctorId: "" }],
      basicInfo: [{ phone: "", email: "" }],
      availableTime: [{ startTime: "", endTime: "" }],
      availableDate: [
        { Mon: "", Tues: "", Wed: "", Thurs: "", Fri: "", Sat: "", Sun: "" },
      ],
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
          zoomlink: "",
          symptoms: "",
          drugusage: "",
        },
      ],
    };
  },
  mounted() {
    this.tableData.doctorId = this.$route.params.id;

    // Common.getVisitRecordList()
    //   .then((res) => {
    //     // console.log("test1" + JSON.stringify(res.data));
    //     if (res.data.code === 1) {
    //       this.tableData = res.data.info;
    //       // alert("test? " + JSON.stringify(this.tableData[0].doctorId));
    //     } else {
    //       alert(res.data.info);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    //拿到该医生的出诊时间
    Service.getTimeList()
      .then((res) => {
        //  alert("test-1-time " + JSON.stringify(res.data));
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.tableData.doctorId) {
              console.log("test-1-time: " + JSON.stringify(res.data.info[i]));
              this.availableTime = res.data.info[i];
              // alert("test-2-time " + JSON.stringify(this.availableTime));
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
    Service.getDateList()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.tableData.doctorId) {
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

    Common.getAllDoctor(this.tableData.doctorId)
      .then((res) => {
        if (res.data.code === 1) {
          // alert(res.data.info.length);
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i]._id == this.tableData.doctorId) {
              console.log("11111: " + JSON.stringify(res.data.info[i]));
              this.alldoctordetails = res.data.info[i];
              this.basicInfo = res.data.info[i].userInfo[0];
              break;
              // console.log("11111: " + JSON.stringify(res.data.info[0].name));
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

.title {
  font-weight: bold;
  text-align: left;
  font-size: 1.5em;
}

.my-label {
  font-size: 1.3em;
  color: #444444;
  font-weight: bold;
  background: #add8e6;
}

/* .my-label {
  background: #add8e6;
  font-size: 1.3em;
  color: #444444;
} */

.my-content {
  font-size: 1.3em;
  color: black;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1200px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 10px;
  float: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
