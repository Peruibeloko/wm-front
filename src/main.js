import Vue from 'vue';
import App from './App.vue';
import router from '.';

Vue.config.productionTip = false;

const data = {
  apiUrl: 'https://wm-back.herokuapp.com'
};

new Vue({
  data,
  router,
  render: h => h(App)
}).$mount('#app');
