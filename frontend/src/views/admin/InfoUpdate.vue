<template>
  <div class="container has-text-left">
    <h1>Updating Health Information</h1>
    <survey :survey="survey"></survey>
  </div>
</template>

<script>
import "survey-vue/modern.min.css";
import { Survey, StylesManager, Model } from "survey-vue";
import adminService from "@/service/admin.service.js";

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
              name: "title",
              type: "text",
              title: "Display Title",
              placeHolder: "please enter the display title",
              isRequired: true,
              autoComplete: "title",
            },
            {
              name: "link",
              type: "text",
              title: "Link",
              placeHolder: "please enter the link",
              isRequired: true,
              autoComplete: "link",
            },
            {
              name: "coverLink",
              type: "text",
              title: "Cover Link",
              placeHolder: "please enter the cover link",
              isRequired: true,
              autoComplete: "coverlink",
            },
          ],
        },
      ],
    };

    const model = new Model(json);
    model.showPreviewBeforeComplete = "showAnsweredQuestions";
    model.onComplete.add(this.alertResults);
    model.completedHtml = "Information updated successfully!";

    return {
      survey: model,
    };
  },
  methods: {
     async alertResults(sender) {
      console.log(sender);
      console.log(sender.data);
      adminService
        .updataPushInfo(sender.data)
        .then((res) => {
          console.log(JSON.stringify(res.data));
          if (res.data.code === 1) {
           alert(res.data.info);
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