<template>
  <div style="position: relative">
    <div class="model" v-show="result">
      <div class="modelBody">
        <div class="grid">
          <div>
            <img
              src="@/assets/image/undraw_medical_care_movn.svg"
              width="100%"
              height="100%"
              alt=""
            />
          </div>
          <div>
            <div style="margin: 20px 0px">{{ resultMessage }}</div>
            <div style="background-color: #0d6efd" class="btn" @click="reCheck()">
              Re-take the test
            </div>
            <div style="background-color: #f4c807" class="btn">
              <router-link to="/showdoctor">Make an Appointment</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="eczematestBody">
      <div class="title">
        <svg
          t="1673868443350"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1091"
          width="30"
          height="30"
        >
          <path
            d="M414 608m-348 0a348 348 0 1 0 696 0 348 348 0 1 0-696 0Z"
            fill="#C9F4EB"
            p-id="1092"
          ></path>
          <path
            d="M286.07 728.06a110 110 0 0 1-37.51-6.63 25 25 0 1 1 17-47 60 60 0 1 0-36-76.84 25 25 0 1 1-47-17 109.93 109.93 0 1 1 103.5 147.5z"
            fill="#087E6A"
            p-id="1093"
          ></path>
          <path
            d="M372.56 813.28A25 25 0 0 1 356.67 769 31 31 0 0 0 337 714a25 25 0 0 1 0-50 81 81 0 0 1 51.42 143.59 24.91 24.91 0 0 1-15.86 5.69zM705.39 754.12a24.9 24.9 0 0 1-15.76-5.61 81 81 0 0 1 102.19-125.7 25 25 0 0 1-31.54 38.8 31 31 0 1 0-39.11 48.11 25 25 0 0 1-15.78 44.4zM777.92 545.93a90.47 90.47 0 1 1 40.7-171.35 25 25 0 1 1-22.4 44.7 40.45 40.45 0 1 0 11.4 63.84 25 25 0 1 1 36.51 34.16 90.86 90.86 0 0 1-66.21 28.65z"
            fill="#087E6A"
            p-id="1094"
          ></path>
          <path
            d="M511.5 862a349.42 349.42 0 1 1 136.44-27.55A348.4 348.4 0 0 1 511.5 862z m0-651C345.8 211 211 345.8 211 511.5S345.8 812 511.5 812 812 677.2 812 511.5 677.2 211 511.5 211z"
            fill="#087E6A"
            p-id="1095"
          ></path>
          <path
            d="M479 470a87 87 0 1 1 87-87 87.1 87.1 0 0 1-87 87z m0-124a37 37 0 1 0 37 37 37 37 0 0 0-37-37zM464.36 952.55h-0.23a10.88 10.88 0 0 1-9.6-12.26l11.82-88.19c5.73 0.77 11.57 1.4 17.35 1.88l-7.33 88.68a10.89 10.89 0 0 1-12.01 9.89z m132.22-16.67l-17.27-87.28c5.68-1.12 11.4-2.41 17-3.82L618 931.07a10.9 10.9 0 0 1-8.17 13.28h-0.22a10.88 10.88 0 0 1-13.03-8.47z m-272.72-22.79l-0.25-0.12a10.89 10.89 0 0 1-5.08-14.73l40-79.48c5.19 2.6 10.5 5.11 15.8 7.44l-35.88 81.43a10.87 10.87 0 0 1-14.59 5.46z m405.79-27.56l-44.85-76.86c5-2.92 10-6 14.83-9.16L748.32 874a10.87 10.87 0 0 1-3.38 15.2l-0.19 0.12a10.87 10.87 0 0 1-15.1-3.79zM204 830l-0.17-0.17a10.87 10.87 0 0 1 0-15.56l63.61-62.24c4.06 4.14 8.27 8.24 12.53 12.17l-60.46 65.4a10.88 10.88 0 0 1-15.51 0.4z m635-35.28l-67.3-58.23c3.79-4.38 7.52-8.92 11.09-13.49L853 777.74a10.88 10.88 0 0 1 1.72 15.47l-0.16 0.19a10.88 10.88 0 0 1-15.56 1.32z m-721.58-82l-0.1-0.2a10.87 10.87 0 0 1 5-14.73l80.35-38.26c2.49 5.22 5.14 10.44 7.89 15.53l-78.3 42.3a10.88 10.88 0 0 1-14.83-4.68z m795.64-39.39l-82.53-33.17c2.17-5.38 4.22-10.89 6.1-16.37l84.12 28.88a10.92 10.92 0 0 1 6.69 14.13l-0.08 0.21a10.92 10.92 0 0 1-14.29 6.28zM73.81 573.46v-0.25a10.86 10.86 0 0 1 9.56-12.29l88.43-9.9c0.65 5.76 1.45 11.57 2.39 17.28l-87.85 14.39a10.87 10.87 0 0 1-12.53-9.23z m869.76-39.15l-88.88-4.45c0.29-5.79 0.43-11.67 0.43-17.48h89A10.87 10.87 0 0 1 955 523.51v0.22a10.86 10.86 0 0 1-11.43 10.58z m-769.22-79L86.6 440.58a10.9 10.9 0 0 1-8.89-12.81v-0.22a10.9 10.9 0 0 1 13-8.55l86.88 19.16c-1.17 5.65-2.28 11.41-3.24 17.12z m667.83-36.61c-1.58-5.56-3.32-11.16-5.18-16.64l84.24-28.61a10.88 10.88 0 0 1 13.9 7.07l0.07 0.22a10.89 10.89 0 0 1-7.43 13.71z m-631-70.05L133 306.08a10.88 10.88 0 0 1-4.21-15l0.12-0.21a10.88 10.88 0 0 1 15.15-3.87l75.86 46.5c-3.03 4.98-5.92 10.06-8.75 15.15z m582.69-31.9c-3.31-4.75-6.78-9.48-10.33-14.05l70.35-54.5a10.87 10.87 0 0 1 15.42 2.16l0.14 0.18a10.88 10.88 0 0 1-2.56 15.36z m-513-57.08l-60.15-65.6a10.87 10.87 0 0 1 0.87-15.53l0.18-0.16a10.87 10.87 0 0 1 15.51 1.26L294 248.2c-4.48 3.69-8.91 7.55-13.18 11.47zM715 235.87c-4.67-3.43-9.5-6.79-14.34-10l49-74.32a10.88 10.88 0 0 1 15.29-3l0.21 0.15a10.87 10.87 0 0 1 2.55 15.36z m-339.56-37.81l-35.59-81.57a10.85 10.85 0 0 1 5.86-14.41l0.21-0.08a10.86 10.86 0 0 1 14.25 6.23l31.38 83.28c-5.4 2.04-10.82 4.24-16.11 6.55zM614.21 185a350.97 350.97 0 0 0-16.77-4.74l22-86.21A10.89 10.89 0 0 1 633 86.26l0.22 0.06A10.88 10.88 0 0 1 640.6 100z m-129.36-14.29l-7-88.71a10.88 10.88 0 0 1 10.25-11.72h0.23a10.88 10.88 0 0 1 11.45 10.55l2.56 89c-5.85 0.11-11.72 0.42-17.49 0.88z"
            fill="#087E6A"
            p-id="1096"
          ></path></svg
        >Diabetes Test Self-testing Scale of Diabetes Risk
      </div>

      <div>
        The number of diabetic patients in China is up to 130 million, and diabetes has
        become the primary factor of chronic kidney disease (CKD) in China. About 20%-40%
        of diabetic patients are complicated by CKD, and the risk of cardiac and renal
        events in patients with complications is significantly increased, and life
        expectancy is significantly decreased. In addition, the number of cases has
        increased rapidly in the past 10 years, which has become one of the public
        problems seriously affecting the health of Chinese people.
      </div>

      <div class="body">
        <div class="item">
          <div style="display: inline-block">
            * A family relative had a genetic history of diabetes
          </div>
          <div>
            <el-radio-group v-model="radio1" @change="selected1">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Often prone to dry mouth and need constantly drink water
          </div>
          <div>
            <el-radio-group v-model="radio2" @change="selected2">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * The appetite becomes very good and eats more
          </div>
          <div>
            <el-radio-group v-model="radio3" @change="selected3">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Frequent urination and increased urine output
          </div>
          <div>
            <el-radio-group v-model="radio4" @change="selected4">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * No habit of exercise, (male) waist circumference > 90cm, (female) waist
            circumference > 80cm
          </div>
          <div>
            <el-radio-group v-model="radio5" @change="selected5">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * I used to be obese and then suddenly lose weight for no reason
          </div>
          <div>
            <el-radio-group v-model="radio6" @change="selected6">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Feel tired and tired easily</div>
          <div>
            <el-radio-group v-model="radio7" @change="selected7">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Eye fatigue and blurred vision worsen</div>
          <div>
            <el-radio-group v-model="radio8" @change="selected8">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Abnormally increased earwax or frequent inflammation of the second canal
          </div>
          <div>
            <el-radio-group v-model="radio9" @change="selected9">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* The skin feels dull and itchy</div>
          <div>
            <el-radio-group v-model="radio10" @change="selected10">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Limb terminal paralysis, often have insect crawling or pinprick sensation
          </div>
          <div>
            <el-radio-group v-model="radio11" @change="selected11">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Once the skin has a wound, it is not easy to heal for a long time
          </div>
          <div>
            <el-radio-group v-model="radio12" @change="selected12">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Life and work are stressful</div>
          <div>
            <el-radio-group v-model="radio13" @change="selected13">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Sexual function is reduced and daily routines become abnormal
          </div>
          <div>
            <el-radio-group v-model="radio14" @change="selected14">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Sugar was detected in the urine</div>
          <div>
            <el-radio-group v-model="radio15" @change="selected15">
              <el-radio label="1">Yes</el-radio>
              <el-radio label="0">NO</el-radio>
            </el-radio-group>
          </div>
        </div>
      </div>

      <div class="check" @click="check()">Check the Result</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "diabetestest",
  data() {
    return {
      selectList1: [{ state: "" }],
      selectList2: [{ state: "" }],
      selectList3: [{ state: "" }],
      selectList4: [{ state: "" }],
      selectList5: [{ state: "" }],
      selectList6: [{ state: "" }],
      selectList7: [{ state: "" }],
      selectList8: [{ state: "" }],
      selectList9: [{ state: "" }],
      selectList10: [{ state: "" }],
      selectList11: [{ state: "" }],
      selectList12: [{ state: "" }],
      selectList13: [{ state: "" }],
      selectList14: [{ state: "" }],
      selectList15: [{ state: "" }],
      result: null,
      resultMessage: "",
      radio1: 2,
      radio2: 2,
      radio3: 2,
      radio4: 2,
      radio5: 2,
      radio6: 2,
      radio7: 2,
      radio8: 2,
      radio9: 2,
      radio10: 2,
      radio11: 2,
      radio12: 2,
      radio13: 2,
      radio14: 2,
      radio15: 2,
      input: "",
    };
  },
  methods: {
    selected1: function (val) {
      this.selectList1[0].state = val;
    },
    selected2: function (val) {
      this.selectList2[0].state = val;
    },
    selected3: function (val) {
      this.selectList3[0].state = val;
    },
    selected4: function (val) {
      this.selectList4[0].state = val;
    },
    selected5: function (val) {
      this.selectList5[0].state = val;
    },
    selected6: function (val) {
      this.selectList6[0].state = val;
    },
    selected7: function (val) {
      this.selectList7[0].state = val;
    },
    selected8: function (val) {
      this.selectList8[0].state = val;
    },
    selected9: function (val) {
      this.selectList9[0].state = val;
    },
    selected10: function (val) {
      this.selectList10[0].state = val;
    },
    selected11: function (val) {
      this.selectList11[0].state = val;
    },
    selected12: function (val) {
      this.selectList12[0].state = val;
    },
    selected13: function (val) {
      this.selectList13[0].state = val;
    },
    selected14: function (val) {
      this.selectList14[0].state = val;
    },
    selected15: function (val) {
      this.selectList15[0].state = val;
    },
    check() {
      if (
        this.selectList1[0].state == "" ||
        this.selectList2[0].state == "" ||
        this.selectList3[0].state == "" ||
        this.selectList4[0].state == "" ||
        this.selectList5[0].state == "" ||
        this.selectList6[0].state == "" ||
        this.selectList7[0].state == "" ||
        this.selectList8[0].state == "" ||
        this.selectList9[0].state == "" ||
        this.selectList10[0].state == "" ||
        this.selectList11[0].state == "" ||
        this.selectList12[0].state == "" ||
        this.selectList13[0].state == "" ||
        this.selectList14[0].state == "" ||
        this.selectList15[0].state == ""
      ) {
        alert("The test is not finished");
      } else {
        let res = 0;
        this.selectList1.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList2.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList3.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList4.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList5.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList6.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList7.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList8.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList9.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList10.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList11.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList12.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList13.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList14.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        this.selectList15.forEach((item) => {
          res = res + 0.07 * parseInt(item.state);
        });
        if (res * 100 > 100) {
          this.resultMessage =
            "Your current risk is: 99.00%, please go to the formal hospital for medical treatment as soon as possible";
        } else if (res * 100 == 0) {
          this.resultMessage = "Your current risk is: 1%";
        } else {
          this.resultMessage =
            "Your current risk is: " +
            (res * 100).toFixed(2) +
            "%. Please continue to maintain a good lifestyle and diet!";
        }
        this.result = true;
      }
    },
    reCheck() {
      location.reload();
    },
  },
};
</script>

<style>
* {
  cursor: default;
  user-select: none;
}

.el-input__inner {
  width: 65px;
  height: 30px;
  margin-right: 70%;
}
.eczematestBody {
  width: 1000px;
  margin: 0 auto;
  margin-top: 5%;
}
.title {
  font-size: 25px;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #0d6efd;
  border-radius: 0px 0px 10px 10px;
  color: #fff;
  padding: 3px 10px;
  text-align: center;
}
.body {
  width: 100%;
  /* height: 100%; */
  margin-top: 50px;
  font-size: 17px;
  background-color: white;
  box-shadow: 0 4px 8px 0 #ededed, 0 6px 20px 0 #ededed;
  border-radius: 5px;
  padding: 10px 10px;
}
.select {
  display: inline-block;
}
.item {
  margin: 40px 0px;
  display: flex;
  justify-items: center;
  border-left: 10px solid #0d6efd;
}
.item svg {
  margin: 0px 10px;
}
.subItem {
  margin: 0px 20px;
  cursor: default;
}
.check {
  width: 100%;
  margin: 40px 0px;
  box-shadow: 0 4px 8px 0 #ededed, 0 6px 20px 0 #ededed;
  border-radius: 20px;
  padding: 10px 10px;
  background-color: #0d6efd;
  color: white;
  text-align: center;
}
.model {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(245, 245, 245, 0.584);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modelBody {
  background-color: white;
  width: 50%;
  padding: 30px;
  box-shadow: 0 4px 8px 0 #ededed, 0 6px 20px 0 #ededed;
  border-radius: 5px;
  z-index: 1;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.btn {
  display: inline-block;
  width: 46%;
  text-align: center;
  line-height: 40px;
  color: white;
  border-radius: 50px;
  margin-top: 30px;
}
</style>
