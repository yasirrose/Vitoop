// import Vue from 'vue/dist/vue.js';
import {createApp} from 'vue';

import VtpApp from "../components/Vue/VtpApp.vue";

/** @TODO: Remove me */

import VueSelect from 'vue-select';
import vitoopState from '../store/vitoopState';

import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
import axios from "axios"
import lodash from "lodash"
import Vuelidate from 'vuelidate';
import moment from "moment";

import {createI18n} from "vue-i18n"
import messagesDE from "../../translates/de/messages";
import validationsDE from "../../translates/de/validations";
const de = Object.assign(messagesDE,validationsDE);
const messages = {
    de
};



import {createRouter, createWebHistory} from "vue-router";
import routes from "../router/routes";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ResizeContentHeightMixin from '../components/Vue/mixins/ResizeContentHeightMixin'






//import App from './App.vue'

const app = createApp(VtpApp);

document.addEventListener('DOMContentLoaded', () =>
{
    window.axios = axios;

    const i18n = createI18n({
        locale: 'de', // set locale
        fallbackLocale: 'de', // set fallback locale
        messages, // set locale messages
    })


    window.$i18n = i18n;

    app.use(vitoopState);

    //app.use(axios);
    app.use(lodash);

    app.use(Vuelidate);
    app.use(moment);
    app.use(i18n);

    app.use(messagesDE);
    app.use(validationsDE);

    const router = createRouter({
        history: createWebHistory(),
        routes, // short for `routes: routes`
    })


    app.use(router);


    app.mixin(ResizeContentHeightMixin);

    app.component('VueSelect', VueSelect);
    app.component('UserSettings', UserSettings);
    app.component('SecondSearch', SecondSearch);
    app.component('SearchToggler', SearchToggler);



    library.add(faCheck);

    app.component('font-awesome-icon', FontAwesomeIcon);



    app.mount('#vtp-app');
});



//
// import VtpApp from "../components/Vue/VtpApp.vue";
// import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';
// import SecondSearch from "../components/Vue/SecondSearch/SecondSearch.vue";
// import SearchToggler from "../components/Vue/SecondSearch/SearchToggler.vue";
// import axios from "axios"
// import lodash from "lodash"
// import Vuelidate from 'vuelidate';
// import moment from "moment";

// import VueI18n from "vue-i18n"
// import messagesDE from "../../translates/de/messages";
// import validationsDE from "../../translates/de/validations";
// const de = Object.assign(messagesDE,validationsDE);
// const messages = {
//     de
// };

// import VueRouter from "vue-router";
// import routes from "../router/routes";

// const router = new VueRouter({
//     mode: 'history',
//     routes
// });

// import { library } from '@fortawesome/fonvitoopApptawesome-svg-core'
// import { faCheck } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// global mixins
//import ResizeContentHeightMixin from '../components/Vue/mixins/ResizeContentHeightMixin'

// Vue.mixin(ResizeContentHeightMixin);

// window._ = lodash;
// window.Vue = Vue;
// window.axios = axios;
// window.UserSettings = UserSettings;
// window.SecondSearch = SecondSearch;
// window.SearchToggler = SearchToggler;
// window.VueBus = new Vue();
// window.moment = moment;

// $(function () {
//     const i18n = new VueI18n({
//         locale: 'de',
//         messages,
//     });

//     window.$i18n = i18n;

//     library.add(faCheck);
//     Vue.use(VueRouter);
//     Vue.component('font-awesome-icon', FontAwesomeIcon);
//     Vue.config.productionTip = false;
//     Vue.use(VueI18n);
//     Vue.use(Vuelidate);

//     window.VueVtpApp = new Vue({
//         el: '#vtp-app',
//         store: vitoopState,
//         router,
//         i18n,
//         components: {VtpApp}
//     }).$mount('#vtp-app');
// });
