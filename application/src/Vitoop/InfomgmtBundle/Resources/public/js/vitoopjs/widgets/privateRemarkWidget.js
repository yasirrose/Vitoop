function PrivateRemarkWidget(resourceId, baseUrl) {
    this.resourceId = resourceId;
    this.baseUrl = baseUrl;
}

PrivateRemarkWidget.prototype = Object.create(Widget.prototype);
PrivateRemarkWidget.prototype.containerName = 'resource-remark_private';
PrivateRemarkWidget.prototype.containerId = '#'+ PrivateRemarkWidget.prototype.containerName;
PrivateRemarkWidget.prototype.buttonSaveId = '#remark_private_save';
PrivateRemarkWidget.prototype.remarkBoxId = '#vtp-remark-private-box';
PrivateRemarkWidget.prototype.privateRemarkFormId = '#form-remark';
PrivateRemarkWidget.prototype.constructor = PrivateRemarkWidget;
PrivateRemarkWidget.prototype.init = function () {
    var self = this;
    $(self.buttonSaveId).on('click', function() {
        $('#tab-title-remark-private').removeClass('ui-state-no-content');
    });

    var setIntervalForText = function() {
        return setInterval(self.changeClassOfButton, 2000);
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
};

PrivateRemarkWidget.prototype.changeClassOfButton = function() {
    if (tinyMCE.activeEditor && tinyMCE.activeEditor.isDirty()) {
        $(PrivateRemarkWidget.prototype.buttonSaveId).addClass('ui-state-need-to-save');
    } else {
        $(PrivateRemarkWidget.prototype.buttonSaveId).removeClass('ui-state-need-to-save');
    }
};

PrivateRemarkWidget.prototype.initTinyMCE = function () {
    var self = this;
    tinyMCE.init({
        selector: 'textarea#remark_private_text',
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
            });
        }
    });
};

