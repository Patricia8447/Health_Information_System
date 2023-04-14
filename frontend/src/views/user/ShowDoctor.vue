<template>
  <div class="container">
    <el-row :gutter="20" class="el-row" type="flex">
      <el-col
        :span="8"
        v-for="(info, index) in tableData"
        :key="tableData._id"
        class="el-col"
      >
        <el-card class="el-card" :key="index" onclick="">
          <div slot="header" class="clearfix">
            <h3>{{ info.name }}</h3>
          </div>

          <div class="text item">
            <div class="item_tag">
              <span>Gender: </span>
            </div>
            <div class="item_desr">
              <span> {{ info.gender }}</span>
            </div>

            <div class="item_tag">
              <span>Hospital Name: </span>
            </div>
            <div class="item_desr">
              <span> {{ info.hospitalName }}</span>
            </div>

            <div class="item_tag">
              <span>Hospital Level: </span>
            </div>
            <div class="item_desr">
              <span> {{ info.hospitalLevel }}</span>
            </div>

            <div class="item_tag">
              <span>Job: </span>
            </div>
            <div class="item_desr">
              <span> {{ info.job }}</span>
            </div>
          </div>

          <div>
            <div class="text item">
              <el-button type="success" plain class="button" @click="goRoute(info._id)">
                Make Appointment
              </el-button>
              <el-button
                type="primary"
                plain
                class="button"
                @click="viewDetail(info._id)"
              >
                View More Detail
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Service from "@/service/common.service.js";
import User from "@/service/user.service.js";
import adminService from "@/service/admin.service.js";
import { ref } from "vue";

let json = ref({});

export default {
  data() {
    return {
      tableData: [
        {
          _id: "", //这个就是doctorID
          name: "",
          gender: "",
          hospitalName: "",
          hospitalLevel: "",
          job: "",
          status: "",
          strength: "",
          selfIntro: "",
        },
      ],
      search: "",
    };
  },
  methods: {
    tableRowClassName() {
      if (this.tableData.status == "Approved") {
        return "warning-row";
      }
      return "";
    },
    goRoute(e) {
      // let data = this.tableData;
      this.$router.push({ name: "MakeAppointment", params: { id: e } });
    },
    viewDetail(e) {
      // let data = this.tableData;
      this.$router.push({ name: "ViewDoctorDetail", params: { id: e } });
    },

    /**
     * 遍历列的所有内容，获取最宽一列的宽度
     * @param arr
     */
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item);
          if (acc < calcLen) {
            acc = calcLen;
          }
        }
        return acc;
      }, 0);
    },
    /**
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    getTextWidth(str) {
      let width = 0;
      const html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();
      return width;
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      // 1.获取该列的所有数据
      const arr = this.tableData.map((x) => x[prop]);
      arr.push(label); // 把每列的表头也加进去算
      // 2.计算每列内容最大的宽度 + 表格的内间距（依据实际情况而定）
      return this.getMaxLength(arr) + 28 + "px";
    },
    makeAppointment(_id, status) {
      //用户进行问诊预约接口
      adminService
        .personAskDoctor(datas)
        .then((res) => {
          if (res.data.code === 1) {
            alert(res.data.info);
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  async mounted() {
    //发送获取所有已获批准的医生列表接口
    Service.getApprovedDoctor()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status == "Approved") {
              this.tableData = res.data.info;
              // break;
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
.item_tag {
  float: left;
  text-align: left;
  font-size: 15px;
  font-weight: bold;
}
.item_desr {
  margin-left: 40%;
  min-height: 30px;
  text-align: left;
  font-size: 15px;
}
.text {
  width: 100%;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: #909399;
}

.el-table .warning-row {
  display: none;
}

.container {
  margin-top: 3%;
  margin-left: 10%;
}

.el-table /deep/ th {
  padding: 0;
  white-space: nowrap;
  min-width: fit-content;
}

.el-table /deep/ td {
  padding: 1px;
  white-space: nowrap;
  width: fit-content;
}

/** 修改el-card默认paddingL:20px-内边距 **/
>>> .el-card__body {
  padding: 10px;
}

.el-table /deep/ .cell {
  white-space: nowrap;
  width: fit-content;
}

.el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  /*transition: all .5s;*/
}
.el-card:hover {
  margin-top: -5px;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}
.el-col {
  border-radius: 4px;
  align-items: stretch;
  margin-bottom: 40px;
}
</style>
