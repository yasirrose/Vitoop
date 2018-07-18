/**
 * JavaScript GUI for Vitoop Module: user_interaction.js
 */

import TinyMCEInitializer from './components/TinyMCEInitializer';

window.userInteraction = (function () {

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

        $('#button-checking-links').button({});
        $('#button-checking-links-send').button({});
        $('#button-checking-links-remove').button({
            icons: {
                    primary: "ui-icon-close"
                },
            text: false,
        });

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
        $('#button-user-agreed').addClass('ui-button-disabled ui-state-disabled');
        $('#user_agreed_datap').on('change', function () {
            if ($('#user_agreed_datap').prop('checked') == false) {
                $('#button-user-agreed').attr('disabled','disabled');
                $('#button-user-agreed').addClass('ui-button-disabled ui-state-disabled');
            } else {
                $('#button-user-agreed').removeAttr('disabled');
                $('#button-user-agreed').removeClass('ui-button-disabled ui-state-disabled');
            }
        });

        $('#user_save').attr('disabled','disabled');
        $('#user_save').addClass('ui-button-disabled ui-state-disabled');
        $('#user_registration_approve').on('change', function () {
            if ($('#user_registration_approve').prop('checked') == false) {
                $('#user_save').attr('disabled','disabled');
                $('#user_save').addClass('ui-button-disabled ui-state-disabled');
            } else {
                $('#user_save').removeAttr('disabled');
                $('#user_save').removeClass('ui-button-disabled ui-state-disabled');
            }
        });

        $('#user_show_help').on('change', function () {
            $.ajax({
                method: "PATCH",
                url: vitoop.baseUrl + "api/user/me",
                data:JSON.stringify({
                    is_show_help: $('#user_show_help').prop('checked')
                }),
                dataType: 'json',
                success: function(data){
                    vitoop.isShowHelp = data.is_show_help;
                    if (data.is_show_help == false) {
                        $('#vtp-bigclosehelp').show();
                    } else {
                        $('#vtp-bigclosehelp').hide();
                    }
                }
            });
        });

        var tinyInit = new TinyMCEInitializer();
        var options = tinyInit.getCommonOptions();
        options.selector = 'textarea#vitoop_blog_sheet';
        options.width = 615;
        options.height = 600;
        options.plugins = ['textcolor', 'link', 'media', 'code'];
        options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code'

        tinymce.init(options);
    };

    return {
        init: init
    };
}());
