import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';

import ajax from './assets/js/axios.config';
import utils from './assets/js/utils';
import alert from './components/Alert/index';



import './assets/css/reset.css'
import './assets/scss/icon.scss'
import './assets/scss/main.scss'


import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

Vue.prototype.$ajax = ajax
Vue.prototype.$utils = utils;
Vue.prototype.$alert = alert;

Vue.use(ElementUI);
Vue.use(alert);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
