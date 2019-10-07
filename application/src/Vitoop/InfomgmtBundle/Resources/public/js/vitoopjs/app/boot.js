import VitoopApp from "./vitoop";
import Vue from 'vue/dist/vue.js';
import vitoopState from '../store/vitoopState';
import VtpApp from "../components/Vue/VtpApp.vue";
import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
import HelpButton from "../components/Vue/SecondSearch/HelpButton.vue";
import axios from "axios"

import VueI18n from "vue-i18n"
import de from "../../translates/de/messages.json";
const messages = {
    de
};

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.Vue = Vue;
window.axios = axios;
window.UserSettings = UserSettings;
window.SecondSearch = SecondSearch;
window.SearchToggler = SearchToggler;

$(function () {
    window.vitoopApp = new VitoopApp();
    window.vitoopApp.init();
    resourceList.init();
    resourceDetail.init();
    resourceProject.init();
    userInteraction.init();

    const i18n = new VueI18n({
        locale: 'de',
        messages,
    });

    library.add(faCheck);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.config.productionTip = false;
    Vue.use(VueI18n);

    new Vue({
        el: '#test',
        store: vitoopState,
        i18n,
        components: {VtpApp}
    }).$mount('#test');

    new Vue({
        el: '#vtp-second-search',
        store: vitoopState,
        components: {SecondSearch}
    }).$mount('#vtp-second-search');

    const searchByTagsFormButtons = document.getElementById('vtp-search-bytags-form-buttons-vue');

    if (searchByTagsFormButtons !== null) {
        new Vue({
            el: '#vtp-search-bytags-form-buttons-vue',
            store: vitoopState,
            components: {SearchToggler, HelpButton}
        }).$mount('#vtp-second-search');
    }
});
