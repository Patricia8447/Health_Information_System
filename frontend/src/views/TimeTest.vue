<template>
  <div class="timeCheck">
    <el-date-picker
      v-model="date"
      type="date"
      @change="dateChange"
      :picker-options="datePickerOption"
      placeholder="选择日期"
    >
    </el-date-picker>

    <el-select
      v-model="timeRange"
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
        <div style="display: flex; justify-content: space-between; align-items: center">
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
</template>

<script>
import dayjs from "dayjs";

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
      dayjs,
      date: "",
      timeRange: "",
      timeList: [],
      datePickerOption: {
        disabledDate(date) {
          // 设置日期禁用
          return dayjs(date).format("d") === "2" || dayjs(date).format("d") === "4";
        },
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
    getTimeList() {
      //传实际的值，得改
      const start = "00:00";
      const end = "23:30";
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
      if (!this.date) {
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
        if (data.length <= 0) return (this.timeList = this.getTimeList());
        this.timeList = this.getTimeList().map((v, i) => {
          v.disabled = data[i].disabled;
        });
        this.timeRange = "";
      } else {
        this.$message.error(msg);
      }
    },
    timeChange(newVal) {
      //要拿到所有已经预约的时间段，或许把他们放在数组里面进行遍历
      //写循环
      if (newVal === "08:00-08:30") {
        this.$message.error("该时间段已经被患者预约，请重新选择");
        this.timeRange = "";
      }
      this.$emit("change", {
        date: dayjs(this.date).format("YYYY-MM-DD"),
        time: this.timeRange,
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
