import DataStorage from '../datastorage';

export default class RowPerPageSelect {
    constructor() {
        this.datastorage = new DataStorage();
        this.datastorageKey = 'dt-page-length';
        this.selectId = '.dataTables_length select';
    }

    getPageLength() {
        return this.datastorage.getAlphaNumValue(this.datastorageKey, 7);
    }

    updatePageLength(newLength) {
        this.datastorage.setItem(this.datastorageKey, newLength);
    }

    increase() {
        this.updatePageLength(parseInt(this.getPageLength()) + 1);
        this.reloadSelect();
    }

    decrease() {
        this.updatePageLength(parseInt(this.getPageLength()) - 1);
        this.reloadSelect();
    }

    reloadSelect() {
        $(this.selectId + ' option[value="'+parseInt(this.getPageLength())+'"]').prop('selected', true);
        $(this.selectId).selectmenu('refresh').trigger('change');
    }
}