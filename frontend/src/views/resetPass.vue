<template>
  <div id="background">
    <!-- <img :src="bgurl" /> -->
    <div class="container has-text-center">
      <h1>Reset Password</h1>
      <el-form :model="json" :rules="rules" ref="json" label-width="150px" class="json">
        <el-form-item label="Email" prop="email">
          <el-input type="email" v-model.trim="json.email" required></el-input>
        </el-form-item>
        <el-form-item label="New Password" prop="password">
          <el-input
            type="password"
            v-model.trim="json.pass"
            title="Need to contain character, number and special character, between 6 and 10"
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
import bg from "@/assets/image/bg.jpg";
import Service from "@/service/user.service.js";

export default {
  name: "resetPass",
  props: {
    msg: String,
  },
  data() {
    var validatePass2 = (rule, value, callback) => {
      console.log("i am in!!");
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
            // pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{6,10}$/,
            pattern: /^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z\W_]+$)(?![a-z0-9]+$)(?![a-z\W_]+$)(?![0-9\W_]+$)[a-zA-Z0-9\W_]{6,10}$/,
            message:
              "???????????????????????????????????????????????????????????? ?????????????????????????????? 6 - 10???????????????????????? ????????????????????????(lidian), ????????????(rekoon) ????????????????????????????????????)",
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
        //????????????
        if (valid) {
          console.log("????????????????????????");
          //??????????????????
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
          //???????????????
          alert("please check the required item(s)");
          return false;
        }
      });
    },

    async resetpass() {
      alert("This is reset function.");
    },

    //????????????????????????handlefinish
    handlefinish() {
      var checkEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      var checkTel = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      //var checkPass = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![0-9a-zA-Z]+$)(?![0-9\\W]+$)(?![a-zA-Z\\W]+$)[0-9A-Za-z\\W]{6,10}$/;

      if (localStorage["name"] === this.json.name) {
        alert("username already exit"); //???????????????????????????????????????
      } else if (this.json.name === "") {
        alert("username cannot be empty");
      } else {
        //???????????????????????????
        //???????????????????????????????????????
        // if (checkPass.test(this.password)) {
        //???????????????????????????????????????
        if (checkEmail.test(this.json.email)) {
          //?????????????????????????????????????????????
          if (checkTel.test(this.json.tel)) {
            //???????????????????????????localStorage
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
  /* ??????????????????????????????????????????????????? */
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
