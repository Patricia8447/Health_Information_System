<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.doctorName.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 1200px"
      :default-sort="{ prop: 'appointmentDate', order: 'ascending' }"
    >
      <!-- <el-table-column
        label="Doctor ID"
        prop="doctorId"
        :width="flexColumnWidth('Doctor ID', 'doctorId')"
      >
      </el-table-column> -->
      <el-table-column
        label="Doctor Name"
        prop="doctorName"
        :width="flexColumnWidth('Doctor Name', 'doctorName')"
      >
      </el-table-column>
      <el-table-column
        label="Allergy Medicine"
        prop="allergyMedicine"
        :width="flexColumnWidth('Allergy Medicine', 'allergyMedicine')"
      >
      </el-table-column>

      <el-table-column
        label="Appointment Date"
        prop="appointmentDate"
        sortable
        :width="flexColumnWidth('Appointment Date', 'appointmentDate')"
        :formatter="logisticDescData"
      >
      </el-table-column>
      <el-table-column
        label="Appointment Time"
        prop="appointmentTime"
        sortable
        :width="flexColumnWidth('Appointment Time', 'appointmentTime')"
      >
      </el-table-column>

      <el-table-column
        label="Self Report"
        prop="selfReport"
        :width="flexColumnWidth('Self Report', 'selfReport')"
      >
      </el-table-column>
      <el-table-column
        label="Status"
        prop="status"
        :width="flexColumnWidth('Status', 'status')"
      >
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope" class="searching">
          <el-input v-model="search" size="mini" placeholder="search your order..." />
        </template>
      </el-table-column>

      <el-table-column>
        <template slot-scope="scope" class="btns">
          <el-button
            type="warning"
            class="button"
            @click="goRoute2(scope.$index)"
            :disabled="
              scope.row.status == 'void' ||
              (scope.row.status == 'finished' &&
                !getCurrentDate(scope.row.appointmentDate))
            "
          >
            Edit Appointment
          </el-button>
          <el-button
            type="primary"
            class="button"
            :disabled="
              getCurrentDate(scope.row.appointmentDate) ||
              scope.row.status != 'Not yet start'
            "
          >
            <a
              :href="alldoctordetails.zoomlink"
              target="_blank"
              style="text-decoration: none"
            >
              Start
            </a>
          </el-button>

          <el-button
            type="success"
            class="button"
            @click="goRoute(scope.$index)"
            :disabled="scope.row.status != 'finished'"
          >
            Deliver Medicine
          </el-button>
          <el-button
            type="info"
            class="button"
            @click="goRoute3(scope.$index)"
            :disabled="scope.row.status != 'finished'"
          >
            View Result
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
      tableData: [
        {
          _id: "",
          doctorId: "",
          doctorName: "",
          status: "",
          selfReport: "",
          appointmentTime: "",
          allergyMedicine: "",
          appointmentDate: "",
          zoomlink: "",
        },
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
      search: "",
    };
  },
  methods: {
    switchPage(str) {
      this.$router.push({ name: str });
    },
    getCurrentDate(appointmentDate) {
      var myDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
      var time = myDate.toJSON().split("T").join(" ").substr(0, 19); //将1970/08/08转化成1970-08-08
      if (appointmentDate > time) {
        return true;
      } else {
        return false;
      }
    },
    goRoute2(e) {
      let data = this.tableData;
      console.log(data[e]._id);
      this.$router.push({
        name: "UpdateAppointmentTest",
        params: { id: data[e]._id },
      });
    },
    goRoute3(e) {
      let data = this.tableData;
      console.log(data[e]._id);
      this.$router.push({
        name: "AppointmentDetail",
        params: { id: data[e]._id },
      });
    },
    logisticDescData(row) {
      return row.appointmentDate.split("T")[0];
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
      return this.getMaxLength(arr) + 25 + "px";
    },
    open() {
      this.$alert(
        '<a href="https://hkbu.zoom.us/j/6183055551?pwd=ZVpEa1lUWnJBc2hwV2orRWhBbjlqQT09">Link</a>',
        "Jump to Zoom",
        {
          dangerouslyUseHTMLString: true,
        }
      );
    },
    goRoute(e) {
      let data = this.tableData;
      this.$router.push({ name: "Drugdeliver", params: { id: data[e]._id } });
    },
  },
  async mounted() {
    console.log("发送获取就诊记录列表接口");
    Common.getVisitRecordList()
      .then((res) => {
        // console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          this.tableData = res.data.info;
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Common.getAllDoctor()
    //   .then((res) => {
    //     if (res.data.code === 1) {
    //       console.log("11111: " + JSON.stringify(res.data.info));
    //       for (let i = 0; i < res.data.info.length; i++) {
    //         for (let j = 0; j < this.tableData.length; j++) {
    //           if (res.data.info[i]._id == this.tableData[j].doctorId) {
    //             // console.log("11111: " + JSON.stringify(res.data.info[i]));
    //             this.alldoctordetails = res.data.info[i];
    //             alert("2345: " + this.alldoctordetails.name);
    //             this.tableData.doctorName = this.alldoctordetails.name;
    //             console.log("check: " + this.tableData.doctorName);
    //             break;
    //           }
    //         }
    //       }
    //     } else {
    //       alert(res.data.info);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  },
};
</script>

<style>
.container {
  margin-top: 3%;
  margin-left: 3%;
  width: 100%;
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
</style>
