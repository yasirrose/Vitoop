searchToggler = (function() {

    var state;

    function loadSearchState () {
        var state1 = localStorage.getItem(
            'vitoop_s_hidden'+location.pathname
        );
        if (state1 == null) {
            state1 = true;
        }

        state = state1;
    }

    function saveSearchState() {
        localStorage.setItem(
            'vitoop_s_hidden'+location.pathname,
            state
        );
    }

    function getState() {
        return state;
    }

    function showHideSearch() {
        
        if (state) {
            $('#vtp-res-list .top-toolbar').hide(400);
        } else {
            $('#vtp-res-list .top-toolbar').show(400);
        }
    }

    function createButton() {
        var icon;
        if (state) {
            icon = 'ui-icon-arrowthick-1-s';
        } else {
            icon = 'ui-icon-arrowthick-1-n';
        }
        $('#vtp-search-toggle').button({
            icons: {
                primary: icon
            },
            text: false,
            label: "toggle"
        });
        $('#vtp-search-toggle').on('click', toggler);
    }

    function toggler() {
        state = !state;
        saveSearchState();
        $('#vtp-search-toggle').off().button("destroy");
        createButton();
        showHideSearch();
        checkButtonState();
    }

    function activateButton() {
        if (!$("#vtp-search-toggle").hasClass('vtp-toggler-active')) {
            $("#vtp-search-toggle").addClass('vtp-toggler-active');
        }
        if ($("#vtp-search-toggle").hasClass('ui-state-focus')) {
            $("#vtp-search-toggle").removeClass('ui-state-focus');
        }
    }

    function deactivateButton() {
        if ($("#vtp-search-toggle").hasClass('vtp-toggler-active')) {
            $("#vtp-search-toggle").removeClass('vtp-toggler-active');
        }
        if ($("#vtp-search-toggle").hasClass('ui-state-focus')) {
            $("#vtp-search-toggle").removeClass('ui-state-focus');
        }
    }

    function checkButtonState() {
        var dateRangeFilter = new DateRangeFilter();
        var isBlueFilter = new IsBlueFilter();

        if (!state || isBlueFilter.isBlue() || '' != localStorage.getItem('dt-search') || !dateRangeFilter.isEmpty()) {
            activateButton();
            return;
        }
        deactivateButton();
    }

    function init() {
        loadSearchState();
        createButton();
        showHideSearch();
    }

    return {
        init: init,
        getState: getState,
        checkButtonState: checkButtonState
    };
}) ();
