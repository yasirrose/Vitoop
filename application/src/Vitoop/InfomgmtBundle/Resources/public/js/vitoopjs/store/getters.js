export default {
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
}