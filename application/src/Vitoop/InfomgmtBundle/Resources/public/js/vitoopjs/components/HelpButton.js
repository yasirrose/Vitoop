import TinyMCEInitializer from "./TinyMCEInitializer";

export default class HelpButton {
    constructor(){
        this.helpPopupId = '#vtp-res-dialog-help';
        this.isAdmin = false;
        this.resetScroll();
        let self = this;
        $(this.helpPopupId).dialog({
            autoOpen: false,
            width: 850,
            height: 600,
            position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
            modal: true,
            open: function () {
                self.scroll();
            },
            close: function () {
                if ('#vtp-help-tag' === self.currentElementId) {
                    $('#vtp-res-list tr td.ui-state-active:first').click();
                   // $('#vtp-res-dialog').dialog('open');
                }
            }
        });

        $('#button-help, #vtp-search-help').on('click', function() {
            self.resetScroll();
            $(self.helpPopupId).dialog('open');
        });

        $('.vtp-help-area-button').on('click', function () {
            self.setHelpArea($(this).attr('help-area'));
            $(self.helpPopupId).dialog('open');
        });
    }

    loadContent() {
        let self = this;
        $.ajax({
            url: vitoop.baseUrl +'api/help',
            method: 'GET',
            success: function(answer) {
                self.isAdmin = answer.isAdmin;
                if (answer.isAdmin) {
                    let element = $('<input type="hidden" id="help-id" value="' + answer.help.id + '"><div class="vtp-fh-w100"><textarea id="help-text"></textarea></div><div class="vtp-fh-w100"><button class="ui-corner-all ui-state-default" id="button-help-save">speichern</button></div>');
                    $('#help-text', element).val(answer.help.text);
                    $('#vtp-res-dialog-help').append(element);
                    setTimeout(function() {
                        let tinyInit = new TinyMCEInitializer();
                        let options = tinyInit.getCommonOptions();
                        options.mode = 'exact';
                        options.selector = 'textarea#help-text';
                        options.id = 'tiny-help';
                        options.height = 430;
                        options.plugins.push('code');
                        options.relative_urls = false;
                        options.remove_script_host = false;
                        options.convert_urls = true;
                        options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | code';

                        tinyMCE.init(options);
                    }, 2000);

                    $('#button-help-save').on('click', function() {
                        tinyMCE.triggerSave();
                        $.ajax({
                            url: vitoop.baseUrl +'api/help',
                            method: 'POST',
                            data: JSON.stringify({'id': $('#help-id').val(), 'text': $('#help-text').val()}),
                            success: function(data) {
                                let elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>Help message saved!</div>');
                                $('#button-help-save').before(elemSuccess);
                                setTimeout(function() {
                                    elemSuccess.hide(400);
                                }, 2000);
                            }
                        });
                    });
                } else {
                    $('#vtp-res-dialog-help').append(answer.help.text);
                }
            }
        });
    }

    tagReinit() {
        let self = this;
        $('#form-tag .vtp-help-area-button').off().on('click', function () {
            self.setHelpArea($(this).attr('help-area'));
            $('#vtp-res-dialog').dialog('close');
            $(self.helpPopupId).dialog('open');
        });
    }

    setHelpArea(helpArea) {
        this.currentElementId = '#vtp-help-' + helpArea;
    }

    resetScroll() {
        this.currentElementId = 'p';
    }

    scroll() {
        if (this.isAdmin) {
            $(tinymce.activeEditor.getBody()).find(this.currentElementId).get(0).scrollIntoView();
            return;
        }

        $(this.helpPopupId).find(this.currentElementId).get(0).scrollIntoView();
    }
}