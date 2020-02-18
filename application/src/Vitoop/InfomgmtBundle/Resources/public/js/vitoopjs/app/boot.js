import Vue from 'vue/dist/vue.js';
import vitoopState from '../store/vitoopState';
import VtpApp from "../components/Vue/VtpApp.vue";
import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
import axios from "axios"
import lodash from "lodash"
import Vuelidate from 'vuelidate';
import moment from "moment";

import VueI18n from "vue-i18n"
import messagesDE from "../../translates/de/messages";
import validationsDE from "../../translates/de/validations";
const de = Object.assign(messagesDE,validationsDE);
const messages = {
    de
};

import VueRouter from "vue-router";
import routes from "../router/routes";

const router = new VueRouter({
    mode: 'history',
    routes
});

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// global mixins
import ResizeContentHeightMixin from '../components/Vue/mixins/ResizeContentHeightMixin'

Vue.mixin(ResizeContentHeightMixin);

window._ = lodash;
window.Vue = Vue;
window.axios = axios;
window.UserSettings = UserSettings;
window.SecondSearch = SecondSearch;
window.SearchToggler = SearchToggler;
window.VueBus = new Vue();
window.moment = moment;

$(function () {
    const i18n = new VueI18n({
        locale: 'de',
        messages,
    });

    library.add(faCheck);

    Vue.use(VueRouter);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.config.productionTip = false;
    Vue.use(VueI18n);
    Vue.use(Vuelidate);

    new Vue({
        el: '#vtp-app',
        store: vitoopState,
        router,
        i18n,
        components: {VtpApp}
    }).$mount('#vtp-app');
});
