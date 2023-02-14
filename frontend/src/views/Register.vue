<template>
  <form @submit.prevent="createUser()">
    <div id="background">
      <img :src="bgurl" />
      <div id="contain">
        <h1>Welcome New User</h1>
        <div class="form">
          <label>Username: </label
          ><input
            type="text"
            v-model.trim="json.name"
            required
            pattern="^[^\u4e00-\u9fa5]+$"
            title="不能包含中文"
          /><br />
        </div>
        <div class="form">
          <label>Password: </label
          ><input
            type="password"
            v-model.trim="json.password"
            minlength="8"
            required
            placeholder="Need to contain character, number and special character, between 6 and 10"
          /><br />
          <!-- pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"
          title="至少八个字符，至少一个字母，一个数字和一个特殊字符" -->
        </div>
        <div class="form">
          <label>Email: </label
          ><input type="email" v-model.trim="json.email" required /><br />
        </div>

        <div class="form">
          <input
            type="radio"
            id="user"
            name="role"
            value="NORMAL"
            v-model.trim="json.role"
            required
          />
          <label for="user">User</label><br />
          <input
            type="radio"
            id="doctor"
            name="role"
            value="DOCTOR"
            v-model.trim="json.role"
          />
          <label for="doctor">Doctor</label><br />
        </div>
        <br /> <br /> 
        <div class="form">
          <strong>
            <a href="http://localhost:8080/policy" target="_blank">隐私条款</a></strong
          >
        </div>
        <div class="btns">
          <button type="submit">Submit</button>
          <button @click.prevent="handleup">Cancel</button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import bg from "@/assets/image/bg.jpg";
import Service from "@/service/user.service.js";
export default {
  name: "register",
  props: {
    msg: String,
  },
  data() {
    return {
      json: {},
      bgurl: bg,
    };
  },
  methods: {
    async createUser() {
      console.log("发送注册接口");
      // TODO 注册接口
      Service.signUp(this.json)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
            location.assign("/login");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    //点击完成按钮触发handlefinish
    handlefinish() {
      var checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var checkTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      //var checkPass = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{6,10}$/;

      if (localStorage["name"] === this.json.name) {
        alert("username already exit"); //如果用户名已存在则无法注册
      } else if (this.json.name === "") {
        alert("username cannot be empty");
      } else {
        //用戶名符合要求之後
        //接下來驗證密碼是否符合要求
        // if (checkPass.test(this.password)) {
        //接下來驗證郵箱是否填寫正確
        if (checkEmail.test(this.json.email)) {
          //接下來驗證手機號碼是否符合要求
          if (checkTel.test(this.json.tel)) {
            //将新用户信息存储到localStorage
            localStorage.setItem("name", this.json.name);
            localStorage.setItem("password", this.json.password);
            localStorage.setItem("mail", this.json.email);
            localStorage.setItem("tel", this.json.tel);
            // localStorage.setItem("s", "false");
            // alert("Register successfully!");
            // this.$router.replace("/login"); //完成注册后跳转至登录页面
          } else {
            alert("Please enter the correct phone No");
          }
        } else {
          alert("Please enter the correct email");
        }
        // } else {
        //   alert("密碼必須包含字母、數字和特殊字符，且在6-10位之間");
        // }
      }
    },
    handleup: function () {
      this.$router.replace("/login");
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
#contain {
  width: 550px;
  height: 550px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #00000030;
  text-align: center;
  border-radius: 20px;
}
#contain h1 {
  margin: 25px;
  color: aliceblue;
  margin-left: 20px;
  font-size: 25px;
  height: 22px;
}
.form {
  color: white;
  margin-left: 10%;
  margin-top: 60px;
  font-size: 17px;
  text-align: left;
  height: 3px;
}
label {
  float: left;
  width: 5em;
  margin-right: 1em;
  text-align: right;
}

input,
textarea {
  margin-left: 10px;
  padding: 4px;
  border: solid 1px #4e5ef3;
  outline: 0;
  font: normal 13px/100% Verdana, Tahoma, sans-serif;
  width: 310px;
  height: 25px;
  background: #f1f1f190;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
}

input:hover,
textarea:hover,
input:focus,
textarea:focus {
  border-color: #0d0aa1;
}

button {
  position: relative;
  height: 33px;
  width: 150px;
  background: rgb(73, 158, 243);
  border-radius: 10px;
  margin-top: 38px;
  box-shadow: none;
  color: white;
  /* margin-left: 40px; */
}

.btns {
  margin: 40px;
  width: 450px;
  margin-left: 5%;
}

strong {
  text-align: right;
}

.form a{
  text-align: right;
  margin-left: 350px;
}
</style>
