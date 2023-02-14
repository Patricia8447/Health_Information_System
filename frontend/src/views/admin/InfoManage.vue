<template>
  <div>
    <el-row :gutter="12">
      <el-col :span="8">
        <div class="testCard">
          <h1>
            Health Knowledge
            <el-button><router-link to="/infoadd"> ADD</router-link></el-button>
          </h1>
          <el-card
            :body-style="{ padding: '10px' }"
            v-for="info in infos"
            :key="infos.coverLink"
          >
            <template slot-scope="scope">
              <div><img :src="info.coverLink" class="image" /></div>
              <div style="padding: 14px">
                <a :href="info.link" target="_blank"
                  ><h4>{{ info.title }}</h4></a
                >
              </div>
              <el-button @click.native="deleteInfo(info._id)">DELETE</el-button>
              <!-- <el-button @click="goRoute2(scope.$index)">UPDATE</el-button> -->
            </template>
          </el-card>
        </div>
      </el-col>

      <!-- <el-col :span="12">
        <div class="grid-content bg-purple">
          <div class="eating">
            <h1>
              Disease disambiguation
              <el-button><router-link to="/infoadd"> ADD</router-link></el-button>
            </h1>
            <el-row>
              <el-card
                :body-style="{ padding: '0px' }"
                v-for="info in infos"
                :key="infos.coverLink"
              >
                <div class="text item">
                  <div><img :src="info.coverLink" class="image" /></div>
                  <div style="padding: 14px">
                    <a :href="info.link" target="_blank"
                      ><h4>{{ info.title }}</h4></a
                    >
                    <div>
                      <el-button @click="deleteInfo(2)">DELETE</el-button>
                    </div>
                  </div>
                </div>
              </el-card>
            </el-row>
          </div>
        </div>
      </el-col> -->
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
            // 根据原本的校验逻辑进行添加
            alert(res.data.info);
          } else {
            alert(res.data.info);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // updateInfo(_id) {
    //   console.log("test update method: " + _id);
    //   let datas = {
    //     infoId: _id,
    //   };
    //   adminService
    //     .updataPushInfo(datas)
    //     .then((res) => {
    //       console.log(JSON.stringify(res.data));
    //       if (res.data.code === 1) {
    //         // 根据原本的校验逻辑进行添加
    //         alert(res.data.info);
    //       } else {
    //         alert(res.data.info);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    goRoute2(e) {
      let data = this.infos;
      // 这里写
      this.$router.push({ name: "InfoUpdate", params: { id: data[e]._id } });
    },
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
  display: cover;
  float: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
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

.testCard {
  margin-left: 22%;
  width: 600px;
  height: 250px;
}
</style>
