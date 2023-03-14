import Widget from './widget';
import TinyMCEInitializer from '../components/TinyMCEInitializer';

export default class UserDetailWidget extends Widget {
    constructor(resourceId, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-user_detail';
        this.containerId = '#' + this.containerName;
        this.buttonSaveId = '#user_notes_save';
        this.userDetailFormId = '#form-user-notes';
        this.userDetailBoxId = '#vtp-user-notes-box';
        this.userDetailSheetViewId = '#vtp-user-notes-sheet-view';
    }
    init() {
        let self = this;
        tinymce.execCommand('mceRemoveEditor', true, "user_notes_notes");
        $(self.buttonSaveId).on('click', function () {
            $('#tab-title-user-notes').removeClass('ui-state-no-content');
        });
        $('.user-notes-button').on('click', function () {
            tinyMCE.activeEditor.setContent($(this).attr('data-text'));
        });
        let setIntervalForText = function () {
            return setInterval(function () {
                if (tinyMCE.activeEditor && tinyMCE.activeEditor.isDirty()) {
                    $(self.buttonSaveId).addClass('ui-state-active');
                } else {
                    $(self.buttonSaveId).removeClass('ui-state-active');
                }
            }, 1000);
        };
        self.initTinyMCE();
        setTimeout(setIntervalForText, 1000);
        $(self.containerId + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-pencil"
            }
        });
        $(self.userDetailFormId).ajaxForm({
            delegation: true,
            dataType: 'json',
            success: function (responseJSON, textStatus, jqXHR, form) {
                self.replaceContainer(self.containerName, responseJSON[self.containerName]);
                tinymce.execCommand('mceRemoveEditor', true, "user_notes_notes");
                self.init();
            },
            error: function (jqXHR, textStatus, errorThrown, $form) {
                $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
            }
        });
    }
    initTinyMCE() {
        tinymce.execCommand('mceRemoveEditor', true, "user_notes_notes");
        let self = this;
        if ($(self.userDetailSheetViewId).length !== 0) {
            $(self.userDetailBoxId).show();
            return;
        }
        let tinyInit = new TinyMCEInitializer();
        let options = tinyInit.getCommonOptions();
        options.selector = 'textarea#user_notes_notes';
        options.setup = function (editor) {
            editor.on('init', function (e) {
                $(self.userDetailBoxId).show();
            });
        };
        tinyMCE.init(options);
    }
}