<template>
  <div class="container">
    <el-card class="box-card">
      <div
        v-for="doctordetail in alldoctordetails"
        :key="doctordetail.doctorname"
        class="text item"
      >
        <div style="padding: 6px; height: 800px">
          <div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Name: {{ doctordetail.name }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Telephone: {{ doctordetail.phone }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Email: {{ doctordetail.email }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Hospital Name: {{ doctordetail.hospitalName }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Hospital Level: {{ doctordetail.hospitalLevel }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Hospital Address: {{ doctordetail.hospitalAddress }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Department: {{ doctordetail.departmentId }}
            </div>
            <!-- <div style="position: relative; top: 15px; text-align: left">
              Doctor Working Position: {{ doctordetail.pos }}
            </div> -->
            <div style="position: relative; top: 15px; text-align: left">
              Doctor's Job: {{ doctordetail.job }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Available Time: {{ doctordetail.slot }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Strength: {{ doctordetail.strength }}
            </div>
            <div style="position: relative; top: 15px; text-align: left">
              Doctor Self Introduction: {{ doctordetail.selfIntro }}
            </div>
          </div>
          <div style="position: relative; top: 30px">
            <img
              src="data:image/jpeg;base64,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"
              class="image"
            />
          </div>
        </div>
      </div>

      <el-button type="success" plain class="button"
        ><router-link to="/makeappointment"> Make Appointment </router-link></el-button
      >
    </el-card>
  </div>
</template>

<script>
import Service from "@/service/admin.service.js";
export default {
  data() {
    return {
      alldoctordetails: [
        {
          name: "",
          phone: "",
          email: "",
          hospitalName: "",
          hospitalLevel: "",
          hospitalAddress: "",
          pos: "",
          job: "",
          slot: "",
          strength: "",
          status: "",
          selfIntro: "",
        },
      ],
    };
  },
  async mounted() {
    console.log("发送doctor个人信息详情接口");
    // TODO doctor个人信息详情接口
    console.log(this.json);
    Service.getOneDoctor(this.json)
      .then((res) => {
        console.log("test" + res.data);
        console.log("test1" + JSON.stringify(this.json));
        // alert(res.data);
        // alert(this.json);
        if (res.data.code === 1) {
          // 根据原本的校验逻辑进行添加
          alert(res.data.info);
          localStorage.setItem("user", JSON.stringify(this.json));
        } else {
          alert(res.data.info);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.container {
  margin-top: 5%;
  margin-left: 10%;
  width: 100%;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 1200px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 10px;
  float: center;
}

.image {
  width: 30%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
