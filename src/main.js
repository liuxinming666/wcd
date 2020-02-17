import Vue from 'vue'
import App from './App.vue'

//导入路由组件
import router from './router'

//导入easyui组件
import 'vx-easyui/dist/themes/default/easyui.css';
import 'vx-easyui/dist/themes/icon.css';
import 'vx-easyui/dist/themes/vue.css';
import EasyUI from 'vx-easyui';
import locale from 'vx-easyui/dist/locale/easyui-lang-zh_CN'

//导入访问数据组件
import vueAxios from 'vue-axios';
import axios from './axios/axios';

//导入lodash组件
let _ = require('lodash');

//导入element-ui组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


import commonjs from '../public/js/common/common.js'
Vue.config.productionTip = false

//导入mockjs组件
//let Mock = require('mockjs')

import "font-awesome/css/font-awesome.css";

Vue.use(EasyUI, {
  locale: locale
});

Vue.use(vueAxios, axios);
Vue.use(ElementUI);


Vue.prototype.commonjs = commonjs;

new Vue({
  render: h => h(App),
    router
}).$mount('#app')

import  { LoadingPlugin } from 'vux'
Vue.use(LoadingPlugin)
