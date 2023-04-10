<template>
  <div class="container">
    <h3 class="titleFormat">
      <el-button style="height: 80px; weight: 150px; font-weight: bold; font-size:1.25em; text-align: center;background-color:#E0FFFF" @click="toinfoadd()"
        >ADD Health Infomation Management</el-button
      >
    </h3>
    <el-row :gutter="20" class="el-row" type="flex">
      <el-col
        :span="8"
        v-for="(info, index) in infos"
        :key="infos.coverLink"
        class="el-col"
      >
        <el-card class="el-card" :key="index" onclick="">
          <div slot="header" class="clearfix">
            <img :src="info.coverLink" class="image" />
            <a :href="info.link" target="_blank"
              ><h4 style="font-weight:bold">{{ info.title }}</h4></a
            >
          </div>
          <div>
            <div class="text item">
              <el-button @click.native="deleteInfo(info._id)">DELETE</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Service from "@/service/common.service.js";
import adminService from "@/service/admin.service.js";
export default {
  name: "Carousel",
  data() {
    return {
      images: [
        { url: require("@/assets/image/2.jpg") },
        { url: require("@/assets/image/1.png") },
      ],
      infos: [
        {
          _id: "",
          coverLink: "",
          link: "",
          title: "",
        },
      ],
    };
  },
  methods: {
    toinfoadd() {
      this.$router.push("/infoadd");
    },
    deleteInfo(_id) {
      console.log("test delete method: " + _id);
      let datas = {
        infoId: _id,
      };
      adminService
        .deletePushInfo(datas)
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
    goRoute2(e) {
      let data = this.infos;
      this.$router.push({ name: "InfoUpdate", params: { id: data[e]._id } });
    },
  },
  mounted() {
    console.log("发送获取资讯列表接口");
    //资讯列表接口
    Service.getPushInfoList()
      .then((res) => {
        console.log("test1" + JSON.stringify(res.data));
        if (res.data.code === 1) {
          this.infos = res.data.info;
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

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.titleFormat {
  font-weight: bold;
  width: 450px;
  text-align: center;
  margin-left: 31%;
}

.container {
  margin-top: 3%;
  margin-left: 10%;
}
.all {
  margin-top: -30px;
  word-break: break-all;
  height: 100%;
}
.mid {
  margin-top: 25%;
  height: 50%;
}
.mid_item {
  justify-content: center;
  align-items: center;
}
.item {
  margin-bottom: 10px;
}
.item_tag {
  float: left;
  text-align: left;
}
.item_desr {
  margin-left: 40%;
  min-height: 30px;
  text-align: left;
}
.text {
  width: 100%;
  font-size: 12px;
  font-family: "Microsoft YaHei";
  color: #909399;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.el-card {
  min-width: 100%;
  height: 100%;
  margin-right: 20px;
  /*transition: all .5s;*/
}
.el-card:hover {
  margin-top: -5px;
}
.el-row {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}
.el-col {
  border-radius: 4px;
  align-items: stretch;
  margin-bottom: 40px;
}
</style>
