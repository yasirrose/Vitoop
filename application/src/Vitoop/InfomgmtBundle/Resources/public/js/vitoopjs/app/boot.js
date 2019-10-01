import VitoopApp from "./vitoop";
import Vue from 'vue/dist/vue.js';
import vitoopState from '../store/vitoopState';
import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
import HelpButton from "../components/Vue/SecondSearch/HelpButton.vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

window.Vue = Vue;
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

    library.add(faCheck);
    Vue.component('font-awesome-icon', FontAwesomeIcon);
    Vue.config.productionTip = false;

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
