<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.userName.toLowerCase().includes(search.toLowerCase()) ||
            data.appointmentDate.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      height="2500"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column
        label="Patient ID"
        prop="userId"
        :width="flexColumnWidth('Patient ID', 'userId')"
      >
      </el-table-column>
      <el-table-column
        label="Patient Name"
        prop="userName"
        :width="flexColumnWidth('Patient Name', 'userName')"
      >
      </el-table-column>
      <el-table-column
        label="Self Report"
        prop="selfReport"
        :width="flexColumnWidth('Self Report', 'selfReport')"
      >
      </el-table-column>
      <el-table-column
        label="Allergy Medicine"
        prop="allergyMedicine"
        :width="flexColumnWidth('Allergy Medicine', 'allergyMedicine')"
      >
      </el-table-column>
      <el-table-column
        label="Time"
        prop="appointmentTime"
        sortable
        :width="flexColumnWidth('Appointment Time', 'appointmentTime')"
      >
      </el-table-column>
      <el-table-column
        label="Date"
        prop="appointmentDate"
        sortable
        :width="flexColumnWidth('Appointment Date', 'appointmentDate')"
      >
      </el-table-column>
      <el-table-column
        label="Status"
        prop="status"
        :width="flexColumnWidth('Status', 'status')"
      >
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            style="width: 300px"
            v-model="search"
            size="mini"
            placeholder="search your patient by name or by date..."
          />
        </template>
        <template slot-scope="scope" class="btns">
          <el-button
            type="primary"
            plain
            class="button"
            @click="clickStart(scope.$index)"
            :disabled="
              getCurrentDate(scope.row.appointmentDate) ||
              scope.row.status != 'Not yet start'
            "
          >
            <a :href="zoomlink" target="_blank" style="text-decoration: none"> Start </a>
          </el-button>
          <el-button
            type="success"
            plain
            class="button"
            @click="goRoute(scope.$index)"
            :disabled="scope.row.status != 'on-going'"
          >
            Write Diagnosis Result
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Service from "@/service/doctor.service.js";
import User from "@/service/user.service.js";

export default {
  data() {
    return {
      tableData: [
        {
          userId: "",
          doctorId: "",
          selfReport: "",
          allergyMedicine: "",
          appointmentTime: "",
          appointmentDate: "",
          status: "",
          time: "",
          userName: "",
        },
      ],
      search: "",
      zoomlink: "",
    };
  },
  methods: {
    clickStart(e) {
      console.log("testing index: " + e);
      let data = this.tableData;
      let data1 = {
        inquiryId: data[e]._id,
      };
      console.log("data: " + data[e]._id);
      Service.clickStart(data1)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            alert("please remember to write the diagnosis result after the consultation!");
            console.log(res.data.info);
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log("it is right");
    },
    getCurrentDate(appointmentDate) {
      var myDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
      var time = myDate.toJSON().split("T").join(" ").substr(0, 19); //将1970/08/08转化成1970-08-08
      console.log(time);
      if (appointmentDate > time) {
        console.log(appointmentDate > time);
        return false;
      } else {
        console.log(appointmentDate > time);
        return true;
      }
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color:#87cefa;color:black;font-size:13px;font-weight: 700;";
      }
    },
    goRoute(e) {
      let data = this.tableData;
      this.$router.push({ name: "ConRecord", params: { id: data[e]._id } });
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
      return this.getMaxLength(arr) + 35 + "px";
    },
  },
  mounted() {
    let datas1 = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };

    User.getUserInfo(datas1)
      .then((res) => {
        if (res.data.code === 1) {
          this.zoomlink = res.data.info.doctor.zoomlink;
          // alert("这是医生的id： " + res.data.info.doctor.id);
          let datas2 = {
            doctorId: res.data.info.doctor.id,
          };

          Service.getInquiryList(datas2)
            .then((res) => {
              if (res.data.code === 1) {
                this.tableData = res.data.info;
              } else {
                alert(res.data.info);
              }
            })
            .catch((err) => {
              console.log(err);
            });
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
