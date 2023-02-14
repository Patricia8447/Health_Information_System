<template>
  <form @submit.prevent="resetpass()">
    <div id="background">
      <img :src="bgurl" />
      <div id="contain">
        <h1>Reset Password</h1>
        <div class="form">
          <label>New Password: </label
          ><input type="password" v-model.trim="json.pass" /><br />
        </div>
        <div class="form">
          <label>Comfirm Password: </label
          ><input type="password" v-model.trim="json.againPass" placeholder="" /><br />
        </div>
        <div class="form"><label>Code: </label><input type="text" v-model.trim="json.code"/><br /></div>

        <div class="btns">
          <button type="submit" @click="resetPass()">Submit</button>
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
    async resetPass() {
      console.log("发送修改密码接口");
      // TODO 修改密码接口
      Service.resetPass(this.json)
        .then((res) => {
          console.log(res.data);
          alert(res.data);
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
      // var response = await fetch("http://localhost:3001/user/signup", {
      //   method: "POST",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      //   body: JSON.stringify(this.json),
      // });
      // // console.log(body);
      // // alert(response);
      // if (response.ok) {
      //   var newUser = await response.json();
      //   // re-direct to login page
      //   alert(newUser.info);
      //   location.assign("/login");
      //   // this.handlefinish();
      // } else {
      //   alert(response.statusText);
      //   console.log("sth wrong happend");
      // }
    },

    async resetpass() {
      alert("This is reset function.");
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
          } else {
            alert("Please enter the correct phone No");
          }
        } else {
          alert("Please enter the correct email");
        }
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
  height: 450px;
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
</style>
