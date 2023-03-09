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
    <div class="covid19investigationBody">
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
        >COIVD-19 Investigation
      </div>
      <div class="body">
        <div class="item">
          <div style="display: inline-block">
            * In the past 14 days, whether or not been to countries with 2019 novel
            coronavirus?
          </div>
          <svg
            @click="selected(0, true)"
            t="1673870395752"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2073"
            width="20"
            height="20"
          >
            <path
              d="M817.728 198.72l111.744 114.56-545.216 532.128-285.92-273.024 110.528-115.712 174.176 166.336z"
              :fill="
                selectList[0].state === 'none'
                  ? '#000000'
                  : selectList[0].state
                  ? '#0d6efd'
                  : '#000'
              "
              p-id="2074"
            ></path></svg
          ><svg
            @click="selected(0, false)"
            t="1673870476068"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3057"
            width="20"
            height="20"
          >
            <path
              d="M617.92 516.096l272 272-101.824 101.824-272-272-272 272-101.856-101.824 272-272-275.008-275.04L241.056 139.2l275.04 275.04 275.04-275.04 101.824 101.824-275.04 275.04z"
              :fill="
                selectList[0].state === 'none'
                  ? '#000000'
                  : selectList[0].state
                  ? '#000'
                  : '#0d6efd'
              "
              p-id="3058"
            ></path>
          </svg>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Have you been in contact with someone who has been diagnosed with 2019 novel
            coronavirus in the past 14 days?
          </div>
          <svg
            @click="selected(1, true)"
            t="1673870395752"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2073"
            width="20"
            height="20"
          >
            <path
              d="M817.728 198.72l111.744 114.56-545.216 532.128-285.92-273.024 110.528-115.712 174.176 166.336z"
              :fill="
                selectList[1].state === 'none'
                  ? '#000000'
                  : selectList[1].state
                  ? '#0d6efd'
                  : '#000'
              "
              p-id="2074"
            ></path></svg
          ><svg
            @click="selected(1, false)"
            t="1673870476068"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3057"
            width="20"
            height="20"
          >
            <path
              d="M617.92 516.096l272 272-101.824 101.824-272-272-272 272-101.856-101.824 272-272-275.008-275.04L241.056 139.2l275.04 275.04 275.04-275.04 101.824 101.824-275.04 275.04z"
              :fill="
                selectList[1].state === 'none'
                  ? '#000000'
                  : selectList[1].state
                  ? '#000'
                  : '#0d6efd'
              "
              p-id="3058"
            ></path>
          </svg>
        </div>
        <div class="item">
          <div style="display: inline-block">
            * Respiratory symptoms (click to select):
          </div>
          <div
            class="subItem"
            @click="symptomSelect(0)"
            :style="{ color: symptomList[0].state ? '#0d6efd' : '#000' }"
          >
            Cough
          </div>
          <div
            class="subItem"
            @click="symptomSelect(1)"
            :style="{ color: symptomList[1].state ? '#0d6efd' : '#000' }"
          >
            Sore throat
          </div>
          <div
            class="subItem"
            @click="symptomSelect(2)"
            :style="{ color: symptomList[2].state ? '#0d6efd' : '#000' }"
          >
            Dyspnea
          </div>
        </div>
        <div class="item">
          <div style="display: inline-block">* Systemic symptoms (click to select):</div>
        </div>
        <div class="item" style="border: none">
          <div
            class="subItem"
            @click="symptomSelect(3)"
            :style="{ color: symptomList[3].state ? '#0d6efd' : '#000' }"
          >
            Weight loss
          </div>
          <div
            class="subItem"
            @click="symptomSelect(4)"
            :style="{ color: symptomList[4].state ? '#0d6efd' : '#000' }"
          >
            Fever or low fever
          </div>
          <div
            class="subItem"
            @click="symptomSelect(5)"
            :style="{ color: symptomList[5].state ? '#0d6efd' : '#000' }"
          >
            Headache
          </div>
          <div
            class="subItem"
            @click="symptomSelect(6)"
            :style="{ color: symptomList[6].state ? '#0d6efd' : '#000' }"
          >
            Muscle pain
          </div>
          <div
            class="subItem"
            @click="symptomSelect(7)"
            :style="{ color: symptomList[7].state ? '#0d6efd' : '#000' }"
          >
            General malaise
          </div>
          <div
            class="subItem"
            @click="symptomSelect(8)"
            :style="{ color: symptomList[8].state ? '#0d6efd' : '#000' }"
          >
            Weakness
          </div>
        </div>
        <div class="item" style="border: none">
          <div
            class="subItem"
            @click="symptomSelect(9)"
            :style="{ color: symptomList[9].state ? '#0d6efd' : '#000' }"
          >
            Anorexia
          </div>
          <div
            class="subItem"
            @click="symptomSelect(10)"
            :style="{ color: symptomList[10].state ? '#0d6efd' : '#000' }"
          >
            Blurred consciousness
          </div>
          <div
            class="subItem"
            @click="symptomSelect(11)"
            :style="{ color: symptomList[11].state ? '#0d6efd' : '#000' }"
          >
            Dizziness
          </div>
          <div
            class="subItem"
            @click="symptomSelect(12)"
            :style="{ color: symptomList[12].state ? '#0d6efd' : '#000' }"
          >
            Diarrhea
          </div>
          <div
            class="subItem"
            @click="symptomSelect(13)"
            :style="{ color: symptomList[13].state ? '#0d6efd' : '#000' }"
          >
            Loss of smell or taste
          </div>
          <div
            class="subItem"
            @click="symptomSelect(14)"
            :style="{ color: symptomList[14].state ? '#0d6efd' : '#000' }"
          >
            Chest pain
          </div>
        </div>
      </div>
      <div class="check" @click="check()">Check the Results</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "covid19investigation",
  data() {
    return {
      selectList: [{ state: "none" }, { state: "none" }],
      symptomList: [
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
      ],
      result: null,
      resultMessage: "",
    };
  },
  methods: {
    selected(target, state) {
      this.selectList[target].state = state;
    },
    symptomSelect(target) {
      this.symptomList[target].state = !this.symptomList[target].state;
    },
    check() {
      let res = 0;
      let count = 0;

      this.symptomList.forEach((item, index) => {
        if (index === 4 && item.state) {
          res += 2;
          count += 1;
        } else if (item.state) {
          res += 1;
          count += 1;
        }
      });

      alert(count);
      if (
        this.selectList[0].state === "none" ||
        this.selectList[1].state === "none" ||
        count === 0
      ) {
        alert("The test is not finished");
      } else {
        this.selectList.forEach((item) => {
          if (item.state) {
            console.log(item);
            res += 1;
          } else {
            res += 0.5;
          }
        });

        if (res <= 2) {
          this.resultMessage =
            "There is a small chance that you will be infected with the 2019-ncov, but you should seek advice from your doctor if you feel unwell in order not to get worse and even spread the disease to people around you.";
        } else if (res >= 3 && res <= 4) {
          this.resultMessage =
            "According to your answers, you have a relatively high chance of being infected with 2019 novel coronavirus, especially the elderly and people with other medical problems are more likely to become seriously ill. It is recommended to seek medical advice for further evaluation and treatment as soon as possible.";
        } else if (res >= 5) {
          this.resultMessage =
            "If you have developed warning symptoms, please go to the emergency department of a public hospital as soon as possible, inform the medical staff of the warning symptoms of 2019 novel coronavirus, and receive further treatment according to the guidelines.";
        }
        this.result = true;
      }
    },

    reCheck() {
      this.selectList = [{ state: "none" }, { state: "none" }];
      this.symptomList = [
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
        { state: false },
      ];
      this.result = null;
      this.resultMessage = "";
    },
  },
};
</script>

<style>
* {
  cursor: default;
  user-select: none;
}
.covid19investigationBody {
  width: 1100px;
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
