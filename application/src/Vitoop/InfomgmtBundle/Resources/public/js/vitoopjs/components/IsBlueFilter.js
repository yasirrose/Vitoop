import DataStorage from '../datastorage';

export default class IsBlueFilter {
    constructor() {
        this.storage = new DataStorage();
        this.searchBlueStorageKey = 'dt-search-blue';
    }

    isBlue() {
        return (0 != this.getIsBlueValue());
    }

    getIsBlueValue() {
        return this.storage.getAlphaNumValue(this.searchBlueStorageKey, 0);
    }

    setFilterValue(value) {
        this.storage.setItem(this.searchBlueStorageKey, value);
    }

    clear() {
        this.storage.setItem(this.searchBlueStorageKey, 0);
    }

    getDOMElement () {
        let blueBox = document.createElement('div');
        blueBox.id = "search_blue_box";
        blueBox.innerHTML = '<input id="search_blue" type="checkbox" value="1" name="search_blue"/>'

        return blueBox;
    }
}
