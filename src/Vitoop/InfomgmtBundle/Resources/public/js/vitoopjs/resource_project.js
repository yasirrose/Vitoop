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

        $('#project_data_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });



        $('#vtp-projectdata-project-close').on('click', function () {
            location.href = vitoop.baseUrl + 'prj/';
        });

        var editButton = $('#vtp-projectdata-project-edit');
        var liveButton = $('#vtp-projectdata-project-live');

        if ((typeof queryEditMode != 'undefined') && (queryEditMode == 1)) {
            editButton.addClass('vtp-icon-active');
            liveButton.removeClass('vtp-icon-active');
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
            liveButton.addClass('vtp-icon-active');
            editButton.removeClass('vtp-icon-active');
            editButton.on('click', function () {
                location.href = location.href + '?edit=1';
            });
        }

        $('#vtp-lexicondata-lexicon-close').on('click', function () {
            location.href = vitoop.baseUrl + 'lex/';
        });

        tinymce.init({
            selector: 'textarea#user_data_sheet',
            width: 560,
            height: 600,
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
