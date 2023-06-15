import App from './App'
import Vue from 'vue'
import 'static/font/iconfont.css';
import 'static/css/initialize.css';
import 'static/css/common.css';

Vue.config.productionTip = false
App.mpType = 'app'

// 日期插件
import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$Time = moment;

// 全局分享
import share from './utils/onShareAppMessage.js';
Vue.mixin(share)

const app = new Vue({
	...App
})

app.$mount()
