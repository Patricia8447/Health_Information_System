<template>
  <div id="background">
    <img :src="bgurl" />
    <div class="container has-text-center">
      <h1>Reset Password</h1>
      <el-form :model="json" :rules="rules" ref="json" label-width="150px" class="json">
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model.trim="json.email" required></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="pass">
          <el-input
            type="password"
            v-model.trim="json.pass"
            title="Should contain character, number and special character, between 6-10"
          ></el-input>
        </el-form-item>
        <el-form-item label="Comfirm Password" prop="againPass">
          <el-input
            type="password"
            v-model.trim="json.againPass"
            placeholder="Need to contain character, number and special character, between 6 and 10"
          ></el-input>
        </el-form-item>
        <el-form-item label="Verify Code" prop="code">
          <el-input type="text" v-model.trim="json.code" required></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="submit" @click="resetPass('json')">Submit</el-button>
          <el-button type="success" plain @click.prevent="handleup">Cancel</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import bg from "@/assets/image/forgetbg.jpg";
import Service from "@/service/user.service.js";

export default {
  name: "resetPass",
  props: {
    msg: String,
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("please enter the password"));
      } else if (value !== this.json.pass) {
        callback(new Error("the passwords are different!"));
      } else {
        callback();
      }
    };
    return {
      json: { email: "", pass: "", againPass: "", code: "" },
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
        pass: [
          {
            required: true,
            trigger: "blur",
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,10}$/,
            message:
              "The password contains 6 to 10 digits, letters, and special symbols (case insensitive)",
          },
        ],
        againPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        code: [
          {
            required: true,
            message: "cannot be null",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async resetPass(formName) {
      this.$refs[formName].validate((valid) => {
        //开启校验
        if (valid) {
         //修改密码接口
          Service.resetPass(this.json)
            .then((res) => {
              if (res.data.code === 1) {
                if (res.data.info == "modify successfully") {
                  alert(res.data.info);
                  location.assign("/login");
                } else {
                  console.log("some where need to be double check");
                }
              } else {
                alert(res.data.info);
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          //校验不通过
          alert("please check the required item(s)");
          return false;
        }
      });
    },

    async resetpass() {
      consol.log("This is reset function");
    },

    //点击完成按钮触发handlefinish
    handlefinish() {
      var checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var checkTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

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

.container {
  width: 660px;
  height: 550px;
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-50%, -50%);
  background: #00000010;
  text-align: left;
  border-radius: 20px;
  margin-top: 40px;
  margin-left: 200px;
}

.container h1 {
  margin: 55px;
  color: aliceblue;
  margin-left: 25px;
  font-size: 25px;
  text-align: center;
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

.el-input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 400px;
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
