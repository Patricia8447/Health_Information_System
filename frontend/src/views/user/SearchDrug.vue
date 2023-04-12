<template>
  <div class="container">
    <h3 class="tittle_search">Here Offer You The Information Of Medicine</h3>
    <div class="search">
      <el-row>
        <el-col :span="12"
          ><div class="inputtext">
            <el-input
              v-model="input"
              placeholder="please enter the medicine name here ..."
              clearable
            ></el-input></div
        ></el-col>
        <el-col :span="12"
          ><div class="searchbtn">
            <el-button type="primary" round @click="searching(input)">SEARCH</el-button>
          </div></el-col
        >
      </el-row>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%; margin-left: 15%; margin-top: 10px"
      :header-cell-style="tableHeaderColor"
      :show-header="showheader"
    >
      <el-table-column
        prop="title"
        label="Drug Name"
        :width="flexColumnWidth('Drug Name', 'title')"
      >
      </el-table-column>
      <el-table-column
        prop="content"
        label="Detail Content"
        :width="flexColumnWidth('Detail Content', 'content')"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      input: "",
      tableData: [],
      showheader: false,
    };
  },
  methods: {
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
      return this.getMaxLength(arr) + 50 + "px";
    },
    searching(input) {
      axios
        .get(
          "http://api.tianapi.com/yaopin/index?key=ba934a97cfcda7893e42ff83719ccdc1&word=" +
            encodeURI(input)
        )
        .then((res) => {
          let data = res.data.newslist;
          if (data) {
            data.forEach((v) => {
              v.content = v.content.replace(/<\/?.+?>/g, "\n");
              console.log(v.content);
            });
            this.tableData = data;
            this.showheader = true;
          } else {
            this.tableData = [];
          }
          console.log(res);
        });
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "color:black;font-size:17px;font-weight: 700;";
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  margin-top: 3%;
  float: center;
}

.search {
  width: 800px;
  height: 150px;
  margin-left: 25%;
  margin-top: 4%;
  text-align: center;
}

.tittle_search {
  text-align: center;
  font-weight: bold;
  margin-top: 3%;
  background-color: #ccddff;
  width: 510px;
  margin-left: 25%;
}

.el-table .cell {
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: pre-line;
  word-break: break-all;
  line-height: 23px;
  padding-left: 10px;
  padding-right: 10px;
}
</style>
