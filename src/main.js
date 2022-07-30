import Vue from 'vue'
import 'regenerator-runtime/runtime'
import VueRouter from 'vue-router'
import App from './App'
import api from './store/index.js'
Vue.use(VueRouter)
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Home from './modules/home';
import About from './modules/about';
import VueMeta from 'vue-meta'

const truncate = function truncate (value,length) {
  var dots = value.length > length ? '...' : '';
  return value.substring(0, length)+dots;
}
const price = function price (value,locale,cur) {
  const money = new Intl.NumberFormat(locale,
    { style:'currency', currency: cur });
  return money.format(value);
}
const trim =function trim (value) {
  return value.toString().trim().replace(' ','');
}
const date2 =function date2 (value) {
  const date = new Date(value);
  return new Intl.DateTimeFormat('tr', { month: 'short',day: '2-digit',year: 'numeric' }).format(date);
}
Vue.filter('truncate',truncate);
Vue.filter('price',price);
Vue.filter('date2',date2);
const routes = [
  { path: '/', name:"home",component: Home },
  { path: '/about', name:"aboutMe", component: About },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})



import JwPagination from 'jw-vue-pagination';

Vue.component('jw-pagination', JwPagination);

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})

new Vue({
  el: '#app',
  router,
  store:api,
  render: h => h(App),
  mounted () {
    document.dispatchEvent(new Event('render'))
  }
})
