<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search || data.patientname.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      :default-sort="{ prop: 'time', order: 'descending' }"
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
          <el-input v-model="search" size="mini" placeholder="search your patient..." />
        </template>
        <template slot-scope="scope" class="btns">
          <el-button
            type="primary"
            plain
            class="button"
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
            :disabled="scope.row.status != 'finished'"
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
    //???????????????????????????
    getCurrentDate(appointmentDate) {
      var myDate = new Date(new Date().getTime() + 8 * 60 * 60 * 1000);
      var time = myDate.toJSON().split("T").join(" ").substr(0, 19); //???1970/08/08?????????1970-08-08
      console.log(time);
      if (appointmentDate > time) {
        return true;
      } else {
        return false;
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
     * ??????????????????????????????????????????????????????
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
     * ??????span?????????????????????????????????span????????? width??? px
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
     * el-table-column ???????????????
     * @param prop_label: ??????
     * @param table_data: ????????????
     */
    flexColumnWidth(label, prop) {
      // 1.???????????????????????????
      const arr = this.tableData.map((x) => x[prop]);
      arr.push(label); // ?????????????????????????????????
      // 2.????????????????????????????????? + ????????????????????????????????????????????????
      return this.getMaxLength(arr) + 25 + "px";
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
          // alert("???????????????id??? " + res.data.info.doctor.id);
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

/** ??????el-card??????paddingL:20px-????????? **/
>>> .el-card__body {
  padding: 10px;
}

.el-table /deep/ .cell {
  white-space: nowrap;
  width: fit-content;
}
</style>
