<template>
  <div class="container has-text-left">
    <h1>Writing Detailed Consultation Result</h1>
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/doctor.service.js";

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
            //症状
            {
              name: "symptoms",
              type: "comment",
              title: "Symptoms",
              placeHolder: "please enter the described symptoms",
              isRequired: true,
              autoComplete: "symptoms",
            },
            //诊断结果
            {
              name: "remark",
              type: "comment",
              title: "Result",
              placeHolder: "please tell the patient about their result clearly",
              isRequired: true,
              autoComplete: "remark",
            },
            //用药情况
            {
              name: "drugsage",
              type: "comment",
              title: "Drug Usage",
              placeHolder: "please list out the drug(s) to be used",
              isRequired: true,
              autoComplete: "drugsage",
            },

            {
              type: "signaturepad",
              name: "signature",
              title: "Please sign here",
              isRequired: true,
            },
          ],
        },
      ],
    };

    const model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml = "consulatation record has uploaded successfully!";

    return {
      survey: model,
    };
  },
  methods: {
    async alertResults(sender) {
      let data = sender.data;
      data.inquiryId = this.$route.params.id;

      Service.doctorWirteVisitRecord(data)
        .then((res) => {
          if (res.data.code === 1) {
            alert("submitted successfully");
            location.assign("/seepatient");
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
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
