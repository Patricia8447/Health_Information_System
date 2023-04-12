<template>
  <div class="container has-text-left">
    <h3 class="titleFormat1">Update the Appointment</h3>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="250px"
      class="ruleForm"
    >
      <el-form-item prop="selfReport">
        <span slot="label">
          <span style="color: black; font-size: 1.2em"
            ><strong>Self Report</strong>
          </span>
        </span>
        <el-input type="textarea" v-model.trim="ruleForm.selfReport" disabled></el-input>
      </el-form-item>
      <el-form-item prop="allergyMedicine">
        <span slot="label">
          <span style="color: black; font-size: 1.2em"
            ><strong>Allergy Medicine</strong>
          </span>
        </span>
        <el-input type="text" v-model.trim="ruleForm.allergyMedicine" disabled></el-input>
      </el-form-item>
      <el-form-item prop="appointmentDate">
        <span slot="label">
          <span style="color: black; font-size: 1.2em"
            ><strong>Choose the date and time</strong>
          </span>
        </span>
        <div class="timeCheck">
          <date-picker
            v-model.trim="ruleForm.appointmentDate"
            @change="dateChange"
            :disabledDate="disabledDate"
            value-format="yyyy-MM-dd"
            placeholder="please choose another date"
            valueType="format"
          ></date-picker>

          <el-select
            v-model.trim="ruleForm.appointmentTime"
            placeholder="please choose another time"
            @focus="timeFocus"
            ref="timeSelect"
            @change="timeChange"
          >
            <el-option
              v-for="(item, index) in timeList"
              :key="index"
              :value="item.value1 + '-' + item.value2"
              style="text-align: left"
            >
              <div
                style="display: flex; justify-content: space-between; align-items: center"
              >
                <span>{{ item.value1 + "-" + item.value2 }}</span>
                <i
                  class="el-icon-circle-check"
                  style="color: #67c23a; font-size: 14px; margin-left: 50px"
                  v-if="!item.disabled"
                ></i>
                <i
                  class="el-icon-circle-close"
                  style="color: #f56c6c; font-size: 14px; margin-left: 50px"
                  v-else
                ></i>
              </div>
            </el-option>
          </el-select>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="submit" @click="submitForm('ruleForm')">Submit</el-button>
        <el-button type="success" plain @click="cancelForm()">Cancel</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import dayjs from "dayjs";
import Service from "@/service/common.service.js";
import Service2 from "@/service/upload.service.js";
import adminService from "@/service/admin.service.js";
import userService from "@/service/user.service.js";
import doctorService from "@/service/doctor.service.js";
import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

const parseTime = function (time) {
  const values = (time || "").split(":");
  if (values.length >= 2) {
    const hours = parseInt(values[0], 10);
    const minutes = parseInt(values[1], 10);

    return {
      hours,
      minutes,
    };
  }
  /* istanbul ignore next */
  return null;
};

const compareTime = function (time1, time2) {
  const value1 = parseTime(time1);
  const value2 = parseTime(time2);

  const minutes1 = value1.minutes + value1.hours * 60;
  const minutes2 = value2.minutes + value2.hours * 60;

  if (minutes1 === minutes2) {
    return 0;
  }

  return minutes1 > minutes2 ? 1 : -1;
};

const formatTime = function (time) {
  return (
    (time.hours < 10 ? "0" + time.hours : time.hours) +
    ":" +
    (time.minutes < 10 ? "0" + time.minutes : time.minutes)
  );
};

const nextTime = function (time, step) {
  const timeValue = parseTime(time);
  const stepValue = parseTime(step);

  const next = {
    hours: timeValue.hours,
    minutes: timeValue.minutes,
  };

  next.minutes += stepValue.minutes;
  next.hours += stepValue.hours;

  next.hours += Math.floor(next.minutes / 60);
  next.minutes = next.minutes % 60;

  return formatTime(next);
};

export default {
  components: { DatePicker },
  data() {
    return {
      ruleForm: {
        inqueryId: "",
        selfReport: "",
        allergyMedicine: "",
        appointmentTime: "",
        appointmentDate: "",
        doctorId: "",
      },
      rules: {
        selfReport: [{ required: true, message: "cannot be null", trigger: "blur" }],
        allergyMedicine: [{ required: true, message: "cannot be null", trigger: "blur" }],
        appointmentTime: [{ required: true, message: "cannot be null", trigger: "blur" }],
        appointmentDate: [{ required: true, message: "cannot be null", trigger: "blur" }],
      },
      availableDate: [
        { Mon: "", Tues: "", Wed: "", Thurs: "", Fri: "", Sat: "", Sun: "" },
      ],
      dayjs,
      timeList: [],
      disabledDate: (appointmentDate) => {
        return (
          dayjs(appointmentDate).format("d") === this.availableDate.Mon ||
          dayjs(appointmentDate).format("d") === this.availableDate.Tues ||
          dayjs(appointmentDate).format("d") === this.availableDate.Wed ||
          dayjs(appointmentDate).format("d") === this.availableDate.Thurs ||
          dayjs(appointmentDate).format("d") === this.availableDate.Fri ||
          dayjs(appointmentDate).format("d") === this.availableDate.Sat ||
          dayjs(appointmentDate).format("d") === this.availableDate.Sun ||
           Date.parse(appointmentDate) < new Date().getTime()
        );
      },
    };
  },
  props: {
    step: {
      type: String,
      default: "00:30",
    },
    // 请求更新时间段详情列表
    getTimeCheck: {
      type: Function,
      default: () => {
        return { data: { code: 200, data: [] } };
      },
    },
  },
  created() {
    this.getTimeCheck();
  },
  watch: {
    step() {
      this.getTimeCheck();
    },
  },
  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          Service.judgeDoctorIsFree({
            doctorId: this.ruleForm.doctorId,
            date: this.ruleForm.appointmentDate,
            time: this.ruleForm.appointmentTime,
          }).then((res) => {
            if (res.data.info) {
              console.log("test update method: " + this.ruleForm.inqueryId);
              adminService
                .updataPushInfo(this.ruleForm)
                .then((res) => {
                  console.log(JSON.stringify(res.data));
                  if (res.data.code === 1) {
                    location.assign("/appointmentorderrecord");
                    alert(res.data.info);
                  } else {
                    alert(res.data.info);
                  }
                })
                .catch((err) => {
                  alert(err);
                });
            } else {
              alert("This time has been booked by the patient, please choose again!");
            }
          });
        } else {
          //校验不通过
          alert("please check required item(s)");
          return false;
        }
      });
    },
    cancelForm() {
      this.$router.replace("/appointmentorderrecord");
    },
    getTimeList() {
      const start = this.availableTime.startTime;
      const end = this.availableTime.endTime;
      const step = this.step;
      const result = [];

      if (start && end && step) {
        let current = start;
        while (compareTime(current, end) <= 0) {
          result.push({
            value1: current,
            value2: nextTime(current, step),
            disabled:
              compareTime(current, this.minTime || "-1:-1") <= 0 ||
              compareTime(current, this.maxTime || "100:100") >= 0,
          });
          current = nextTime(current, step);
        }
      }
      return result;
    },
    timeFocus() {
      if (!this.ruleForm.appointmentDate) {
        this.$refs.timeSelect.blur();
        this.$message({
          duration: 1000,
          message: "please choose the date first",
          type: "error",
        });
      }
    },
    async dateChange() {
      const {
        data: { code, msg, data },
      } = await this.getTimeCheck();
      if (code === 200) {
        if (data.length <= 0) return (this.timeList = this.getTimeList());
        this.timeList = this.getTimeList().map((v, i) => {
          v.disabled = data[i].disabled;
        });
        this.ruleForm.appointmentTime = "";
      } else {
        this.$message.error(msg);
      }
    },
    timeChange(newVal) {
      if (newVal === "24:00-24:00") {
        this.$message.error(
          "This time has been booked by the patient, please choose again"
        );
        this.ruleForm.appointmentTime = "";
      }
      this.$emit("change", {
        date: dayjs(this.ruleForm.appointmentDate).format("YYYY-MM-DD"),
        time: this.ruleForm.appointmentTime,
      });
    },
  },
  mounted() {
    console.log("2333");
    // console.log(this.$route.params.id);
    // this.ruleForm.doctorId = this.$route.params.id;
    this.ruleForm.inqueryId = this.$route.params.id;
    console.log(this.ruleForm.inqueryId);

    Service.getVisitRecordList()
      .then((res) => {
        if (res.data.code === 1) {
          console.log(this.ruleForm.inqueryId);
          console.log("New: " + JSON.stringify(res.data.info));
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i]._id == this.ruleForm.inqueryId) {
              this.ruleForm = res.data.info[i];
              this.ruleForm.inqueryId = this.$route.params.id;
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

    //拿到医生的出诊日期
    doctorService
      .getDateList()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.ruleForm.doctorId) {
              this.availableDate = res.data.info[i];
              if (res.data.info[i].Mon == true) {
                this.availableDate.Mon = "";
              } else {
                this.availableDate.Mon = "1";
              }
              if (res.data.info[i].Tues == true) {
                this.availableDate.Tues = "";
              } else {
                this.availableDate.Tues = "2";
              }
              if (res.data.info[i].Wed == true) {
                this.availableDate.Wed = "";
              } else {
                this.availableDate.Wed = "3";
              }
              if (res.data.info[i].Thurs == true) {
                this.availableDate.Thurs = "";
              } else {
                this.availableDate.Thurs = "4";
              }
              if (res.data.info[i].Fri == true) {
                this.availableDate.Fri = "";
              } else {
                this.availableDate.Fri = "5";
              }
              if (res.data.info[i].Sat == true) {
                this.availableDate.Sat = "";
              } else {
                this.availableDate.Sat = "6";
              }
              if (res.data.info[i].Sun == true) {
                this.availableDate.Sun = "";
              } else {
                this.availableDate.Sun = "0";
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

    //拿到该医生的出诊时间
    doctorService
      .getTimeList()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.ruleForm.doctorId) {
              // console.log("test-1-time: " + JSON.stringify(res.data.info[i]));
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
  },
};
</script>

<style scoped>
.ruleForm {
  margin-top: 5%;
  margin-left: 12%;
  width: 800px;
}

.titleFormat1 {
  font-weight: bold;
  background-color: #ccddff;
  width: 450px;
  text-align: center;
  margin-left: 37%;
}

.container {
  margin-top: 3%;
  margin-left: 10%;
}
</style>
