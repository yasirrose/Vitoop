function IsReadFilter() {
    this.storage = new DataStorage();
    this.buttonBehavior = new ReadableButtonBehavior();
}

IsReadFilter.prototype.constructor = IsReadFilter;
IsReadFilter.prototype.searchReadStorageKey = 'dt-search-read';

IsReadFilter.prototype.isRead = function () {
    return (0 != this.getIsReadValue());
};

IsReadFilter.prototype.getIsReadValue = function () {
    return this.storage.getAlphaNumValue(this.searchReadStorageKey, 0);
};

IsReadFilter.prototype.setFilterValue = function (value) {
    this.storage.setItem(this.searchReadStorageKey, value);
};

IsReadFilter.prototype.clear = function (button) {
    this.storage.setItem(this.searchReadStorageKey, 0);
    this.buttonBehavior.makeAsUnread(button);
};

IsReadFilter.prototype.toggleButton = function (button) {
    this.setFilterValue(this.buttonBehavior.checkButtonState(button));
};

IsReadFilter.prototype.renderButton = function () {
    if (this.isRead()) {
        return '<button id="is-read-filter" class="ui-button ui-state-active ui-widget ui-corner-all vtp-button">gelesen :-)</button>';
    }

    return '<button id="is-read-filter" class="ui-button ui-state-default ui-widget ui-corner-all vtp-button">gelesen</button>';
};