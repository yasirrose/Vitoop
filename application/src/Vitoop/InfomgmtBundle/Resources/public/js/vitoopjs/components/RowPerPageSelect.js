export default class RowPerPageSelect {
    constructor() {
        this.selectId = '.dataTables_length select';
        this.defaultRowNum = 12;
    }

    getPageLength() {
        return vitoopState.getters.getTableRowNumber;
    }

    updatePageLength(newLength) {
        vitoopState.commit('updateTableRowNumber', newLength);
    }

    isVisibleElement(element) {
        return 'block' === (element.currentStyle ? element.currentStyle.display : getComputedStyle(element, null).display);
    }

    reloadSelect() {
        $(this.selectId + ' option[value="'+parseInt(vitoopState.state.table.rowNumber)+'"]').prop('selected', true);
        $(this.selectId).selectmenu('refresh').trigger('change');
    }
}
