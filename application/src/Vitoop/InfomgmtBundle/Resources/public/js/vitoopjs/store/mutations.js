import initialState from './state'

export default {
    setHelp(state, payload) {
        state.help[payload.key] = payload.value;
    },
    setAdmin(state, status) {
        state.admin = status;
    },
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
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateBlueFilter: function (state, value) {
        state.secondSearch.isBlueFilter = value;
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateReadFilter: function (state, value) {
        state.secondSearch.isReadFilter = value;
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateArtFilter: function (state, value) {
        state.secondSearch.artFilter = value;
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateDateFrom: function (state, value) {
        state.secondSearch.dateFrom = value;
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateDateTo: function (state, value) {
        state.secondSearch.dateTo = value;
        // this.commit('checkIsNotEmptySearchToggle');
    },
    updateSearchToggle: function (state, value) {
        state.searchToggler.isOpened = value;
        if (value && !state.secondSearch.show) {
            this.commit('showSecondSearch');
            return;
        }
        if (!value && state.secondSearch.show) {
            this.commit('hideSecondSearch');
            return;
        }
    },
    checkIsNotEmptySearchToggle: function (state) {
        state.searchToggler.isNotEmpty =
            (1 === state.secondSearch.isBlueFilter) ||
            (1 === this.state.secondSearch.isReadFilter) ||
            '' !== state.secondSearch.artFilter ||
            '' !== state.secondSearch.searchString ||
            '' !== state.secondSearch.dateFrom ||
            '' !== state.secondSearch.dateTo;
        this.commit('updateSearchToggle', state.searchToggler.isNotEmpty);
    },
    setUser: function(state, value) {
        state.user = value;
        if (null === value) {
            this.commit('reset');
        }
    },

    // state.resource
    setResource: function (state, value) {
        state.resource = value;
    },
    setResourceInfo(state, info) {
        state.resource.info = info;
    },
    setResourceId(state, id) {
        state.resource.id = id;
    },
    setResourceType(state, type) {
        state.resource.type = type;
    },
    setResourceOwner(state, status) {
        state.resource.owner = status;
    },
    resetResource(state) {
        state.edit = false;
        state.table.rowNumber++;
        Object.keys(state.resource).forEach(item => {
            state.resource[item] = null;
        })
    },

    resetSecondSearch: function(state) {
        const secondSearch = initialState.secondSearch;
        Object.keys(secondSearch).forEach(key => {
            state.secondSearch[key] = secondSearch[key]
        });
        // state.secondSearch = initialState.secondSearch;
        this.commit('checkIsNotEmptySearchToggle');
    },
    secondSearchIsSearching(state,isSearching) {
        state.secondSearch.isSearching = isSearching;
    },
    reset(state) {
        // acquire initial state
        const s = initialState;
        let skipedKeys = ['table'];
        Object.keys(s).forEach(key => {
            if (-1 === skipedKeys.indexOf(key)) {
                state[key] = s[key]
            }
        })
    },
    setFlagged(state, flagged) {
        state.table.flagged = flagged;
    },

    setInProject(state, status) {
        state.inProject = status;
    },

    setTags(state, payload) {
        state[payload.key] = payload.tags;
    },

    set(state,payload) {
        state[payload.key] = payload.value;
    }
}