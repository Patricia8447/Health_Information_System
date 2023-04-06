<template>
  <div class="container">
    <h3 class="titleFormat1">Personal Center</h3>
    <el-row>
      <el-col :span="6"
        ><div class="picture">
          <img
            class="carouselImage"
            alt="无图片"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFN3fUaWdcoipehnhpOb5buxN_URfOp84yvQ&usqp=CAU"
          /></div
      ></el-col>
      <el-col :span="18"
        ><div class="content">
          <el-descriptions
            title=""
            direction="vertical"
            :column="2"
            :size="size"
            :contentStyle="CS"
          >
            <template slot="extra">
              <el-button type="primary" plain @click="switchPage('EditMyCenter')"
                ><i class="el-icon-edit"></i>Edit</el-button
              >
            </template>

            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-user"></i>
                  Username: {{ personalInfos.name }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-s-custom"></i>
                  Gender: {{ personalInfos.gender }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-magic-stick"></i>
                  Birth: {{ personalInfos.birth.split("T")[0] }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-message"></i>
                  Email: {{ personalInfos.email }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-location-outline"></i>
                  Address: {{ personalInfos.address }}
                </div>
              </template>
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <div class="my-label">
                  <i class="el-icon-first-aid-kit"></i>
                  Allergy Medicine: {{ personalInfos.allergy }}
                </div>
              </template>
            </el-descriptions-item>
          </el-descriptions>
        </div></el-col
      >
    </el-row>
  </div>
</template>

<script>
import Router from "vue-router";
import { ref } from "vue";
import User from "@/service/user.service.js";

export default {
  data() {
    return {
      isAuth: "", //是否保持登录状态
      personalInfos: {
        name: "",
        gender: "",
        birth: "",
        email: "",
        address: "",
        allergy: "",
      },
      CS: {
        "text-align": "left", //文本居中
        "min-width": "40px", //最小宽度
        "max-width": "250px", //最小宽度
        "word-break": "break-all", //过长时自动换行
      },
    };
  },
  methods: {
    //当点击退出按钮，将不保存登录状态
    switchPage(str) {
      this.$router.push({ name: str });
    },
  },
  async mounted() {
    let datas1 = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    console.log(datas1);

    User.getUserInfo(datas1)
      .then((res) => {
        if (res.data.code === 1) {
          this.personalInfos = res.data.info;
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
  margin-left: 10%;
}

.my-label {
  font-size: 1.5em;
  color: black;
  font-weight: bold;
}

.picture {
  float: left;
  margin: 10px;
}

.titleFormat1 {
  font-weight: bold;
  background-color: #ccddff;
  width: 450px;
  text-align: center;
  margin-left: 37%;
}
</style>
