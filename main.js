import App from './App'
import Vue from 'vue'
import 'static/font/iconfont.css';
import 'static/css/initialize.css';
import 'static/css/common.css';

Vue.config.productionTip = false
App.mpType = 'app'

import moment from 'moment';
moment.locale('zh-cn');
Vue.prototype.$Time = moment;

const app = new Vue({
	...App
})

app.$mount()
