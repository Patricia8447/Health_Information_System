<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            (!search || data.name.toLowerCase().includes(search.toLowerCase())) &&
            data.status == 'Approved'
        )
      "
      :row-class-name="tableRowClassName"
      style="width: 100%"
    >
      <!-- <el-table-column label="ID" prop="_id" width="150px"></el-table-column> -->
      <el-table-column label="Name" prop="name" :width="flexColumnWidth('Name', 'name')">
      </el-table-column>
      <el-table-column
        label="Gender"
        prop="gender"
        :width="flexColumnWidth('Gender', 'gender')"
      >
      </el-table-column>
      <el-table-column
        label="Working Place"
        prop="hospitalName"
        :width="flexColumnWidth('Working Place', 'hospitalName')"
      >
      </el-table-column>
      <el-table-column
        label="Hospital Level"
        prop="hospitalLevel"
        :width="flexColumnWidth('Hospital Level', 'hospitalLevel')"
      >
      </el-table-column>
      <el-table-column
        label="Job Position"
        prop="job"
        :width="flexColumnWidth('Job Position', 'job')"
      >
      </el-table-column>
      <!-- <el-table-column
        label="Strength"
        prop="strength"
        :width="flexColumnWidth('Strength', 'strength')"
      >
      </el-table-column>
      <el-table-column
        label="Self Introduction"
        prop="selfIntro"
        :width="flexColumnWidth('Self Introduction', 'selfIntro')"
      >
      </el-table-column> -->

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="search a doctor" />
        </template>
        <template slot-scope="scope" class="btns">
          <el-button type="success" plain class="button" @click="goRoute(scope.$index)">
            Make Appointment
          </el-button>
          <el-button
            type="primary"
            plain
            class="button"
            @click="viewDetail(scope.$index)"
          >
            View More Detail
          </el-button>
        </template>
      </el-table-column>
    </el-table>
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
          _id: "", //????????????doctorID
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
      let data = this.tableData;
      // ?????????
      console.log("make-appointment: " + data[e]._id);
      this.$router.push({ name: "MakeAppointment", params: { id: data[e]._id } });
    },
    viewDetail(e) {
      let data = this.tableData;
      console.log("view-detail: " + data[e]._id);
      this.$router.push({ name: "ViewDoctorDetail", params: { id: data[e]._id } });
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
      return this.getMaxLength(arr) + 28 + "px";
    },
    makeAppointment(_id, status) {
      console.log(_id);
      console.log(status);
      console.log(" ??????????????????????????????");

      adminService
        .personAskDoctor(datas)
        .then((res) => {
          // console.log("test" + res.data);
          console.log("test1" + JSON.stringify(res.data));
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
    console.log("???????????????????????????????????????????????????");
    Service.getApprovedDoctor()
      .then((res) => {
        if (res.data.code === 1) {
          for (let i = 0; i < res.data.info.length; i++) {
            if (res.data.info[i].status == "Approved") {
              console.log("test-whos-doctor: " + JSON.stringify(res.data.info[i]));
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

<style>
.el-table .warning-row {
  display: none;
}

.container {
  margin-top: 3%;
  margin-left: 3%;
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
