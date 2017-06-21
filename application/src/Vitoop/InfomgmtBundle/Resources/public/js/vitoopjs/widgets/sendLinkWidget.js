function SendLinkWidget() {

}

SendLinkWidget.prototype = Object.create(Widget.prototype);
SendLinkWidget.prototype.formId = '#form-user-links';
SendLinkWidget.prototype.containerName = 'vtp-res-dialog-links';
SendLinkWidget.prototype.init = function () {
    var self = this;
    var linkStorage = new LinkStorage();
    var resources = linkStorage.getAllResorcesByTypes();
    var resourceIds = new Array();
    $('#form-user-links-info').html('');
    for (var resourceType in resources) {
        for (var resourceId in resources[resourceType]) {
            $('#form-user-links-info').append(
                '<div class="vtp-send-type">'+this.getResourceTypeName(resourceType)+':</div>' +
                '<div class="vtp-send-name">'+resources[resourceType][resourceId].name+'</div>' +
                '<div class="vtp-clear"></div>'
            );
            resourceIds.push(resourceId);
        }
    }

    $('#send_links_resourceIds').val(resourceIds);

    $(self.formId).ajaxForm({
        delegation: true,
        dataType: 'html',
        success: function (responseJSON, textStatus, jqXHR, form) {
            self.replaceContainer(self.containerName, responseJSON);
            self.init();
        },
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }
    });
};

SendLinkWidget.prototype.getFormFromServer = function (route) {
    var self = this;
    $.get(route, function (responseJSON, textStatus, jqXHR, form) {
        self.replaceContainer(self.containerName, responseJSON);
        self.init();
    })
};

SendLinkWidget.prototype.getResourceTypeName = function (resourceType) {
    switch (resourceType) {
        case 'teli':
            return 'Textlink';
        case 'book':
            return 'Buch';
        case 'adr':
            return 'Adresse';
    };

    return resourceType;
};