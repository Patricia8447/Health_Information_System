<template>
  <div class="container">
    <div class="tittle_search">Here Offer You The Information Of Medicine</div>
    <div class="search">
      <el-row>
        <el-col :span="12"
          ><div class="inputtext">
            <el-input
              v-model="input"
              placeholder="please enter the medicine name"
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
    <el-table :data="tableData" style="width: 100%; margin-left: 5%">
      <el-table-column prop="title" label="Drug Name"> </el-table-column>
      <el-table-column prop="content" label="Detail Content"> </el-table-column>
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
    };
  },
  methods: {
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
          } else {
            this.tableData = [];
          }
          console.log(res);
        });
    },
  },
};
</script>

<style scope>
.container {
  width: 100%;
  height: 100%;
  top: 0;
  float: center;
}

.search {
  width: 800px;
  height: 150px;
  margin-left: 25%;
  margin-top: 10%;
  text-align: center;
}

.tittle_search {
  font-size: 2em;
  text-align: center;
  font: bold;
  margin-top: 5%;
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
