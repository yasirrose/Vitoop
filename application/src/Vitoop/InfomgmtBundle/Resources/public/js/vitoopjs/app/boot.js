import Vue from 'vue/dist/vue.js';
import vitoopState from '../store/vitoopState';
import VtpApp from "../components/Vue/VtpApp.vue";
import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
import axios from "axios"
import VueQuillEditor from "vue-quill-editor";

import VueI18n from "vue-i18n"
import de from "../../translates/de/messages.json";
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

window.Vue = Vue;
window.axios = axios;
window.UserSettings = UserSettings;
window.SecondSearch = SecondSearch;
window.SearchToggler = SearchToggler;

$(function () {
    const i18n = new VueI18n({
        locale: 'de',
        messages,
    });

    Vue.use(VueRouter);

    library.add(faCheck);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.config.productionTip = false;
    Vue.use(VueI18n);
    Vue.use(VueQuillEditor);

    new Vue({
        el: '#vtp-app',
        store: vitoopState,
        router,
        i18n,
        components: {VtpApp}
    }).$mount('#vtp-app');
});
