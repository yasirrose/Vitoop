class SearchToggler {
    constructor(datatable) {
        this.state = false;
        this.storage = new DataStorage();
        this.storageKey = 'vitoop_s_hidden';
        this.searchToolbar = '#vtp-res-list .top-toolbar';
        this.toggleButtonId = '#vtp-search-toggle';
        this.rowsPerPage = new RowPerPageSelect(datatable);

        this.loadSearchState();
        this.createButton();
        this.showHideSearch(true);
    }

    loadSearchState () {
        let state1 = this.storage.getAlphaNumValue(this.storageKey+location.pathname, null);
        if (state1 == null) {
            state1 = true;
        }

        this.state = state1;
    }

    saveSearchState() {
        this.storage.setItem(this.storageKey+location.pathname, this.state);
    }

    getState() {
        return this.state;
    }

    showHideSearch(init) {
        if (this.state) {
            $(this.searchToolbar).hide(400);
            if (!init) {
                this.rowsPerPage.increase();
            }
            return false;
        }

        $(this.searchToolbar).show(400);
        if (!init) {
            this.rowsPerPage.decrease();
        }
    }

    createButton() {
        let icon;
        let self = this;
        if (this.state) {
            icon = 'ui-icon-arrowthick-1-s';
        } else {
            icon = 'ui-icon-arrowthick-1-n';
        }
        $(this.toggleButtonId).button({
            icons: {
                primary: icon
            },
            text: false,
            label: "Second Search"
        });
        $(this.toggleButtonId).off().on('click', function () {
            self.state = !self.state;
            self.saveSearchState();
            $(self.toggleButtonId).off().button("destroy");
            self.createButton();
            self.showHideSearch(false);
            self.checkButtonState();
        });
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

        if (!this.state || isBlueFilter.isBlue() || isReadFilter.isRead() || '' != this.storage.getAlphaNumValue('dt-search') || !dateRangeFilter.isEmpty() || !artFilter.isEmpty()) {
            this.activateButton();
            return;
        }
        this.deactivateButton();
    }
}