import DataStorage from '../datastorage';

export default class DateRangeFilter {
    constructor() {
        this.storage = new DataStorage();
        this.dateFromStorageKey = 'dt-search-date_from';
        this.dateToStorageKey = 'dt-search-date_to';
        this.dateFromId = '#search_date_from';
        this.dateToId = '#search_date_to';
        this.filterButtonId = '#vtp_search_date';
    }

    updateRangeFromDOM() {
        this.storage.setItem(this.dateFromStorageKey, $(this.dateFromId).val());
        this.storage.setItem(this.dateToStorageKey, $(this.dateToId).val());
    }


    checkButtonState() {
        if (this.isNeedToSave()) {
            $(this.filterButtonId).addClass('ui-state-active');
        } else {
            $(this.filterButtonId).removeClass('ui-state-active');
        }
    }

    getDateFilterFrom() {
        return this.storage.getAlphaNumValue(this.dateFromStorageKey, '');
    }

    getDateFilterTo() {
        return this.storage.getAlphaNumValue(this.dateToStorageKey, '');
    }

    isEmpty() {
        return (this.getDateFilterTo() == '') && (this.getDateFilterFrom() == '');
    }

    isNeedToSave() {
        return ($(this.dateFromId).val() !== this.storage.getAlphaNumValue(this.dateFromStorageKey, '')) ||
            ($(this.dateToId).val() !== this.storage.getAlphaNumValue(this.dateToStorageKey, ''))
    }

    getDOMElement () {
        let dateRange = document.createElement('div');
        dateRange.id = "search_date_range";
        dateRange.innerHTML = '<label><input id="search_date_from" class="range-filter" type="text" value="" name="search_date_from" placeholder="Datum von"/>' +
            '<input id="search_date_to" class="range-filter" type="text" value="" name="search_date_to" placeholder="Datum bis"/>' +
            '<button class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only" id="vtp_search_date"><span class="ui-icon ui-icon-search"></span><span class="ui-button-text"></span></button></label>';

        return dateRange;
    }
}

