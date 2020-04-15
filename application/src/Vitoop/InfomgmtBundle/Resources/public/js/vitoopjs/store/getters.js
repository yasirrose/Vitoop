export default {
    isAdmin(state) {
        return state.admin;
    },
    getListFontSize(state, getters) {
        let currentFontSize = 14;
        currentFontSize -= state.user ? state.user.decrease_font_size : 0;
        return currentFontSize;
    },
    getTableRowNumber(state, getters) {
        let originalPageNumber = state.table.rowNumber ? state.table.rowNumber : 12;
        let offset = 0;
        // if (state.secondSearch.show) offset++;
        // if (state.tagList.show) offset++;
        // if (state.resource.id !== null) offset++;
        return originalPageNumber - offset;
    },
    getTableData(state) {
        return state.table.data;
    },
    getResource: (state) => (key) => {
        return state.resource[key];
    },
    getResourceType(state) {
        return state.resource.type !== 'all' ?
            state.resource.type : 'resources';
    },
    getResourceId(state) {
        return state.resource.id;
    },
    getHelp: (state) => (key) => {
        return state.help[key];
    },
    getFlagged(state) {
        return state.table.flagged;
    },
    getInProject(state) {
        return state.inProject;
    },
    get: (state) => (key) => {
        return state[key];
    },
    getTagListShow(state) {
        return state.tagList.show;
    }
}
