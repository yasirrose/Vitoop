import Vue from 'vue/dist/vue.js';
import Vuex from 'vuex/dist/vuex.js'
import { mapState } from 'vuex/dist/vuex.js';
import VuexPersistence from 'vuex-persist';
import UserService from "../services/User/UserService";

const vuexPersist = new VuexPersistence({
    key: 'vitoop_state',
    storage: localStorage
});

function initialState () {
    return {
        resource: {
            type: null,
            id: null
        },
        secondSearch: {
            show: false,
            showDataRange: false,
            showArtSelect: false,
            searchString: '',
            isBlueFilter: 0,
            isReadFilter: 0,
            artFilter: '',
            dateFrom: '',
            dateTo: '',
        },
        searchToggler: {
            isOpened: false,
        },
        table: {
            rowNumber: 7,
        },
        tagList: {
            show: false,
        },
        user: null,
    }
}

Vue.use(Vuex);
const vitoopState = window.vitoopState = new Vuex.Store({
    state: initialState(),
    mutations: {
        showSecondSearch: function (state) {
            state.secondSearch.show = true;
        },
        hideSecondSearch: function (state) {
            state.secondSearch.show = false;
        },
        showDataRange: function (state) {
            state.secondSearch.showDataRange = true;
        },
        hideDataRange: function (state) {
            state.secondSearch.showDataRange = false;
        },
        showArtSelect: function (state) {
            state.secondSearch.showArtSelect = true;
        },
        hideArtSelect: function (state) {
            state.secondSearch.showArtSelect = false;
        },
        updateTableRowNumber(state, value) {
            state.table.rowNumber = value;
        },
        updateTagListShowing(state, value) {
            state.tagList.show = value
        },
        updateSecondSearch: function (state, value) {
            state.secondSearch.searchString = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateBlueFilter: function (state, value) {
            state.secondSearch.isBlueFilter = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateReadFilter: function (state, value) {
            state.secondSearch.isReadFilter = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateArtFilter: function (state, value) {
            state.secondSearch.artFilter = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateDateFrom: function (state, value) {
            state.secondSearch.dateFrom = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateDateTo: function (state, value) {
            state.secondSearch.dateTo = value;
            this.commit('checkIsNotEmptySearchToggle');
        },
        updateSearchToggle: function (state, value) {
            state.searchToggler.isOpened = value;
            if (true === value && state.secondSearch.show !== true) {
                this.commit('showSecondSearch');
                return;
            }
            if (false === value && state.secondSearch.show === true) {
                this.commit('hideSecondSearch');
                return;
            }
        },
        checkIsNotEmptySearchToggle: function (state) {
            state.searchToggler.isNotEmpty = (1 === state.secondSearch.isBlueFilter) || (1 === this.state.secondSearch.isReadFilter) || '' !== state.secondSearch.artFilter || '' !== state.secondSearch.searchString || '' !== state.secondSearch.dateFrom || '' !== state.secondSearch.dateTo;
            this.commit('updateSearchToggle', state.searchToggler.isNotEmpty === true);
        },
        setUser: function(state, value) {
            state.user = value;
            if (null === value) {
                this.commit('reset');
            }
        },
        setResource: function (state, value) {
            state.resource = value;
        },
        resetSecondSearch: function(state) {
            const secondSearch = initialState().secondSearch;
            Object.keys(secondSearch).forEach(key => {
                state.secondSearch[key] = secondSearch[key]
            });
            this.commit('checkIsNotEmptySearchToggle');
        },
        reset (state) {
            // acquire initial state
            const s = initialState();
            let skipedKeys = ['table'];
            Object.keys(s).forEach(key => {
                if (-1 === skipedKeys.indexOf(key)) {
                    state[key] = s[key]
                }
            })
        }
    },
    getters: {
        getListFontSize(state, getters) {
            let currentFontSize = 14;
            currentFontSize -= state.user ? state.user.decrease_font_size : 0;

            return currentFontSize;
        },
        getTableRowNumber(state, getters) {
            let originalPageNumber = state.table.rowNumber ? state.table.rowNumber : 7;
            let offset = 0;
            if (true === state.secondSearch.show) {
                offset++;
            }
            if (true === state.tagList.show) {
                offset++;
            }

            return originalPageNumber - offset;
        }
    },
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
    actions: {
        fetchCurrentUser({ commit })  {
            let userService = new UserService();
            userService.getCurrentUser()
                .then((response) => {
                    commit("setUser", response);
                })
                .catch((error => {
                    commit("setUser", null);
                }))
        }
    },
    plugins: [vuexPersist.plugin]
});

export default vitoopState;