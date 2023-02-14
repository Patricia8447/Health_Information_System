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
              type: "html",
              name: "consultDate",
              html:
                '<h3>Consultation Date</h3><input type="date" id="consultDate" name="consultDate">',
            },

            {
              name: "name",
              type: "text",
              title: "Patient Name",
              placeHolder: "please enter the patient name",
              isRequired: true,
              autoComplete: "patientname",
            },
            {
              name: "age",
              type: "text",
              title: "Patient Age",
              placeHolder: "please enter the patient name",
              isRequired: true,
              autoComplete: "patientage",
            },
            {
              type: "dropdown",
              name: "gender",
              title: "Patient Gender",
              isRequired: true,
              placeHolder: "please choose the patient gender",
              colCount: 0,
              choices: ["female", "male"],
            },
          ],
        },
        {
          questions: [
            {
              name: "doctorName",
              type: "text",
              title: "Doctor's Name",
              placeHolder: "please enter your name",
              isRequired: true,
              autoComplete: "doctorName",
            },
            {
              type: "dropdown",
              name: "departmentId",
              title: "Department",
              isRequired: false,
              placeHolder: "please choose the department",
              colCount: 0,
              choices: [
                "Internal medicine",
                "surgical",
                "ent",
                "Department of gynaecology",
                "gastroenterology",
                "other",
              ],
            },
            // {
            //   name: "consultdate",
            //   type: "text",
            //   title: "Consultation Date",
            //   placeHolder: "please enter the consultation date",
            //   isRequired: true,
            //   autoComplete: "consultdate",
            // },
            {
              name: "symptoms",
              type: "comment",
              title: "Symptoms",
              placeHolder: "please enter described the symptoms",
              isRequired: true,
              autoComplete: "symptoms",
            },
            {
              name: "drugsage",
              type: "comment",
              title: "Drug Usage",
              placeHolder: "please list out the drug to be used",
              isRequired: true,
              autoComplete: "drugsage",
            },
            {
              name: "remark",
              type: "comment",
              title: "Remark",
              placeHolder: "please tell patient how yo use the drug clearly",
              isRequired: true,
              autoComplete: "remark",
            },
            // {
            //   type: "signaturepad",
            //   name: "signature",
            //   title: "Please sign here",
            //   isRequired: true,
            // },
          ],
        },
      ],
    };

    const model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml = "consulatation recors uploaded successfully!";

    return {
      survey: model,
    };
  },
  methods: {
    async alertResults(sender) {
      console.log("发送医生填写就诊记录接口");
      console.log(JSON.stringify(sender.data));
      let data = sender.data
      data.inquiryId = this.$route.params.id
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
