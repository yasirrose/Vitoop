var init = function() {
    $('form#form-tag-lexicon').ajaxForm({
        delegation: true,
        dataType: 'json',
        success: [ function(data) {
            $('#lexicon-tags').html(data['resource-tag']);
            init();
            $('#tag_lexicon_text').focus();
            $('#div-confirm-tagging-lexicon').hide();

        }],
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }

    });
    $('#tag_lexicon_text').autocomplete({
        source: vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + getResId(),
        minLength: 2,
        appendTo: 'body'
    });
    $('.vtp-uiaction-tag-lexicon-showown').button({
        icons: {
            primary: "ui-icon-lightbulb"
        },
        text: false
    });
    $('.vtp-uiaction-tag-lexicon-showown').on('change', function () {
        $('#vtp-tagbox-lexicon .vtp-owntag').toggleClass('vtp-owntag-hilight');
    });
    $('.vtp-uiaction-tag-lexicon-showown:checked').triggerHandler('change');
    $('#tags-lexicon-fieldset input[type=submit]').button({
        icons: {
            primary: "ui-icon-tag"
        }
    });
    !$('#tags-lexicon-fieldset .vtp-uiinfo-info').length || $('#tags-lexicon-fieldset .vtp-uiinfo-info').position({
        my: 'left bottom',
        at: 'right top',
        of: '#tags-lexicon-fieldset .vtp-uiinfo-anchor',
        collision: 'none'
    }).hide("fade", 3000);
    $('.vtp-tagbox-lexicon-tag-lexicon').click(function() {
        var text = $(this).text().trim();
        var pos = text.search(new RegExp('\\(\\d+\\)'));
        if (pos > -1) {
            text = text.substring(0, pos).trim();
        }
        $('#tag_lexicon_text').val(text);
    });

    $('#tag_lexicon_confirm_save').on('click', function() {
        if ($('#tag_lexicon_text').val() == "") {
            return false;
        }
        var tagExist = false;
        $('ul.ui-autocomplete > li').each(function(index) {
            if ($(this).text().toLowerCase() == $('#tag_lexicon_text').val().toLowerCase()) {
                tagExist = true;
                return false;
            }
        });
        console.log('tagExist: '+ tagExist);
        if (!tagExist) {
            $('div#vtp-tagbox-lexicon > span').each(function(index) {
                var text = $(this).text().trim();
                var pos = text.search(new RegExp('\\(\\d+\\)'));
                if (pos > -1) {
                    text = text.substring(0, pos).trim();
                }
                if (text.toLowerCase() == $('#tag_lexicon_text').val().toLowerCase()) {
                    tagExist = true;
                    return false;
                }
            });
        }
        if (tagExist) {
            $('#tag_lexicon_save').trigger('click');
        } else {
            $('#tag_lexicon_confirm_save').hide();
            $('#tag_lexicon_remove').hide();
            $('#div-confirm-tagging-lexicon').show();
        }
    });

    $('#tag_lexicon_cancel_save').on('click', function() {
        $('#tag_lexicon_confirm_save').show();
        $('#tag_lexicon_remove').show();
        $('#div-confirm-tagging-lexicon').hide();
        $('#tag_lexicon_text').val('');
    });

    $('.vtp-tag-lexicon-submit').click(function(event) {
        var input = $('#tag_lexicon_text');
        var text = input.val();
        if (text == "") {
            input.focus();
            event.preventDefault();
            return false;
        }
    });

    if ($('#tag_lexicon_can_add').val() != "1") {
        $('#tag_lexicon_save').button('disable');
        $('#tag_lexicon_confirm_save').prop('disabled', true);
        $('#tag_lexicon_confirm_save').addClass('ui-button-disabled ui-state-disabled');
    }
    if ($('#tag_lexicon_can_remove').val() != "1") {
        $('#tag_lexicon_remove').button('disable');
    }
};