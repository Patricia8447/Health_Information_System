<template>
  <div class="container has-text-left">
    <h3 class="titleFormat">Appointment Form</h3>
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
        <el-input type="textarea" v-model.trim="ruleForm.selfReport"></el-input>
      </el-form-item>
      <el-form-item prop="allergyMedicine">
        <span slot="label">
          <span style="color: black; font-size: 1.2em"
            ><strong>Allergy Medicine</strong>
          </span>
        </span>
        <el-input
          type="text"
          v-model.trim="ruleForm.allergyMedicine"
          placeholder="the system will automatically update if it is different from the personal center"
        ></el-input>
      </el-form-item>

      <el-form-item prop="appointmentDate">
        <span slot="label">
          <span style="color: black; font-size: 1.2em"
            ><strong>Choose the date and time</strong>
          </span>
        </span>
        <div class="timeCheck">
          <!-- <el-date-picker
            v-model.trim="ruleForm.appointmentDate"
            type="date"
            @change="dateChange"
            :picker-options="datePickerOption"
            value-format="yyyy-MM-dd"
            placeholder="please choose the date"
          >
          </el-date-picker> -->
          <date-picker
            v-model.trim="ruleForm.appointmentDate"
            @change="dateChange"
            :disabledDate="disabledDate"
            value-format="yyyy-MM-dd"
            placeholder="please choose the date"
            valueType="format"
          ></date-picker>

          <el-select
            v-model.trim="ruleForm.appointmentTime"
            placeholder="please choose the time"
            @focus="timeFocus"
            ref="timeSelect"
            @change="timeChange"
          >
            <el-option
              v-for="(item, index) in timeList"
              :key="index"
              :value="item.value1 + '-' + item.value2"
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
        <el-button type="success" plain @click="resetForm('ruleForm')">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import dayjs from "dayjs";
import Service from "@/service/common.service.js";
import Service2 from "@/service/upload.service.js";
import doctorService from "@/service/doctor.service.js";
import userService from "@/service/user.service.js";
import adminService from "@/service/admin.service.js";
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
      
      rules: {
        selfReport: [{ required: true, message: "cannot be null", trigger: "blur" }],
        allergyMedicine: [{ required: true, message: "cannot be null", trigger: "blur" }],
        appointmentTime: [{ required: true, message: "cannot be null", trigger: "blur" }],
        appointmentDate: [{ required: true, message: "cannot be null", trigger: "blur" }],
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
              Service.personAskDoctor(this.ruleForm)
                .then((res) => {
                  // console.log("test1" + JSON.stringify(res.data));
                  if (res.data.code === 1) {
                    if (this.personalInfos.allergy !== this.ruleForm.allergyMedicine) {
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
                            // localStorage.setItem("user", JSON.stringify(datas));
                            location.assign("/appointmentorderrecord");
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
    this.ruleForm.doctorId = this.$route.params.id;
    let data = {
      doctorId: this.ruleForm.doctorId,
    };
    adminService
      .getaDoctor(data)
      .then((res) => {
        if (res.data.code === 1) {
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

<style scoped lang="scss">
.labelClass {
  font-size: 1.5em;
}
.titleFormat {
  font-weight: bold;
  background-color: #ccddff;
  width: 450px;
  text-align: center;
  margin-left: 31%;
}
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
