function dtLanguageObject() {
    return {
        "lengthMenu": "Treffer/Seite _MENU_",
        "search": "",
        "loadingRecords": '<div id="ballsWaveG"><div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div><div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div></div>',
        "searchPlaceholder": "ergebnisliste durchsuchen",
        "info": "_START_ - _END_ aus _TOTAL_ Datensätzen",
        "infoEmpty": "0 - 0 aus 0 Datensätzen",
        "paginate": {
            "first": "<span class='vtp-pg-inner ui-icon ui-icon-seek-start'>|&lt;&lt;</span>",
            "last": "<span class='vtp-pg-inner ui-icon ui-icon-seek-end'>&gt;&gt;|</span>",
            "previous": "<span class='vtp-pg-inner ui-icon ui-icon-seek-prev'>|&lt;</span>",
            "next": "<span class='vtp-pg-inner ui-icon ui-icon-seek-next'>&gt;|</span>"
        }
    }
}

$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        
    }
);

function dtDomObject() {
	var toolbar_prefix = 'fg-toolbar ui-toolbar vtp-pg-pane ui-state-defaultgulp ui-helper-clearfix ui-corner-';

	return toolbar_prefix+'all top-toolbar"fr>'+'t'+'<"'+toolbar_prefix+'all"lip>';
}

function dtAjaxCallback(e, settings, json, xhr) {
    if (json.length == 0) {
        $('.table-datatables').hide();
        $('.empty-datatables').show();
        
        return;
    }
    
    if (json && json.resourceInfo) {
        resourceInfo = json.resourceInfo;
        var scope = angular.element($("#resourceInfo")).scope();
        scope.$apply(function(){
            scope.nav.resourceInfo = resourceInfo;
        });
    }
}

function dtRowCallback(row, data, index) {
    var apiPage = this.api().page;
    var resType = $(this.api().table().node()).data('restype');
    $(row).removeClass('vtp-list-first vtp-list-end vtp-list-last vtp-list-start');
    $(row).addClass('ui-corner-all vtp-uiaction-list-showdetail');
    $(row).attr('id', resType+'-'+data.id);
    
    if (typeof(resourceId) != 'undefined' && resourceId == data.id) {
        $(row).addClass('show-popup');
    }

    if (data.isUserHook != 0) {
        $(row).find('td:first').addClass('vtp-blue');
    }
    
    if (index == 0) {
        row.className += " vtp-list-first";
        if (apiPage.info().page == 0) {
                row.className += " vtp-list-start";
        }
    }
    if ((index == (apiPage.len()-1)) || ((apiPage.info().page == (apiPage.info().pages - 1)) && (index == (apiPage.info().recordsDisplay % apiPage.len() - 1)))) {
        row.className += " vtp-list-last";
        if (apiPage.info().page == (apiPage.info().pages - 1)) {
                row.className += " vtp-list-end";
        }
    }

    return row;
}

function dtDrawCallback() {
    if (this.api().page.info().recordsTotal == 0) {
        return;
    }
    var projectElem = $('#projectID');
    if ((typeof(projectElem) != 'undefined') && projectElem.val() > -1) {
        $('input.divider').off();
        var query = $.deparam.querystring(),
                editMode = query.edit;
        var self = this;
        if (typeof(editMode) != 'undefined' && editMode == 1) {
            $('.vtp-uiaction-coefficient').on('focusout', function() {
                if ((isNaN($(this).val())) || ($(this).val() < 0)) {
                    $(this).val($(this).data('original'));
                    return false;
                }
                if ($(this).val() != $(this).data('original')) {
                        $('.vtp-uiaction-coefficient').attr('disabled', true);
                        $.ajax({
                                dataType: 'json',
                                delegate: true,
                                data: JSON.stringify({'value': $(this).val()}),
                                method: 'POST',
                                url: '../api/rrr/' + $(this).data('rel_id') + '/coefficient',
                                success: function (jqXHR) {
                                        self.api().clear();
                                        self.api().ajax.reload();
                                        $('.vtp-uiaction-coefficient').attr('disabled', false);
                                }
                        });
                }
            });
        }
        var upperCoefficient = -1000;
        var currentCoefficient = 0;
        var dividers = [];
        $.ajax({
            url: vitoop.baseUrl +'api/project/' + projectElem.val() + '/divider',
            method: 'GET',
            success: function(data) {
                dividers = data;
                var divider = "";
                $('.vtp-uiaction-coefficient.divider-wrapper').remove();
                $('table > tbody > tr > td > input.vtp-uiaction-coefficient').each(function() {
                    currentCoefficient = Math.floor($(this).val());
                    if (Math.floor(upperCoefficient)-currentCoefficient <= -1) {
                        divider = dividers[currentCoefficient];
                        if (typeof(divider) == "undefined") {
                            divider = "";
                        } else {
                            divider = divider.text;
                        }
                        if ((typeof(editMode) != "undefined") && (editMode)) {
                            $(this).parent().parent().before($('<div class="vtp-uiaction-coefficient ui-corner-all divider-wrapper"><div style="width: 7%; padding-top: 4px"><span>'+ ~~ currentCoefficient+'</span></div><div style="width: 92.4%"><input class="divider" type="text" data-coef="'+(~~currentCoefficient)+'" value="'+divider+'" data-original="'+divider+'"></div></div>'));
                                $('input.divider').on('focusout', function() {
                                    if ($(this).val() != $(this).data('original')) {
                                        $('.vtp-uiaction-coefficient, input.divider').attr('disabled', true);
                                            $.ajax({
                                                dataType: 'json',
                                                delegate: true,
                                                context: this,
                                                contentType: 'application/json',
                                                data: JSON.stringify({'text': $(this).val(), 'coefficient': $(this).data('coef')}),
                                                method: 'POST',
                                                url: vitoop.baseUrl + 'api/project/' + projectElem.val() + '/divider',
                                                success: function () {
                                                        $('.vtp-uiaction-coefficient, input.divider').attr('disabled', false);
                                                        $(this).data('original', $(this).val());
                                                        $('#vtp-projectdata-project-live').show(600);
                                                }
                                            });
                                    }
                                        });
                                        $('input.divider').on('change keyup', function() {
                                                if ($(this).val() != $(this).data('original')) {
                                                        $('#vtp-projectdata-project-live').hide(600);
                                                } else {
                                                        $('#vtp-projectdata-project-live').show(600);
                                                }
                                        });
                                } else {
                                        $(this).parent().parent().before($('<div style="height: 18px; padding-top: 2px;" class="vtp-uiaction-coefficient ui-corner-all divider-wrapper"><div style="width: 7%; padding-left: 12px"><span>'+ ~~ currentCoefficient+'</span></div><div style="width: 92.4%"><span class="divider">'+divider+'</span></span></div></div>'));
                                }
                    }
                    upperCoefficient = currentCoefficient;
                });
            }
        });
    }
}


function getDateValue(data, type, row, meta) {
    return moment(data).format('DD.MM.YY');
}

function getDateColumn() {
	return {"data": "created_at", "render": getDateValue};
}

function getWrapperForTextValue(data, type, row, meta) {
	return '<div class="vtp-teasefader-wrapper">'+data+'<div class="vtp-teasefader"></div></div>';
}

function getNameColumn() {
	return {"data": "name", "render": getWrapperForTextValue};
}

function getAuthorColumn() {
	return {"data": "author", "render": getWrapperForTextValue};
}

function getTnopColumn() {
	return {"data": "tnop"};
}

function getRes12Column() {
	return {"data": "res12count", orderSequence: [ "desc", "asc"]};
}

function getRatingValue(data, type, row, meta) {
	var hint, image;
	if (type == "display") {
		if (data == null) {
			image = 'not';
			hint = 'Keine Bewertung vorhanden';
		} else {
			hint = Number(data).toPrecision(3);
			image = Number(Math.floor(hint * 100 / 20) * 2).toPrecision(2);
			if (image >= 0) {
				image = 'p' + image;
			} else {
				image = 'm' + Math.abs(image);
			}
		}

		return '<div class="vtp-rating-image-small" title="'+hint+'" style="background-image: url(\'/img/rating/rating_'+image+'.png\')"><span>&nbsp;</span></div>';
	} else {
		var temp = 0;
		if (data != null) {
			temp = data;
		}

		return temp;
	}
}

function getRatingColumn() {
    return {"data": "avgmark", "render": getRatingValue, orderSequence: [ "desc", "asc"]};
}

function getOwnerColumn() {
    return {"data": "username"};
}

function getIsDownloadedValue(data, type, row, meta) {
    if (type == "display") {
        if (data == 0) {
            return 'Soon';
        }
        if (data == 1) {
            return '<span style="color: green;">Yes</span>';
        }
        return '<span style="color: red;">Err</span>';
    } 
    
    return (data < 2)?data:-1;
}

function getIsDownloadedColumn()
{
	return {"data": "isDownloaded", "render": getIsDownloadedValue};
}

function getUrlValue(url, type, row, meta) {
    return '<a class="vtp-extlink vtp-uiaction-open-extlink ui-icon ui-icon-extlink" href="'+url+'" target="_blank">-></a>';
}

function getInternalUrlValue(url, type, row, meta) {
    return '<a class="vtp-extlink vtp-uiaction-open-extlink ui-icon ui-icon-extlink" href="'+url+'">-></a>';
}

function getProjectUrlValue(data, type, row, meta) {
    if (row.canRead) {
        return getInternalUrlValue(vitoop.baseUrl+'project/'+data, type, row, meta);
    }

    return '<span class="vtp-extlink vtp-uiaction-open-extlink ui-icon ui-icon-extlink"  style="background-color: #DDDDDD">-></span>';
}

function getLexiconUrlValue(data, type, row, meta) {
    return getInternalUrlValue(vitoop.baseUrl+'lexicon/'+data, type, row, meta);
}

function getUrlColumn(isEdit) {
    if (isEdit) {
        return getUnlinkColumn();
    }

    return {"data": "url", "render": getUrlValue};
}

function getLexiconUrlColumn(isEdit) {
    if (isEdit) {
        return getUnlinkColumn();
    }

    return {"data": "id", "render": getLexiconUrlValue};
}

function getProjectUrlColumn() {
    return {"data": "id", "render": getProjectUrlValue};
}

function getUrlTextColumn() {
    return {"data": "url", "render": getWrapperForTextValue};
}

function getIsHpValue(data, type, row, meta) {
    if (data) {
        return 'ja';
    }

    return 'nein';
}

function getIsHpColumn() {
    return {"data": "is_hp", "render": getIsHpValue};
}

function getMapsLinkValue(data, type, row, meta) {
    return '<a class="vtp-extlink vtp-uiaction-open-extlink ui-icon ui-icon-extlink" href="https://nominatim.openstreetmap.org/search.php?polygon=1&q='+row.street+', '+row.zip+', '+row.city+', '+row.code+'" target="_blank">-></a>';
}

function getMapsLinkColumn(isEdit) {
    if (isEdit) {
        return getUnlinkColumn();
    }

    return {"data": "id", "render": getMapsLinkValue};
}

function getCityColumn() {
	return {"data": "city"};
}

function getZipColumn() {
	return {"data": "zip"};
}

function getUnlinkValue(data, type, row, meta) {
    return '<span class="vtp-projectdata-unlink ui-icon ui-icon-close ui-corner-all" onclick="unlinkRes('+data+')"></span>';
}

function getUnlinkColumn() {
    return {"data": "id", "render": getUnlinkValue};
}

function getCoefValue(data, type, row, meta) {
    return '<input type="text" id="coef-'+row.coefId+'" data-rel_id="'+row.coefId+'" value="'+data+'" class="vtp-uiaction-coefficient vtp-fh-w85" disabled="disabled"/>';
}

function getCoefEditValue(data, type, row, meta) {
    return '<input type="text" id="coef-'+row.coefId+'" data-rel_id="'+row.coefId+'" data-original="'+data+'" value="'+data+'" class="vtp-uiaction-coefficient vtp-fh-w85"/>';
}

function getCoefColumn(isEdit) {
    if (isEdit) {
        return {"data": "coef", "render": getCoefEditValue};
    }
    return {"data": "coef", "render": getCoefValue};
}

function getFirstColumn(isCoef, isEdit) {
    if (isCoef) {
        return getCoefColumn(isEdit);
    }
    return getDateColumn();
}

function getColumns(type, isAdmin, isEdit, isCoef) {
    var columns = [];
    if (type == 'prj') {
        return [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getOwnerColumn(),
            getRatingColumn(),
            getRes12Column(),
            getProjectUrlColumn()
        ];
    }
    if (type == 'lex') {
        return [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getUrlTextColumn(),
            getRes12Column(),
            getOwnerColumn(),
            getLexiconUrlColumn(isEdit)
        ];
    }
    if (type == 'pdf') {
        columns = [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getAuthorColumn(),
            getTnopColumn(),
            getRatingColumn(),
            getRes12Column(),
            getOwnerColumn()
        ];
        if (isAdmin) {
            columns.push(getIsDownloadedColumn());
        }
        columns.push(getUrlColumn(isEdit));
        
        return columns;
    }
    if (type == 'teli') {
        return [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getAuthorColumn(),
            getRatingColumn(),
            getRes12Column(),
            getOwnerColumn(),
            getUrlColumn(isEdit)
        ];
    }
    if (type == 'link') {
        return [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getUrlTextColumn(),
            getIsHpColumn(),
            getRatingColumn(),
            getRes12Column(),
            getOwnerColumn(),
            getUrlColumn(isEdit)
        ];
    } 
    if (type == 'book') {
        columns = [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getAuthorColumn(),
            getTnopColumn(),
            getRatingColumn(),
            getRes12Column(),
            getOwnerColumn()
        ];
        if (isEdit) {
            columns.push(getUnlinkColumn());
        }
        return columns;
    }
    if (type == 'adr') {
        return [
            getFirstColumn(isCoef, isEdit),
            getNameColumn(),
            getZipColumn(),
            getCityColumn(),
            getRatingColumn(),
            getRes12Column(),
            getOwnerColumn(),
            getMapsLinkColumn()
        ];
    }
}

function getDefaultOrder(type, isAdmin, isEdit, isCoef) {
    if (!$('#vtp-lexicondata-title').length) {
        return [];
    }

    var columns = getColumns(type, isAdmin, isEdit, isCoef);
    var columnIndex = -1;
    for (i=0; i< columns.length; i++) {
        if (columns[i].data === 'res12count') {
            columnIndex = i;
        }
    }
    if (columnIndex<0) {
        return [];
    }

    return [[columnIndex, 'desc']];
}
