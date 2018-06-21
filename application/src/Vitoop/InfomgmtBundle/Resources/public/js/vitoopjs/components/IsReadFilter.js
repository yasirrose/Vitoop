import DataStorage from '../datastorage';
import ReadableButtonBehavior from './ReadableButtonBehavior';

export default class IsReadFilter {
    constructor() {
        this.searchReadStorageKey = 'dt-search-read';
        this.storage = new DataStorage();
        this.buttonBehavior = new ReadableButtonBehavior();
    }

    isRead() {
        return (0 != this.getIsReadValue());
    }

    getIsReadValue() {
        return this.storage.getAlphaNumValue(this.searchReadStorageKey, 0);
    }

    setFilterValue(value) {
        this.storage.setItem(this.searchReadStorageKey, value);
    }

    clear(button) {
        this.storage.setItem(this.searchReadStorageKey, 0);
        this.buttonBehavior.makeAsUnread(button);
    }

    toggleButton(button) {
        this.setFilterValue(this.buttonBehavior.checkButtonState(button));
    }

    renderButton() {
        if (this.isRead()) {
            return '<button id="is-read-filter" class="ui-button ui-state-active ui-widget ui-corner-all vtp-button">gelesen :-)</button>';
        }

        return '<button id="is-read-filter" class="ui-button ui-state-default ui-widget ui-corner-all vtp-button">gelesen</button>';
    }
}
