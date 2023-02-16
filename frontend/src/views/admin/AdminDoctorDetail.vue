<template>
  <div class="container">
    <div class="container">
      <el-descriptions
        title="testing admin view doctor detail page"
        direction="vertical"
        :column="1"
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
        <!-- <el-descriptions-item>
          <template slot="label">
            <div class="my-label">
              <i class="el-icon-user"></i>
              Phone Number
            </div>
          </template>
          <div class="my-content">
            {{ basicInfo.phone }}
          </div>
        </el-descriptions-item> -->
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
              document test
            </div>
          </template>
          <div class="my-content">
            {{ alldoctordetails.doc1 }}
            <!-- <a href="serve\public\img\1675919436224.doc"> testing</a>readFile -->
            <el-button @click="readFile">readFile</el-button>
            <!-- <input type="file" onchange="upload(this)" /> -->
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>
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
      filePath: "serve/public/img/1675919436224.doc",
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
        },
      ],
    };
  },
  methods: {
    readFile(filePath) {
      alert(filePath);
      // 创建一个新的xhr对象
      let xhr = null;
      if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
      } else {
        // eslint-disable-next-line
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
      }
      const okStatus = document.location.protocol === "file" ? 0 : 200;
      xhr.open("GET", filePath, false);
      xhr.overrideMimeType("text/html;charset=utf-8");
      xhr.send(null);
      return xhr.status === okStatus ? xhr.responseText : null;
    },
  },
  mounted() {
    console.log(this.$route.params.id);
    this.tableData.doctorId = this.$route.params.id;
    console.log(this.tableData.doctorId);

    Admin.findDoc(this.tableData.doctorId)
      .then((res) => {
        console.log("test1" + JSON.stringify(res.data.info));
        if (res.data.code === 1) {
          // alert(JSON.stringify(res.data.info));
          this.alldoctordetails.doc1 = res.data.info.identityFront;
          // alert("test? " + JSON.stringify(this.alldoctordetails.doc1));
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

<style>
.container {
  margin-top: 5%;
  margin-left: 10%;
  width: 100%;
}

.container {
  margin-top: 3%;
  margin-left: 10%;
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
