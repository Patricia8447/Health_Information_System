<template>
  <div>
    <div class="block">
      <el-carousel
        class="carousel2"
        indicator-position="none"
        :autoplay="true"
        trigger="click"
      >
        <el-carousel-item v-for="item in images" :key="item.id">
          <img class="carouselImage" :src="item.url" alt="无图片" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <h1></h1>
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
                ><h4>{{ info.title }}</h4></a
              >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Service from "@/service/common.service.js";
import adminService from "@/service/admin.service.js";

export default {
  data() {
    return {
      images: [
        { url: require("@/assets/image/2.jpg") },
        { url: require("@/assets/image/1.png") },
        { url: require("@/assets/image/6.png") },
        { url: require("@/assets/image/3.jpg") },
        { url: require("@/assets/image/5.png") },
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
  mounted() {
    //发送获取资讯列表接口
    Service.getPushInfoList()
      .then((res) => {
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
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
.carouselImage {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel2 {
  width: 100%;
  /* height: 150px; */
  background: white;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
