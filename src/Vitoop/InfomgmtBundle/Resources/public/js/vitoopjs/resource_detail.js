/**
 * JavaScript GUI for Vitoop Module: resource_detail.js
 */

resourceDetail = (function () {

    var tab_loaded = [ 0, 0, 0, 0 ],

        tab_name = [ 'quickview', 'remark', 'comments', 'assignments' ],

        res_type = '',

        res_id = 0, prev_id = 0, next_id = 0,

        tr_res = null,

        arr_tr_res_attr_id = {},

        refresh_list = false,

        uifyContainer = function (container_name) {
            var action_icon_map;

            if ('resource-buttons' == container_name) {
                // jQueryUI-ify the received buttons
                action_icon_map = {
                    "previous": "ui-icon-circle-triangle-w",
                    "next": "ui-icon-circle-triangle-e",
                    "save": "ui-icon-disk",
                    "delete": "ui-icon-trash",
                    "new": "ui-icon-document",
                    "blame": "ui-icon-alert"
                };
                $.each(action_icon_map, function (action, icon) {
                    $('button.vtp-uiaction-detail-' + action).button({
                        icons: {
                            primary: icon
                        },
                        label: action,
                        text: false
                    });
                });
                // @TODO Handler
                if (-1 === prev_id) {
                    $('.vtp-uiaction-detail-previous').button('option', 'disabled', true);
                } else {
                    $('.vtp-uiaction-detail-previous').on('click', previousResource);
                }
                if (-1 === next_id) {
                    $('.vtp-uiaction-detail-next').button('option', 'disabled', true);
                } else {
                    $('.vtp-uiaction-detail-next').on('click', nextResource);
                }
                $('.vtp-uiaction-detail-save').on('click', function () {
                    $('#resource-data input[type=submit]').trigger('submit');
                });
                $('.vtp-uiaction-detail-delete').on('click', deleteResource);
                $('.vtp-uiaction-detail-new').on('click', newResource);
                $('.vtp-uiaction-detail-blame').on('click', blameResource);
            }
            /*************************************************************************
             * UIfy: data
             ************************************************************************/
            if ('resource-data' == container_name) {

                $('#' + container_name + ' .vtp-uiaction-open-url').button({
                    icons: {
                        primary: "ui-icon-extlink"
                    },
                    text: false
                });

                $('#' + container_name + ' #link_is_hp').button({
                    icons: {
                        primary: "ui-icon-home"
                    },
                    text: false
                });

                $('#' + container_name + ' .vtp-uiaction-open-mail').button({
                    icons: {
                        primary: "ui-icon-mail-closed"
                    },
                    text: false
                });

                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right bottom',
                    at: 'left top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: rating
             ************************************************************************/
            if ('resource-rating' == container_name) {
                var flag_initslider = true;
                var rate_state = 1;
                var cnt_rating_infobox = 1;
                // Move the rating-infobox to the header, but remove the old one if
                // exists
                $('#vtp-rating-infobox-li').remove();
                $('<li id="vtp-rating-infobox-li"></li>').insertAfter('#vtp-res-dialog-tabs>ul>li:last').append(
                    $('#vtp-rating-infobox-wrapper'));
                // left/right-buttons
                cnt_rating_infobox = $('.vtp-rating-infobox').length;
                if (cnt_rating_infobox == 1) {
                    // if there is only one, no handlers must be set and the right-arrow
                    // must be disabled
                    $('#vtp-rating-infobox-right').addClass('ui-state-disabled')
                } else {
                    $('#vtp-rating-infobox-right').on('click', function () {
                        if (!$(this).hasClass('ui-state-disabled')) {
                            if (rate_state == 1) {
                                $('#vtp-rating-infobox-left').removeClass('ui-state-disabled');
                            }
                            $('#vtp-rating-infobox-' + rate_state).hide('blind', {
                                'direction': 'left'
                            }, 1000);
                            rate_state += 1;
                            if (rate_state == cnt_rating_infobox) {
                                $('#vtp-rating-infobox-right').addClass('ui-state-disabled');
                            }
                        }
                    });
                    $('#vtp-rating-infobox-left').on('click', function () {
                        if (!$(this).hasClass('ui-state-disabled')) {
                            if (rate_state == cnt_rating_infobox) {
                                $('#vtp-rating-infobox-right').removeClass('ui-state-disabled');
                            }
                            $('#vtp-rating-infobox-' + (rate_state - 1)).show('blind', {
                                'direction': 'left'
                            }, 1000);
                            rate_state -= 1;
                            if (rate_state == 1) {
                                $('#vtp-rating-infobox-left').addClass('ui-state-disabled');
                            }
                        }
                    });
                }
                $('#vtp-rating-slider-slider').slider({
                    value: -9999,
                    min: -5,
                    max: 5,
                    step: 1,
                    orientation: 'horizontal',
                    slide: function (event, ui) {
                        // $("#rating").attr("src",
                        // "/bundles/vitoopinfomgmt/img/rating/wertung_" + (ui.value + 6)
                        // + ".gif");
                        // Due to the glitch, that you cannot trigger the slide event
                        // defined here it must be registered by $.on('slide')
                    },
                    change: function (event, ui) {
                        if (flag_initslider) {
                            $(ui.handle).css({
                                "height": "1.5em",
                                "width": "1.5em",
                                "line-height": "1.5em",
                                "text-align": "center",
                                "text-decoration": "none"
                            });
                            flag_initslider = false;
                        }
                        $(this).trigger('slide', ui);
                    }// attention: the following on is chained after the slider()-call
                }).on("slide", function (event, ui) {
                    $('#rating_mark').val(ui.value);
                    $(ui.handle).text(ui.value);
                });
                // connect the #rating_mark-dropdown with slider and trigger it to init
                // the slider
                $('#rating_mark').on('change',function () {
                    $('#vtp-rating-slider-slider').slider({
                        'value': $(this).val()
                    });
                }).triggerHandler('change');

                // event for show/hide the ratingpanel
                $('.vtp-uication-rating-showratingpanel').on('click', function () {
                    if (0 === $('#vtp-res-dialog-tabs').tabs('option', 'active')) {
                        $('#vtp-rating-panel').toggle('blind', 'slow');
                    } else {
                        $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
                        $('#vtp-rating-panel').show('blind', 'slow');
                    }
                });
                // and finally the toggle button for slider or dropdown
                $('.vtp-uication-rating-toggleratingpanel').button({
                    icons: {
                        primary: 'ui-icon-arrowthick-2-n-s'
                    },
                    text: false,
                    label: 'Slider oder Dropdown?'
                });
                $('.vtp-uication-rating-toggleratingpanel').on('click', function () {
                    $('#vtp-rating-slider').toggle('blind', 'slow');
                    $('#vtp-rating-dropdown').toggle('blind', 'slow');
                });
                // Style Button and Place Info
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-star"
                    }
                });
                // Here the info is not in the usual box, it is in #vtp-rating-infobox-wrapper which is the anchor
                !$('#vtp-rating-infobox-wrapper .vtp-uiinfo-info').length || $('#vtp-rating-infobox-wrapper .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'left bottom',
                    of: '#vtp-rating-infobox-wrapper.vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }

            /*************************************************************************
             * UIfy: tag
             ************************************************************************/
            if ('resource-tag' == container_name) {
                $('#tag_text').autocomplete({
                    source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + res_id,
                    minLength: 2,
                    appendTo: 'body'
                });
                $('.vtp-uiaction-tag-showown').button({
                    icons: {
                        primary: "ui-icon-lightbulb"
                    },
                    text: false
                });
                $('.vtp-uiaction-tag-showown').on('change', function () {
                    $('#vtp-tagbox .vtp-owntag').toggleClass('vtp-owntag-hilight');
                });
                $('.vtp-uiaction-tag-showown:checked').triggerHandler('change');
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-tag"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'left bottom',
                    at: 'right top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }

            /*************************************************************************
             * UIfy: remark
             ************************************************************************/
            if ('resource-remark' == container_name) {
                // TinyMCE
                tinymce.init({
                    selector: 'textarea#remark_text',
                    height: 300,
                    plugins: 'textcolor link',
                    menubar: false,
                    style_formats: [
                        {title: 'p', block: 'p'},
                        {title: 'h1', block: 'h1'},
                        {title: 'h2', block: 'h2'},
                        {title: 'h3', block: 'h3'},
                        {title: 'h4', block: 'h4'},
                        {title: 'h5', block: 'h5'},
                        {title: 'h6', block: 'h6'}
                    ],
                    toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink'
                });
                // Toggle lock/unlock-button initialization
                var $btn_lock_remark = $('#' + container_name + ' input:checkbox');

                $btn_lock_remark.filter(':not(:checked)').button({
                    icons: {
                        primary: "ui-icon-unlocked"
                    },
                    text: false,
                    label: "unlocked"
                });
                $btn_lock_remark.filter(':checked').button({
                    icons: {
                        primary: "ui-icon-locked"
                    },
                    text: false,
                    label: "locked"
                });
                // Toggle lock/unlock-button eventhandler
                $btn_lock_remark.on('click', function () {
                    $(this).filter(':checked').button("option", {
                        icons: {
                            primary: "ui-icon-locked"
                        },
                        label: 'locked'
                    }).addClass('vtp-button');
                    $(this).filter(':not(:checked)').button("option", {
                        icons: {
                            primary: "ui-icon-unlocked"
                        },
                        label: 'unlocked'
                    });
                });
                // submitbutton and fadein info
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right bottom',
                    at: 'left top',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }

            /*************************************************************************
             * UIfy: comments
             ************************************************************************/
            if ('resource-comments' == container_name) {
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-pencil"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'left bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: project
             *****************************************************************/
            if ('resource-project' == container_name) {
                $('#project_name_name').autocomplete({
                    source: vitoop.baseUrl + (['prj', 'suggest'].join('/')),
                    minLength: 2,
                    appendTo: 'body'
                });
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'right bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: lexicon
             ************************************************************************/
            if ('resource-lexicon' == container_name) {
                $('#lexicon_name_name').autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: 'http://de.wikipedia.org/w/api.php',
                            data: {
                                format: 'json',
                                action: 'opensearch',
                                limit: 10,
                                namespace: 0,
                                search: request.term
                            },
                            dataType: 'jsonp',
                            cache: true,
                            context: $('#lexicon'),
                            success: function (data) {
                                response(data[1]);
                            }
                        });
                    },
                    minLength: 2,
                    appendTo: 'body'
                });
                $('#' + container_name + ' input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });
                !$('#' + container_name + ' .vtp-uiinfo-info').length || $('#' + container_name + ' .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'right bottom',
                    of: '#' + container_name + ' .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);
            }
            /*************************************************************************
             * UIfy: flaginfo
             ************************************************************************/
            if ('resource-flags' == container_name) {


                if ($('#vtp-res-flag-info').length) {

                    $('.vtp-uiaction-detail-delete').button('option', 'disabled', true);
                    $('.vtp-uiaction-detail-blame').button('option', 'disabled', true);

                    $('#vtp-res-flag-buttons button').button();
                }
                $('#resource-flags').show('blind', 'fast');
            }

            /*************************************************************************
             * UIfy: END
             ************************************************************************/
        },

        loadTab = function (event, ui) {
            var tab_nr;
            var url;

            // Don't touch this. Works for three different calls with handcrafted parameters event and ui!
            if (typeof ui.newTab === 'undefined') {
                tab_nr = ui;
            } else if (ui.newTab) {
                tab_nr = ui.newTab.index();
            } else {
                console.log('No TabIndex provided!');
            }

            url = vitoop.baseUrl + ([res_type, res_id, tab_name[tab_nr]].join('/'));
            // if the tab is already loaded then return without any action
            if (1 == tab_loaded[tab_nr]) {
                return;
            }
            if ('new' == res_id) {
                url = vitoop.baseUrl + ([res_type, 'new'].join('/'));
            }
            tab_loaded[tab_nr] = 1;
            $.ajax({
                url: url,
                success: loadTabSuccess,
                dataType: 'json'
            });
        },

        loadTabSuccess = function (responseJSON, textStatus, jqXHR, form) {
            if ('new' == res_id) {
                // Leave the "NEW-State" when the new form-id is present in responseJSON['resource-title']
                res_id = responseJSON['resource-metadata'].id;
                if (res_id !== 'new') {
                    $('#vtp-res-dialog-tabs').tabs('enable');
                    // Disable the Navigation Buttons (uifyContainer() will grey it out). New resource has no prev/next
                    prev_id = next_id = -1;

                }
            }
            $.each(responseJSON, function (container_name, html) {
                if ('resource-metadata' !== container_name) {
                    $('#' + container_name).empty().append(html);
                    // Initializing special UI-Gimmicks are done in uifyContainer()
                    uifyContainer(container_name);
                }
            });

        },

        showDialog = function (e) {
            var current_tr_res;

            if ($(e.target).hasClass('vtp-uiaction-open-extlink')) {
                return true;
            }

            current_tr_res = $(e.target).parentsUntil('.vtp-uiaction-list-listener', '.vtp-uiaction-list-showdetail');
            if (current_tr_res.length === 0) {
                return true;
            }

            //tr_res is initialized with null
            if (tr_res != null) {
                tgl();
            }
            tr_res = current_tr_res;
            tgl();

            // res_id is retrieved from the tablerow id (e.g. <tr
            // id="pdf-1">).
            res_type = (tr_res.attr('id').split('-'))[0];
            res_id = (tr_res.attr('id').split('-'))[1];

            setNextId();
            setPrevId();
            // check for init: call a widget-method before initialization throws an
            // error
            try {
                $('#vtp-res-dialog-tabs').tabs("option");
            } catch (e) {
                // beforeActivate( event, ui )
                // will be invoked every time a tab is "clicked" except when the
                // dialog
                // opens because the tab is already active, so the event doesn't
                // fire
                $('#vtp-res-dialog-tabs').tabs({
                    beforeActivate: loadTab
                });
            }
            if (res_id == 'new') {
                newResource();
            } else {
                $('#vtp-res-dialog-tabs').tabs('enable');
                $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);

                // trigger the tab to be loaded with content the first time
                loadTab(undefined, 0);
            }
            $('#vtp-res-dialog').dialog('open');
        },

        newResource = function () {
            res_id = 'new';
            hardResetTabs();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 1, 2, 3 ]);
            loadTab(undefined, 0);
        },

        tgl = function () {
            tr_res.children().toggleClass('ui-state-active');
        },

        tgl_ls = function () {
            var ls_tr_res;
            // toggle "last seen" in: -insertResourceList
            if (typeof arr_tr_res_attr_id[res_type] != 'undefined') {
                ls_tr_res = $('#' + arr_tr_res_attr_id[res_type]);
                if (ls_tr_res.length != 0) {// is "last seen" on current Page?
                    tr_res = ls_tr_res;
                    tgl();
                }
            }
        },

        nextResource = function () {
            var url;
            // tr_res is current (jqueryfied) tr-element
            if (next_id == -1) {// no NEXT page avaiable
                return;
            } else if (next_id == 0) {// load NEXT listpage
                url = $('.vtp-pg-next a').attr('href');
                resourceList.loadResourceListPage(url, (function () {
                    // additional callback for ajax pageload
                    tr_res = $('.vtp-list-first');
                    tgl();
                    res_id = (tr_res.attr('id').split('-'))[1];
                    prev_id = 0;
                    setNextId();
                    // We are still in an asynchronous callback: Tab Maintenance must be
                    // done here
                    hardResetTabs();
                    loadTab(undefined, 0);
                }));
            } else { // flip to NEXT resource
                tgl();
                tr_res = tr_res.next('tr');
                tgl();
                prev_id = res_id;
                res_id = next_id;
                setNextId();
                hardResetTabs();
                loadTab(undefined, 0);

            }
            return true;
        },

        setNextId = function () {
            if (tr_res.hasClass('vtp-list-end')) {
                next_id = -1;
            } else if (tr_res.hasClass('vtp-list-last')) {
                next_id = 0;
            } else {
                next_id = (tr_res.next('tr').attr('id').split('-'))[1];
            }
        },

        previousResource = function () {
            var url;
            // tr_res is current (jqueryfied) tr-element
            if (prev_id == -1) {// no PREVious page avaiable
                return;
            } else if (prev_id == 0) {// load PREVious listpage
                url = $('.vtp-pg-prev a').attr('href');
                resourceList.loadResourceListPage(url, (function () {
                    // loadPage:Success
                    tr_res = $('.vtp-list-last');
                    tgl();
                    res_id = (tr_res.attr('id').split('-'))[1];
                    next_id = 0;
                    setPrevId();
                    // We are still in an asynchronous callback: Tab Maintenance must be
                    // done here
                    hardResetTabs();
                    loadTab(undefined, 0);
                }));
            } else { // flip to PREVious resource
                tgl();
                tr_res = tr_res.prev('tr');
                tgl();
                next_id = res_id;
                res_id = prev_id;
                setPrevId();
                hardResetTabs();
                loadTab(undefined, 0);

            }
            return true;
        },

        setPrevId = function () {
            if (tr_res.hasClass('vtp-list-start')) {
                prev_id = -1;
            } else if (tr_res.hasClass('vtp-list-first')) {
                prev_id = 0;
            } else {
                prev_id = (tr_res.prev('tr').attr('id').split('-'))[1];
            }
        },

        hardResetTabs = function () {
            $('#resource-data').empty();
            $('#resource-rating').empty();
            $('#resource-tag').empty();
            $('#resource-remark').empty();
            $('#resource-comments').empty();
            $('#resource-lexicon').empty();
            $('#resource-project').empty();
            $('#resource-title').empty();
            $('#resource-buttons').empty();
            $('#resource-flags').empty();
            // pay attention. this triggers tab to load, if the array
            // tab_loaded is [0,.,.,.,.]
            $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
            // focus must be maintained manually...
            $('#vtp-res-dialog-tabs .ui-tabs-active>a').trigger('focus');
            // so the array must be reseted here
            tab_loaded = [ 0, 0, 0, 0 ];
            // there was a li-element inserted for rating purposes
            $('#vtp-rating-infobox-li').remove();
        },

        flagResource = function (flag_type) {
            $('#vtp-res-flag-form').length || $('#resource-flags').append('<div id="vtp-res-flag-form"></div>');

            $.ajax({
                url: vitoop.baseUrl + [res_type, res_id, 'flag', flag_type].join('/'),
                success: function (responseHtml, textStatus, jqXHR) {
                    fillFlagForm(responseHtml);
                    $('#resource-flags').show('blind', 'fast');
                },
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-form').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                },
                dataType: 'html'
            });
        },

        deleteResource = function () {
            flagResource('delete');
        },

        blameResource = function () {
            flagResource('blame');
        },

        fillFlagForm = function (html) {
            $('#vtp-res-flag-form').empty().append(html);
            $('#vtp-uiaction-close-flagform').button({
                icons: {
                    primary: "ui-icon-close"
                },
                text: false,
                label: "verwerfen"
            })
            $('#vtp-res-flag-form form input[type=submit]').button({
                icons: {
                    primary: "ui-icon-trash"
                }
            });
            !$('#vtp-res-flag-form .vtp-uiinfo-info').length || $('#vtp-res-flag-form .vtp-uiinfo-info').position({
                my: 'right bottom',
                at: 'left top',
                of: '#vtp-res-flag-form .vtp-uiinfo-anchor',
                collision: 'none'
            }).hide("fade", 10000);
        },

        doneFlagInfo = function (content) {
            hardResetTabs();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 0, 1, 2, 3 ]);
            $('#resource-flags').append(content['resource-flags']);
        },

        closeDialog = function () {
            hardResetTabs();
            // "last seen" is maintained through arr_res_tr_attr_id[]
            arr_tr_res_attr_id[res_type] = res_type + '-' + res_id;
            if (refresh_list) {
                resourceList.loadResourceListPage();
                refresh_list = false;
            }
        },

        notifyRefresh = function () {
            refresh_list = true;
        },

        /****************************************************************************
         * Eventhandler and jQuery initializing:call init() on Document ready
         ***************************************************************************/
            init = function () {
            $('#vtp-res-dialog').dialog({
                autoOpen: false,
                width: 720,
                position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                modal: true,
                close: closeDialog
            });

            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').append('<span id="resource-title"></span>');
            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').after('<span id="resource-buttons"></span>');

            $('#vtp-res-dialog').before('<div id="resource-flags" style="display: none;"></div>');

            $('#vtp-res-dialog-tabs form').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: [notifyRefresh, loadTabSuccess],
                error: function (jqXHR, textStatus, errorThrown, $form) {
                    $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }

            });
            $('#vtp-res-flag-form form').ajaxForm({
                delegation: true,
                dataType: 'html',
                success: fillFlagForm,
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-form').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }
            });
            $('#vtp-res-flag-info form').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: doneFlagInfo,
                error: function (jqXHR, textStatus) {
                    $('#vtp-res-flag-info').empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }
            });
            // @TODO Handler
            // vtp-content is the root for event delegation inside this 'box'
            $('#vtp-content').on('click', '.vtp-uiaction-list-listener', showDialog);

            $('#vtp-application').on('click', '#vtp-uiaction-close-flagform', function () {
                $('#resource-flags').hide('blind', 'fast');
                $('#resource-flags').empty();
            });
        };
    /* API */

    return {
        // call init() on Document ready. DOM must be fully loaded.
        init: init,
        tgl_ls: tgl_ls

    };
}());
