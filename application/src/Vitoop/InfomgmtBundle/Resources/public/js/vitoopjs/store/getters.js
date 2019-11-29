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
        let originalPageNumber = state.table.rowNumber ? state.table.rowNumber : 7;
        let offset = 0;
        if (true === state.secondSearch.show) {
            offset++;
        }
        if (true === state.tagList.show) {
            offset++;
        }

        return originalPageNumber - offset;
    },
    getResource: (state) => (key) => {
        return state.resource[key];
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
    }
}