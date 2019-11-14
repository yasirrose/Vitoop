import TinyMCEInitializer from "./TinyMCEInitializer";

export default class HelpButton {
    constructor(){
        this.helpPopupId = '#vtp-res-dialog-help';
        this.isAdmin = false;
        this.resetScroll();
        this.inDialog = false;
        let self = this;

        $(this.helpPopupId).dialog({
            autoOpen: false,
            width: 850,
            height: 570,
            position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
            modal: true,
            open: () => {
                this.loadContent();
            },
            close: () => {
                tinyMCE.remove('textarea#help-text');
                $('#vtp-res-dialog-help').empty();
                if (this.inDialog) {
                    $('#vtp-res-list tr td.ui-state-active:first').click();
                }
            }
        });

        $('#button-help').on('click', function() {
            self.resetScroll();
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
                    let element = $(`
                        <input type="hidden" id="help-id" value="' + answer.help.id + '">
                        <div class="vtp-fh-w100">
                            <textarea id="help-text"></textarea>
                        </div>
                        <div class="vtp-fh-w100">
                            <button class="ui-corner-all ui-state-default" id="button-help-save">speichern</button>
                        </div>
                    `);
                    $('#help-text', element).val(answer.help.text);
                    $('#vtp-res-dialog-help').append(element);
                    let tinyInit = new TinyMCEInitializer();
                    let options = tinyInit.getCommonOptions();
                    options.mode = 'exact';
                    options.selector = 'textarea#help-text';
                    options.id = 'tiny-help';
                    options.height = 400;
                    options.plugins.push('code');
                    options.relative_urls = false;
                    options.remove_script_host = false;
                    options.convert_urls = true;
                    options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | code';

                    tinyMCE.init(options)
                        .then(() => {
                            self.scroll();
                        });

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
                                }, 1000);
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
            const offset = $(tinymce.activeEditor.getBody()).find(this.currentElementId)[0].offsetTop;
            $(tinymce.activeEditor.dom.doc.documentElement)[0].scrollTop = offset;
            return;
        }

        $(this.helpPopupId).find(this.currentElementId).get(0).scrollIntoView();
    }
}