
//import html pages into bundle
import '../index.html';


import Vue from 'vue';

import App from './App';
Vue.component('app-layout', App);

Vue.config.productionTip = false;



import 'bootstrap/scss/bootstrap.scss';

const app = new Vue({
    el: '#app',
});
