class SecondSearch {
    constructor(resType) {
        this.resType = resType;
        this.toolbarId = 'div.top-toolbar';

        this.searchToggler = new SearchToggler();
        this.isBlueFilter = new IsBlueFilter();
        this.isReadFilter = new IsReadFilter();
        this.dateRange = new DateRangeFilter();
        this.artFilter = new ArtFilter();
        this.datastorage = new DataStorage();
    }

    init() {
        let self = this;
        self.searchToggler.checkButtonState();
    }

    buildSearchParameters (data) {
        data.isUserHook = this.isBlueFilter.getIsBlueValue();
        data.isUserRead = this.isReadFilter.getIsReadValue();
        if (SecondSearch.resType == 'pdf' || this.resType == 'teli') {
            data.dateFrom = this.dateRange.getDateFilterFrom();
            data.dateTo = this.dateRange.getDateFilterTo();
        }
        if (this.resType == 'book') {
            data.art = this.artFilter.currentValue;
        }

        return data;
    }

    getDomPrefix() {
        return (!this.searchToggler.getState())?('<"'):('<"ui-helper-hidden ');
    }

    getSearchTogglerState() {
        return this.searchToggler.getState();
    }

    clearFilters() {
        this.datastorage.setItem('dt-search', '');
        this.isBlueFilter.clear();
        this.isReadFilter.clear($('#is-read-filter'));
        this.searchToggler.checkButtonState();
        this.dateRange.clearWithDOM();
        this.artFilter.clear();
    }
}