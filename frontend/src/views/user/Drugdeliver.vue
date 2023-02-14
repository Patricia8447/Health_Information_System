<template>
  <div class="container has-text-left">
    <h1>Drug Delivery Registration Form</h1>
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/common.service.js";

StylesManager.applyTheme("modern");

export default {
  components: {
    Survey,
  },
  data() {
    var json = {
      pages: [
        {
          questions: [
            {
              name: "name",
              type: "text",
              title: "Receiver's Name",
              placeHolder: "please enter the name",
              isRequired: true,
              autoComplete: "name",
            },
            {
              name: "phone",
              type: "text",
              title: "Receiver's Phone",
              placeHolder: "please enter the correct phone number",
              isRequired: true,
              autoComplete: "phone",
            },
            {
              type: "dropdown",
              name: "period",
              title: "Delivery Period",
              isRequired: true,
              placeHolder: "please choose the delivered time",
              colCount: 0,
              choices: [
                "9 a.m.",
                "10 a.m.",
                "11 a.m.",
                "12 p.m.",
                "1 p.m.",
                "2 p.m.",
                "3 p.m.",
                "4 p.m.",
              ],
            },
            {
              type: "matrixdynamic",
              name: "orerItem",
              title: "Select the quantities",
              addRowText: "Add Medicine",
              horizontalScroll: true,
              columnMinWidth: "130px",
              columnColCount: 1,
              cellType: "radiogroup",
              choices: ["1", "2", "3", "4", "5", "6", "7"],

              columns: [
                {
                  name: "subject",
                  cellType: "text",
                  title: "Please enter the order item(s)",
                  isRequired: true,
                  minWidth: "300px",
                },
                {
                  name: "quantities",
                  title: "Please select the quantities",
                },
              ],
              rowCount: 2,
            },
            {
              name: "other",
              type: "text",
              title: "Other",
              placeHolder: "",
              isRequired: false,
              autoComplete: "other",
            },
          ],
        },
      ],
    };

    const model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml = "order created successfully!";

    return {
      survey: model,
    };
  },
  methods: {
    async alertResults(sender) {
      console.log("发送送药接口");
      console.log(JSON.stringify(sender.data));
      Service.createDistribution(sender.data)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            alert("submitted successfully");
            console.log(res.data.info);
            location.assign("/appointmentorderrecord");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created(){
     console.log(this.$route.params.id);
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container h1 {
  font-size: 2em;
  text-align: center;
  margin-top: 5%;
}
</style>
