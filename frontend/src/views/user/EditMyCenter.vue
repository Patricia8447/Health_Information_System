<template>
  <el-form class="container" ref="form" :model="json" label-width="80px">
    <el-form-item label="Name">
      <el-input v-model.trim="json.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-select v-model.trim="json.gender" placeholder="please choose the gender">
        <el-option label="male" value="male"></el-option>
        <el-option label="female" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Birth">
      <el-date-picker
        type="date"
        placeholder="choose the date"
        v-model.trim="json.birth"
        style="width: 100%"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Phone">
      <el-input v-model.trim="json.phone"></el-input>
    </el-form-item>
    <el-form-item label="Email">
      <el-input type="email" v-model.trim="json.email" disabled></el-input>
    </el-form-item>
    <el-form-item label="Address">
      <el-input v-model.trim="json.address"></el-input>
    </el-form-item>
    <el-form-item label="allergy">
      <el-input type="textarea" v-model.trim="json.allergy"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="submit" @click="onSubmit()">UPDATE</el-button>
      <el-button type="danger" plain @click="handleup()">CANCEL</el-button>
    </el-form-item>
    <router-view></router-view>
  </el-form>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/user.service.js";
import { ref } from "vue";

let json = ref({});
export default {
  data() {
    return {
      json: JSON.parse(localStorage.getItem("user")),
      form: {
        name: "",
        gender: "",
        birth: "",
        email: "",
        phone: "",
        address: "",
        allergy: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      console.log("发送修改用户个人信息接口");
      // TODO 修改用户个人信息接口
      console.log(this.json);
      Service.resaveUserInfo(this.json)
        .then((res) => {
          console.log("test" + res.data);
          console.log("test1" + JSON.stringify(this.json));
          // alert(res.data);
          // alert(this.json);
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
            localStorage.setItem("user", JSON.stringify(this.json));
            location.assign("/mycenter");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleup: function () {
      this.$router.replace("/mycenter");
    },
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin-left: 18%;
  margin-top: 3%;
  width: 900px;
}
</style>
