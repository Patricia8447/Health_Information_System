import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import Oruga from '@oruga-ui/oruga'
import '@oruga-ui/oruga/dist/oruga.css'
import { bulmaConfig } from '@oruga-ui/theme-bulma'
import '@oruga-ui/theme-bulma/dist/bulma.css'
import JsonExcel from "vue-json-excel"
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'survey-core/survey.core.min.js'
import 'survey-core/survey.i18n.min.js'
import 'survey-vue-ui/survey-vue-ui.min.js'
import 'surveyjs-widgets/surveyjs-widgets.min.js'

import "element-ui/lib/theme-chalk/index.css";
// 引入element-ui和css文件
import "./assets/style/reset.css";
// 引入样式重置的css样式
import 'bootstrap/dist/css/bootstrap.min.css'
// import '@/assets/css/main.css'

// import * as firebase from "firebase/app"; 
// import { initializeApp } from 'firebase/app';
import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import jwt_decode from "jwt-decode";
// Vue.use(jwt_decode);

Vue.component("downloadExcel", JsonExcel);

Vue.use(Oruga, bulmaConfig)
Vue.use(Chartkick.use(Chart))

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBXvuoILefocNraooCpsb_O-JYcA2pc3SE",
  authDomain: "testing-1e0b1.firebaseapp.com",
  projectId: "testing-1e0b1",
  storageBucket: "testing-1e0b1.appspot.com",
  messagingSenderId: "312305674494",
  appId: "1:312305674494:web:de38c3ec41a51b1b5e1daf"
};

// console.log(firebase)

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
