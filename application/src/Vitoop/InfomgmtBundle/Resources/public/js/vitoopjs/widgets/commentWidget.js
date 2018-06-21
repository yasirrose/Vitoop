import Widget from './widget';

export default class CommentWidget extends Widget{
    constructor(resourceId, resourceType, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.resourceType = resourceType;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-comments';
        this.containerId = '#'+this.containerName;
        this.saveButtonId = '#comment_save';
        this.commentFormId = '#form-comment';
    }

    init() {
        let self = this;
        $(self.containerId + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-pencil"
            }
        });
        $(self.saveButtonId).on('click', function() {
            $('#tab-title-comments').removeClass('ui-state-no-content');
        });

        $('.vtp-verstecken').on('click', function () {
            var showHideButton =  $(this);
            $.ajax({
                method: 'PATCH',
                url: self.baseUrl + ([self.resourceType, self.resourceId, 'comments', showHideButton.attr('data-id')].join('/')),
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    isVisible: showHideButton.hasClass('ui-state-active')
                }),
                success: function (data) {
                    if (data.isVisible) {
                        showHideButton.removeClass('ui-state-active');
                    } else {
                        showHideButton.addClass('ui-state-active');
                    }
                }
            });
        });
        $(self.commentFormId).ajaxForm({
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
    }
}

