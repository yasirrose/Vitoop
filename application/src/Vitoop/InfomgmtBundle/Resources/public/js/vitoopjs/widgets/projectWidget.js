import Widget from './widget';

export default class ProjectWidget extends Widget {
    constructor(resourceId, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-project';
        this.containerId = '#'+this.containerName;
        this.buttonSaveId = '#project_name_save';
        this.projectFormId = '#form-assign-project';
    }

    init() {
        let self = this;
        const userProjectsNumber = $('#project_name_name option').length;
        const noProjectsElm = document.querySelector('#vtp-projectbox-no-project');
        if (noProjectsElm !== null) noProjectsElm.style.display = userProjectsNumber > 1 ? 'none' : 'block';
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
    }
}
