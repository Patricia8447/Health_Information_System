<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) =>
            !search ||
            data.name.toLowerCase().includes(search.toLowerCase()) ||
            data.job.toLowerCase().includes(search.toLowerCase()) ||
            data.status.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      height="2700"
      :header-cell-style="tableHeaderColor"
    >
      <el-table-column label="ID" prop="_id" width="220px"></el-table-column>
      <el-table-column
        label="Name"
        prop="userInfo[0].name"
        :width="flexColumnWidth('Name', 'name')"
      >
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
        label="Job Position"
        prop="job"
        :width="flexColumnWidth('Job Position', 'job')"
      >
      </el-table-column>

      <el-table-column
        label="Current Status"
        prop="status"
        :width="flexColumnWidth('Current Status', 'status')"
      >
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="search a doctor by name, status or job position..."
          />
        </template>
        <template slot-scope="scope" class="btns">
          <el-button
            type="success"
            plain
            class="button"
            @click="viewDetail(scope.$index)"
          >
            View Doctor Detail
          </el-button>
          <el-button
            type="primary"
            plain
            :disabled="scope.row.status != 'Reviewing'"
            @click="openAgree(scope.row.userId, scope.row.status)"
            class="button"
            >Agree</el-button
          >
          <el-button
            type="danger"
            plain
            :disabled="scope.row.status != 'Reviewing'"
            @click="openReject(scope.row.userId, scope.row.status)"
            class="button"
            >Reject</el-button
          >
          <el-button
            type="danger"
            plain
            :disabled="scope.row.status != 'Approved'"
            @click="openInactive(scope.$index, scope.row.userId, scope.row.status)"
            class="button"
            >Inactive</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Service from "@/service/common.service.js";
import doctorService from "@/service/doctor.service.js";
import adminService from "@/service/admin.service.js";
import userService from "@/service/user.service.js";
import { ref } from "vue";

let json = ref({});

export default {
  data() {
    return {
      tableData: [
        {
          _id: "",
          name: "",
          gender: "",
          hospitalName: "",
          category: "",
          job: "",
          slots: "",
          submittime: "",
          status: "",
        },
      ],
      affectedTableData: [
        {
          _id: "",
          userId: "",
          doctorId: "",
          selfReport: "",
          allergyMedicine: "",
          appointmentTime: "",
          appointmentDate: "",
          status: "",
          time: "",
        },
      ],
      search: "",
      user: {
        email: "patricia8447@163.com",
      },
    };
  },
  methods: {
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #CCDDFF;color:black;font-size:13px;font-weight: 700; height: 70px;";
      }
    },
    viewDetail(e) {
      let data = this.tableData;
      this.$router.push({ name: "AdminDoctorDetail", params: { id: data[e]._id } });
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
      return this.getMaxLength(arr) + 30 + "px";
    },
    openAgree(_id, status) {
      let datas = {
        userId: _id,
        status: "Approved",
      };

      // TODO 审批医生接口
      adminService
        .ApprovalDoctorStatus(datas)
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
    openReject(_id, status) {
      let datas = {
        userId: _id,
        status: "NoPass",
      };

      // 审批医生接口
      adminService
        .RejectDoctorStatus(datas)
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
    openInactive(e, _id, status) {
      let datas = {
        userId: _id,
        status: "Reviewing",
      };

      let datas2 = {
        doctorId: this.tableData[e]._id,
      };
      doctorService
        .getInquiryList(datas2)
        .then((res) => {
          if (res.data.code === 1) {
            this.affectedTableData = res.data.info;
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      //改变医生的审核状态为reviewing
      adminService
        .InactiveDoctorStatus(datas)
        .then((res) => {
          if (res.data.code === 1) {
            alert(res.data.info);
            //改变受影响但未进行的预约订单
            for (let i = 0; i < this.affectedTableData.length; i++) {
              if (
                this.affectedTableData[i].status == "Not yet start" ||
                this.affectedTableData[i].status == "on-going"
              ) {
                let datas3 = {
                  inquiryId: this.affectedTableData[i]._id,
                };
                let datas4 = {
                  userId: this.affectedTableData[i].userId,
                };
                adminService
                  .changeInquiryStatus(datas3)
                  .then((res) => {
                    if (res.data.code === 1) {
                      // alert(res.data.info);
                    } else {
                      alert(res.data.info);
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                console.log("status not equal 'not yet start'");
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
  },
  async mounted() {
    //发送获取医生列表接口
    Service.getAllDoctor()
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
  },
};
</script>

<style scoped>
.container {
  margin-top: 3%;
  margin-left: 3%;
  width: 1500px;
}


</style>
