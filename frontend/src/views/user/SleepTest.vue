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
    <div class="sleepBody">
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
        >Sleeping Test
      </div>

      <div>
        Recently affected by the epidemic, everyone's life has encountered big and small
        changes. Many people's work style has suddenly changed to work from home. The
        space originally used for rest and relaxation has become the working place
        overnight. Among them, insomnia is the most common, which has become a serious
        health problem of modern people. We can use the Pittsburgh Sleep Quality Index
        (PSQI) to evaluate our sleep quality. This scale is proposed by the American
        scholar Buysse,D.J. et al., which has a total of seven aspects. When the PSQI
        score is higher, the sleep quality is worse.
      </div>

      <div class="body">
        <div class="item">
          <div style="display: inline-block">
            * At what time you usually go to bed at night (number from 0-24)
          </div>
          <el-input
            min="0"
            max="24"
            minlength="1"
            maxlength="2"
            type="number"
            v-model="input1"
          ></el-input>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * It usually takes how many minutes from going to bed to fall asleep (number
            from 0-60)
          </div>
          <el-input
            min="0"
            max="60"
            minlength="1"
            maxlength="2"
            type="number"
            v-model="input2"
            @change="checkInput2"
          ></el-input>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * What time do you usually get up in the morning (number from 0-24)
          </div>
          <el-input
            min="0"
            max="24"
            minlength="1"
            maxlength="2"
            type="number"
            v-model="input3"
          ></el-input>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Actual sleeping hours per night (not equivalent to bed time) in the past one
            month
          </div>
          <el-input
            min="0"
            max="24"
            minlength="1"
            maxlength="2"
            type="number"
            v-model="input4"
            @change="checkInput4"
          ></el-input>
        </div>

        <div class="item">
          <div style="display: inline-block">
            * Difficulty falling asleep (unable to fall asleep within 30 minutes)
          </div>
          <div>
            <el-radio-group v-model="radio5a" @change="selected5a">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Easy to wake up at night or early</div>
          <div>
            <el-radio-group v-model="radio5b" @change="selected5b">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Go to the toilet often at night</div>
          <div>
            <el-radio-group v-model="radio5c" @change="selected5c">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Poor breathing</div>
          <div>
            <el-radio-group v-model="radio5d" @change="selected5d">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Coughing or snoring loudly</div>
          <div>
            <el-radio-group v-model="radio5e" @change="selected5e">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Feeling cold</div>
          <div>
            <el-radio-group v-model="radio5f" @change="selected5f">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Feeling hot</div>
          <div>
            <el-radio-group v-model="radio5g" @change="selected5g">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Having bad dreams</div>
          <div>
            <el-radio-group v-model="radio5h" @change="selected5h">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Pain and discomfort</div>
          <div>
            <el-radio-group v-model="radio5i" @change="selected5i">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">* Other things that affect sleep</div>
          <div>
            <el-radio-group v-model="radio5j" @change="selected5j">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="item">
          <div style="display: inline-block">
            * In the past month, how do you think of your sleeping quality
          </div>
          <div>
            <el-radio-group v-model="radio6" @change="selected6">
              <el-radio label="0">Very good </el-radio>
              <el-radio label="1">good</el-radio>
              <el-radio label="2">bad</el-radio>
              <el-radio label="3">vert bad</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * In the past month, have you used drugs to hypnotize
          </div>
          <div>
            <el-radio-group v-model="radio7" @change="selected7">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * In the past month, do you often feel sleepy
          </div>
          <div>
            <el-radio-group v-model="radio8" @change="selected8">
              <el-radio label="0">No </el-radio>
              <el-radio label="1">Less than 1 time/week</el-radio>
              <el-radio label="2"> 1-2 times/week</el-radio>
              <el-radio label="3">Equal or more than 3 times/week</el-radio>
            </el-radio-group>
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * In the past month, do you have insufficient energy to do things
          </div>
          <div>
            <el-radio-group v-model="radio9" @change="selected9">
              <el-radio label="0">No</el-radio>
              <el-radio label="1">Occasionally</el-radio>
              <el-radio label="2">Sometimes</el-radio>
              <el-radio label="3">Often</el-radio>
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
  name: "sleeptest",
  data() {
    return {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      selectList5a: [{ state: "" }],
      selectList5b: [{ state: "" }],
      selectList5c: [{ state: "" }],
      selectList5d: [{ state: "" }],
      selectList5e: [{ state: "" }],
      selectList5f: [{ state: "" }],
      selectList5g: [{ state: "" }],
      selectList5h: [{ state: "" }],
      selectList5i: [{ state: "" }],
      selectList5j: [{ state: "" }],
      selectList6: [{ state: "" }],
      selectList7: [{ state: "" }],
      selectList8: [{ state: "" }],
      selectList9: [{ state: "" }],
      result: null,
      resultMessage: "",
      radio5a: 4,
      radio5b: 4,
      radio5c: 4,
      radio5d: 4,
      radio5e: 4,
      radio5f: 4,
      radio5g: 4,
      radio5h: 4,
      radio5i: 4,
      radio5j: 4,
      radio6: 4,
      radio7: 4,
      radio8: 4,
      radio9: 4,
    };
  },
  methods: {
    checkInput2() {
      if (this.input2 <= 15) {
        this.input2 = 0;
      }
      if (this.input2 >= 16 && this.input2 <= 30) {
        this.input2 = 1;
      }
      if (this.input2 >= 31 && this.input2 <= 60) {
        this.input2 = 2;
      }
      if (this.input2 >= 60) {
        this.input2 = 3;
      }
    },
    checkInput4() {
      if (this.input4 > 7) {
        this.input4 = 0;
      }
      if (this.input4 >= 6 && this.input4 <= 7) {
        this.input4 = 1;
      }
      if (this.input4 >= 5 && this.input4 < 6) {
        this.input4 = 2;
      }
      if (this.input4 < 5) {
        this.input4 = 3;
      }
    },
    selected5a: function (val) {
      this.selectList5a[0].state = val;
    },
    selected5b: function (val) {
      this.selectList5b[0].state = val;
    },
    selected5c: function (val) {
      this.selectList5c[0].state = val;
    },
    selected5d: function (val) {
      this.selectList5d[0].state = val;
    },
    selected5e: function (val) {
      this.selectList5e[0].state = val;
    },
    selected5f: function (val) {
      this.selectList5f[0].state = val;
    },
    selected5g: function (val) {
      this.selectList5g[0].state = val;
    },
    selected5h: function (val) {
      this.selectList5h[0].state = val;
    },
    selected5i: function (val) {
      this.selectList5i[0].state = val;
    },
    selected5j: function (val) {
      this.selectList5j[0].state = val;
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

    check() {
      if (
        this.input == "" ||
        this.input1 == "" ||
        this.input2 == "" ||
        this.input3 == "" ||
        this.input4 == "" ||
        this.selectList5a[0].state == "" ||
        this.selectList5b[0].state == "" ||
        this.selectList5c[0].state == "" ||
        this.selectList5d[0].state == "" ||
        this.selectList5e[0].state == "" ||
        this.selectList5f[0].state == "" ||
        this.selectList5g[0].state == "" ||
        this.selectList5h[0].state == "" ||
        this.selectList5i[0].state == "" ||
        this.selectList6[0].state == "" ||
        this.selectList7[0].state == "" ||
        this.selectList8[0].state == "" ||
        this.selectList9[0].state == ""
      ) {
        alert("The test is not finished");
      } else {
        let res = 0;
        let resA = 0;
        let resB = 0;
        let resC = 0;
        let resD = 0;
        let resE = 0;
        let resF = 0;
        let resG = 0;

        //A
        this.selectList6.forEach((item) => {
          resA = resA + parseInt(item.state);
        });

        //B
        this.selectList5a.forEach((item) => {
          resB = resB + parseInt(this.input2) + parseInt(item.state);
        });
        if (resB == 0) {
          resB = 0;
        }
        if (resB >= 1 && resB <= 2) {
          resB = 1;
        }
        if (resB >= 3 && resB <= 4) {
          resB = 2;
        }
        if (resB >= 5 && resB <= 6) {
          resB = 3;
        }

        //C
        resC = parseInt(this.input4);

        //D
        let onBed = parseInt(this.input1) - parseInt(this.input3);
        if (onBed < 0) {
          onBed = -onBed;
        }
        let temp = parseInt(this.input4) / onBed;
        if (temp > 0.85) {
          resD = 0;
        }
        if (temp >= 0.75 && temp <= 0.84) {
          resD = 1;
        }
        if (temp >= 0.65 && temp <= 0.74) {
          resD = 2;
        }
        if (temp <= 0.65) {
          resD = 3;
        }

        //E
        this.selectList5b.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5c.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5d.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5e.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5f.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5g.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5h.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5i.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        this.selectList5j.forEach((item) => {
          resE = resE + parseInt(item.state);
        });
        if (resE == 0) {
          resE = 0;
        }
        if (resE >= 1 && resE <= 9) {
          resE = 1;
        }
        if (resE >= 10 && resE <= 18) {
          resE = 2;
        }
        if (resE >= 19 && resE <= 27) {
          resE = 3;
        }

        //F
        this.selectList7.forEach((item) => {
          resF = resF + parseInt(item.state);
        });

        //G
        this.selectList8.forEach((item) => {
          resG = resG + parseInt(item.state);
        });
        this.selectList9.forEach((item) => {
          resG = resG + parseInt(item.state);
        });
        if (resG == 0) {
          resG = 0;
        }
        if (resG >= 1 && resG <= 2) {
          resG = 1;
        }
        if (resG >= 3 && resG <= 4) {
          resG = 2;
        }
        if (resG >= 5 && resG <= 6) {
          resE = 3;
        }

        //   alert("resA" + resA);
        //   alert("resB" + resB);
        //   alert("resC" + resC);
        //   alert("resD" + resD);
        //   alert("resE" + resE);
        //   alert("resF" + resF);
        //   alert("resG" + resG);
        res = resA + resB + resC + resD + resE + resF + resG;
        //   alert(res);

        if (res >= 5) {
          this.resultMessage =
            "Your PSQI score is : " +
            res +
            ". You have had symptoms of insomnia for the past month. The causes of insomnia are complex and may be improved by physical therapy, muscle relaxation and stretching, but it is still recommended to see a family doctor or psychosomatic department first.";
        } else {
          this.resultMessage =
            "Your PSQI score is : " +
            res +
            ". The sleep quality is considered to be temporarily ok.";
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
.sleepBody {
  width: 1200px;
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
  width: 1200px;
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
