import DataStorage from './datastorage';
import RowPerPageSelect from './components/RowPerPageSelect';
import IsBlueFilter from './components/IsBlueFilter';
import IsReadFilter from './components/IsReadFilter';
import ArtFilter from './components/ArtFilter';
import DateRangeFilter from './components/dateRangeFilter';

export default class SearchToggler {
    constructor() {
        this.state = false;
        this.storage = new DataStorage();
        this.storageKey = 'vitoop_s_hidden';
        this.searchToolbar = '#vtp-res-list .top-toolbar';
        this.toggleButtonId = '#vtp-search-toggle';
        this.rowsPerPage = new RowPerPageSelect();

        this.loadSearchState();
        this.createButton();
    }

    loadSearchState () {
        this.state = this.storage.getAlphaNumValue(this.storageKey, true);
    }

    saveSearchState() {
        this.storage.setItem(this.storageKey, this.state);
    }

    getState() {
        return this.state;
    }

    showHideSearch() {
        let self = this;
        if (this.state) {
            $(this.searchToolbar).hide(400, function () {
                self.rowsPerPage.checkDOMState();
            });
            return false;
        }

        $(this.searchToolbar).show(400, function () {
            self.rowsPerPage.checkDOMState();
        });
    }

    createButton() {
        let self = this;
        $(this.toggleButtonId).button({
            icons: {
                primary: self.getButtonIcon()
            },
            text: false,
            label: "Second Search"
        });
        $(this.toggleButtonId).off().on('click', function (e) {
            e.preventDefault();
            self.state = !self.state;
            self.saveSearchState();

            $(self.toggleButtonId).button("option", {
                icons: { primary: self.getButtonIcon()}
            });

            // self.createButton();
          //  self.showHideSearch();
            self.checkButtonState();
        });
    }

    getButtonIcon() {
        if (this.state) {
            return 'ui-icon-arrowthick-1-s';
        }

        return 'ui-icon-arrowthick-1-n';
    }

    activateButton() {
        if (!$(this.toggleButtonId).hasClass('vtp-toggler-active')) {
            $(this.toggleButtonId).addClass('vtp-toggler-active');
        }
        if ($(this.toggleButtonId).hasClass('ui-state-focus')) {
            $(this.toggleButtonId).removeClass('ui-state-focus');
        }
    }

    deactivateButton() {
        if ($(this.toggleButtonId).hasClass('vtp-toggler-active')) {
            $(this.toggleButtonId).removeClass('vtp-toggler-active');
        }
        if ($(this.toggleButtonId).hasClass('ui-state-focus')) {
            $(this.toggleButtonId).removeClass('ui-state-focus');
        }
    }

    checkButtonState() {
        let dateRangeFilter = new DateRangeFilter();
        let isBlueFilter = new IsBlueFilter();
        let isReadFilter = new IsReadFilter();
        let artFilter = new ArtFilter();

        this.showHideSearch();
        if (!this.state || isBlueFilter.isBlue() || isReadFilter.isRead() || '' != this.storage.getAlphaNumValue('dt-search') || !dateRangeFilter.isEmpty() || !artFilter.isEmpty()) {
            this.activateButton();
            return;
        }
        this.deactivateButton();
    }
}