<template>
  <div id="background">
    <img :src="bgurl" />
    <div class="container">
      <form action="">
        <h1>Welcome to the Health Prediction System</h1>
        <div class="form">
          <div class="item">
            <label>Email: </label
            ><input
              type="text"
              name="username"
              v-model.trim="json.username"
              placeholder="Please enter the username..."
            />
            <!-- v-model把输入的值传输给name变量 -->
            <br />
          </div>
          <div class="item">
            <label>Password: </label
            ><input
              type="password"
              name="password"
              v-model.trim="json.password"
              placeholder="Please enter the password..."
            />
            <br />
          </div>

          <div class="sub">
            <a @click.prevent="handleregister()">Register</a>
            &nbsp <a><router-link to="/forgetpass">Forget Password</router-link></a>
          </div>
        </div>
      </form>
      <div class="btns">
        <button type="submit" @click.prevent="loginUser()">Login</button>
        <!-- v-on点击按钮触发handlelogin方法 -->
        <button @click.prevent="handlecancel()">Cancel</button>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import bg from "@/assets/image/bg.jpg";
import jwt_decode from "jwt-decode";
import Service from "@/service/user.service.js";
export default {
  data() {
    return {
      json: {},
      bgurl: bg,
    };
  },
  methods: {
    async loginUser() {
      // TODO 登录接口
      console.log("发送登录接口", this.json);
      Service.login(this.json)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert("login Successfully.");
            //TODO 缓存用户信息
            localStorage.setItem("user", JSON.stringify(res.data.info));
            localStorage.setItem("user_id", res.data.info.id);
            localStorage.setItem("user_role", res.data.info.role);
            localStorage.setItem("user_time", res.data.info.time);
            localStorage.setItem("user_token", res.data.info.token);
            if (res.data.info.role == "DOCTOR")
              // localStorage.setItem("doctor", JSON.stringify(res.data.info));
              // localStorage.setItem("doctor_id", res.data.info.id);
              // localStorage.setItem("doctor_role", res.data.info.role);
              // localStorage.setItem("doctor_time", res.data.info.time);
              // localStorage.setItem("doctor_token", res.data.info.token);
              location.assign("/qualificationapplication");
            else location.assign("/healthinformation");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    },
    handlelogin: function () {
      if (
        this.name === localStorage["name"] &&
        this.password === localStorage["password"]
      ) {
        this.$router.replace("/healthinformation"); //如果输入的名字以及密码正确路由跳转至个人页面
      } else if (this.name === "") {
        //名字为空
        alert("Please enter the correct username");
      } else if (this.password === "") {
        //密码为空
        alert("password cannot be empty");
      } else {
        alert("username does not exit, please register first"); //查无此号
      }
      if (this.name === "admin") {
        window.localStorage.setItem("roles", "admin");
      } else if (this.name === "doctor") {
        window.localStorage.setItem("roles", "doctor");
      } else if (this.name === "user") {
        window.localStorage.setItem("roles", "user");
      }
    },
    handleregister: function () {
      this.$router.replace("/register"); //点击注册按钮，跳转至注册页面
    },
    handlecancel: function () {
      this.$router.replace("/healthinformation"); // 點擊取消按鈕，跳轉至健康資訊頁面
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
  position: fixed;
  top: 40%;
  left: 50%;
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
