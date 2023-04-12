<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1" v-if="name !== 'DOCTOR'"
        ><router-link to="/healthinformation"
          >Health Information</router-link
        ></el-menu-item
      >
      <el-submenu index="2" v-if="name == 'NORMAL'">
        <template slot="title">Ask doctor</template>
        <el-menu-item index="2-1"
          ><router-link to="/onlinetest"
            >Health Prediction Test</router-link
          ></el-menu-item
        >
        <el-menu-item index="2-2"
          ><router-link to="/showdoctor">Online Consultation</router-link></el-menu-item
        >
      </el-submenu>
      <el-menu-item index="3" v-if="name == 'NORMAL'"
        ><router-link to="/searchdrug">Medicine Library</router-link></el-menu-item
      >
      <el-submenu index="4" v-if="name == 'NORMAL'">
        <template slot="title">Personal Center</template>
        <el-menu-item index="4-1"
          ><router-link to="/mycenter"
            >Modify Personal Information</router-link
          ></el-menu-item
        >
        <el-menu-item index="4-2"
          ><router-link to="/appointmentorderrecord"
            >Appointment Order Record</router-link
          ></el-menu-item
        >
      </el-submenu>
      <el-menu-item index="5" v-if="name == 'ADMIN'"
        ><router-link to="/infomanage"
          >Manage Health Information</router-link
        ></el-menu-item
      >
      <el-menu-item index="6" v-if="name == 'ADMIN'"
        ><router-link to="/dinfoapprove">Manage Application</router-link></el-menu-item
      >
      <el-menu-item index="7" v-if="name == 'DOCTOR'"
        ><router-link to="/qualificationapplication"
          >Qulification Application</router-link
        ></el-menu-item
      >
      <el-menu-item index="8" v-if="name == 'DOCTOR'"
        ><router-link to="/seepatient">Consultation Area</router-link></el-menu-item
      >
      <el-menu-item index="9" v-if="name == 'DOCTOR'"
        ><router-link to="/dpersonalcenter"
          >Doctor Personal Information</router-link
        ></el-menu-item
      >
      <div>
        <!-- <el-button type="primary" plain
          ><router-link :to="'/login'">Login</router-link></el-button
        > -->
        <el-button type="danger" @click="logout()">Logout</el-button>
      </div>
    </el-menu>
    <div><router-view /></div>
  </div>
</template>

<script scoped>
import Service from "@/service/upload.service.js";
export default {
  data() {
    var name = localStorage.getItem("user_role");
    return {
      activeIndex: "1",
      activeIndex2: "1",
      name,
    };
  },
  methods: {
    loadComments() {
      var list = localStorage.getItem("user_role");
      this.name = list;
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    logout() {
      var storage = window.localStorage;
      storage.clear();
      this.$router.push("/login"); //跳回登录地址
    },
  },
  created() {
    // this.loadComments();
  },
};
</script>
