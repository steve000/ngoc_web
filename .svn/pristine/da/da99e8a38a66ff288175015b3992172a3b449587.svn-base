import Vue from "vue";
import ES6Promise from 'es6-promise'
import store from "./store";
import router from "./router";
import {sync} from "vuex-router-sync";
import App from './App';

//import MyElement from '~/plugins/element'
//Vue.use(MyElement)
ES6Promise.polyfill();

sync(store, router);

new Vue({
    el: '#root',
    store,
    router,
    render: h => h(App)
});

