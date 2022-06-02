import Widget from './widget';
import HelpButton from "../components/HelpButton";

export default class TagWidget extends Widget {
    constructor(resourceId, baseUrl) {
        super();
        this.resourceId = resourceId;
        this.baseUrl = baseUrl;
        this.containerName = 'resource-tag';
        this.containerId = '#'+ this.containerName;
        this.lastSelectedTagId = null;
        this.hideHelpButton = false;
    }

    init() {
        let self = this;
        $(self.containerId + ' input[type=submit]').button({
            icons: {
                primary: "ui-icon-tag"
            }
        });
        $('#tag_text').autocomplete({
            source: self.baseUrl + (['tag', 'suggest'].join('/')) + '?id=' + self.resourceId,
            minLength: 1,
            appendTo: 'body',
            response: function (e, ui) {
                if (0 === ui.content.length) {
                    ui.content.push({label:".. das tag existiert nicht - neu anlegen?", value:""});
                    return;
                }
            }
        }).data("ui-autocomplete")._renderItem = function (ul, item) {
            var dropdownItem = $("<li>").attr("data-value", item.value);
            if (item.value == '') {
                dropdownItem = $("<li class='ui-state-disabled' style='margin: 0px'>").attr("data-value", item.value);
            }

            return dropdownItem
                .append(item.label)
                .appendTo(ul);
        };

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

        if (!vitoopState.getters.getProject && !vitoopState.state.conversationInstance && !vitoopState.state.lexicon &&
            !this.hideHelpButton
        ) {
            $('#tag_search').show();
            self.disableButtonById('#tag_search');
        } else {
            $('#tag_search').hide();
        }

        $('.vtp-tagbox-tag').click(function() {
            self.lastSelectedTagId = $(this).data('id');
            $('#tag_text').val($('#vtp-tag-text-'+self.lastSelectedTagId).text());

            self.enableButtonById('#tag_search');
            self.enableButtonById('#tag_admin_save');
            self.enableButtonById('#tag_admin_remove');
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
                $('.vtp-tag-text').each(function(index) {
                    let text = $(this).text();

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

        $('#tag_admin_save').on('click', function () {
            if (!self.lastSelectedTagId) {
                return;
            }
            let tag = $('#tag_text').val();
            axios.post('/api/v1/tags/'+self.lastSelectedTagId, {name:  tag})
                .then((response) => {
                    $('#vtp-tag-text-'+self.lastSelectedTagId).text(tag);
                    VueBus.$emit('notification:show', 'Tag has been saved');
                })
                .catch(err => console.dir(err));
        });

        $('#tag_admin_remove').on('click', function () {
            if (!self.lastSelectedTagId) {
                return;
            }
            axios.delete('/api/v1/tags/'+self.lastSelectedTagId)
                .then((response) => {
                    $('#tag_text').val('');
                    $('#spanTag_'+self.lastSelectedTagId).remove();
                    self.lastSelectedTagId = null;
                    VueBus.$emit('notification:show', 'Tag has been removed');
                })
                .catch(err => console.dir(err));
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
            self.disableButtonById('#tag_confirm_save');
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

        $('#vtp-tagbox-help').on('click', function() {
            vitoopApp.helpButton.inDialog = $(this).attr('help-area') === 'tag';
            vitoopApp.helpButton.setHelpArea($(this).attr('help-area'));
            $('#vtp-res-dialog').dialog('close');
            $('#vtp-res-dialog-help').dialog('open');
        });

        // window.vitoopApp.helpButton.tagReinit();
    }

    enableButtonById(buttonId) {
        $(buttonId).prop('disabled', false);
        $(buttonId).removeClass('ui-button-disabled ui-state-disabled');
    }

    disableButtonById(buttonId) {
        $(buttonId).prop('disabled', true);
        if (!$(buttonId).hasClass('ui-button-disabled')) {
            $(buttonId).addClass('ui-button-disabled');
        }
        if (!$(buttonId).hasClass('ui-state-disabled')) {
            $(buttonId).addClass('ui-state-disabled');
        }
    }
}
