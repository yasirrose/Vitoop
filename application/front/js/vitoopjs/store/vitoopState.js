import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex/dist/vuex.js'
import { mapState } from 'vuex/dist/vuex.js';
import VuexPersistence from 'vuex-persist';

import state from "./state";
import mutations from "./mutations";
import getters from "./getters";
import actions from "./actions";

const vuexPersist = new VuexPersistence({
    key: 'vitoop_state',
    storage: localStorage
});

function initialState () {
    return state;
}

Vue.use(Vuex);
const vitoopState = window.vitoopState = new Vuex.Store({
    state: initialState(),
    mutations,
    getters,
    actions,
    computed: {
        isSecondSearchBlue: function () {
            return 1 === this.state.secondSearch.isBlueFilter;
        },
        isSecondSearchRead: function () {
            return 1 === this.state.secondSearch.isReadFilter;
        },
        ...mapState({
            'secondSearch': 'secondSearch'
        }),
    },
    plugins: [vuexPersist.plugin]
});

export default vitoopState;