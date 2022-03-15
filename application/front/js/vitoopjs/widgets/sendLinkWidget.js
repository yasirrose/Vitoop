import Widget from './widget';
import LinkStorage from '../linkstorage';

export default class SendLinkWidget extends Widget {
    constructor() {
        super();
        this.formId = '#form-user-links';
        this.containerName = 'vtp-res-dialog-links';
        this.linkStorage = new LinkStorage();
    }

    init() {
        let self = this;
        let resources = self.linkStorage.getAllResourcesByTypes();
        let resourceIds = new Array();
        $('#form-user-links-info').html('');
        $('#form-user-links-info').css('font-size', vitoopState.getters.getListFontSize + 'px');
        let currentRowCounter = 0;
        for (let resourceType in resources) {
            if (typeof resources !== 'undefined' && resources.length > 0) {
                for (let resourceId in resources[resourceType]) {
                  let rowClass = 'odd ui-corner-all';
                  if (currentRowCounter % 2) {
                    rowClass = 'even ui-corner-all';
                  }
                  $('#form-user-links-info').append(
                    '<tr class="'+ rowClass +'">'+
                    '<td class="vtp-send-type">'+this.getResourceTypeName(resourceType)+':</td>' +
                    '<td><div class="vtp-teasefader-wrapper">'+resources[resourceType][resourceId].name+'<div class="vtp-teasefader"></div></div></td>' +
                    '</tr>'
                  );
                  resourceIds.push(resourceId);
                  currentRowCounter++;
                }
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

    checkResourseListDOM(resType, resId, isNeedToSave) {
        const input = document.querySelector(`#${resType}-${resId} .custom-checkbox__wrapper input`);
        input.checked = isNeedToSave;
    }

    updateCheckedResources(resType, resId, isNeedToSave, data) {
        let linkStorageKey = resType+'-checked';
        let resourceChecked = this.linkStorage.getObject(linkStorageKey);
        data.resType = resType;
        let storageKey = resId + '';
        if(isNeedToSave) {
            resourceChecked[storageKey] = data;
        } else {
            delete resourceChecked[storageKey];
        }
        this.linkStorage.setObject(linkStorageKey, resourceChecked);
        this.checkResourseListDOM(resType, resId, isNeedToSave);
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
