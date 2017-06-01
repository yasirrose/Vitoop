function ProjectWidget(resourceId, baseUrl) {
    this.resourceId = resourceId;
    this.baseUrl = baseUrl;
}

ProjectWidget.prototype = Object.create(Widget.prototype);
ProjectWidget.prototype.constructor = ProjectWidget;
ProjectWidget.prototype.containerName = 'resource-project';
ProjectWidget.prototype.containerId = '#'+ProjectWidget.prototype.containerName;
ProjectWidget.prototype.buttonSaveId = '#project_name_save';
ProjectWidget.prototype.projectFormId = '#form-assign-project';
ProjectWidget.prototype.init = function () {
    var self = this;
    $(self.buttonSaveId).on('click', function() {
        $('#tab-title-rels').removeClass('ui-state-no-content');
    });
    $('#project_name_name').autocomplete({
        source: self.baseUrl + (['prj', 'suggest'].join('/')),
        minLength: 2,
        appendTo: 'body'
    });
    $(self.containerId + ' input[type=submit]').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });
    
    $(self.projectFormId).ajaxForm({
        delegation: true,
        dataType: 'json',
        success: function (responseJSON, textStatus, jqXHR, form) {
            self.replaceContainer(self.containerName, responseJSON[self.containerName]);
            self.init();
        },
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }
    });

    $(self.containerId +' select').selectmenu({
        select: function( event, ui ) {
            $('span.ui-selectmenu-button').removeAttr('tabIndex');
        }
    });
    $('span.ui-selectmenu-button').removeAttr('tabIndex');
};


