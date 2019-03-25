import VitoopApp from "./vitoop";
import Vue from 'vue/dist/vue.js';
import UserSettings from '../components/Vue/UserSettings/UserSettings.vue';

window.Vue = Vue;
window.UserSettings = UserSettings;

$(function () {
    window.vitoopApp = new VitoopApp();
    window.vitoopApp.init();
    resourceList.init();
    resourceDetail.init();
    resourceProject.init();
    userInteraction.init();
});