/**
 * JavaScript GUI for Vitoop Module: resource_project.js
 */

resourceProject = (function () {

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

        !$('#vtp-projectdata-box .vtp-uiinfo-info').length || $('#vtp-projectdata-box .vtp-uiinfo-info').position({
            my: 'right top',
            at: 'left bottom',
            of: '#vtp-projectdata-box .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 3000);

        $('#vtp-projectdata-project-close').on('click', function () {
            location.href = vitoop.baseUrl;
        });

        $('#vtp-lexicondata-lexicon-close').on('click', function () {
            location.href = vitoop.baseUrl;
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
