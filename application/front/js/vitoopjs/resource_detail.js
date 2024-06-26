/**
 * JavaScript GUI for Vitoop Module: resource_detail.js
 */

import ReadableButton from './components/ReadableButton';
import DataStorage from './datastorage';
import TagWidget from './widgets/tagWidget';
import RemarkWidget from './widgets/remarkWidget';
import PrivateRemarkWidget from './widgets/privateRemarkWidget';
import CommentWidget from './widgets/commentWidget';
import ProjectWidget from './widgets/projectWidget';
import LexiconWidget from './widgets/lexiconWidget';
import SendLinkWidget from './widgets/sendLinkWidget';
import UserDetailWidget from './widgets/userDetailWidget';
import EventBus from "./app/eventBus";

window.resourceDetail = (function () {
    let NewcustomCheckboxWrapper = document.createElement('label');
    NewcustomCheckboxWrapper.className = 'custom-checkbox__wrapper light square-checkbox';
    NewcustomCheckboxWrapper.innerHTML = ``;
    let customCheckboxWrapper = document.createElement('label');
    customCheckboxWrapper.className = 'custom-checkbox__wrapper light square-checkbox';
    customCheckboxWrapper.innerHTML = `
        <input type="checkbox" 
               id="resource-check" 
               class="valid-checkbox" 
               title="anhaken für weitere Verwendung: öffnen/mailen"/>
        <span class="custom-checkbox">
            <img class="custom-checkbox__check"
                 src="../../img/check.png" />
        </span>
    `;
    const deleteButton = `
        <button class="vtp-uistyle-iconbutton vtp-uiaction-detail-delete ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
            title="{{ 'label.delete'|trans }}"
            role="button">
        <span class="ui-button-icon-primary ui-icon ui-icon-trash"></span>
        <span class="ui-button-text">{{ 'label.delete'|trans }}</span>
    </button>
    `;
    var tab_loaded = [ 0, 0, 0, 0, 0 ],
        tab_name = [ 'quickview', 'remark', 'remark_private', 'comments', 'assignments' ],
        res_type = '',
        res_id = 0, res_id_last = 0, prev_id = 0, next_id = 0,
        tr_res = null,
        arr_tr_res_attr_id = {},
        refresh_list = false,
        isShowRating = false,
        viewUrl = '',
        hideGross = false,
        canRead,
        setResId = function (resId) {
            res_id = resId;
        },
        addDateModificator = function (elementId) {
            if ($(elementId).length>0) {
                $(elementId).change(function () {
                    var dateString = $(elementId).val().toString();
                    var dateParts = dateString.split('.');
                    if (dateParts.length == 3) {
                        if (dateParts[0] < 10) {
                            dateParts[0] = '0' + parseInt(dateParts[0]);
                        }
                        if (dateParts[1] < 10) {
                            dateParts[1] = '0' + parseInt(dateParts[1]);
                        }
                    }
                    if (dateParts.length == 2) {
                        if (dateParts[0] < 10) {
                            dateParts[0] = '0' + parseInt(dateParts[0]);
                        }
                    }
                    $(elementId).val(dateParts.join('.'));
                });
            }
        },
        resourceNotes = {
            hide() {
                $('#open-notes-dialog-button').removeClass('ui-state-active');
                $('#resource-notes').removeClass('open');
                $('#resource-notes').css('display', 'none');

                EventBus.$emit('close');
            },
            show() {
                $('#open-notes-dialog-button').addClass('ui-state-active');
                $('#resource-notes').addClass('open');
                $('#resource-notes').css('display', 'block');

                EventBus.$emit('open');
            },
            isOpen: () => $('#resource-notes').hasClass('open'),
        },
        uifyContainer = function (container_name) {
            var action_icon_map;


            if ('resource-buttons' == container_name) {
                // jQueryUI-ify the received buttons
                action_icon_map = {
                    "previous": "ui-icon-circle-triangle-w",
                    "next": "ui-icon-circle-triangle-e",
                    "save": "ui-icon-disk",
                    "popup": "ui-icon-newwin",
                    "delete": "ui-icon-trash",
                    "new": "ui-icon-document",
                    "blame": "ui-icon-alert",
                    'help': 'ui-icon-help',
                };
                $.each(action_icon_map, function (action, icon) {
                    if (('popup' === action) && ('pdf' !== res_type) && ('teli' !== res_type )) {
                        return;
                    }
                    if (!['delete', 'blame'].includes(action)) {
                        $('button.vtp-uiaction-detail-' + action).button({
                            icons: {
                                primary: icon
                            },
                            label: action,
                            text: false
                        });
                    }
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
                if ($('#resource-notes').hasClass('open')) {
                    if (!($('#open-notes-dialog-button').hasClass('ui-state-active'))) {
                        $('#open-notes-dialog-button').addClass('ui-state-active');
                    }
                }
                $('.vtp-uiaction-detail-save').on('click', function () {
                    $('#resource-data input[type=submit]').trigger('submit');
                });
                $('.vtp-uiaction-detail-popup').on('click', function () {
                    console.log('click');
                    let target =  vitoopState.getters.isOpenInSameTabPdf ? '_self': '_blank';
                    if ('teli' === res_type) {
                        target =  vitoopState.getters.isOpenInSameTabTeli ? '_self': '_blank';
                    }
                    openAsResourceView(res_id, res_type, target, false);
                    resourceNotes.hide();
                    $('#vtp-res-dialog').dialog('close');
                    return false;
                });
                $('.vtp-uiaction-detail-popup').on('contextmenu', function () {
                    console.log('dblclick');
                    let target =  vitoopState.getters.isOpenInSameTabPdf ? '_self': '_blank';
                    if ('teli' === res_type) {
                        target =  vitoopState.getters.isOpenInSameTabTeli ? '_self': '_blank';
                    }
                    openAsResourceView(res_id, res_type, target, true);
                    resourceNotes.hide();
                    $('#vtp-res-dialog').dialog('close');
                    return false;
                });

                $('.vtp-uiaction-detail-delete').on('click', deleteResource);
                $('.vtp-uiaction-detail-blame').on('click', blameResource);

                $('.vtp-uiaction-detail-new').on('click', newResource);
                $('#vtp-detail-help').on('click', helpWindow);
                $('#vtp-bigclosehelp').on('click', hideHelpWindow);
                $('#open-notes-dialog-button').on('click', () => {
                    resourceNotes.isOpen() ? resourceNotes.hide() : resourceNotes.show();
                });
                // if (vitoopState.state.admin && ['lex', 'conversation'].includes(res_type)) {
                //     if ($('.vtp-uiaction-detail-new')) {
                //         $('.vtp-uiaction-detail-new').after(deleteButton);
                //     } else {
                //         $('.vtp-uiaction-detail-next').after(deleteButton);
                //     }
                // }
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
                $('#'+res_type+'_isUserHook').change(function () {
                    var id = $('.custom-dropdown').attr('id');
                    let spanText = $('#'+ id +'-button .ui-selectmenu-text').text();
                    let isUserHookValue = this.checked?1:0;
                    $.ajax({
                        method: 'POST',
                        url: vitoop.baseUrl + ([res_type, res_id, 'user-hooks'].join('/')),
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            isUserHook: isUserHookValue,
                            sessionColor: spanText
                        }),
                        success: function () {
                            refresh_list = true;

                            if (spanText == 'blue') {
                                spanText = 'blau';
                            }
                            $('.vtp-fh-infosave-box-left ').addClass('vtp-' + spanText + '-color');
                            $('.vtp-fh-infosave-box-right ').addClass(spanText + '-gradient');
                            let message = 'Lesezeigen wurde gesetzt';
                            if (0 === isUserHookValue) {
                                message = 'Lesezeichen wurde entfernt';
                                $('.vtp-fh-infosave-box-left ').removeClass('vtp-' + spanText + '-color');
                                $('.vtp-fh-infosave-box-right ').removeClass(spanText + '-gradient');
                                $('#'+res_type+'-'+ res_id +" td:first").removeClass();
                            }
                            EventBus.$emit('element-notification:show', message, 'vtp-user-hook');
                        }
                    });
                });

                $('#' + res_type + '_sendMail').on('change', function () {
                    let sendEmailValue = this.checked ? 1 : 0;
                    $.ajax({
                        method: 'POST',
                        url: vitoop.baseUrl + (['resources', res_id, 'update-remark-email'].join('/')),
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            sendMail: sendEmailValue
                        }),
                        success: function (result) {
                            if (result.value == 1) {
                                EventBus.$emit('element-notification:show', 'Erfolgreich eingestellt.', 'vtp-user-hook');
                            } else if (result.value == 0) {
                                EventBus.$emit('element-notification:show', 'Unset erfolgreich.', 'vtp-user-hook');
                            }
                        }
                    });
                });

                let readButton = new ReadableButton(res_type, res_id);
                readButton.init($('#'+res_type+'_isUserRead').val());

                addDateModificator('#teli_release_date');
                //addDateModificator('#pdf_pdf_date');

                if (res_type == "prj" || res_type === 'conversation') {
                    const nameOrigin = $(`#${res_type}_name`).val();
                    const textOrigin = $(`#${res_type}_description`).val();
                    const buttonSave = $(`#${res_type}_save`);

                    buttonSave.addClass('ui-state-disabled');
                    buttonSave.attr('disabled', true);

                    const isChanged = function() {
                        const name = $(`#${res_type}_name`).val();
                        const text = $(`#${res_type}_description`).val();
                        return (nameOrigin.length != name.length || textOrigin.length != text.length) && name.length && text.length;
                    };

                    const changeClassOfButton = function() {
                        if (!isChanged()) {
                            buttonSave.addClass('ui-state-disabled');
                            buttonSave.attr('disabled', true);
                            buttonSave.css("display","none");
                        } else {
                            buttonSave.removeClass('ui-state-disabled');
                            buttonSave.attr('disabled', false);
                            buttonSave.css("display","block");
                        }
                    };

                    $(`#${res_type}_name`).on('change keyup', changeClassOfButton);
                    $(`#${res_type}_description`).on('change keyup', changeClassOfButton);
                }

                const res_type_array = ['pdf', 'teli', 'book', 'adr', 'link'];
                if (res_type_array.includes(res_type)) {
                    const buttonSave = $(`#${res_type}_save`);

                    const displaySaveButton = function() {
                        buttonSave.css("display","block");
                    };

                    $(`#${res_type}_name, #${res_type}_author, #${res_type}_publisher, #${res_type}_url, #${res_type}_tnop, #pdf_pdfDate, #${res_type}_releaseDate, #${res_type}_issuer, #${res_type}_isbn, #${res_type}_year, #${res_type}_name2, #${res_type}_street, #${res_type}_zip, #${res_type}_city, #${res_type}_contact1, #${res_type}_contact3, #${res_type}_contact4, #${res_type}_contact5`).on('change keyup', displaySaveButton);

                    $(document).on('click', `#${res_type}_lang-menu > li`, function () {
                        $.ajax({
                            method: 'POST',
                            url: vitoop.baseUrl + ([res_type, res_id, 'language'].join('/')),
                            success: function (result) {
                                if (result.success) {
                                    var selector = $(`#${res_type}_lang-button > span.ui-selectmenu-text`);
                                    if (selector.text() !== result.langName) {
                                        displaySaveButton();
                                    }
                                }
                            }
                        });
                    });
                }

                if (res_type == 'conversation') {
                    $('#conversation_isNotify').on('click', function () {
                        if (true === $(this).prop("checked")) {
                            axios.post(`/api/v1/conversations/${res_id}/notifications`);
                        } else {
                            axios.delete(`/api/v1/conversations/${res_id}/notifications`);
                        }
                    });
                }
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
                $('<li id="vtp-rating-infobox-li"></li>')
                    .insertAfter('#vtp-res-dialog-tabs>ul>li:last')
                    .append($('#vtp-rating-infobox-wrapper'));
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
                    //$('#rating_mark').val(ui.value);
                    $(ui.handle).text(ui.value);
                    $('#rating_mark option:contains('+ui.value+')').prop('selected', true);
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
                        isShowRating = true;
                        $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
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
                var tagWidget = new TagWidget(res_id, vitoop.baseUrl);
                tagWidget.init();
            }

            /*************************************************************************
             * UIfy: remark
             ************************************************************************/
            if ('resource-remark' == container_name) {
                var remarkWidget = new RemarkWidget(res_id, vitoop.baseUrl);
                remarkWidget.init();
            }

            /*************************************************************************
             * UIfy: remarkPrivate
             ************************************************************************/
            if ('resource-remark_private' == container_name) {
                var privateRemarkWidget = new PrivateRemarkWidget(res_id, vitoop.baseUrl);
                privateRemarkWidget.init();
            }

            /*************************************************************************
             * UIfy: comments
             ************************************************************************/
            if ('resource-comments' == container_name) {
                var commentWidget = new CommentWidget(res_id, res_type, vitoop.baseUrl);
                commentWidget.init();
            }
            /*************************************************************************
             * UIfy: project
             *****************************************************************/
            if ('resource-project' == container_name) {
                var projectWidget = new ProjectWidget(res_id, vitoop.baseUrl);
                projectWidget.init();
            }
            /*************************************************************************
             * UIfy: lexicon
             ************************************************************************/
            if ('resource-lexicon' == container_name) {
                var lexiconWidget = new LexiconWidget(res_id, vitoop.baseUrl);
                lexiconWidget.init();
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
             * UIfy: userDetail
             ************************************************************************/
            if(res_type == 'userlist'){
                if ('resource-data' == container_name) {
                    var userDetailWidget = new UserDetailWidget(res_id, vitoop.baseUrl);
                    userDetailWidget.init();
                }
            }

            /*************************************************************************
             * UIfy: END
             ************************************************************************/

            hideConnectionAndRemark();
        },
        clearTabsClasses = function() {
            clearTabsNoContent();
            resetTinyMce();
        },
        clearTabsNoContent = function () {
            $('#tab-title-comments').removeClass('ui-state-no-content');
            $('#tab-title-remark').removeClass('ui-state-no-content');
            $('#tab-title-remark-private').removeClass('ui-state-no-content');
            $('#tab-title-rels').removeClass('ui-state-no-content');
        },
        resetTinyMce = function () {
            tinymce.execCommand('mceRemoveEditor', true, "remark_text");
            tinymce.execCommand('mceRemoveEditor', true, "remark_private_text");

            $('#vtp-remark-box').hide();
            $('#vtp-remark-private-box').hide();
            // $('#vtp-user-notes-box').hide();
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

            var urlResourceType = (res_type && 0 !==tab_nr) ? res_type : 'resources';
            url = (res_type == 'userlist') ? (vitoop.baseUrl + ([urlResourceType, res_id, 'userlist'].join('/'))) : (vitoop.baseUrl + ([urlResourceType, res_id, tab_name[tab_nr]].join('/')));
            // url = vitoop.baseUrl + ([urlResourceType, res_id, tab_name[tab_nr]].join('/'));
            // if the tab is already loaded then return without any action
            /*if (1 == tab_loaded[tab_nr]) {
                return;
            }*/

            if ('new' == res_id) {
                url = vitoop.baseUrl + ([res_type, 'new'].join('/'));
            }
            $.ajax({
                url: url,
                success: (responseJSON) => loadTabSuccess(responseJSON,tab_name[tab_nr]),
                error: () => {
                    $('#vtp-res-dialog').dialog('close');
                },
                dataType: 'json'
            });
            tab_loaded[tab_nr] = 1;
        },
        getTypeKindOfPopup =function(){
            switch(res_type) {
                case 'conversation':
                    return "Con: ";
                case 'prj':
                    return "Pro: ";
                case 'lex':
                    return "Lex: ";
                case 'pdf':
                    return "Pdf: ";
                case 'teli':
                    return "Teli: ";
                case 'book':
                    return "Buch: ";
                case 'adr':
                    return "Adr: ";
                case 'link':
                    return "Link: ";
                case 'userlist':
                    return "User: ";
            }
        },
        loadTabSuccess = function (responseJSON,tabName) {
            if(responseJSON['resource-title'] != undefined)
                responseJSON['resource-title'] = getTypeKindOfPopup() + responseJSON['resource-title'];
            var isNewResource = false;

            if ('new' == res_id) {
                isNewResource = true;
                if (responseJSON['resource-metadata'] && !responseJSON['resource-metadata'].isNewValid) {
                    isNewResource = false;
                }
                // Leave the "NEW-State" when the new form-id is present in responseJSON['resource-title']
                res_id = responseJSON['resource-metadata'].id;
                if (res_id !== 'new') {
                    $('#vtp-res-dialog-tabs').tabs('enable');
                    // Disable the Navigation Buttons (uifyContainer() will grey it out). New resource has no prev/next
                    prev_id = next_id = -1;

                }
            }

            if (responseJSON['resource-metadata']) {
                let resource = 'conversation';
                res_type = responseJSON['resource-metadata'].type;
                switch (res_type) {
                    case 'lex':
                        resource = 'lexicon';
                        break;
                    case 'prj':
                        resource = 'project';
                        break;
                }
                if (res_type === 'lex' ||  res_type === 'prj' || res_type === 'conversation') {
                    viewUrl = `${vitoop.baseUrl}${resource}/${res_id}`;
                }
            }

            if (responseJSON['tabs-info']) {
                var info = responseJSON['tabs-info'];
                var storage = new DataStorage();
                var checkedResources = storage.getObject(res_type +'-checked');

                if (res_id in checkedResources) {
                    $('#resource-check').prop("checked", "checked");
                } else {
                    $('#resource-check').removeProp("checked");
                }

                if (info.comments == 0) {
                    $('#tab-title-comments').addClass('ui-state-no-content');
                }
                if (res_type == 'prj' || res_type == 'lex') {
                    $('#tab-title-remark').hide();
                } else {
                    $('#tab-title-remark').show();
                }

                if (info.remarks == 0) {
                    $('#tab-title-remark').addClass('ui-state-no-content');
                }
                if (info.remarks_private == 0) {
                    $('#tab-title-remark-private').addClass('ui-state-no-content');
                }
                if (info.rels == 0) {
                    $('#tab-title-rels').addClass('ui-state-no-content');
                }
            }

            $.each(responseJSON, (container_name, html) => {
                if ('resource-metadata' !== container_name && 'tabs-info' !== container_name) {
                    replaceContainer(container_name, html);
                }
            });

            $('#vtp-res-dialog select').selectmenu({
                create: (event, ui) => {
                    if (event.target.id === 'conversationStatus' && res_id !== 'new' && canRead) {
                        axios(`/api/v1/conversations/${res_id}`)
                            .then(({data: {conversation: {conversation_data}}}) => {
                                let status = null;
                                status = conversation_data.is_for_related_users ? 'privat' : 'öffentlich';
                                $( "#conversationStatus" ).val(status).selectmenu("refresh");
                            });
                    }
                },
                select: function( event, ui ) {
                    if (event.target.id === 'conversationStatus') {
                        // toDo make backend request to save status
                    }
                    $('span.ui-selectmenu-button').removeAttr('tabIndex');
                }
            });

            if (!isNewResource) $('#conversationStatus').selectmenu('option','disabled',true);

            $('span.ui-selectmenu-button').removeAttr('tabIndex');
            if (vitoop.isShowHelp == true && isNewResource) {
                $('#vtp-detail-help').click();
            }

            //show rating tabs if need
            if (isShowRating) {
                isShowRating = false;
                $('#vtp-rating-panel').show('blind', 'slow');
            }

            //show lexicon button and scrollbars
            $('.vtp-extlink-lexicon').remove();
            if ((res_type === 'lex' ||  res_type === 'prj' || res_type === 'conversation') && !hideGross && !isNewResource) {
                const grossButton = document.createElement('button');
                grossButton.innerText = 'öffnen';
                grossButton.style.fontWeight = 'bold';
                grossButton.className = 'vtp-extlink vtp-extlink-lexicon vtp-uiaction-open-extlink ui-state-default';
                if (
                    !canRead && res_type !== 'lex'
                ) {
                    grossButton.classList.add('ui-state-disabled');
                    grossButton.disabled = true;
                }
                grossButton.addEventListener('click', () => {
                    vitoopState.commit('resetConversation');
                    vitoopState.commit('resetResource');
                    if (res_type !== 'lex') {
                        if (canRead) window.location.href = `${window.location.origin}${viewUrl}`;
                    } else {
                        window.location.href = `${window.location.origin}${viewUrl}`;
                    }
                });
                $('.ui-tabs-nav').append(grossButton);

                if (res_type === 'lex') {
                    let scrollableHeight = 274;
                    let currentHeight = parseInt($('.vtp-lexicon-description').css('height').replace('px', ''));

                    if (currentHeight > scrollableHeight) {
                        $('.vtp-lexicon-description').mCustomScrollbar({
                            setHeight: scrollableHeight + 'px'
                        });
                    }
                }
            }
        },
        showDialog = function (e) {
            var current_tr_res;
            current_tr_res = $(e.target).parentsUntil('.vtp-uiaction-list-listener', '.vtp-uiaction-list-showdetail');
            canRead = current_tr_res[0].classList.contains('canRead');
            if (current_tr_res.hasClass('divider-wrapper')) {
                e.preventDefault();
                return
            }
            if (current_tr_res.length === 0) {
                return true;
            }
            tr_res = current_tr_res;
            res_type = (tr_res.attr('id').split('-'))[0];
            res_id = (tr_res.attr('id').split('-'))[1];
            tgl();
            if ($(e.target).hasClass('vtp-uiaction-open-extlink') ||
                $(e.target).parent().hasClass('vtp-uiaction-open-extlink') ||
                $(e.target).hasClass('vtp-projectdata-unlink') ||
                $(e.target).hasClass('vtp-projectdata-unlink-coefficient') ||
                $(e.target).hasClass('vtp-uiaction-coefficient')) {
                return;
            }
            setNextId();
            setPrevId();
            openDialog();
        },
        hideConnectionAndRemark = () => {
            if (res_type === 'conversation') {
                $('#resource-lexicon').css('display','none');
            } else {
                $('#resource-lexicon').css('display','block');
            }
        },
        addCheckboxWrapperWithResourceTitle = () => {
            if ((res_type != 'userlist')) {
                $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').append(customCheckboxWrapper);
            } else {
                $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').append(NewcustomCheckboxWrapper);
            }
            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title .custom-checkbox__wrapper').append('<span id="resource-title"></span>');
        },
        openDialog = function (canReadProp) {
            if ((res_type == 'userlist'))  
            {
                const first = $('#vtp-res-dialog:nth-child(1)');
                if (first.length) {
                    first.remove();
                    hardResetTabs();
                }
            }
            // check for init: call a widget-method before initialization throws an
            // error
            canRead = canReadProp !== undefined ? canReadProp : canRead;
            addCheckboxWrapperWithResourceTitle();
            resourceCheckOnChange();

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
            clearTabsClasses();
            $('#vtp-res-dialog').dialog();
            $('#vtp-res-dialog').dialog('option', 'closeText', 'schließen');
            $('#vtp-res-dialog').dialog('open');
        },
        newResource = function () {
            res_id = 'new';
            hardResetTabs();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 1, 2, 3, 4 ]);
            loadTab(undefined, 0);
        },
        helpWindow = function () {
            if ($('#resource-help').css('display') == 'none') {
                showHelpWindow();
            } else {
                hideHelpWindow();
            }
        },
        showHelpWindow = function () {
            $('#resource-quickview').hide();
            $('#resource-help').show();
            //$(this).removeClass("ui-state-focus ui-state-hover");
            $('#vtp-detail-help').removeClass('ui-state-default');
            $('#vtp-detail-help').addClass('ui-state-active');

        },
        hideHelpWindow = function () {
            $('#resource-help').hide();
            $('#resource-quickview').show();
            $('#vtp-detail-help').addClass('ui-state-default');
            $('#vtp-detail-help').removeClass('ui-state-active');
        },
        tgl = function () {
            $('td.ui-state-active').removeClass('ui-state-active');
            $('td.td-ui-state-active-border').removeClass('td-ui-state-active-border');
            document.querySelectorAll('tr').forEach(tr => {
                if (tr.getAttribute('id') === `${res_type}-${res_id}`) {
                    tr.querySelectorAll('td').forEach(td => td.classList.add('ui-state-active'));
                    tr.querySelectorAll('td:first-child').forEach(td => td.classList.remove('ui-state-active'));
                    tr.querySelectorAll('td:first-child').forEach(td => td.classList.add('td-ui-state-active-border'));
                }
            })
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
            if (next_id == -1) {// no NEXT page avaiable
                return;
            }
            if (next_id == 0) {// load NEXT listpage
                let rows = $('#vtp-res-list table').DataTable().page('next').draw('page');
                rows.on('draw.dt', function () {
                    tr_res = $('.vtp-list-first');
                    res_id = (tr_res.attr('id').split('-'))[1];
                    prev_id = 0;
                    setNextId();
                    var nextElement = tr_res.next('tr').hasClass('divider-wrapper') ? tr_res.next().next('tr') : tr_res.next('tr');
                    res_type = (nextElement.attr('id').split('-'))[0];
                    tgl();
                    hardResetTabs();
                    addCheckboxWrapperWithResourceTitle();
                    loadTab(undefined, 0);
                });
            } else { // flip to NEXT resource
                var nextElement = tr_res.next('tr').hasClass('divider-wrapper') ? tr_res.next().next('tr') : tr_res.next('tr');
                if (nextElement.length == 0) {
                    nextElement = tr_res.next().next('tr');
                }
                tr_res = nextElement;
                prev_id = res_id;
                res_id = next_id;
                setNextId();
                res_type = (nextElement.attr('id').split('-'))[0];
                tgl();
                hardResetTabs();
                addCheckboxWrapperWithResourceTitle();
                loadTab(undefined, 0);
            }
            canRead = tr_res[0].classList.contains('canRead');
            return true;
        },
        setNextId = function () {
            if (tr_res.hasClass('vtp-list-end')) {
                next_id = -1;
            } else if (tr_res.hasClass('vtp-list-last')) {
                next_id = 0;
            } else {
                var nextElement = tr_res.next('tr');
                if (nextElement.hasClass('divider-wrapper')) {
                    next_id = (nextElement.next().attr('id').split('-'))[1];
                    return
                }
                next_id = (nextElement.attr('id').split('-'))[1];
            }
        },
        previousResource = function () { // toDo needs to refactor
            if (prev_id == -1) {// no PREVious page avaiable
                return;
            }
            if (prev_id == 0) {// load PREVious listpage
                let rows = $('#vtp-res-list table').DataTable().page('previous').draw('page');
                rows.on('draw.dt', function () {
                    tr_res = $('.vtp-list-last');
                    res_id = (tr_res.attr('id').split('-'))[1];
                    next_id = 0;
                    setPrevId();
                    var prevElement = tr_res.prev('tr').hasClass('divider-wrapper') ? tr_res.prev().prev('tr') : tr_res.prev('tr');
                    res_type = (prevElement.attr('id').split('-'))[0];
                    tgl();
                    // We are still in an asynchronous callback: Tab Maintenance must be
                    // done here
                    hardResetTabs();
                    addCheckboxWrapperWithResourceTitle();
                    loadTab(undefined, 0);
                });
            } else { // flip to PREVious resource
                var prevElement = tr_res.prev('tr').hasClass('divider-wrapper') ? tr_res.prev().prev('tr') : tr_res.prev('tr');
                if (prevElement.length == 0) {
                    prevElement = tr_res.prev().prev('tr');
                }
                tr_res = prevElement;
                next_id = res_id;
                res_id = prev_id;
                setPrevId();
                res_type = (prevElement.attr('id').split('-'))[0];
                tgl();
                hardResetTabs();
                addCheckboxWrapperWithResourceTitle();
                loadTab(undefined, 0);
            }
            canRead = tr_res[0].classList.contains('canRead');
            return true;
        },
        setPrevId = function () {
            if (tr_res.hasClass('vtp-list-start')) {
                prev_id = -1;
            } else if (tr_res.hasClass('vtp-list-first')) {
                prev_id = 0;
            } else {
                var prevElement = tr_res.prev('tr');
                if (prevElement.hasClass('divider-wrapper')) {
                    if (prevElement.prev().length > 0) {
                        prev_id = (prevElement.prev().attr('id').split('-'))[1];
                        return
                    } else {
                        prev_id = -1;
                        return;
                    }
                }
                prev_id = (prevElement.attr('id').split('-'))[1];
            }
        },
        hardResetTabs = function () {
            // vitoopState.commit('set', {key: 'conversationInstance', value: null});
            $('#resource-title').remove();
            customCheckboxWrapper.remove();
            NewcustomCheckboxWrapper.remove();
            $('#resource-data').empty();
            $('#resource-rating').empty();
            $('#resource-tag').empty();
            $('#resource-remark').empty();
            $('#resource-remark_private').empty();
            $('#resource-comments').empty();
            $('#resource-lexicon').empty();
            $('#resource-project').empty();
            $('#resource-buttons').empty();
            $('#resource-flags').empty();
            if ($('#resource-notes').hasClass('open')) {
                EventBus.$emit('close');
            }
            $('.vtp-extlink-lexicon').remove();
            // pay attention. this triggers tab to load, if the array
            // tab_loaded is [0,.,.,.,.]
            $('#vtp-res-dialog-tabs').tabs('option', 'active', 0);
            // focus must be maintained manually... it will fire bug in Mozilla!
            //$('#vtp-res-dialog-tabs .ui-tabs-active > a').trigger('focus');
            // so the array must be reseted here
            tab_loaded = [ 0, 0, 0, 0, 0 ];
            // there was a li-element inserted for rating purposes
            $('#vtp-rating-infobox-li').remove();
            clearTabsClasses();
        },
        flagResource = function (flag_type) {
            $('button[class*="vtp-uiaction-detail-"]').removeClass('ui-state-active');
            $(`.vtp-uiaction-detail-${flag_type}`).addClass('ui-state-active');
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
            if ($(this).hasClass('ui-state-active')) {
                $('#resource-flags').hide('blind', 'fast');
                $(this).removeClass('ui-state-active');
            } else {
                flagResource('delete');
            }
        },
        blameResource = function () {
            if ($(this).hasClass('ui-state-active')) {
                $('#resource-flags').hide('blind', 'fast');
                $(this).removeClass('ui-state-active');
            } else {
                flagResource('blame');
            }
        },
        fillFlagForm = function (html) {
            $('#vtp-res-flag-form').empty().append(html);
            var elemSuccess = $('div.vtp-uiinfo-info', html);
            if (elemSuccess.length > 0) {
                notifyRefresh();
                $('#vtp-res-dialog').dialog('close');
                setTimeout(function() {
                    $('#vtp-content').prepend(elemSuccess);
                    $(elemSuccess, '#vtp-context').hide("fade", 5000);
                }, 2000);
            }

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
            notifyRefresh();
            $('#vtp-res-dialog-tabs').tabs('option', 'disabled', [ 0, 1, 2, 3, 4 ]);
            $('#resource-flags').append(content['resource-flags']);
        },
        closeDialog = function () {
            hideGross = false;
            hardResetTabs();
            hideHelpWindow();
            $('#open-notes-dialog-button').removeClass('ui-state-active');
            $('#resource-notes').removeClass('open');
            $('#resource-notes').css('display', 'none');
            EventBus.$on('refreshListChanged', function (newValue) {
                refresh_list = newValue;
            });
            if (refresh_list) {
                //$('#vtp-res-list table').DataTable().off('draw.dt');
                // "last seen" is maintained through arr_res_tr_attr_id[]
                arr_tr_res_attr_id[res_type] = res_type + '-' + res_id;
                var api = $('#vtp-res-list table').dataTable().api();
                if (api && api.ajax && api.ajax.params()) {
                    var params = api.ajax.params();
                    if (params.resourceId) {
                        vitoop.resourceId = null;
                        notifyRefresh();
                    }
                    api.ajax.reload(function (json) {
                        tgl_ls();
                    }, false);
                }
                //resourceList.loadResourceListPage();
                refresh_list = false;
            }
        },
        replaceContainer = function (containerName, html) {
            $('#' + containerName).empty().append(html);
            resetTinyMce();
            uifyContainer(containerName);
            if (containerName === 'resource-buttons') {
                if (vitoopState.state.inProject && /project/.test(location.pathname)) {
                    $(`#${containerName} button`).not('#open-notes-dialog-button').remove();
                }
                if (vitoopState.state.inProject) {
                    $(`#${containerName} button`).not('.vtp-uiaction-detail-previous, .vtp-uiaction-detail-next, #open-notes-dialog-button')
                        .remove();
                }
                if (['conversation', 'lex'].includes(res_type) && !vitoopState.state.admin) {
                    $('.vtp-uiaction-detail-delete').remove();
                }
                if (vitoopState.state.conversationInstance) {
                    $(`#${containerName} button`).not('.vtp-uiaction-detail-blame, #open-notes-dialog-button, .vtp-uiaction-detail-previous, .vtp-uiaction-detail-next').remove();
                }
                if (!vitoopState.state.inProject && vitoopState.state.resource.id !== null) {
                    $('.vtp-uiaction-detail-new').remove();
                }
            }
        },
        notifyRefresh = function () {
            refresh_list = true;
        },
        resourceCheckOnChange = function() {
            $('#resource-check').on('change', function(e) {
                let rowId = '#'+res_type+'-'+res_id;
                let data = $('#vtp-res-list table').DataTable().row(rowId).data();
                if (!res_type) {
                    res_type = vitoopState.state.resource.type;
                }
                let sendLinkWidget = new SendLinkWidget();
                sendLinkWidget.updateCheckedResources(res_type, res_id, this.checked, data);
                e.stopPropagation();
            });
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
            const resButtons = document.getElementById('resource-buttons');
            if (resButtons) resButtons.remove();
            $('div[aria-describedby="vtp-res-dialog"] .ui-dialog-title').after('<span id="resource-buttons"></span>');
            $('#vtp-res-dialog').before('<div id="resource-flags" style="display: none;"></div>');
            resourceCheckOnChange();
            $('#vtp-res-dialog-tabs form:not(#form-tag)').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: [notifyRefresh, loadTabSuccess],
                error: function (jqXHR, textStatus, errorThrown, $form) {
                    $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                }
            });
            $('#vtp-res-dialog-tabs form#form-tag').ajaxForm({
                delegation: true,
                dataType: 'json',
                success: [notifyRefresh, loadTabSuccess, function() {$('#tag_text').focus(); $('#div-confirm-tagging').hide();}],
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
            $('#vtp-content').on('click', '.vtp-uiaction-list-listener table td', showDialog);
            $('#vtp-application').on('click', '#vtp-uiaction-close-flagform', function () {
                $('button[class*="vtp-uiaction-detail-"]').removeClass('ui-state-active');
                $('#resource-flags').hide('blind', 'fast');
                $('#resource-flags').empty();
            });
            $('#vtp-show-popup').on('click', showDialogInBigView);
        };
        function hideResourceButtons() {
            $('#resource-buttons').remove();
        }
        function showDialogInBigView() {
            hideGross = true;
            res_type = vitoopState.state.resource.type;
            res_id = vitoopState.state.resource.id;
            openDialog();
            hideResourceButtons();
        }
    /* API */
    return {
        // call init() on Document ready. DOM must be fully loaded.
        init: init,
        tgl_ls: tgl_ls,
        showDialog: showDialog,
        openDialog: openDialog,
        setResId: setResId
    };
}());
