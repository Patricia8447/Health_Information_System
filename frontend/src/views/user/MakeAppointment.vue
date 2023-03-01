<template>
  <div class="container has-text-left">
    <h1>Appointment Form</h1>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="150px"
      class="ruleForm"
    >
      <el-form-item label="Self Report" prop="selfReport">
        <el-input type="textarea" v-model.trim="ruleForm.selfReport"></el-input>
      </el-form-item>
      <el-form-item label="Allergy Medicine" prop="allergyMedicine">
        <el-input type="textarea" v-model.trim="ruleForm.allergyMedicine"></el-input>
      </el-form-item>

      <el-form-item label="Please choose the date and time">
        <div class="timeCheck">
          <el-date-picker
            v-model.trim="ruleForm.appointmentDate"
            type="date"
            @change="dateChange"
            :picker-options="datePickerOption"
            value-format="yyyy-MM-dd"
            placeholder="选择日期"
          >
          </el-date-picker>

          <el-select
            v-model.trim="ruleForm.appointmentTime"
            placeholder="选择时间范围"
            @focus="timeFocus"
            ref="timeSelect"
            @change="timeChange"
          >
            <el-option
              v-for="(item, index) in timeList"
              :key="index"
              :value="item.value1 + '-' + item.value2"
              :disabled="item.disabled || index === 2 || index === 6"
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
        <el-button type="submit" @click="submitForm()">Submit</el-button>
        <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import dayjs from "dayjs";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/common.service.js";
import Service2 from "@/service/upload.service.js";
import doctorService from "@/service/doctor.service.js";
import userService from "@/service/user.service.js";
import adminService from "@/service/admin.service.js";

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
  data() {
    return {
      ruleForm: {
        selfReport: "",
        allergyMedicine: "",
        appointmentTime: "",
        appointmentDate: "",
        doctorId: "",
        doctorName: "",
        userName: JSON.parse(localStorage.getItem("user")).name,
      },
      personalInfos: JSON.parse(localStorage.getItem("user")),
      rules: {},
      options: [],
      availableTime: [{ startTime: "", endTime: "" }],
      availableDate: [
        { Mon: "", Tues: "", Wed: "", Thurs: "", Fri: "", Sat: "", Sun: "" },
      ],
      dayjs,
      timeList: [],
      datePickerOption: {
        disabledDate: function (appointmentDate) {
          // 设置日期禁用
          return (
            dayjs(appointmentDate).format("d") === this.availableDate.Mon ||
            dayjs(appointmentDate).format("d") === this.availableDate.Tues ||
            dayjs(appointmentDate).format("d") === this.availableDate.Wed ||
            dayjs(appointmentDate).format("d") === this.availableDate.Thurs ||
            dayjs(appointmentDate).format("d") === this.availableDate.Fri ||
            dayjs(appointmentDate).format("d") === this.availableDate.Sat ||
            dayjs(appointmentDate).format("d") === this.availableDate.Sun
          );
        }.bind(this),
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
    async submitForm() {
      Service.personAskDoctor(this.ruleForm)
        .then((res) => {
          // console.log("test1" + JSON.stringify(res.data));
          if (res.data.code === 1) {
            if (this.personalInfos.allergy !== this.ruleForm.allergyMedicine) {
              // this.open3();
              let datas = {
                id: this.personalInfos.id,
                email: this.personalInfos.email,
                address: this.personalInfos.address,
                allergy: this.ruleForm.allergyMedicine,
                name: this.personalInfos.name,
                birth: this.personalInfos.birth,
                gender: this.personalInfos.gender,
              };

              userService
                .resaveUserInfo(datas)
                .then((res) => {
                  if (res.data.code === 1) {
                    alert(res.data.info);
                    localStorage.setItem("user", JSON.stringify(datas));
                    location.assign("/mycenter");
                  } else {
                    alert(res.data.info);
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            } else {
              alert(res.data.info);
              location.assign("/appointmentorderrecord");
            }
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    open3() {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    getTimeList2() {
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
          message: "请先选择日期",
          type: "error",
        });
      }
    },
    async dateChange() {
      const {
        data: { code, msg, data },
      } = await this.getTimeCheck();
      if (code === 200) {
        if (data.length <= 0) return (this.timeList = this.getTimeList2());
        this.timeList = this.getTimeList2().map((v, i) => {
          v.disabled = data[i].disabled;
        });
        this.ruleForm.appointmentTime = "";
      } else {
        this.$message.error(msg);
      }
    },
    timeChange(newVal) {
      //要拿到所有已经预约的时间段，或许把他们放在数组里面进行遍历
      //写循环
      if (newVal === "08:00-08:30") {
        this.$message.error("该时间段已经被患者预约，请重新选择");
        this.ruleForm.appointmentTime = "";
      }
      this.$emit("change", {
        date: dayjs(this.ruleForm.appointmentDate).format("YYYY-MM-DD"),
        time: this.ruleForm.appointmentTime,
      });
    },
  },
  mounted() {
    this.ruleForm.doctorId = this.$route.params.id;
    console.log("hiii: " + this.ruleForm.doctorId);

    let data = {
      doctorId: this.ruleForm.doctorId,
    };
    adminService
      .getaDoctor(data)
      .then((res) => {
        if (res.data.code === 1) {
          console.log("8888: " + JSON.stringify(res.data.info));
          this.ruleForm.doctorName = res.data.info.name;
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
              console.log("test-1-date: " + JSON.stringify(this.availableDate.Mon));
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
                this.availableDate.Sun = "7";
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
        //  alert("test-1-time " + JSON.stringify(res.data));
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].doctorId == this.ruleForm.doctorId) {
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
  },
};
</script>

<style scoped lang="scss">
.ruleForm {
  margin-top: 5%;
  margin-left: 12%;
  width: 800px;
}

.container h1 {
  text-align: center;
  margin-left: 8%;
}
</style>
