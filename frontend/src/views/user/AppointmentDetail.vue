<template>
  <div class="container">
    <div class="container">
      <el-descriptions
        title="view result page"
        direction="vertical"
        :column="1"
        border
        :contentStyle="CS"
      >
        <el-descriptions-item>
          <template slot="label">
            <div class="my-label">
              <i class="el-icon-user"></i>
              Symptoms
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
              Result
            </div>
          </template>
          <div class="my-content">
            {{ alldoctordetails.remark }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <div class="my-label">
              <i class="el-icon-user"></i>
              Drugsage
            </div>
          </template>
          <div class="my-content">
            {{ alldoctordetails.drugsage }}
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
      basicInfo: [{ email: "" }],
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
          symptoms: "",
          drugsage: "",
          remark: "",
          inquiryId: "",
        },
      ],
    };
  },
  mounted() {
    this.alldoctordetails.inquiryId = this.$route.params.id;
    console.log(this.alldoctordetails.inquiryId);

    Common.getVisitRecordList()
      .then((res) => {
        if (res.data.code === 1) {
          this.tableData = res.data.info; //拿到了doctor id
          // alert("test? " + JSON.stringify(res.data.info));
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

    Common.getVisitRecordList2(datas)
      .then((res) => {
        if (res.data.code === 1) {
          this.alldoctordetails = res.data.info; //拿到了doctor id
          // alert("test?2: " + JSON.stringify(res.data.info));
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
