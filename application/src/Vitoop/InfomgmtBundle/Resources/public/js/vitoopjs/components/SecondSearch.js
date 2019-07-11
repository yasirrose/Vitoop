import DateRangeFilter from './dateRangeFilter';
import DataStorage from '../datastorage';

export default class SecondSearch {
    constructor() {
        this.toolbarId = '#vtp-second-search';

        this.dateRange = new DateRangeFilter();
        this.datastorage = new DataStorage();
    }

    clearFilters() {
        vitoopState.commit('resetSecondSearch');
        this.dateRange.clearWithDOM();
    }
}