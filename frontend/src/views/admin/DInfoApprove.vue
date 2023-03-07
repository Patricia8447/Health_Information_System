<template>
  <div class="container">
    <el-table
      :data="
        tableData.filter(
          (data) => !search || data.name.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
    >
      <el-table-column label="ID" prop="_id" width="150px"></el-table-column>
      <el-table-column
        label="Name"
        prop="userInfo[0].name"
        :width="flexColumnWidth('Name', 'name')"
      >
      </el-table-column>
      <el-table-column
        label="Gender"
        prop="userInfo[0].gender"
        :width="flexColumnWidth('Gender', 'gender')"
      >
      </el-table-column>
      <el-table-column
        label="Working Place"
        prop="hospitalName"
        :width="flexColumnWidth('Working Place', 'hospitalName')"
      >
      </el-table-column>
      <!-- <el-table-column
        label="Category"
        prop="category"
        :width="flexColumnWidth('Category', 'category')"
      >
      </el-table-column> -->
      <el-table-column
        label="Job Position"
        prop="job"
        :width="flexColumnWidth('Job Position', 'job')"
      >
      </el-table-column>
      <!-- <el-table-column
        label="Available slots"
        prop="slots"
        :width="flexColumnWidth('Available slots', 'slots')"
      >
      </el-table-column> -->
      <!-- <el-table-column
        label="Submit Time"
        prop="submittime"
        :width="flexColumnWidth('Submit Time', 'submittime')"
        sortable
      >
      </el-table-column> -->
      <el-table-column
        label="Current Status"
        prop="status"
        :width="flexColumnWidth('Current Status', 'status')"
      >
      </el-table-column>

      <el-table-column align="right">
        <template slot="header" slot-scope="scope">
          <el-input v-model="search" size="mini" placeholder="search a doctor" />
        </template>
        <template slot-scope="scope" class="btns">
          <!-- 同意或者拒绝没有页面的跳转，会有popoup再次确认操作 -->
          <el-button
            size="mini"
            type="success"
            class="button"
            @click="viewDetail(scope.$index)"
          >
            View Doctor Detail
          </el-button>
          <el-button
            size="mini"
            type="primary"
            :disabled="scope.row.status != 'Reviewing'"
            @click="openAgree(scope.row.userId, scope.row.status)"
            >Agree</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.status != 'Reviewing'"
            @click="openReject(scope.row.userId, scope.row.status)"
            >Reject</el-button
          >
          <el-button
            size="mini"
            type="danger"
            :disabled="scope.row.status != 'Approved'"
            @click="openInactive(scope.$index, scope.row.userId, scope.row.status)"
            >Inactive</el-button
          >
          <!-- 该按钮在审核完成后才能进行点击，在此之前应该是unclickable的状态 -->
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
      return this.getMaxLength(arr) + 28 + "px";
    },
    openAgree(_id, status) {
      console.log(_id);
      console.log(status);
      console.log("admin审批医生申请接口");
      let datas = {
        userId: _id,
        status: "Approved",
      };

      // TODO 审批医生接口
      adminService
        .ApprovalDoctorStatus(datas)
        .then((res) => {
          // console.log("test" + res.data);
          console.log("test1" + JSON.stringify(res.data));
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      // this.$confirm(
      //   "you are going to approve the doctor, make sure you do the right action?",
      //   "warning",
      //   {
      //     confirmButtonText: "agree",
      //     cancelButtonText: "cancel",
      //     type: "warning",
      //   }
      // )
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "successfully approve!",
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "cancel the process",
      //     });
      //   });
    },
    openReject(_id, status) {
      console.log(_id);
      console.log(status);
      console.log("admin审批医生申请接口");
      let datas = {
        userId: _id,
        status: "NoPass",
      };

      // TODO 审批医生接口
      adminService
        .RejectDoctorStatus(datas)
        .then((res) => {
          console.log("test1" + JSON.stringify(res.data));
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      // this.$confirm(
      //   "you are going to reject the doctor, make sure you do the right action?",
      //   "warning",
      //   {
      //     confirmButtonText: "reject",
      //     cancelButtonText: "cancel",
      //     type: "warning",
      //   }
      // )
      //   .then(() => {
      //     this.$message({
      //       type: "success",
      //       message: "successfully reject!",
      //     });
      //   })
      //   .catch(() => {
      //     this.$message({
      //       type: "info",
      //       message: "cancel the process",
      //     });
      //   });
    },
    openInactive(e, _id, status) {
      console.log("admin inactive 医生申请接口");
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
          console.log("test-inactive-function: " + JSON.stringify(res.data));
          if (res.data.code === 1) {
            alert(res.data.info);
            //改变受影响但未进行的预约订单
            for (let i = 0; i < this.affectedTableData.length; i++) {
              if (this.affectedTableData[i].status == "Not yet start") {
                let datas3 = {
                  inquiryId: this.affectedTableData[i]._id,
                };
                let datas4 = {
                  userId: this.affectedTableData[i].userId,
                };
                // alert("datas4: " + this.affectedTableData[i].userId);
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
    console.log("发送获取医生列表接口");
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

<style>
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

/** 修改el-card默认paddingL:20px-内边距 **/
>>> .el-card__body {
  padding: 10px;
}

.el-table /deep/ .cell {
  white-space: nowrap;
  width: fit-content;
}
</style>
