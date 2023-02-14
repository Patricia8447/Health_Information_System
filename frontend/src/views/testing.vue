<template>
  <div class="container has-text-left">
    <p>Qualification Application</p>
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import Service from "@/service/user.service.js";
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
              title: "Name shows on the ID card",
              placeHolder: "Chan Tai man",
              isRequired: true,
              autoComplete: "name",
            },
            {
              name: "cid",
              type: "text",
              title: "ID No",
              isRequired: true,
              autoComplete: "cid",
            },
            {
              name: "gender",
              type: "dropdown",
              title: "Gender",
              isRequired: true,
              autoComplete: "gender",
              choices: ["Male", "Female"],
            },
            {
              name: "phone",
              type: "text",
              title: "Telephone",
              isRequired: true,
              autoComplete: "phone",
            },
            {
              name: "email",
              type: "text",
              title: "Email",
              isRequired: true,
              autoComplete: "email",
            },
            {
              name: "zoomlink",
              type: "text",
              title: "Zoom Link",
              isRequired: true,
              autoComplete: "zoomlink",
            },
            {
              name: "hospitalName",
              type: "text",
              title: "Working Place",
              isRequired: true,
              autoComplete: "hospitalName",
            },
            {
              name: "hospitalLevel",
              type: "dropdown",
              title: "Type of medical insititution",
              isRequired: true,
              autoComplete: "hospitalLevel",
              choices: [
                "Govern Hospital",
                "personal Hospital",
                "Clinic",
                "Service Station",
              ],
            },
            {
              name: "hospitalAddress",
              type: "text",
              title: "Working Address",
              isRequired: true,
              autoComplete: "hospitalAddress",
            },
            {
              name: "pos",
              type: "dropdown",
              title: "Category",
              isRequired: true,
              autoComplete: "pos",
              choices: ["藥劑科", "兒科", "病理學", "外科", "神經外科", "皮膚科", "其他"],
            },
            {
              name: "job",
              type: "dropdown",
              title: "Job Position",
              isRequired: true,
              autoComplete: "job",
              choices: [
                "Doctor",
                "Nurse",
                "senior pharmacist",
                "nutritionist",
                "Service Assitant",
              ],
            },
            {
              type: "matrixdynamic",
              name: "available_time",
              title: "Please choose your available time",
              addRowText: "Add Subject",
              horizontalScroll: true,
              columnMinWidth: "130px",
              columnColCount: 1,
              cellType: "checkbox",
              choices: [
                {
                  value: 89,
                  text: "8 - 9 a.m.",
                },
                {
                  value: 910,
                  text: "9 - 10 a.m.",
                },
                {
                  value: 1011,
                  text: "10 - 11 a.m.",
                },
                {
                  value: 1112,
                  text: "11 - 12 a.m.",
                },

                {
                  value: 121,
                  text: "12 - 1 p.m.",
                },
                {
                  value: 12,
                  text: "1 - 2 p.m.",
                },
                {
                  value: 23,
                  text: "2 - 3 p.m.",
                },
                {
                  value: 34,
                  text: "3 - 4 p.m.",
                },
                {
                  value: 45,
                  text: "4 - 5 p.m.",
                },
                {
                  value: 56,
                  text: "5 - 6 p.m.",
                },
                {
                  value: 67,
                  text: "6 - 7 p.m.",
                },
                {
                  value: 78,
                  text: "7 - 8 p.m.",
                },
                {
                  value: -89,
                  text: "8 - 9 p.m.",
                },
                {
                  value: -910,
                  text: "9 - 10 p.m.",
                },
              ],
              columns: [
                {
                  name: "subject",
                  cellType: "dropdown",
                  title: "Select the date",
                  isRequired: true,
                  minWidth: "300px",
                  choices: [
                    "Monday",
                    "Tuesday",
                    "Wednesday",
                    "Thursday",
                    "Friday",
                    "Saturday",
                    "Sunday",
                  ],
                },
                {
                  name: "time_slot(s)",
                  title: "Please select the time slot(s)",
                },
              ],
              rowCount: 2,
            },
          ],
        },
        {
          questions: [
            {
              type: "text",
              name: "strength",
              title: "Area of expertise (optional)",
              placeHolder:
                "Please describe your area of expertise or disease accurately and truthfully, which will be shown to the user",
            },
            {
              type: "text",
              name: "selfIntro",
              title: "Personal Introduction(optional)",
              placeHolder:
                "Please carefully fill in your education, practice experience, honors, etc. This section will be displayed to the user",
            },
            {
              type: "checkbox",
              name: "isCorrect",
              title: "Please ensure that all information given is correct",
              isRequired: true,
              hasNone: false,
              colCount: 1,
              choices: ["CORRECT"],
            },
          ],
        },
        // {
        //   questions: [
        //     {
        //       name: "hkid1",
        //       type: "file", //需要限制上傳的格式，現在默認啥都能上傳的
        //       title: "Upload the front of ID card",
        //       isRequired: true,
        //       autoComplete: "hkid1",
        //       maxSize: 102400,
        //     },
        //     {
        //       name: "hkid2",
        //       type: "file",
        //       title: "Upload the back of ID card",
        //       isRequired: true,
        //       autoComplete: "hkid2",
        //     },
        //     {
        //       name: "qualified",
        //       type: "file",
        //       title: "Upload Practice Certificate",
        //       placeHolder:
        //         "Original color photo, personal information page including name, certificate number, change record and other information, without occlusion or defect",
        //       isRequired: true,
        //       autoComplete: "qualified",
        //       allowMultiple: true,
        //     },
        //     {
        //       name: "workprof",
        //       type: "file",
        //       title: "Upload your current hospital employment certificate",
        //       placeHolder:
        //         "Original color photo, personal information page including name, certificate number, change record and other information, without occlusion or defect",
        //       isRequired: true,
        //       autoComplete: "workprof",
        //       allowMultiple: true,
        //     },
        //   ],
        // },
      ],
    };
    var model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml =
      "The qualification application has been submitted successfully, please wait patiently for the administrator to review!";

    return {
      survey: model,
      // doctorInfo: {},
       ruleForm: {
          pass: '',
          checkPass: '',
          age: ''
        },
    };
  },
  methods: {
    async alertResults(sender) {
      console.log("发送成为医生接口", sender);
      console.log(sender);
      Service.toBeDoctor(sender.data)
        .then((res) => {
          console.log(res.data);
          if (res.data.code === 1) {
            // 根据原本的校验逻辑进行添加
            // localStorage.setItem("doctor", JSON.stringify(res.data.info));
            alert("提交成功，等待管理员审核");
            console.log(res.data.info);
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
.container p {
  font-size: 2.5em;
  text-align: center;
  font-weight: bold;
}
</style>
