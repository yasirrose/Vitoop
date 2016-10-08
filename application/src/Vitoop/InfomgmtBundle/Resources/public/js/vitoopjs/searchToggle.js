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
    }

    function deactivateButton() {
        if ($("#vtp-search-toggle").hasClass('vtp-toggler-active')) {
            $("#vtp-search-toggle").removeClass('vtp-toggler-active');
        }
    }

    function checkButtonState() {
        if (!state || 1 == localStorage.getItem('dt-search-blue') || '' != localStorage.getItem('dt-search')) {
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
