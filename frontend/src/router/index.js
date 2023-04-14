import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    //一级路由
    {
      path: "/policy",
      name: "SafePolicy",
      meta: { requireAuth: false, visible: true, roles: ['admin', 'doctor', 'user'] },
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/SafePolicy.vue"),
    },
    {
      path: "/login",
      name: "Login",
      meta: { requireAuth: false, visiable: true, roles: ['doctor', 'admin', 'user'] },
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/register",
      name: "Register",
      meta: { requireAuth: false, visiable: true, roles: ['doctor', 'admin', 'user'] },
      component: () => import("../views/Register.vue"),
    },
    {
      path: "/forgetpass",
      name: "ForgetPass",
      meta: { requireAuth: false, visiable: true, roles: ['doctor', 'admin', 'user'] },
      component: () => import("../views/ForgetPass.vue"),
    },
    {
      path: "/resetpass",
      name: "resetPass",
      meta: { requireAuth: false, visiable: true, roles: ['doctor', 'admin', 'user'] },
      component: () => import("../views/resetPass.vue"),
    },
    // 提供页面框架
    {
      path: "/home",
      name: "Home",
      meta: { requireAuth: true },
      component: () => import("../views/Home.vue"),
      // redirect: "/",
      children: [
        {
          path: "/healthinformation",
          name: "Healthinformation",
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/HealthInformation.vue"),
          meta: { requireAuth: false, visiable: true, roles: ['doctor', 'admin', 'user'] }
        },

        {
          path: "/searchdrug",
          name: "SearchDrug",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/SearchDrug.vue"),
        },
        {
          path: "/drugdeliver",
          name: "Drugdeliver",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/Drugdeliver.vue"),
        },
        {
          path: "/showdoctor",
          name: "ShowDoctor",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/ShowDoctor.vue"),
        },
        {
          path: "/viewdoctordetail",
          name: "ViewDoctorDetail",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/ViewDoctorDetail.vue"),
        },
        {
          path: "/makeappointment",
          name: "MakeAppointment",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/MakeAppointment.vue"),
        },
        {
          path: "/updateappointment",
          name: "UpdateAppointmentTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/UpdateAppointmentTest.vue"),
        },
        {
          path: "/mycenter",
          name: "MyCenter",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/MyCenter.vue"),
        },
        {
          path: "/editmycenter",
          name: "EditMyCenter",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/EditMyCenter.vue"),
        },
        {
          path: "/appointmentorderrecord",
          name: "AppointmentOrderRecord",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/AppointmentOrderRecord.vue"),
        },
        {
          path: "/appointmentdetail",
          name: "AppointmentDetail",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/AppointmentDetail.vue"),
        },
        {
          path: "/onlinetest",
          name: "OnlineTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/OnlineTest.vue"),
        },
        {
          path: "/onlinetest/covid19",
          name: "CovidTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/CovidTest.vue"),
        },
        {
          path: "/onlinetest/eczema",
          name: "eczemaTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/eczemaTest.vue"),
        },
        {
          path: "/onlinetest/diabetes",
          name: "DiabetesTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/DiabetesTest.vue"),
        },
        {
          path: "/onlinetest/sleep",
          name: "SleepTest",
          meta: { requireAuth: true, visible: true, roles: ['user'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/user/SleepTest.vue"),
        },
        {
          path: "/qualification",
          name: "qualification",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/QualificationApplication.vue"),
        },
        {
          path: "/seepatient",
          name: "SeePatient",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/SeePatient.vue"),
        },
        {
          path: "/conrecord",
          name: "ConRecord",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/ConRecord.vue"),
        },
        {
          path: "/qualificationapplication",
          name: "QualificationApplication",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/QualificationApplication.vue"),
        },
        {
          path: "/dpersonalcenter",
          name: "PersonalCenter",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/PersonalCenter.vue"),
        },
        {
          path: "/editdpersonalinfo",
          name: "EditDoctorPersonalInfo",
          meta: { requireAuth: true, visible: true, roles: ['doctor'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/doctor/EditDoctorPersonalInfo.vue"),
        },
        {
          path: "/infomanage",
          name: "Infomanage",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/InfoManage.vue"),
        },
        {
          path: "/dinfoapprove",
          name: "DInfoApprove",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/DInfoApprove.vue"),
        },
        {
          path: "/infoadd",
          name: "InfoAdd",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/InfoAdd.vue"),
        },
        {
          path: "/infoupdate",
          name: "InfoUpdate",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/InfoUpdate.vue"),
        },
        {
          path: "/dinfoapprove",
          name: "DInfoApprpove",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/DInfoApprove.vue"),
        },
        {
          path: "/admindoctordetail",
          name: "AdminDoctorDetail",
          meta: { requireAuth: true, visible: true, roles: ['admin'] },
          component: () =>
            import(/* webpackChunkName: "about" */ "../views/admin/AdminDoctorDetail.vue"),
        },
      ],
    }
  ]
})
