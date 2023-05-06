import App from './App'
import Vue from 'vue'
import 'static/css/iconfont.css';
import 'static/css/initialize.css';


Vue.config.productionTip = false
App.mpType = 'app'



const app = new Vue({
	...App
})

app.$mount()
