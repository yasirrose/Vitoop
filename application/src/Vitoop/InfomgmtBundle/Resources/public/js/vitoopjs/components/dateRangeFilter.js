function DateRangeFilter() {
    this.storage = new DataStorage();
}

DateRangeFilter.prototype.constructor = DateRangeFilter;
DateRangeFilter.prototype.dateFromStorageKey = 'dt-search-date_from';
DateRangeFilter.prototype.dateToStorageKey = 'dt-search-date_to';
DateRangeFilter.prototype.dateFromId = '#search_date_from';
DateRangeFilter.prototype.dateToId = '#search_date_to';
DateRangeFilter.prototype.filterButtonId = '#vtp_search_date';

DateRangeFilter.prototype.updateRangeFromDOM = function () {
    this.storage.setItem(this.dateFromStorageKey, $(this.dateFromId).val());
    this.storage.setItem(this.dateToStorageKey, $(this.dateToId).val());
};

DateRangeFilter.prototype.updateDOMFromRange = function () {
    $(this.dateFromId).val(this.getDateFilterFrom());
    $(this.dateToId).val(this.getDateFilterTo());
};

DateRangeFilter.prototype.checkButtonState = function () {
    if (this.isNeedToSave()) {
        $(this.filterButtonId).addClass('ui-state-active');
    } else {
        $(this.filterButtonId).removeClass('ui-state-active');
    }
};

DateRangeFilter.prototype.getDateFilterFrom = function () {
    return this.storage.getAlphaNumValue(this.dateFromStorageKey, '');
};

DateRangeFilter.prototype.getDateFilterTo = function () {
    return this.storage.getAlphaNumValue(this.dateToStorageKey, '');
};

DateRangeFilter.prototype.clear = function () {
    this.storage.setItem(this.dateFromStorageKey, '');
    this.storage.setItem(this.dateToStorageKey, '');
};

DateRangeFilter.prototype.clearWithDOM = function () {
    this.clear();
    this.updateDOMFromRange();
};

DateRangeFilter.prototype.isEmpty = function () {
    return (this.getDateFilterTo() == '') && (this.getDateFilterFrom() == '');
};

DateRangeFilter.prototype.isNeedToSave = function () {
    return ($(this.dateFromId).val() !== this.storage.getAlphaNumValue(this.dateFromStorageKey, '')) ||
        ($(this.dateToId).val() !== this.storage.getAlphaNumValue(this.dateToStorageKey, ''))
};

