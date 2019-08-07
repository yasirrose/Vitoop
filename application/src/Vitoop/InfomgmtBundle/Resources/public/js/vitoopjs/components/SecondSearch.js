import DateRangeFilter from './dateRangeFilter';

export default class SecondSearch {
    constructor() {
        this.toolbarId = '#vtp-second-search';

        this.dateRange = new DateRangeFilter();
    }
}