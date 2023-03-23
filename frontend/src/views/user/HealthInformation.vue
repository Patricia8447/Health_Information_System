<template>
  <div>
    <el-carousel
      class="carousel2"
      indicator-position="none"
      :autoplay="true"
      trigger="click"
    >
      <el-carousel-item v-for="item in images" :key="item.id">
        <img class="carousel" :src="item.url" alt="无图片" />
      </el-carousel-item>
    </el-carousel>

    <div class="container">
      <el-row :gutter="12">
        <el-col :span="8">
          <div class="testCard">
            <h1>Health Knowledge</h1>
            <el-card
              :body-style="{ padding: '10px' }"
              v-for="info in infos"
              :key="infos._id"
            >
              <template slot-scope="scope">
                <div><img :src="info.coverLink" class="image" /></div>
                <div style="padding: 14px">
                  <a :href="info.link" target="_blank"
                    ><h4>{{ info.title }}</h4></a
                  >
                </div>
              </template>
            </el-card>
          </div>
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
        { url: require("@/assets/image/slide3.png") },
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
    console.log("发送获取资讯列表接口");
    // TODO 资讯列表接口
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

<style>
.container {
  margin-left: 500px;
}

.time {
  font-size: 23px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.image {
  width: 25%;
  /* display: cover; */
  float: center;
  display: flex;
  justify-content: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.carousel {
  width: 100%;
  height: 200px;
  position: relative;
}

.carousel2 {
  width: 100%;
  height: 150px;
  background: white;
}

/* .left {
  float: left;
  width: 700px;
  height: 100%;
 }

.right {
  width: 400px;
  float: right;
  height: 100%;
  text-align: left;
  }

* {
  margin: 0;
  padding: 0;
}

.carousel {
  width: 660px;
  height: 400px;
  border: 1px solid rgba(0, 0, 0, 0);
  margin: 10px auto;
  margin-left: 0px;
  position: relative;
 }

.carousel img {
  width: 660px;
  height: 375px;
  position: absolute;
  top: 0;
  left: 26px;
  opacity: 0;
  transition: all 0.6s;
}

.carousel img.current {
  opacity: 1;
}

#circles {
  position: absolute;
  top: 90%;
  width: 300px;
  height: 30px;
  bottom: 10px;
  left: 50%;
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
}

p {
  width: 15px;
  height: 15px;
  background-color: rgba(234, 226, 165, 0.73);
  border-radius: 50%;
}

p.current {
  width: 15px;
  height: 15px;
  background-color: rgba(241, 77, 227, 0.584);
}

.eating {
  width: 600px;
  text-align: left;
  margin: 15px auto;
  margin-left: 26px;
}
.eating h1 {
  font-size: 2.5em;
  color: #000;
  font-weight: 700;
}

.answering {
  text-align: left;
  height: 400px;
}

.answering h1 {
  font-size: 2.5em;
  color: #000;
  font-weight: 700;
}

.keep {
  text-align: left;
}

.keep h1 {
  font-size: 2.5em;
  color: #000;
  font-weight: 700;
} */

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
