function RemarkWidget(resourceId, baseUrl) {
    this.resourceId = resourceId;
    this.baseUrl = baseUrl;
}

RemarkWidget.prototype = Object.create(Widget.prototype);
RemarkWidget.prototype.containerName = 'resource-remark';
RemarkWidget.prototype.containerId = '#'+ RemarkWidget.prototype.containerName;
RemarkWidget.prototype.constructor = RemarkWidget;
RemarkWidget.prototype.buttonSaveId = '#remark_save';
RemarkWidget.prototype.remarkFormId = '#form-remark';
RemarkWidget.prototype.remarkBoxId = '#vtp-remark-box';
RemarkWidget.prototype.remarkAcceptedId = '#remark-accepted';
RemarkWidget.prototype.init = function () {
    var self = this;
    
    if ($(self.remarkAcceptedId).length) {
        $(self.remarkAcceptedId).on('change', self.changeClassOfButton);
    }

    var setIntervalForText = function() {
      return setInterval(self.changeClassOfButton, 2000);
    };

    $(self.remarkFormId).on('submit', function(event) {
        if (($(self.remarkAcceptedId).length > 0) && ($(self.remarkAcceptedId).prop('checked') == false)) {
            event.preventDefault();
            event.stopPropagation();
        }
        $('#tab-title-remark').removeClass('ui-state-no-content');

        return;
    });

    $('.remarks-button').on('click', function () {
        tinyMCE.activeEditor.setContent($(this).attr('data-text'));
    });

    self.initTinyMCE();
    self.initLockButton();
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
            tinymce.execCommand('mceRemoveEditor', true, "remark_text");
            self.init();
        },
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }
    });
};

RemarkWidget.prototype.changeClassOfButton = function() {
    if (tinyMCE.activeEditor && tinyMCE.activeEditor.isDirty() &&
        (($(RemarkWidget.prototype.remarkAcceptedId).length == 0) || 
        ($(RemarkWidget.prototype.remarkAcceptedId).prop('checked')))
    ) {
        $(RemarkWidget.prototype.buttonSaveId).addClass('ui-state-need-to-save');
    } else {
        $(RemarkWidget.prototype.buttonSaveId).removeClass('ui-state-need-to-save');
    }
};

RemarkWidget.prototype.initTinyMCE = function () {
    var self = this;
    tinyMCE.init({
        selector: 'textarea#remark_text',
        height: 300,
        plugins: ['textcolor', 'link', 'placeholder'],
        menubar: false,
        skin : "vitoop",
        formats: {
            alignleft: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'left' },
            aligncenter: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'center' },
            alignright: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'right' },
            alignfull: { selector: 'p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img', classes: 'full' },
            bold: { inline: 'strong' },
            italic: { inline: 'i' },
            underline: { inline: 'u' },
            strikethrough: { inline: 'del' },
        },
        toolbar: 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink',
        setup: function (editor) {
            editor.on('init', function (e) {
                $(self.remarkBoxId).show();
            }),
            editor.on('change', function (e) {
                $('.remark-agreement').show();
            });
        }
    });
};

RemarkWidget.prototype.initLockButton = function () {
     // Toggle lock/unlock-button initialization
    var btnLockRemark = $(this.containerId + ' input#remark_locked:checkbox');
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
};