<template>
  <el-form class="container" ref="form" :model="form" label-width="200px" :rules="rules">
    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="form.name" disabled></el-input>
    </el-form-item>
    <el-form-item label="Gender" prop="gender">
      <el-select
        v-model.trim="form.gender"
        placeholder="please choose the gender"
        style="width: 670px"
      >
        <el-option label="male" value="male"></el-option>
        <el-option label="female" value="female"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Birth" prop="birth">
      <el-date-picker
        type="date"
        placeholder="please choose the date"
        v-model.trim="form.birth"
        style="width: 100%"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input type="email" v-model.trim="form.email" disabled></el-input>
    </el-form-item>
    <el-form-item label="Address" prop="address">
      <el-input v-model.trim="form.address"></el-input>
    </el-form-item>
    <el-form-item label="Allergy Medicine" prop="allergy">
      <el-input type="textarea" v-model.trim="form.allergy"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="submit" @click="onSubmit('form')">UPDATE</el-button>
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
      // json: JSON.parse(localStorage.getItem("user")),
      form: {
        name: "",
        gender: "",
        birth: "",
        email: "",
        address: "",
        allergy: "",
      },
      rules: {
        name: [{ required: true, message: "cannot be null", trigger: "blur" }],
        gender: [{ required: true, message: "cannot be null", trigger: "blur" }],
        birth: [{ required: true, message: "cannot be null", trigger: "blur" }],
        email: [{ required: true, message: "cannot be null", trigger: "blur" }],
        allergy: [{ required: true, message: "cannot be null", trigger: "blur" }],
      },
    };
  },
  methods: {
    async onSubmit(formName) {
      //发送修改用户个人信息接口
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          Service.resaveUserInfo(this.form)
            .then((res) => {
              if (res.data.code === 1) {
                alert(res.data.info);
                location.assign("/mycenter");
              } else {
                alert(res.data.info);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //校验不通过
          alert("please check the email format");
          return false;
        }
      });
    },
    handleup: function () {
      this.$router.replace("/mycenter");
    },
  },
  async mounted() {
    let datas1 = {
      userId: JSON.parse(localStorage.getItem("user")).id,
    };
    
    Service.getUserInfo(datas1)
      .then((res) => {
        if (res.data.code === 1) {
          this.form = res.data.info;
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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container {
  margin-left: 20%;
  margin-top: 3%;
  width: 900px;
  text-align: left;
}
</style>
