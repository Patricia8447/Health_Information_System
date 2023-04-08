<template>
  <div class="container">
   <h3 class="title">Admin view doctor detail</h3>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
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
                  <i class="el-icon-user"></i>
                  Zoom Link Test
                </div>
              </template>
              <div class="my-content">
                {{ alldoctordetails.zoomlink }}
              </div>
            </el-descriptions-item>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Document Display
                </div>
              </template>
              <div class="my-content">
                <a
                  :href="`http://127.0.0.1:3006/img/${alldoctordetails.doc5}`"
                  target="_blank"
                >
                  Photo</a
                >
              </div>
              <div class="my-content">
                <a
                  :href="`http://127.0.0.1:3006/img/${alldoctordetails.doc1}`"
                  target="_blank"
                >
                  Identity Front</a
                >
              </div>
              <div class="my-content">
                <a
                  :href="`http://127.0.0.1:3006/img/${alldoctordetails.doc2}`"
                  target="_blank"
                >
                  Identity Back</a
                >
              </div>
              <div class="my-content">
                <a
                  :href="`http://127.0.0.1:3006/img/${alldoctordetails.doc3}`"
                  target="_blank"
                >
                  Certification</a
                >
              </div>
              <div class="my-content">
                <a
                  :href="`http://127.0.0.1:3006/img/${alldoctordetails.doc4}`"
                  target="_blank"
                >
                  Work Certificate</a
                >
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
import Admin from "@/service/admin.service.js";

export default {
  data() {
    return {
      // filePath: "serve/public/img/1675919436224.doc",
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
          doc1: "",
          doc2: "",
          doc3: "",
          doc4: "",
          doc5: "",
        },
      ],
    };
  },

  mounted() {
    this.tableData.doctorId = this.$route.params.id;
    Common.getAllDoctor(this.tableData.doctorId)
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i]._id == this.tableData.doctorId) {
              console.log("11111: " + JSON.stringify(res.data.info[i]));
              this.alldoctordetails = res.data.info[i];
              this.basicInfo = res.data.info[i].userInfo[0];
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

    let datas = {
      doctorId: this.tableData.doctorId,
    };

    Admin.findDoc(datas)
      .then((res) => {
        console.log("test_findDoc" + this.tableData.doctorId);
        if (res.data.code === 1) {
          this.alldoctordetails.doc1 = res.data.info.identityFront;
          this.alldoctordetails.doc2 = res.data.info.identityBack;
          this.alldoctordetails.doc3 = res.data.info.certification;
          this.alldoctordetails.doc4 = res.data.info.workCertificate;
          this.alldoctordetails.doc5 = res.data.info.photo;
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    //拿到该医生的出诊时间
    Service.getTimeList()
      .then((res) => {
       if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.tableData.doctorId) {
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
  },
};
</script>

<style>
.title {
  font-weight: bold;
  text-align: left;
  font-size: 1.5em;
}

.container {
  margin-top: 3%;
  margin-left: 10%;
}

.my-label {
  background: #66CDAA;
  font-size: 1.3em;
  color: #444444;
  font-weight: bold
}

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
