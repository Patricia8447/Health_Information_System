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
      :default-sort="{ prop: 'startdate', order: 'descending' }"
    >
      <el-table-column
        label="User ID"
        prop="userId"
        :width="flexColumnWidth('User ID', 'userId')"
      >
      </el-table-column>
      <!-- <el-table-column
        label="Patient Name"
        prop="patientname"
        :width="flexColumnWidth('Patient Name', 'patientname')"
      >
      </el-table-column> -->
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
          <el-button type="success" plain size="mini" @click="open">Start</el-button>

          <!-- 问诊结束之后才能click以下按钮 -->
          <el-button type="primary" plain size="mini"
            ><router-link to="/conrecord"
              >Write Consultation Detail</router-link
            ></el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Service from "@/service/doctor.service.js";
export default {
  data() {
    return {
      tableData: [
        {
          userId: "1",
          // patientname: "",
          selfReport: "testing",
          allergyMedicine: "",
          appointmentTime: "",
          status: "",
        },
        // {
        //   patientid: 2,
        //   patientname: "Bob",
        //   selfreport: "Sore throat, headache",
        //   allergymedicine: "none",
        //   appointmenttime: "2022-11-08  ",
        //   status: "ongoing",
        // },
      ],
      search: "",
    };
  },
  methods: {
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
      // console.log('label', label)
      // console.log('prop', prop)
      // 1.获取该列的所有数据
      const arr = this.tableData.map((x) => x[prop]);
      arr.push(label); // 把每列的表头也加进去算
      // console.log(arr)
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
  },
  async mounted() {
    console.log("发送获取所有患者列表接口");
    // TODO 医生列表接口
    Service.getInquiryList()
      .then((res) => {
        console.log("test" + res.data);
        console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          this.tableData = res.data.info;
          this.te;
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

/** 修改el-card默认paddingL:20px-内边距 **/
>>> .el-card__body {
  padding: 10px;
}

.el-table /deep/ .cell {
  white-space: nowrap;
  width: fit-content;
}
</style>
