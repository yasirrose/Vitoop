var init = function() {
    $('#open_lexicon_link').button();
    $('#lexicon_name_save, #lexicon_name_new_lexicon_save').on('click', function() {
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
        minLength: 1,
        appendTo: 'body'
    });
    $('form#form-assign-lexicon').ajaxForm({
        delegation: true,
        dataType: 'json',
        success: [ function(data) {
            $('#lexicon-tags').html(data['resource-lexicon']);
            init();
            $('#lexicon_name_name').focus();
        }],
        error: function (jqXHR, textStatus, errorThrown, $form) {
            $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
        }

    });
    $('#lexicon-tags input[type=submit]').button({
        icons: {
            primary: "ui-icon-disk"
        }
    });
    !$('#lexicon-tags .vtp-uiinfo-info').length || $('#lexicon-tags .vtp-uiinfo-info').position({
        my: 'right top',
        at: 'right bottom',
        of: '#lexicon-tags .vtp-uiinfo-anchor',
        collision: 'none'
    }).hide("fade", 3000);

    $('.vtp-lexiconbox-item').click(function() {
        $('#open_lexicon_link').attr('href', $(this).data('link')).show(400);
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
    $('#lexicon_name_name').on("input", function() {
        $('#open_lexicon_link').hide(400);
    });
    if ($('#lexicon_name_can_add').val() != "1") {
        $('#lexicon_name_save').button('disable');
        $('#lexicon_name_new_lexicon_save').button('disable');
    }
    if ($('#lexicon_name_can_remove').val() != "1") {
        $('#lexicon_name_remove').button('disable');
    }
};
