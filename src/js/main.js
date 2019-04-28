
//import html pages into bundle
import '../index.html';


import Vue from 'vue';

//import helloComponent from './components/hello.vue';
//Vue.component('hello-component', helloComponent);

/*const app = new Vue({
    el: '#app',
});*/


//import Vue from 'vue'
import App from './App';
Vue.component('app-layout', App);

Vue.config.productionTip = false;

/*import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'*/

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import BootstrapVue from 'bootstrap-vue';

Vue.use(BootstrapVue);
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead);

const app = new Vue({
    el: '#app',
});
