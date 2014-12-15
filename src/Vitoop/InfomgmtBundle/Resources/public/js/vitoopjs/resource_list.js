/**
 * JavaScript GUI for Vitoop Module: resource_list.js
 */

resourceList = (function () {

    var query = $.deparam.querystring(), // may be empty object

        maxperpage = query.maxperpage, // may be undefined

        current_url = location.href,

        uifyPagination = function () {
            $('.vtp-pg-pane').addClass('ui-corner-all');
            //$('.vtp-pg-proximitybox').addClass('ui-state-default ui-corner-all');
            $('.vtp-pg-pane>div>span').not('.vtp-pg-proximitybox').addClass('ui-state-default ui-corner-all');
            $('.vtp-pg-proximitybox>span').not('[class^="vtp-pg-dots"]').addClass('ui-state-default ui-corner-all');
            $('.vtp-pg-disabled').addClass('ui-state-disabled');
            $('.vtp-pg-current').addClass('ui-state-active');
            $('.vtp-pg-start>*').addClass('ui-icon ui-icon-seek-start');
            $('.vtp-pg-prev>*').addClass('ui-icon ui-icon-seek-prev');
            $('.vtp-pg-next>*').addClass('ui-icon ui-icon-seek-next');
            $('.vtp-pg-end>*').addClass('ui-icon ui-icon-seek-end');
            $('#vtp-pg-maxperpage-form').addClass('ui-state-default ui-corner-all');
            $('#vtp-pg-maxperpage-input').addClass('ui-corner-all');
        },

        loadContent = function (e, secondSuccessFunc) {
            var url;
            var succ;
            if (typeof e === 'string') {
                // called manually by resource_detail:[next/previous]Resource for background page flipping
                // while the resource_detail dialog is in foreground
                url = e;
                succ = [ insertResourceList, secondSuccessFunc ];
            } else if (typeof e === 'undefined') {
                // called without arguments for a refresh
                url = current_url;
                succ = [insertResourceList];
            } else if ($(e.target).attr('id') === 'vtp-search-bytags-form') {
                // called by refresh (submit) button from tag search
                url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                e.preventDefault();
                succ = [insertResourceList];
            } else if ($(e.target).hasClass('vtp-uiaction-search-bytags-clear-taglistbox')) {
                // called after all tags are removed
                url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                succ = [insertResourceList];
            } else if ($(e.target).is('a')) {//@TODO This check isn't needed when handler is attached to a-elements
                //called by an handler
                url = $(e.target).attr('href');
                e.preventDefault();
                // decide reslink or homelink
                if ($(e.target).hasClass('vtp-resmenu-reslink')) {
                    if ($('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-homelink-home')) {
                        $('#vtp-search-bytags-form').show('fade', 'slow');
                        resourceSearch.maintainTaglistbox();
                    }
                    $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                    $(e.target).addClass('vtp-nav-active ui-state-active');
                    succ = [insertResourceList];
                } else if ($(e.target).hasClass('vtp-resmenu-homelink')) {
                    if ($(e.target).hasClass('vtp-resmenu-homelink-home') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                        $('#vtp-search-bytags-form').hide('explode', 'slow');
                        resourceSearch.maintainTaglistbox(true);
                    }
                    $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                    $(e.target).addClass('vtp-nav-active ui-state-active');
                    succ = [insertHomeContent];
                } else {
                    // @TODO e.g - a in vtp-nav is OK  - but links to other resources?
                    succ = [insertResourceList];
                }
            }
            if (typeof url !== 'undefined') {
                //in case of successful xhr call the current_url is updated
                succ.unshift(function () {
                    current_url = url;
                });
                $.ajax({
                    url: url,
                    success: succ,
                    error: function (jqXHR, textStatus, errorthrown) {
                        alert(textStatus + ' - ' + errorthrown);
                    },
                    dataType: 'html'
                });
            } else {
                console.log('The #APR#handler should be registered on a-elements only');
            }
        },

        insertResourceList = function (responseHtml, textStatus, jqXHR, $_form) {
            $('#vtp-content').empty().append(responseHtml);
            resourceDetail.tgl_ls();
            uifyPagination();
            //@TODO What should be maintained here???????????????????
            maintainResLinks();
        },

        insertHomeContent = function (responseHtml, textStatus, jqXHR, $_form) {
            $('#vtp-content').empty().append(responseHtml);
            resourceProject.init();
        },

        maintainResLinks = function (obj_partial_query) {
            if (typeof obj_partial_query === 'undefined') {
                return
            }
            //querystring portion will be deleted if set to empty array
            if (obj_partial_query.tagcnt === 0) {
                obj_partial_query.tagcnt = [];
            }
            $('.vtp-resmenu-reslink').each(function () {
                var href = $(this).attr('href');
                href = $.param.querystring(href, obj_partial_query, 0);
                $(this).attr('href', href)
            });
        },

        toggleFlag = function (e) {
            var flagged;
            // empty array 0 => querystring portion will be deleted
            $(e.target).prop('checked') ? flagged = 1 : flagged = [];
            maintainResLinks({'flagged': flagged});
        },

        init = function () {

            if (typeof maxperpage === 'undefined') {
                maxperpage = vitoop.maxperpage;
            }
            maintainResLinks({'maxperpage': maxperpage});

            /**********************************
             * Set Handlers
             **********************************/

            $('#vtp-content').on('submit', '#vtp-pg-maxperpage-form', function (e) {
                var url,
                    _maxperpage = $('#vtp-pg-maxperpage-input').val();
                if (_maxperpage !== maxperpage) {
                    url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                    url = $.param.querystring(url, {'_maxperpage': _maxperpage}, 0);
                    $.ajax({
                        url: url,
                        success: resourceList.insertResourceList,
                        dataType: 'html'
                    });
                    maintainResLinks({'maxperpage': _maxperpage});
                    maxperpage = _maxperpage;
                }
                e.preventDefault();
            });

            // #APR# Navgation resource links
            $('#vtp-nav').on('click', 'a', loadContent);

            // #APR# Pagination
            $('#vtp-content').on('click', '#vtp-resource-pagination a', loadContent);

            // flags
            $('.vtp-uiaction-toggle-flag').on('click', toggleFlag);

            /*********************************
             *  uify (buttons etc.)
             *********************************/

                // uify pagination if present
            !$('#vtp-resource-pagination').length || uifyPagination();

            $('#vtp-search-bytags-form-submit').button({
                icons: {
                    primary: "ui-icon-refresh"
                },
                text: false,
                label: "aktualisieren"
            });

            $('#vtp-user-loginform-login').button({
                icons: {
                    primary: "ui-icon-person"
                },
                text: false,
                label: "bei Vitoop anmelden"
            })

            $('#vtp-user-loginform-logout').button({
                icons: {
                    secondary: "ui-icon-power"
                }
            })

            $('#vtp-header-toggle-flag input[type=checkbox]').button({
                icons: {
                    primary: "ui-icon-flag"
                },
                text: false
            });
            $('#vtp-header-toggle-flag button').hide();

            $('#vtp-header-status a.vtp-uiaction-goto-invite').button({
                icons: {
                    primary: "ui-icon-mail-closed",
                    secondary: "ui-icon-pencil"
                },
                text: false
            });

            $('#vtp-header-status a.vtp-uiaction-goto-edithome').button({
                icons: {
                    primary: "ui-icon-home",
                    secondary: "ui-icon-pencil"
                },
                text: false
            });

            // Highlight Tablerows onmousover
            $('#vtp-content').on('mouseenter', 'tr', function (e) {
                $(this).addClass('vtp-hilight');
            });
            $('#vtp-content').on('mouseleave', 'tr', function (e) {
                $(this).removeClass('vtp-hilight');
            });

        };

    return {
        // call init() Document ready. on DOM must be fully loaded.
        maxperpage: maxperpage,
        current_url: current_url,
        init: init,
        // From other modules there is a semantical difference, so it named loadResourceListPage
        loadResourceListPage: loadContent,
        insertResourceList: insertResourceList,
        maintainResLinks: maintainResLinks
    };

}());
