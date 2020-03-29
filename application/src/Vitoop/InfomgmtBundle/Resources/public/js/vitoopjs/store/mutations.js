import initialState from './state'

export default {
    setHelp(state, payload) {
        state.help[payload.key] = payload.value;
    },
    setAdmin(state, status) {
        state.admin = status;
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

    // Table
    setTablePage(state, page) {
        state.table.page = page;
    },
    updateTableRowNumber(state, value) {
        state.table.rowNumber = value;
    },
    updateTableData(state, value) {
        state.table.data = value;
    },
    updateTableBlinker(state, blinkerStatus) {
        state.table.rowNumberBlinker = blinkerStatus;
    },
    // Coefs
    updateCoef(state, payload) {
        state.table.data.forEach(res => {
            if (+res.coefId === +payload.coefId) {
                res.coef = payload.value;
            }
        })
    },
    addCoefToSave({coefsToSave},coefObj) {
        const coefIndex = _.findIndex(coefsToSave, {coefId: coefObj.coefId});
        coefIndex > -1 ?
            coefsToSave.splice(coefIndex, 1, coefObj) : coefsToSave.push(coefObj);
    },

    updateTagListShowing(state, value) {
        state.tagList.show = value
    },
    updateSecondSearch: function (state, value) {
        state.secondSearch.searchString = value;
    },
    updateSearchToggler(state,status) {
        state.searchToggler.isOpened = status;
        state.secondSearch.show = status;
    },
    updateBlueFilter: function (state, value) {
        state.secondSearch.isBlueFilter = value;
    },
    updateReadFilter: function (state, value) {
        state.secondSearch.isReadFilter = value;
    },
    updateArtFilter: function (state, value) {
        state.secondSearch.artFilter = value;
    },
    updateDateFrom: function (state, value) {
        state.secondSearch.dateFrom = value;
    },
    updateDateTo: function (state, value) {
        state.secondSearch.dateTo = value;
    },
    checkIsNotEmptySearchToggle: function (state) {
        state.searchToggler.isNotEmpty =
            (1 === state.secondSearch.isBlueFilter) ||
            (1 === this.state.secondSearch.isReadFilter) ||
            '' !== state.secondSearch.artFilter ||
            '' !== state.secondSearch.searchString ||
            '' !== state.secondSearch.dateFrom ||
            '' !== state.secondSearch.dateTo;
        this.commit('updateSearchToggler', state.searchToggler.isNotEmpty);
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
        Object.keys(state.resource).forEach(item => {
            state.resource[item] = null;
        })
    },
    resetSecondSearch: function(state) {
        const secondSearch = initialState.secondSearch;
        Object.keys(secondSearch).forEach(key => {
            state.secondSearch[key] = secondSearch[key]
        });
        this.commit('checkIsNotEmptySearchToggle');
    },
    resetSecondSearchValues(state) {
        const secondSearch = initialState.secondSearch;
        Object.keys(secondSearch).forEach(key => {
            if (key !== 'show') {
                state.secondSearch[key] = secondSearch[key];
            }
        });
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
    },

    // Conversation
    isForRelatedUser(state,payload) {
        state.conversationInstance.conversation.conversation_data.is_for_related_users = payload;
    },
    resetConversation(state) {
        state.conversationInstance = null;
        state.conversationEditMode = false;
    }
}
