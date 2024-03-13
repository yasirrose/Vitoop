import Widget from './widget';

export default class LexiconWidget extends Widget {
    constructor(resourceId, baseUrl){
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-lexicon';
        this.containerId = '#'+this.containerName;
        this.buttonSaveId = '#lexicon_name_save';
        this.buttonSaveIdTwo = '#lexicon_name_new_lexicon_save';
        this.lexiconFormId = '#form-assign-lexicon';
    }

    init() {
        let self = this;
        $(self.buttonSaveId + ',' + self.buttonSaveIdTwo).on('click', function() {
            $('#tab-title-rels').removeClass('ui-state-no-content');
            var return_data = false;
            $(".lexicon_exrta_textarea").css("display", "none");
            var lex_name = $('#lexicon_name_name').val();
            $("#lexicon_name_description").html('');
            $("#lexicon_name_description_footer").html('');
            if (lex_name !== "") {
                $.ajax({
                    method: 'POST',
                    url: vitoop.baseUrl + ([self.resourceId, 'lexicon-exist'].join('/')),
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        lexicon_name: lex_name,
                    }),
                    success: function (data) {
                        if (data.success == false) {
                            $(".lexicon_exrta_textarea").css("display", "block");
                            if (data.description != "") {
                                $("#lexicon_name_description").html(data.description);
                                $("#lexicon_name_description_footer").html(data.lexicon_footer);
                            }
                            return_data = true;
                        } else {
                            $('#form-assign-lexicon').submit();
                        }
                    }
                });
            }
            return return_data;
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
            appendTo: 'body',
            select: function (event, ui) {
                var selectedValue = ui.item ? ui.item.value : null;
                if (selectedValue) {
                    $.ajax({
                        method: 'POST',
                        url: vitoop.baseUrl + ([self.resourceId, 'lexicon-exist'].join('/')),
                        dataType: 'json',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            lexicon_name: selectedValue,
                        }),
                        success: function (data) {
                            if (data.success == false) {
                                console.log(data.success);
                                $('.vtp-new-lexicon-save').removeClass('vtp-hide');
                            } else {
                                $('.vtp-new-lexicon-save').addClass('vtp-hide');
                            }
                        }
                    });
                }
            }
        });
        $(self.containerId + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-disk"
            }
        });

        $('.vtp-lexiconbox-item').click(function() {
            let text = $(this).text().trim();
            let pos = text.search(new RegExp('\\(\\d+\\)'));
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

        if ($(self.lexiconFormId + ' .vtp-uiinfo-info').length) {
            $(self.lexiconFormId + ' .vtp-uiinfo-info').hide("fade", 3000);
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

        $('#lexicon_detail_save_btn').click(function (event) {
            var lexicon_detail_box = $('.lexicon_detail_box').val();
            if (lexicon_detail_box != "") {
                self.lexiconFormId.submit();
            }
        });

        $('#lexicon_detail_cancel_btn').click(function (event) {
            $(".lexicon_exrta_textarea").css("display", "none");
            return false;
        });

    }
}


