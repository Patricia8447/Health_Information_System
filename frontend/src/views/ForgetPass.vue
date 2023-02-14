<template>
  <div id="background">
    <img :src="bgurl" />
    <div class="container">
      <form @submit.prevent="forgetPassword">
        <h1>Forget Password</h1>
        <div class="form">
          <div class="item">
            <label>Email: </label
            ><input
              type="email"
              v-model="user.email"
              placeholder="Please enter the email..."
              required
            />
          </div>
        </div>
      </form>
      <div class="btns">
        <button type="submit" @click.prevent="forgetPassword">Submit</button>
        <!-- v-on点击按钮触发handlelogin方法 -->
        <button @click.prevent="handlecancel">Cancel</button>
      </div>
      <router-view></router-view>
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
      user: {
        email: "",
      },
      bgurl: bg,
    };
  },
  methods: {
    forgetPassword() {
      // TODO 忘记密码接口
      console.log("发送忘记密码接口", this.user.email);
      console.log(this.user.email);
      if (this.user.email == "") {
        alert("The email can not be empty!");
      } else {
        Service.sendCheckMail(this.user)
          .then((res) => {
            console.log(res.data);
            if (res.data.code === 1) {
              // 根据原本的逻辑进行添加
              alert(res.data.info + " Please check your registered email to reset the password!");
              this.$router.replace("/resetpass");
            } else {
              alert(res.data.info);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
