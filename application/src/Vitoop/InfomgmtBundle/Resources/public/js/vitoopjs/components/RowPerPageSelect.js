import DataStorage from '../datastorage';

export default class RowPerPageSelect {
    constructor() {
        this.datastorage = new DataStorage();
        this.datastorageKey = 'dt-page-length';
        this.datastorageOriginKey = 'dt-page-origin-length';
        this.selectId = '.dataTables_length select';
        this.defaultRowNum = 7;
    }

    getPageLength() {
        return this.datastorage.getAlphaNumValue(this.datastorageKey, this.defaultRowNum);
    }

    getOriginPageLength() {
        return this.datastorage.getAlphaNumValue(this.datastorageOriginKey, this.getPageLength());
    }

    updatePageLength(newLength) {
        this.datastorage.setItem(this.datastorageKey, newLength);
        this.datastorage.setItem(this.datastorageOriginKey, newLength);
    }

    checkDOMState() {
        let offset = 0;
        let originPageLength = this.getOriginPageLength();
        let elements = new Array();
        let tagList = document.getElementById('vtp-search-bytags-taglistbox');
        let secondSearch = document.getElementsByClassName('top-toolbar');
        if (tagList) {
            elements.push(tagList);
        }
        if (secondSearch.length > 0) {
            elements.push(secondSearch.item(0));
        }

        for (let i = 0; i<elements.length; i++) {
            let element = elements[i];
            if (this.isVisibleElement(element)) {
                offset++;
            }
        }
        this.datastorage.setItem(this.datastorageKey, (originPageLength - offset));
        this.reloadSelect();
    }

    isVisibleElement(element) {
        return 'block' === (element.currentStyle ? element.currentStyle.display : getComputedStyle(element, null).display);
    }

    reloadSelect() {
        $(this.selectId + ' option[value="'+parseInt(this.getPageLength())+'"]').prop('selected', true);
        $(this.selectId).selectmenu('refresh').trigger('change');
    }
}