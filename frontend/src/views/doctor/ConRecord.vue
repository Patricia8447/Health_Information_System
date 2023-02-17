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
            {
              name: "symptoms",
              type: "comment",
              title: "Symptoms",
              placeHolder: "please enter the described symptoms",
              isRequired: true,
              autoComplete: "symptoms",
            },
            {
              name: "drugsage",
              type: "comment",
              title: "Drug Usage",
              placeHolder: "please list out the drug(s) to be used",
              isRequired: true,
              autoComplete: "drugsage",
            },
            {
              name: "remark",
              type: "comment",
              title: "Remark",
              placeHolder: "please tell the patient how to use the drug(s) clearly",
              isRequired: true,
              autoComplete: "remark",
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
      console.log(JSON.stringify(sender.data));
      let data = sender.data;
      data.inquiryId = this.$route.params.id;

      Service.doctorWirteVisitRecord(data)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            alert("submitted successfully");
            console.log(res.data.info);
            // location.assign("/appointmentorderrecord");
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
