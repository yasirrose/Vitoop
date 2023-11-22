
import {createApp} from 'vue';

import VtpApp from "../components/Vue/VtpApp.vue";


import VueSelect from 'vue-select';
import 'vue-select/dist/vue-select.css';
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

import VitoopApp from "./vitoop";


import {createRouter, createWebHistory} from "vue-router";
import routes from "../router/routes";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import ResizeContentHeightMixin from '../components/Vue/mixins/ResizeContentHeightMixin'
import EventBus from "./eventBus";







const app = createApp(VtpApp);

document.addEventListener('DOMContentLoaded', () =>
{
    window.axios = axios;
    window.EventBus = EventBus;

    const i18n = createI18n({
        locale: 'de', // set locale
        fallbackLocale: 'de', // set fallback locale
        messages, // set locale messages
    })


    window.$i18n = i18n;

    window.vitoopApp = new VitoopApp();
    window.vitoopApp.init();

    app.use(vitoopState);

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

    axios('/api/all-settings')
        .then(({data}) => {

            app.provide('downloadSize', data.current_downloads_size);
            app.provide('invitationValue', data.invitation);
            app.provide('infoProjectData', {});
            app.provide('terms', data.terms);
            app.provide('dataP', data.datap);

        })
        .catch(err => console.dir(err));


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
