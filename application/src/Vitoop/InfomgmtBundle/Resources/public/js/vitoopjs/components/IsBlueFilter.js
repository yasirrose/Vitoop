function IsBlueFilter() {
    this.storage = new DataStorage();
}

IsBlueFilter.prototype.constructor = IsBlueFilter;
IsBlueFilter.prototype.searchBlueStorageKey = 'dt-search-blue';

IsBlueFilter.prototype.isBlue = function () {
    return (0 !== this.getIsBlueValue());
};

IsBlueFilter.prototype.getIsBlueValue = function () {
    return this.storage.getAlphaNumValue(this.searchBlueStorageKey, 0);
};

IsBlueFilter.prototype.setFilterValue = function (value) {
    this.storage.setItem(this.searchBlueStorageKey, value);
};

IsBlueFilter.prototype.clear = function () {
    this.storage.setItem(this.searchBlueStorageKey, 0);
};