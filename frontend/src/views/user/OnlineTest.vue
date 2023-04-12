<template>
  <div class="container">
    <h3 class="titleFormat">The Four Tests</h3>
    <el-row class="marginBetween">
      <el-button class="btns"
        ><router-link to="/onlinetest/covid19">COVID19 Self Test</router-link></el-button
      >

      <el-button class="btns"
        ><router-link to="/onlinetest/eczema">Eczema Test</router-link></el-button
      >
      <el-button class="btns"
        ><router-link to="/onlinetest/diabetes">Diabetes Test</router-link></el-button
      >
      <el-button class="btns"
        ><router-link to="/onlinetest/sleep">Sleeping Test</router-link></el-button
      >
    </el-row>
  </div>
</template>

<script></script>

<style scoped>
.container {
  margin-top: 3%;
  margin-left: 10%;
}

.titleFormat {
  font-weight: bold;
  background-color: #ccddff;
  width: 450px;
  text-align: center;
  margin-left: 31%;
}

.marginBetween {
  margin-top: 5%;
}

.btns {
  font-weight: bold;
  font-size: 1.5em;
}
</style>
