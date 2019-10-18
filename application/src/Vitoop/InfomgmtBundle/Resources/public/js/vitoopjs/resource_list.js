/**
 * JavaScript GUI for Vitoop Module: resource_list.js
 */

import LinkStorage from './linkstorage';
import HttpService from './services/HttpService';

class ResourceList {
    constructor() {
        this.currentUrl = location.href;
    }

    loadResourceListPage(e, secondSuccessFunc) {
        let url;
        let succ;
        vitoopState.commit('checkIsNotEmptySearchToggle');
        if (typeof e === 'string') {
            // called manually by resource_detail:[next/previous]Resource for background page flipping
            // while the resource_detail dialog is in foreground
            url = e;
            succ = [ ResourceList.prototype.insertResourceList, ResourceList.prototype.secondSuccessFunc ];
        } else if (typeof e === 'undefined') {
            // called without arguments for a refresh
            url = ResourceList.prototype.currentUrl;
            succ = [ResourceList.prototype.insertResourceList];
        } else if ($(e.target).attr('id') === 'vtp-search-bytags-form') {
            // called by refresh (submit) button from tag search
            url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
            e.preventDefault();
            succ = [ResourceList.prototype.insertResourceList];
        } else if ($(e.target).hasClass('vtp-uiaction-search-bytags-clear-taglistbox')) {
            // called after all tags are removed
            url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
            succ = [ResourceList.prototype.insertResourceList];
        } else if ($(e.target).is('a')) {//@TODO This check isn't needed when handler is attached to a-elements
            //called by an handler
            url = $(e.target).attr('href');
            e.preventDefault();
            // decide reslink or homelink
            if ($(e.target).hasClass('vtp-resmenu-reslink')) {
                if ($('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-homelink-home')) {
                    $('#vtp-search-bytags-form, #vtp-search-toggle, #vtp-search-help').show('fade', 'slow');
                    vitoopApp.tagSearch.maintainTaglistbox();
                }
                // vitoopState.commit('checkIsNotEmptySearchToggle');
                $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                $(e.target).addClass('vtp-nav-active ui-state-active');
                succ = [ResourceList.prototype.insertResourceList];
            } else if ($(e.target).hasClass('vtp-resmenu-homelink')) {
                if ($(e.target).hasClass('vtp-resmenu-homelink-home') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                    $('#vtp-search-bytags-form, #vtp-search-toggle, #vtp-search-help, #vtp-filterbox').hide('fade', 'slow');
                    vitoopState.commit('updateSearchToggle', false);
                    vitoopApp.tagSearch.maintainTaglistbox(true);
                } else if ($(e.target).hasClass('vtp-resmenu-homelink') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                    vitoopState.commit('updateSearchToggle', false);
                    vitoopApp.tagSearch.maintainTaglistbox(true);
                }
                $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                $(e.target).addClass('vtp-nav-active ui-state-active');
                succ = [ResourceList.prototype.insertHomeContent];
            } else {
                // @TODO e.g - a in vtp-nav is OK  - but links to other resources?
                succ = [ResourceList.prototype.insertResourceList];
            }
        }
        if (typeof url !== 'undefined') {
            //in case of successful xhr call the currentUrl is updated
            succ.unshift(function () {
                ResourceList.prototype.currentUrl = url;
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
    }

    insertResourceList(responseHtml, textStatus, jqXHR, $_form) {
        let html = $(responseHtml);
        $('#vtp-content').empty().append(html);
        resourceDetail.tgl_ls();
        ResourceList.prototype.maintainResLinks();
    }

    insertHomeContent(responseHtml, textStatus, jqXHR, $_form) {
        $('#vtp-content').empty().append(responseHtml);
        resourceProject.init();
    }

    maintainResLinks(obj_partial_query) {
        if (typeof obj_partial_query === 'undefined') {
            return;
        }

        $('.vtp-resmenu-reslink').each(function () {
            let href = $(this).attr('href');
            href = $.param.querystring(href, obj_partial_query, 0);
            $(this).attr('href', href);
        });
    }

    toggleFlag(e) {
        let flagged;
        // empty array 0 => querystring portion will be deleted
        $(e.target).prop('checked') ? flagged = 1 : flagged = [];
        ResourceList.prototype.maintainResLinks({'flagged': flagged});
    }

    init() {
        this.maintainResLinks();
        /**********************************
         * Set Handlers
         **********************************/

        // #APR# Navgation resource links
        $('#vtp-nav').on('click', 'a', this.loadResourceListPage);

        // flags
        $('.vtp-uiaction-toggle-flag').on('click', this.toggleFlag);

        /*********************************
         *  uify (buttons etc.)
         *********************************/

        $('#vtp-search-bytags-form-submit').button({
            icons: {
                primary: "ui-icon-refresh"
            },
            text: false,
            label: "Suche"
        });

        $('#vtp-user-loginform-login').button({
            icons: {
                primary: "ui-icon-person"
            },
            text: false,
            label: "abmelden"
        });

        $('#vtp-user-loginform-logout').on('click', function () {
            vitoopState.commit('resetSecondSearch');

            //clear localstorage
            let datastorage = new LinkStorage();
            datastorage.clearAllResources();
            //clear tags
            vitoopApp.tagSearch.resetTags();
            vitoopApp.tagSearch.saveTagsToStorage();
        });

        // $('#vtp-header-toggle-flag input[type=checkbox]').button({
        //     icons: {
        //         primary: "ui-icon-flag"
        //     },
        //     text: false
        // });

        // $('#vtp-header-toggle-flag button').hide();

        // Highlight Tablerows onmousover
        $('#vtp-content').on('mouseenter', 'tr', function (e) {
            if ($(this).parent().parent().hasClass('st-container')) {
                return;
            }
            $(this).addClass('vtp-hilight');
        });
        $('#vtp-content').on('mouseleave', 'tr', function (e) {
            if ($(this).parent().parent().hasClass('st-container')) {
                return;
            }
            $(this).removeClass('vtp-hilight');
        });
    };
}

export { ResourceList };

window.resourceList = new ResourceList();
