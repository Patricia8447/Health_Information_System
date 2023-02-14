<template>
  <div class="container">
    <!-- <el-card class="box-card">
      <div
        v-for="doctordetail in alldoctordetails"
        :key="doctordetail.doctorname"
        class="text item"
      >
        <div style="padding: 6px; height: 400px">
          <div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Name: {{ doctordetail.name }}
            </div>
            <!-- <div style="position: relative; top: 15px; text-align: left">
              Doctor Telephone: {{ doctordetail.tel }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Email: {{ doctordetail.email }}
            </div> -->
    <!-- <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Hospital Name: {{ doctordetail.hospitalName }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Hospital Level: {{ doctordetail.hospitalLevel }}
            </div>

            <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Hospital Address: {{ doctordetail.hospitalAddress }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Department: {{ doctordetail.departmentId }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor's Job: {{ doctordetail.job }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Available Time: {{ doctordetail.slot }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Strength: {{ doctordetail.strength }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Self Intro: {{ doctordetail.selfIntro }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Described Symptoms: {{ doctordetail.symptoms }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Given Drugusage: {{ doctordetail.drugusage }}
            </div>
          </div>
        </div>
      </div>
      <el-button type="success" plain class="button"
        ><router-link to="/makeappointment">
          Make Another Appointment
        </router-link></el-button
      > -->
    <!-- </el-card>  -->
    <div class="container">
      <el-descriptions
        title="testing view detail page"
        direction="vertical"
        :column="1"
        border
        :contentStyle="CS"
      >
        <template slot="extra">
          <el-button type="primary" size="small" plain
            ><router-link to="/editmycenter">Edit</router-link></el-button
          >
        </template>

        <el-descriptions-item>
          <template slot="label">
            <div class="my-label">
              <i class="el-icon-user"></i>
              doctor name
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
              Phone Number
            </div>
          </template>
          <div class="my-content">
            {{ basicInfo.phone }}
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
              symptoms
            </div>
          </template>
          <div class="my-content">
            {{ alldoctordetails.symptoms }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div class="my-label">
              <i class="el-icon-user"></i>
              drugusage
            </div>
          </template>
          <div class="my-content">
            {{ alldoctordetails.drugusage }}
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
          symptoms: "", //待完成
          drugusage: "", //待完成
        },
      ],
    };
  },
  mounted() {
    Common.getVisitRecordList()
      .then((res) => {
        // console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          this.tableData = res.data.info;
          // alert("test? " + JSON.stringify(this.tableData[0].doctorId));
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
            if (res.data.info[i].doctorId == this.tableData[0].doctorId) {
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
            if (res.data.info[i].doctorId == this.tableData[0].doctorId) {
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

    Common.getAllDoctor(this.tableData[0].doctorId)
      .then((res) => {
        if (res.data.code === 1) {
          // alert(res.data.info.length);
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i]._id == this.tableData[0].doctorId) {
              console.log("11111: " + JSON.stringify(res.data.info[i]));
              this.alldoctordetails = res.data.info[i];
              this.basicInfo = res.data.info[i].userInfo[0];
              // console.log(
              //   "@phone: " + JSON.stringify(res.data.info[i].userInfo[0].phone)
              // );
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
