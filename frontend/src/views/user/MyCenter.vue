<template>
  <div class="container">
    <el-descriptions
      title="Personal Center"
      direction="vertical"
      :column="2"
      border
      :contentStyle="CS"
    >
      <template slot="extra">
        <el-button type="primary" size="small" plain
          ><router-link to="/editmycenter">Edit</router-link></el-button
        >
      </template>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-user"></i>
            username
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.name }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-s-custom"></i>
            gender
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.gender }}
        </div>
      </el-descriptions-item>

      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-magic-stick"></i>
            birth
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.birth.split("T")[0] }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-message"></i>
            email
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.email }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-location-outline"></i>
            address
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.address }}
        </div>
      </el-descriptions-item>
      <el-descriptions-item>
        <template slot="label">
          <div class="my-label">
            <i class="el-icon-first-aid-kit"></i>
            allergy medicine
          </div>
        </template>
        <div class="my-content">
          {{ personalInfos.allergy }}
        </div>
      </el-descriptions-item>
      <!-- <el-descriptions-item label="testing" prop="testing">{{
        personalInfos
      }}</el-descriptions-item> -->
    </el-descriptions>
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
    logout: function () {
      this.isAuth = "false"; //修改登录状态
      localStorage.setItem("s", this.isAuth);
      this.$router.replace("/healthinformation"); //页面跳转至健康資訊页面
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
  background: #add8e6;
  font-size: 1.3em;
  color: #444444;
}

.my-content {
  font-size: 1.5em;
  color: black;
}
</style>
