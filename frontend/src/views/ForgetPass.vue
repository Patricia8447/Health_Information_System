<template>
  <div id="background">
    <img :src="bgurl" />
    <div class="container has-text-center">
      <h1>Forget Password</h1>
      <el-form
        :model="json"
        :rules="rules"
        ref="json"
        label-color="black"
        label-width="150px"
        class="json"
      >
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model.trim="json.email" required></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="submit" @click="forgetPassword('json')">Submit</el-button>
          <el-button type="success" plain @click.prevent="handlecancel">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bg from "@/assets/image/bg.jpg";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { auth } from "firebase/app";
import "firebase/auth";
import Service from "@/service/user.service.js";
export default {
  data() {
    return {
      json: {
        email: "",
      },
      bgurl: bg,
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "please enter the correct email format",
            trigger: ["blur", "change"],
            pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
          },
        ],
      },
    };
  },
  methods: {
    forgetPassword(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
          // 忘记密码接口
          console.log("发送忘记密码接口", this.json);
          Service.sendCheckMail(this.json)
            .then((res) => {
              if (res.data.code === 1) {
                alert(
                  res.data.info +
                    " Please check your registered email to reset the password!"
                );
                this.$router.replace("/resetpass");
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
    handlecancel: function () {
      this.$router.replace("/login"); // 點擊取消按鈕，跳轉至健康資訊頁面
    },
  },
};
</script>

<style scoped>
#background {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: rgb(160, 204, 245);
}

.container {
  width: 600px;
  height: 400px;
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
  background: #00000030;
  text-align: center;
  border-radius: 20px;
  margin-top: 10px;
}

img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 属性定义元素是否对指针事件做出反应 */
  pointer-events: none;
}

.container h1 {
  margin: 55px;
  color: aliceblue;
  margin-left: 20px;
  font-size: 25px;
}
.item {
  color: white;
  margin-left: 15%;
  margin-top: 35px;
  font-size: 20px;
  text-align: left;
  height: 45px;
}
.item label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}
input {
  margin-left: -5px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 200px;
  height: 23px;
  background: #f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 8px;
}
button {
  position: relative;
  height: 33px;
  width: 100px;
  background: rgb(73, 158, 243);
  border-radius: 10px;
  margin-top: 18px;
  box-shadow: none;
  color: white;
  margin-left: 40px;
  margin-right: 10px;
}

.btns {
  margin: 40px;
  width: 500px;
  margin-left: 3%;
}

.sub {
  height: 5px;
  margin-left: 18%;
}

.sub a {
  text-decoration: underline;
  color: blue;
}
/* .keep {
  color: white;
}
.keep input {
  width: 15px;
  height: 15px;
  margin-top: 7px;
  margin-left: 10px;
  margin-right: 10px;
} */
</style>
