function TagWidget(resourceId, baseUrl) {
    this.resourceId = resourceId;
    this.baseUrl = baseUrl;
}
TagWidget.prototype = Object.create(Widget.prototype);
TagWidget.prototype.containerName = 'resource-tag';
TagWidget.prototype.containerId = '#'+ TagWidget.prototype.containerName;
TagWidget.prototype.constructor = TagWidget;
TagWidget.prototype.init = function () {
    var self = this;
    $(self.containerId + ' input[type=submit]').button({
        icons: {
            primary: "ui-icon-tag"
        }
    });
    $('#tag_text').autocomplete({
        source: self.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + self.resourceId,
        minLength: 2,
        appendTo: 'body'
    });

    $('#tag_text').keypress(function(e) {
        if(e.keyCode === 13) {
            e.preventDefault();
            $(this).autocomplete('close');
            $('#tag_confirm_save').click();
        }
    });

    $('.vtp-uiaction-tag-showown').button({
        icons: {
            primary: "ui-icon-lightbulb"
        },
        text: false
    });
    $('.vtp-uiaction-tag-showown').on('change', function () {
        $('#vtp-tagbox .vtp-owntag').toggleClass('vtp-owntag-hilight');
    });
    $('.vtp-uiaction-tag-showown:checked').triggerHandler('change');
    !$('#' + this.containerName + ' .vtp-uiinfo-info').length || $('#' + this.containerName + ' .vtp-uiinfo-info').position({
        my: 'left bottom',
        at: 'right top',
        of: '#' + this.containerName + ' .vtp-uiinfo-anchor',
        collision: 'none'
    }).hide("fade", 3000);
    $('.vtp-tagbox-tag').click(function() {
        var text = $(this).text().trim();
        var pos = text.search(new RegExp('\\(\\d+\\)'));
        if (pos > -1) {
            text = text.substring(0, pos).trim();
        }
        $('#tag_text').val(text);
    });

    $('#tag_confirm_save').on('click', function() {
        if ($('#tag_text').val() == "") {
            return false;
        }
        var tagExist = false;
        $('ul.ui-autocomplete > li').each(function(index) {
            if ($(this).text().toLowerCase() == $('#tag_text').val().toLowerCase()) {
                tagExist = true;
                return false;
            }
        });
        if (!tagExist) {
            $('div#vtp-tagbox > span').each(function(index) {
                var text = $(this).text().trim();
                var pos = text.search(new RegExp('\\(\\d+\\)'));
                if (pos > -1) {
                    text = text.substring(0, pos).trim();
                }
                if (text.toLowerCase() == $('#tag_text').val().toLowerCase()) {
                    tagExist = true;
                    return false;
                }
            });
        }
        if (tagExist) {
            $('#tag_save').trigger('click');
        } else {
            $('#tag_confirm_save').hide();
            $('#tag_remove').hide();
            $('#div-confirm-tagging').show();
        }
    });

    $('#tag_cancel_save').on('click', function() {
        $('#tag_confirm_save').show();
        $('#tag_remove').show();
        $('#div-confirm-tagging').hide();
        $('#tag_text').val('');
    });

    $('.vtp-tag-submit').click(function(event) {
        var input = $('#tag_text');
        var text = input.val();
        if (text == "") {
            input.focus();
            event.preventDefault();
            return false;
        }
    });

    if ($('#tag_can_add').val() != "1") {
        $('#tag_save').button('disable');
        $('#tag_confirm_save').prop('disabled', true);
        $('#tag_confirm_save').addClass('ui-button-disabled ui-state-disabled');
    }
    if ($('#tag_can_remove').val() != "1") {
        $('#tag_remove').button('disable');
    }

    $('#form-tag').ajaxForm({
        delegation: true,
        dataType: 'json',
        success: function (responseJSON, textStatus, jqXHR, form) {
            self.replaceContainer(self.containerName, responseJSON[self.containerName]);
            $('#tag_text').focus();
            $('#div-confirm-tagging').hide();
            self.init();
        },
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }
    });
};
