/**
 * JavaScript GUI for Vitoop Module: resource_project.js
 */

import TinyMCEInitializer from './components/TinyMCEInitializer';
import HttpService from "./services/HttpService";

window.resourceProject = (function () {
    var query = HttpService.prototype.parseParams(window.location.href);
    var queryEditMode = query.edit;

    var init = function () {
        var tinyInit = new TinyMCEInitializer();
        var options = tinyInit.getCommonOptions();
        options.selector = 'textarea#project_data_sheet';
        options.width = 560;
        options.height = 600;
        options.plugins = ['textcolor', 'link', 'projecturl'];
        options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink projecturl'
        tinymce.init(options);

        $('#project_data_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('#vtp-lexicondata-lexicon-close').button({
            icons: {
                primary: "ui-icon-close"
            },
            title: 'schließen'
        });

        $('#vtp-lexicondata-lexicon-close').on('click', function () {
            location.href = vitoop.baseUrl + 'lex/';
        });

        options.selector = 'textarea#user_data_sheet';
        tinymce.init(options);

        $('#user_data_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        !$('#vtp-userdata-box .vtp-uiinfo-info').length || $('#vtp-userdata-box .vtp-uiinfo-info').position({
            my: 'right top',
            at: 'left bottom',
            of: '#vtp-userdata-box .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 3000);
    };

    return {
        init: init
    };
}());
