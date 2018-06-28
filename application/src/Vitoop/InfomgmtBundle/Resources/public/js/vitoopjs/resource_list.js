/**
 * JavaScript GUI for Vitoop Module: resource_list.js
 */

import LinkStorage from './linkstorage';
import SecondSearch from './components/SecondSearch';


class ResourceList {
    constructor() {
        this.currentUrl = location.href;
    }

    loadResourceListPage(e, secondSuccessFunc) {
        let url;
        let succ;
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
                    $('#vtp-search-bytags-form, #vtp-search-toggle').show('fade', 'slow');
                    resourceSearch.maintainTaglistbox();
                }
                vitoopApp.secondSearch.show();
                $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                $(e.target).addClass('vtp-nav-active ui-state-active');
                succ = [ResourceList.prototype.insertResourceList];
            } else if ($(e.target).hasClass('vtp-resmenu-homelink')) {
                if ($(e.target).hasClass('vtp-resmenu-homelink-home') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                    $('#vtp-search-bytags-form').hide('fade', 'slow');
                    vitoopApp.secondSearch.close();
                    resourceSearch.maintainTaglistbox(true);
                } else if ($(e.target).hasClass('vtp-resmenu-homelink') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                    vitoopApp.secondSearch.close();
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

        $('#vtp-user-loginform-logout').button({
            icons: {
                secondary: "ui-icon-power"
            }
        });

        $('#vtp-user-loginform-logout').on('click', function () {
            $('#vtp-search-clear').click();
            //clear localstorage
            let datastorage = new LinkStorage();
            datastorage.clearAllResources();
        });

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

        $('#vtp-user-userdata').button({
            icons: {
                primary: "ui-icon-newwin",
            },
            text: false,
            label: 'Einstellungen'
        });

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

window.resourceList = new ResourceList();
