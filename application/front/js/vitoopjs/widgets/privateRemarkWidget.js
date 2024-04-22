import Widget from './widget';
import TinyMCEInitializer from '../components/TinyMCEInitializer';

export default class PrivateRemarkWidget extends Widget{
    constructor(resourceId, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-remark_private';
        this.containerId = '#'+ this.containerName;
        this.buttonSaveId = '#remark_private_save';
        this.remarkBoxId = '#vtp-remark-private-box';
        this.privateRemarkFormId = '#form-remark';
    }

    init() {
        let self = this;
        $(self.buttonSaveId).on('click', function() {
            $('#tab-title-remark-private').removeClass('ui-state-no-content');
        });

        let setIntervalForText = function() {
            return setInterval(function () {
                if (tinyMCE.activeEditor && tinyMCE.activeEditor.isDirty()) {
                    $(self.buttonSaveId).addClass('ui-state-active'); // ui-state-need-to-save
                } else {
                    $(self.buttonSaveId).removeClass('ui-state-active'); // ui-state-need-to-save
                }
            }, 2000);
        };
        self.initTinyMCE();
        setTimeout(setIntervalForText, 2000);

        // submitbutton and fadein info
        $(self.containerId + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-pencil"
            }
        });

        $(self.remarkFormId).ajaxForm({
            delegation: true,
            dataType: 'json',
            success: function (responseJSON, textStatus, jqXHR, form) {
                self.replaceContainer(self.containerName, responseJSON[self.containerName]);
                tinymce.execCommand('mceRemoveEditor', true, "remark_private_text");
                self.init();
            },
            error: function (jqXHR, textStatus, errorThrown, $form) {
                $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
            }
        });
    }

    initTinyMCE () {
        let self = this;
        let tinyInit = new TinyMCEInitializer();
        let options = tinyInit.getCommonOptions();
        options.selector = 'textarea#remark_private_text';
        options.setup = function (editor) {
            editor.on('init', function (e) {
                $(self.remarkBoxId).show();
            });
            editor.on('blur', function (e) {
                $(self.buttonSaveId).trigger('click');
            });
        };
        tinyMCE.init(options);
    }
}


