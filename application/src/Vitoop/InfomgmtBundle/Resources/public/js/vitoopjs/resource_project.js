/**
 * JavaScript GUI for Vitoop Module: resource_project.js
 */

resourceProject = (function () {

    var query = $.deparam.querystring();

    var  queryEditMode = query.edit;


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


        $('#vtp-projectdata-project-close').button({
            icons: {
                primary: "ui-icon-close"
            }
        });

        $('#vtp-projectdata-project-edit').button({
            icons: {
                primary: "ui-icon-wrench"
            }
        });

        $('#vtp-projectdata-project-live').button({
            icons: {
                primary: "ui-icon-clipboard"
            }
        });

        $('#vtp-projectdata-project-close').on('click', function () {
            location.href = vitoop.baseUrl + 'prj/';
        });

        var editButton = $('#vtp-projectdata-project-edit');
        var liveButton = $('#vtp-projectdata-project-live');

        if ((typeof queryEditMode != 'undefined') && (queryEditMode == 1)) {
            editButton.addClass('ui-state-active');
            liveButton.removeClass('ui-state-active');
            liveButton.on('click', function () {
                location.href = location.href.replace('?edit=1', '');
            });
            resourceList.maintainResLinks({'edit': 1});

            $('input#new_rel_project_user_name').autocomplete({
                source: vitoop.baseUrl + 'user/names',
                minLength: 2,
                appendTo: 'body'
            });
        } else {
            !$('#vtp-projectdata-box .vtp-uiinfo-info').length || $('#vtp-projectdata-box .vtp-uiinfo-info').position({
                my: 'right top',
                at: 'left bottom',
                of: '#vtp-projectdata-box .vtp-uiinfo-anchor',
                collision: 'none'
            }).hide("fade", 3000);
            liveButton.addClass('ui-state-active');
            editButton.removeClass('ui-state-active');
            editButton.on('click', function () {
                location.href = location.href + '?edit=1';
            });
        }

        
        $('#vtp-lexicondata-lexicon-close').button({
            icons: {
                primary: "ui-icon-close"
            }
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
