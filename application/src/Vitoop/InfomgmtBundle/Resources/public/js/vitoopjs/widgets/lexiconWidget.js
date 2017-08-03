function LexiconWidget(resourceId, baseUrl) {
    this.resourceId = resourceId;
    this.baseUrl = baseUrl;
}

LexiconWidget.prototype = Object.create(Widget.prototype);
LexiconWidget.prototype.constructor = LexiconWidget;
LexiconWidget.prototype.containerName = 'resource-lexicon';
LexiconWidget.prototype.containerId = '#'+LexiconWidget.prototype.containerName;
LexiconWidget.prototype.buttonSaveId = '#lexicon_name_save';
LexiconWidget.prototype.lexiconFormId = '#form-assign-lexicon';
LexiconWidget.prototype.init = function () {
    var self = this;
    $(self.buttonSaveId).on('click', function() {
        $('#tab-title-rels').removeClass('ui-state-no-content');
    });
    $('#lexicon_name_name').autocomplete({
        source: function (request, response) {
            $.ajax({
                url: 'https://de.wikipedia.org/w/api.php',
                data: {
                    format: 'json',
                    action: 'opensearch',
                    continue: '',
                    limit: 10,
                    namespace: 0,
                    search: request.term
                },
                dataType: 'jsonp',
                cache: true,
                context: $('#lexicon'),
                success: function (data) {
                    response(data[1]);
                }
            });
        },
        minLength: 2,
        appendTo: 'body'
    });
    $(self.containerId + ' input[type=submit]').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });

    $('.vtp-lexiconbox-item').click(function() {
        var text = $(this).text().trim();
        var pos = text.search(new RegExp('\\(\\d+\\)'));
        if (pos > -1) {
            text = text.substring(0, pos).trim();
        }
        $('#lexicon_name_name').val(text);
    });
    $('.vtp-lexicon-submit').click(function(event) {
        var input = $('#lexicon_name_name');
        if (input.val() == "") {
            input.focus();
            event.preventDefault();
        }
    });
    if ($('#lexicon_name_can_add').val() != "1") {
        $('#lexicon_name_save').button('disable');
    }
    if ($('#lexicon_name_can_remove').val() != "1") {
        $('#lexicon_name_remove').button('disable');
    }

    $(self.lexiconFormId).ajaxForm({
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
};
