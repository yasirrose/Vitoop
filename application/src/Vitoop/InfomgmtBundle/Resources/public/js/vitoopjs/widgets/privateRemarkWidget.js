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
    var tinyInit = new TinyMCEInitializer();
    var options = tinyInit.getCommonOptions();
    options.selector = 'textarea#remark_private_text';
    options.setup = function (editor) {
        editor.on('init', function (e) {
            $(self.remarkBoxId).show();
        });
    };
    tinyMCE.init(options);
};

