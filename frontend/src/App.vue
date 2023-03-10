<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    // $route: {
    //   // 判断用户在进行路由跳转的时候 本地缓存中是否存在token信息
    //   // 如果存在则next() 否则强制用户跳转到login页面
    // },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
