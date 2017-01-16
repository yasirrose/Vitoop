/**
 * JavaScript GUI for Vitoop Module: resource_project.js
 */

resourceProject = (function () {

    var query = $.deparam.querystring();

    var  queryEditMode = query.edit;


    var init = function () {
        tinymce.init({
            selector: 'textarea#project_data_sheet',
            width: 560,
            height: 600,
            plugins: 'textcolor link projecturl',
            menubar: false,
            skin : "vitoop",
            formats: {
                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
                bold: { inline: 'span', 'classes': 'bold' },
                italic: { inline: 'span', 'classes': 'italic' },
                underline: { inline: 'span', 'classes': 'underline', exact: true },
                strikethrough: { inline: 'del' },
            },
            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink projecturl'
        });

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

        tinymce.init({
            selector: 'textarea#user_data_sheet',
            width: 560,
            height: 600,
            plugins: 'textcolor link projecturl',
            skin : "vitoop",
            menubar: false,
            formats: {
                alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
                aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
                alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
                alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
                bold: { inline: 'span', 'classes': 'bold' },
                italic: { inline: 'span', 'classes': 'italic' },
                underline: { inline: 'span', 'classes': 'underline', exact: true },
                strikethrough: { inline: 'del' },
            },
            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink projecturl'
        });

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
