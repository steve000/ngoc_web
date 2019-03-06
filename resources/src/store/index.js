import Vue from "vue";
import Vuex from "vuex";
import actions from "../actions";
import mutations from "../mutations";

Vue.use(Vuex);

Vue.config.devtools = __DEV__;

!__DEV__ && (Vue.config.errorHandler = function (err, vm) {
    vm.$store.dispatch("hidePageLoading");
    console.error(err.message);
});

export default new Vuex.Store({
    actions,
    modules: mutations,
    strict: false,
})
