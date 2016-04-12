/**
 * JavaScript GUI for Vitoop Module: user_interaction.js
 */

userInteraction = (function () {

    var init = function () {

        $('#user_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('#invitation_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('#invitations-toggle').button({

        });

        $('#button-terms-admin').button({

        });
        
        $('#button-data-p').button({});

        $('#invitations-toggle').click(function() {
            $.ajax({
                method: "PUT",
                url: "/invitation/toggle",
                success: function(data){
                    var answer = JSON.parse(data);
                    $('#invitations-toggle > span > span').text(answer.invitation ? 'On' : 'Off');
                }
            });
        });

        !$('#vtp-form-invite .vtp-uiinfo-info').length || $('#vtp-form-invite .vtp-uiinfo-info').position({
            my: 'right bottom',
            at: 'left top',
            of: '#vtp-form-invite .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 5000);

        $('#vitoop_blog_save').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        !$('#vtp-form-vitoop-blog .vtp-uiinfo-info').length || $('#vtp-form-vitoop-blog .vtp-uiinfo-info').position({
            my: 'right bottom',
            at: 'left top',
            of: '#vtp-form-vitoop-blog .vtp-uiinfo-anchor',
            collision: 'none'
        }).hide("fade", 5000);

        $('#button-user-agreed').attr('disabled','disabled');
        $('#user_agreed_datap').on('change', function () {
            if ($('#user_agreed_datap').prop('checked') == false) {
                $('#button-user-agreed').attr('disabled','disabled');
            } else {
                $('#button-user-agreed').removeAttr('disabled');
            }
        });

        tinymce.init({
            selector: 'textarea#vitoop_blog_sheet',
            width: 615,
            height: 600,
            plugins: 'textcolor link media code',
            skin : "vitoop",
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
            toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code'
        });
    };

    return {
        init: init
    };
}());
