import Widget from './widget';
import TinyMCEInitializer from '../components/TinyMCEInitializer';

export default class RemarkWidget extends Widget {
    constructor(resourceId, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-remark';
        this.containerId = '#' + this.containerName;
        this.buttonSaveId = '#remark_save';
        this.remarkFormId = '#form-remark';
        this.remarkBoxId = '#vtp-remark-box';
        this.remarkSheetViewId = '#vtp-remark-sheet-view';
        this.remarkAcceptedId = '#remark-accepted';
    }

    init() {
        let self = this;
        $(self.buttonSaveId).addClass('ui-state-disabled');

        if ($(self.remarkAcceptedId).length) {
            document.querySelector(this.remarkAcceptedId).addEventListener('change', e => this.changeClassOfButton(e, this))
        }

        // let setIntervalForText = function() {
        //     return setInterval(self.changeClassOfButton, 2000);
        // };

        $(self.remarkFormId).on('submit', function(event) {
            if (($(self.remarkAcceptedId).length > 0) && ($(self.remarkAcceptedId).prop('checked') == false)) {
                event.preventDefault();
                event.stopPropagation();
            }
            $('#tab-title-remark').removeClass('ui-state-no-content');
        });

        $('.remarks-button').on('click', function () {
            tinyMCE.activeEditor.setContent($(this).attr('data-text'));
        });

        self.initTinyMCE();
        self.initLockButton();
        // setTimeout(setIntervalForText, 2000);

        $(self.remarkFormId).ajaxForm({
            delegation: true,
            dataType: 'json',
            success: function (responseJSON, textStatus, jqXHR, form) {
                self.replaceContainer(self.containerName, responseJSON[self.containerName]);
                tinymce.execCommand('mceRemoveEditor', true, "remark_text");
                self.init();
            },
            error: function (jqXHR, textStatus, errorThrown, $form) {
                $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
            }
        });

        self.uifyContainer(self.containerName);
    }

    changeClassOfButton(e) {
        if (e.target.checked) {
            $(this.buttonSaveId).removeClass('ui-state-disabled');
        } else {
            $(this.buttonSaveId).addClass('ui-state-disabled');
        }

        if (tinyMCE.activeEditor && tinyMCE.activeEditor.isDirty() &&
            (($(RemarkWidget.remarkAcceptedId).length == 0) ||
                ($(RemarkWidget.remarkAcceptedId).prop('checked')))
        ) {
            $(RemarkWidget.buttonSaveId).addClass('ui-state-active'); // ui-state-need-to-save
        } else {
            $(RemarkWidget.buttonSaveId).removeClass('ui-state-active'); // ui-state-need-to-save
        }
    };
    initTinyMCE() {
        let self = this;
        if ($(self.remarkSheetViewId).length !== 0) {
            $(self.remarkBoxId).show();
            return;
        }
        let tinyInit = new TinyMCEInitializer();
        let options = tinyInit.getCommonOptions();
        options.selector = 'textarea#remark_text';
        options.setup = function (editor) {
            editor.on('init', function (e) {
                $(self.remarkBoxId).show();
            }),
            editor.on('change', function (e) {
                $('.remark-agreement').css('display','flex');
                self.changeClassOfButton(e);
            });
        };
        tinyMCE.init(options);
    }
    initLockButton() {
        // Toggle lock/unlock-button initialization
        let btnLockRemark = $(this.containerId + ' input#remark_locked:checkbox');
        btnLockRemark.filter(':not(:checked)').button({
            icons: {
                primary: "ui-icon-unlocked"
            },
            text: false,
            label: "unlocked"
        });
        btnLockRemark.filter(':checked').button({
            icons: {
                primary: "ui-icon-locked"
            },
            text: false,
            label: "locked"
        });
        // Toggle lock/unlock-button eventhandler
        btnLockRemark.on('click', function () {
            $(this).filter(':checked').button("option", {
                icons: {
                    primary: "ui-icon-locked"
                },
                label: 'locked'
            }).addClass('vtp-button');
            $(this).filter(':not(:checked)').button("option", {
                icons: {
                    primary: "ui-icon-unlocked"
                },
                label: 'unlocked'
            });
        });
    }
}
