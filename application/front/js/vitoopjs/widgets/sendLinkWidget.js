import Widget from './widget';
import LinkStorage from '../linkstorage';

export default class SendLinkWidget extends Widget {
    constructor() {
        super();
        this.formId = '#form-user-links';
        this.containerName = 'vtp-res-dialog-links';
        this.linkStorage = new LinkStorage();
        this.comments = {};
    }

    init() {
        let self = this;
        let resources = self.linkStorage.getAllResourcesByTypes();
        let resourceIds = [];
        $('#form-user-links-info').html('');
        $('#form-user-links-info').css('font-size', vitoopState.getters.getListFontSize + 'px');
        let currentRowCounter = 0;
        for (let resourceType in resources) {
            for (let resourceId in resources[resourceType]) {
                let rowClass = 'odd ui-corner-all';
                if (currentRowCounter % 2) {
                    rowClass = 'even ui-corner-all';
                }
                if (!resources[resourceType][resourceId].comment)
                {
                    this.comments[resourceId] = {save: false, text: ''};
                } else {
                    this.comments[resourceId] = resources[resourceType][resourceId].comment;
                }
                $('#form-user-links-info').append(
                    `<tr id="resource_${resourceType}_${resourceId}_row" class="${rowClass}">
                    <td class="vtp-send-type">${this.getResourceTypeName(resourceType)}:</td>
                    <td>
                      <div class="vtp-teasefader-wrapper">
                        ${resources[resourceType][resourceId].name}
                        <div class="vtp-teasefader"></div>
                      </div>
                    </td>
                    <td class="resource-buttons" style="width: 64px;">
                      <button class="vtp-button ui-button ui-widget ui-state-default vtp-uiinfo-anchor ui-corner-all" id="resource_${resourceType}_${resourceId}_comment_button"
                       style="padding: 0 6px 0 6px;">
                        <span class="ui-icon ui-icon-circle-triangle-s"></span>
                       </button>
                      <button class="vtp-button ui-button ui-widget ui-state-default vtp-uiinfo-anchor ui-corner-all"
                       id="resource_${resourceType}_${resourceId}_remove"
                       style="padding: 0 6px 0 6px;">
                        <span class="ui-icon ui-icon-closethick"></span>
                      </button>
                    </td>
                  </tr>
                  <tr id="resource_${resourceType}_${resourceId}_comment_row" class="resource_comment_row ${rowClass}" style="display: none">
                    <td colspan="3">
                      <fieldset class="ui-corner-all margin-top-10">
                        <legend>Kommentar</legend>
                        <div class="vtp-fh-w100">
                          <textarea class="vtp-fh-w100" id="resource_${resourceType}_${resourceId}_comment"
                           style="padding-top: 6px;" rows="10"
                           onchange=""
                          >${this.comments[resourceId] ? this.comments[resourceId].text : ''}</textarea>
                        </div>
                        <div class="vtp-fh-w100">
                          <label class="custom-checkbox__wrapper square-checkbox">
                            <input name="isOpenInSameTabPdf"
                              type="checkbox" class="valid-checkbox open-checkbox-link"
                              id="resource_${resourceType}_${resourceId}_comment_save">
                            <span class="custom-checkbox">
                              <img src="/img/check.png" class="custom-checkbox__check">
                            </span>
                            ${$i18n.t('Comment is adopted in the comments of the data set that are visible to everyone')}
                          </label>
                        </div>
                      </fieldset>
                    </td>
                  </tr>`
                );

                $(`#resource_${resourceType}_${resourceId}_comment_button`).on('click', function (e) {
                    e.preventDefault();
                    if ($(this).hasClass('active')) {
                        $(this).removeClass('active');
                        $(`#resource_${resourceType}_${resourceId}_comment_button span`).remove();
                        $(`#resource_${resourceType}_${resourceId}_comment_button`).append('<span class="ui-icon ui-icon-circle-triangle-s"></span>');
                    } else {
                        $(this).addClass('active');
                        $(`#resource_${resourceType}_${resourceId}_comment_button span`).remove();
                        $(`#resource_${resourceType}_${resourceId}_comment_button`).append('<span class="ui-icon ui-icon-circle-triangle-n"></span>');
                    }
                    $(`#resource_${resourceType}_${resourceId}_comment_row`).toggle();
                });

                $(`#resource_${resourceType}_${resourceId}_remove`).on('click', (e) => {
                    e.preventDefault();
                    resourceIds = resourceIds.filter(i => i !== resourceId);
                    delete this.comments[resourceId];
                    this.updateComments();
                    this.updateCheckedResources(resourceType, resourceId, false, []);
                    $(`#resource_${resourceType}_${resourceId}_row`).remove();
                    $(`#resource_${resourceType}_${resourceId}_comment_row`).remove();
                    $('#send_links_resourceIds').val(resourceIds);
                });

                $(`#resource_${resourceType}_${resourceId}_comment`).on('keydown', () => {
                    setTimeout(() => {
                        this.comments[resourceId].text = $(`#resource_${resourceType}_${resourceId}_comment`).val();
                        this.updateCheckedResources(resourceType, resourceId, true,
                            this.comments[resourceId].save ? {
                            comment: this.comments[resourceId]
                        }: {
                            comment: null
                            }, true);
                        this.updateComments();
                    }, 200)
                })

                $(`#resource_${resourceType}_${resourceId}_comment_save`).on('change', () => {
                    this.comments[resourceId].save = $(`#resource_${resourceType}_${resourceId}_comment_save`).is(':checked');
                    this.updateCheckedResources(resourceType, resourceId, true, {
                        comment: this.comments[resourceId]
                    }, true);
                    this.updateCheckedResources(resourceType, resourceId, true,
                        this.comments[resourceId].save ? {
                            comment: this.comments[resourceId]
                        }: {
                        comment: null
                        }, true);
                    this.updateComments();
                })

                resourceIds.push(resourceId);
                currentRowCounter++;
            }
        }

        $('#send_links_resourceIds').val(resourceIds);

        this.updateComments();

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
    }

    updateComments() {
        $('#send_links_comments').val(JSON.stringify(this.comments));
    }

    getFormFromServer(route) {
        let self = this;
        $.get(route, function (responseJSON, textStatus, jqXHR, form) {
            self.replaceContainer(self.containerName, responseJSON);
            self.init();
        })
    }

    getResourceTypeName(resourceType) {
        switch (resourceType) {
            case 'teli':
                return 'Textlink';
            case 'book':
                return 'Buch';
            case 'adr':
                return 'Adresse';
        }

        return resourceType;
    }

    checkOpenButtonState() {
        if (!this.linkStorage.isNotEmpty()) { // empty
            $('#button-checking-links__wrapper').css({
                'opacity': 0,
                'left': '-600px',
                'margin-left': 0,
                'width': 0,
                'padding-right': 0
            });
        } else { // not empty
            $('#button-checking-links__wrapper').css({
                'opacity': 1,
                'left': 0,
                'margin-left': '4px',
                'width': '340px',
                'padding-right': '15px'
            });
        }
    }

    checkResourceListDOM(resType, resId, isNeedToSave) {
        const input = document.querySelector(`#${resType}-${resId} .custom-checkbox__wrapper input`);
        if (input !== null) {
            input.checked = isNeedToSave;
        }
    }

    updateCheckedResources(resType, resId, isNeedToSave, data, partially = false) {
        let linkStorageKey = resType + '-checked';
        let resourceChecked = this.linkStorage.getObject(linkStorageKey);
        data.resType = resType;
        let storageKey = resId + '';
        if (isNeedToSave) {
            if (partially) {
                let oldData = resourceChecked[storageKey];
                if (!oldData) {
                    oldData = {};
                }
                Object.keys(data).forEach(key => {
                    oldData[key] = data[key];
                });
                data = oldData;
            }
            resourceChecked[storageKey] = data;
        } else {
            delete resourceChecked[storageKey];
        }
        this.linkStorage.setObject(linkStorageKey, resourceChecked);
        this.checkResourceListDOM(resType, resId, isNeedToSave);
        this.checkOpenButtonState();
    }

    openAllLinks() {
        let resources = this.linkStorage.getAllResorces();

        Object.values(resources).forEach(resource => {
            Object.values(resource).forEach(res => {
                if (res.hasOwnProperty('url')) {
                    window.open(res.url);
                }
            })
        })
    }

    clear() {
        this.linkStorage.clearAllResources();
        this.checkOpenButtonState();
        $('.open-checkbox-link').prop('checked', false);
    }
}
