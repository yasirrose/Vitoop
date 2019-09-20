import SendLinkWidget from '../widgets/sendLinkWidget';
import DataStorage from '../datastorage';
import RowPerPageSelect from '../components/RowPerPageSelect';
import HttpService from "../services/HttpService";

export default class VtpDatatable {
    constructor(resType, isAdmin, isEdit, isCoef, url, resourceId) {
        this.resType = resType;
        this.resourceId = resourceId;
        this.isAdmin = isAdmin;
        this.isEdit = isEdit;
        this.isCoef = isCoef;
        this.url = url;
        this.datatableListId = 'table#list-'+resType;
        this.datastorage = new DataStorage();
        this.rowsPerPage = new RowPerPageSelect();
        this.sendLinkWidget = new SendLinkWidget();
    }

    init() {
        let self = this;
        self.sendLinkWidget.checkOpenButtonState();
        let datatable = $(this.datatableListId).DataTable(this.getDatatableOptions());
        datatable
            .on('init.dt', function () {
                datatable.search(self.getCurrentSearch());
                datatable.page.len(self.rowsPerPage.getPageLength());
            })
            .on('xhr.dt', self.dtAjaxCallback);

        if (null !== self.resourceId) {
            datatable.on('draw.dt', function () {
                $('#'+self.resType+'-'+self.resourceId+' > td:first').trigger('click');
            });
        }

        if ((self.resType == 'pdf' || self.resType == 'teli')/* && !vitoopApp.isElementExists('search_date_range'*/) {
            vitoopState.commit('showDataRange');
            $('.range-filter').off()
                .on('change', function () {
                    vitoopApp.secondSearch.dateRange.updateRangeFromDOM();
                })
                .on('keyup', function () {
                    vitoopApp.secondSearch.dateRange.checkButtonState();
                });
        } else {
            vitoopState.commit('hideDataRange');
        }

        if (self.resType == 'book') {
            vitoopState.commit('showArtSelect');
        } else {
            vitoopState.commit('hideArtSelect');
        }

        $('div.paging_full_numbers > span').removeClass();

        $('.dataTables_length select').selectmenu({
            appendTo: ".dataTables_length",
            change: function( event, ui ) {
                self.rowsPerPage.updatePageLength(ui.item.value);
                datatable.page.len(ui.item.value);
                self.refreshTable();
            }
        });

        // Handle click on checkbox
        $('table#list-'+self.resType).on('click', 'label.custom-checkbox__wrapper', function(e) {
            let $row = $(this).closest('tr');
            const checkbox = $(this).find('input[type="checkbox"]');
            // Get row data
            let data = datatable.row($row).data();
            self.sendLinkWidget.updateCheckedResources(self.resType, data.id, checkbox[0].checked, data);
            e.stopPropagation();
        });

        $('#button-checking-links').off().on('click', function (e) {
            let resourcesCount = self.sendLinkWidget.linkStorage.getAllResourcesSize();

            if (resourcesCount >= 10 && vitoop.isCheckMaxLinks) {
                $('#vtp-res-dialog-prompt-links').dialog({
                    autoOpen: false,
                    width: 500,
                    modal: true,
                    position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                    buttons: {
                        "Abbrechen": function() {
                            $(this).dialog("close");
                            return;
                        },
                        "Öffnen": function() {
                            self.sendLinkWidget.openAllLinks();
                            $(this).dialog("close");
                            return;
                        }
                    }
                });
                $('#vtp-res-dialog-prompt-links').dialog('open');
                $('#vtp-res-dialog-prompt-links').html("<p>Bist Du sicher, dass Du " + resourcesCount + " Tabs auf einmal öffen willst?</p>"+
                    "<p><input type='checkbox' class='valid-checkbox' id='vtp-is-check-max-link' value='0' /> nicht nochmal fragen</p>");

                $('#vtp-is-check-max-link').on('change', function () {
                    $.ajax({
                        method: "PATCH",
                        url: vitoop.baseUrl + "api/user/me",
                        data:JSON.stringify({
                            is_check_max_link: !$('#vtp-is-check-max-link').prop('checked')
                        }),
                        dataType: 'json',
                        success: function(data) {
                            vitoop.isCheckMaxLinks = data.is_check_max_link;
                        }
                    });
                });

            } else {
                self.sendLinkWidget.openAllLinks();
            }

            e.stopPropagation();
            return false;
        });
        $('#button-checking-links-remove').off().on('click', function (e) {
            self.sendLinkWidget.clear()
            e.stopPropagation();
            return false;
        });
        $('#button-checking-links-send').off().on('click', function (e) {
            $('#vtp-res-dialog-links').dialog({
                autoOpen: false,
                width: 720,
                modal: true,
                position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
            });
            $('#vtp-res-dialog-links').dialog('open');
            self.sendLinkWidget.getFormFromServer(document.getElementById('sendlink-url').value);

            e.stopPropagation();
            return false;
        });
    }

    changeFontSizeByUserSettings() {
        $('#vtp-res-list').css('font-size', vitoopState.getters.getListFontSize + 'px');
    }

    dtAjaxCallback(e, settings, json, xhr) {
        if (json.length == 0) {
            $('.table-datatables').hide();
            $('.empty-datatables').show();

            return;
        }

        if (json && json.resourceInfo) {
            window.resourceInfo = json.resourceInfo;
            let scope = angular.element($("#resourceInfo")).scope();
            scope.$apply(function(){
                scope.nav.resourceInfo = window.resourceInfo;
            });
        }
    }


    getDatatableOptions() {
        let self = this;
        let drawCallback = this.isCoef ? this.dtDrawCallbackCoef : this.dtDrawCallback;
        return {
            autoWidth: false,
            stateSave: false,
            lengthMenu: [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 50, 100 ],
            pageLength: this.rowsPerPage.getPageLength(),
            language: this.dtLanguageObject(),
            serverSide: true,
            retrieve: true,
            ajax: {
                url:  self.url,
                data: function (data) {
                    data.isUserHook = vitoopState.state.secondSearch.isBlueFilter;
                    data.isUserRead = vitoopState.state.secondSearch.isReadFilter;
                    if (self.resType == 'pdf' || self.resType == 'teli') {
                        data.dateFrom = vitoopState.state.secondSearch.dateFrom;
                        data.dateTo = vitoopState.state.secondSearch.dateTo;
                    }
                    if (self.resType == 'book') {
                        data.art = vitoopState.state.secondSearch.artFilter
                    }

                    return data;
                }
            },
            search: {
                search: vitoopState.secondSearch ? vitoopState.secondSearch.searchString : ''
            },
            order: this.getDefaultOrder(),
          //  dom: vitoopApp.secondSearch.getDomPrefix() + this.dtDomObject(),
            columns: this.getColumns(),
            pagingType: "full_numbers",
            rowCallback: this.dtRowCallback,
            ordering: !this.isCoef,
            drawCallback: drawCallback
        };
    }

    setTotalMessage(totalRecords) {
        if (totalRecords === 0 && !vitoopState.state.isSecondSearchBlue) {
            $('td.dataTables_empty').html('Hier gibt es leider keinen Treffer.');
        } else {
            $('td.dataTables_empty').html('Hier gibt es leider keinen Treffen - wenn du willst, kannst du Datensätze zu diesem Thema in die Datenbank eintragen.');
        }
    }

    dtDrawCallback() {
        if (this.api().page && this.api().page.info()) {
            VtpDatatable.prototype.setTotalMessage(this.api().page.info().recordsTotal);
        }
    }

    dtDrawCallbackCoef() {
        VtpDatatable.prototype.setTotalMessage(this.api().page.info().recordsTotal);
        if (this.api().page.info().recordsTotal === 0) {
            return;
        }
        let projectElem = $('#projectID');
        if ((typeof(projectElem) != 'undefined') && projectElem.val() > -1) {
            $('input.divider').off();
            var query = HttpService.prototype.parseParams(window.location.href),
                editMode = query.edit;
            console.log(query);
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
            let upperCoefficient = -1000;
            let currentCoefficient = 0;
            let dividers = [];
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
                                $(this).parent().parent().before($('<div class="vtp-uiaction-coefficient ui-corner-all divider-wrapper"><div style="width: 96px; padding-top: 4px"><span>'+ ~~ currentCoefficient+'</span></div><div style="width: 990px"><input class="divider" type="text" data-coef="'+(~~currentCoefficient)+'" value="'+divider+'" data-original="'+divider+'"></div></div>'));
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
                                $(this).parent().parent().before($('<div style="height: 18px; padding-top: 4px;" class="vtp-uiaction-coefficient ui-corner-all divider-wrapper"><div style="width: 116px; padding-left: 15px"><span>'+ ~~ currentCoefficient+'</span></div><div><span class="divider">'+divider+'</span></span></div></div>'));
                            }
                        }
                        upperCoefficient = currentCoefficient;
                    });
                }
            });
        }
    }

    dtRowCallback(row, data, index) {
        let apiPage = this.api().page;
        let resType = $(this.api().table().node()).data('restype');
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
            if (apiPage.info() && apiPage.info().page == 0) {
                row.className += " vtp-list-start";
            }
        }
        if ((index == (apiPage.len()-1)) || (apiPage.info() && (apiPage.info().page == (apiPage.info().pages - 1)) && (index == (apiPage.info().recordsDisplay % apiPage.len() - 1)))) {
            row.className += " vtp-list-last";
            if (apiPage.info() && (apiPage.info().page == (apiPage.info().pages - 1))) {
                row.className += " vtp-list-end";
            }
        }

        return row;
    }

    dtLanguageObject() {
        return {
            "lengthMenu": "_MENU_",
            "search": "",
            "loadingRecords": '<div id="ballsWaveG"><div id="ballsWaveG_1" class="ballsWaveG"></div><div id="ballsWaveG_2" class="ballsWaveG"></div><div id="ballsWaveG_3" class="ballsWaveG"></div><div id="ballsWaveG_4" class="ballsWaveG"></div><div id="ballsWaveG_5" class="ballsWaveG"></div><div id="ballsWaveG_6" class="ballsWaveG"></div><div id="ballsWaveG_7" class="ballsWaveG"></div><div id="ballsWaveG_8" class="ballsWaveG"></div></div>',
            "searchPlaceholder": "ergebnisliste durchsuchen",
            "info": "_START_ - _END_ aus _TOTAL_",
            "infoEmpty": "0 - 0 aus 0",
            "emptyTable": "Hier gibt es leider keinen Treffen - wenn du willst, kannst du Datensätze zu diesem Thema in die Datenbank eintragen.",
            "paginate": {
                "first": "<span class='vtp-pg-inner ui-icon ui-icon-seek-start'>|&lt;&lt;</span>",
                "last": "<span class='vtp-pg-inner ui-icon ui-icon-seek-end'>&gt;&gt;|</span>",
                "previous": "<span class='vtp-pg-inner ui-icon ui-icon-seek-prev'>|&lt;</span>",
                "next": "<span class='vtp-pg-inner ui-icon ui-icon-seek-next'>&gt;|</span>"
            }
        }
    }

    dtDomObject() {
        let toolbar_prefix = 'fg-toolbar ui-toolbar vtp-pg-pane ui-state-default ui-helper-clearfix ui-corner-';

        return 't'+'<"'+toolbar_prefix+'all"lip>';
    }


    getCurrentSearch() {
        return vitoopState.state.secondSearch.searchString;
    }

    getDatatableInstance() {
        return $(this.datatableListId).DataTable();
    }

    refreshTable() {
        let datatable = this.getDatatableInstance();
        let orderArray = this.getDefaultOrder();
        if (orderArray.length > 0) {
            datatable
                .search(vitoopState.state.secondSearch.searchString)
                .order(orderArray)
                .draw();

            return;
        }

        datatable
            .search(vitoopState.state.secondSearch.searchString)
            .draw();
    }

    getDefaultOrder() {
        if (this.resType == 'pdf' || this.resType == 'teli') {
            let dateRangeFilter = vitoopApp.secondSearch.dateRange;
            if (!dateRangeFilter.isEmpty()) {
                return [0, 'asc'];
            }
        }

        if (!($('#vtp-lexicondata-title').length)) {
            return [];
        }

        let columns = this.getColumns();
        let columnIndex = -1;
        for (let i=0; i< columns.length; i++) {
            if (columns[i].data === 'res12count') {
                columnIndex = i;
            }
        }
        if (columnIndex>=0) {
            return [[columnIndex, 'desc']];
        }

        return [];
    }

    getColumns() {
        let columns = [];
        if (this.resType == 'prj') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getOwnerColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getProjectUrlColumn()
            ];
        }
        if (this.resType == 'lex') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getUrlTextColumn(),
                this.getRes12Column(),
                this.getOwnerColumn(),
                this.getLexiconUrlColumn()
            ];
        }
        if (this.resType == 'pdf') {
            columns = [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getAuthorColumn(),
                this.getTnopColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn()
            ];
            if (this.isAdmin) {
                columns.push(this.getIsDownloadedColumn());
            }
            columns.push(this.getPdfUrlValue());

            return columns;
        }
        if (this.resType == 'teli') {
            columns = [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getAuthorColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn()
            ];
            if (this.isAdmin) {
                columns.push(this.getIsDownloadedColumn());
            }

            columns.push(this.getUrlColumn());

            return columns;
        }
        if (this.resType == 'link') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getUrlTextColumn(),
                this.getIsHpColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn(),
                this.getUrlColumn()
            ];
        }
        if (this.resType == 'book') {
            columns = [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getAuthorColumn(),
                this.getTnopColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn()
            ];
            if (this.isEdit) {
                columns.push(this.getUnlinkColumn());
            }
            return columns;
        }
        if (this.resType == 'adr') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getZipColumn(),
                this.getCityColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn(),
                this.getMapsLinkColumn()
            ];
        }
    }

    getCheckboxColumn() {
        let self = this;
        return {
            'searchable':false,
            'orderable':false,
            'width':'20px',
            'render': function (data, type, full, meta) {
                let checkedResources = self.datastorage.getObject(self.resType +'-checked');
                return `
                    <label class="custom-checkbox__wrapper no-title">
                        <input 
                            class="valid-checkbox open-checkbox-link" 
                            title="anhaken für weitere Verwendung: öffnen/mailen"
                            type="checkbox"
                            ${full.id in checkedResources ? 'checked': ''} />
                            <span class="custom-checkbox">
                                <img class="custom-checkbox__check"
                                     src="../../img/check.png" />
                            </span>
                    </label>
                `;
            }
        };
    }

    getFirstColumn() {
        if (this.isCoef) {
            return this.getCoefColumn();
        }
        if (this.resType == 'pdf') {
            return {"data": "pdfDate"};
        }
        if (this.resType == 'teli') {
            return {"data": "releaseDate"};
        }
        return this.getDateColumn();
    }

    getCoefColumn() {
        if (this.isEdit) {
            return {"data": "coef", "render": this.getCoefEditValue};
        }
        return {"data": "coef", "render": this.getCoefValue};
    }

    getCoefValue(data, type, row, meta) {
        return '<input type="text" id="coef-'+row.coefId+'" data-rel_id="'+row.coefId+'" value="'+data+'" class="vtp-uiaction-coefficient vtp-fh-w85" disabled="disabled"/>';
    }

    getCoefEditValue(data, type, row, meta) {
        return '<input type="text" id="coef-'+row.coefId+'" data-rel_id="'+row.coefId+'" data-original="'+data+'" value="'+data+'" class="vtp-uiaction-coefficient vtp-fh-w85"/>';
    }

    getDateColumn() {
        return {"data": "created_at", "render": this.getDateValue};
    }

    getDateValue(data, type, row, meta) {
        return moment(data).format('DD.MM.YYYY');
    }

    getWrapperForTextValue(data, type, row, meta) {
        return '<div class="vtp-teasefader-wrapper">'+data+'<div class="vtp-teasefader"></div></div>';
    }

    getNameColumn() {
        return {"data": "name", "render": this.getWrapperForTextValue};
    }

    getAuthorColumn() {
        return {"data": "author", "render": this.getWrapperForTextValue};
    }

    getTnopColumn() {
        return {"data": "tnop"};
    }

    getRes12Column() {
        return {"data": "res12count", orderSequence: [ "desc", "asc"]};
    }


    getRatingValue(data, type, row, meta) {
        let hint, image;
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
            let temp = 0;
            if (data != null) {
                temp = data;
            }

            return temp;
        }
    }

    getRatingColumn() {
        return {"data": "avgmark", "render": this.getRatingValue, orderSequence: [ "desc", "asc"]};
    }

    getOwnerColumn() {
        return {"data": "username", "render": this.getWrapperForTextValue};
    }

    getIsDownloadedValue(data, type, row, meta) {
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

    getIsDownloadedColumn() {
        return {"data": "isDownloaded", "render": this.getIsDownloadedValue};
    }

    getUrlValue(url, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" href="'+url+'" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getResourceViewValue(id, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" onclick="return openAsResourceView('+id+');" href="#" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getInternalUrlValue(url, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" href="'+url+'"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getProjectUrlValue(data, type, row, meta) {
        if (row.canRead) {
            return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'project/'+data, type, row, meta);
        }

        return '<span class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink"  style="background-color: #DDDDDD"><span class="ui-icon ui-icon-extlink">-></span></span>';
    }

    getLexiconUrlValue(data, type, row, meta) {
        return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'lexicon/'+data, type, row, meta);
    }


    getPdfUrlValue() {
        if (this.isEdit) {
            return this.getUnlinkColumn();
        }

        return {"data": "url", "render": this.getUrlValue}; //getResourceViewValue
    }

    getUrlColumn() {
        if (this.isEdit) {
            return this.getUnlinkColumn();
        }

        return {"data": "url", "render": this.getUrlValue};
    }

    getLexiconUrlColumn() {
        if (this.isEdit) {
            return this.getUnlinkColumn();
        }

        return {"data": "id", "render": this.getLexiconUrlValue};
    }

    getProjectUrlColumn() {
        return {"data": "id", "render": this.getProjectUrlValue};
    }

    getUrlTextColumn() {
        return {"data": "url", "render": this.getWrapperForTextValue};
    }

    getIsHpValue(data, type, row, meta) {
        if (data) {
            return 'ja';
        }

        return 'nein';
    }

    getIsHpColumn() {
        return {"data": "is_hp", "render": this.getIsHpValue};
    }

    getMapsLinkValue(data, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink " href="https://nominatim.openstreetmap.org/search.php?polygon=1&q='+row.street+', '+row.zip+', '+row.city+', '+row.code+'" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getMapsLinkColumn() {
        if (this.isEdit) {
            return this.getUnlinkColumn();
        }

        return {"data": "id", "render": this.getMapsLinkValue};
    }

    getCityColumn() {
        return {"data": "city", "render": this.getWrapperForTextValue};
    }

    getZipColumn() {
        return {"data": "zip"};
    }

    getUnlinkValue(data, type, row, meta) {
        return '<span class="vtp-projectdata-unlink ui-icon ui-icon-close ui-corner-all" onclick="unlinkRes('+data+')"></span>';
    }

    getUnlinkColumn() {
        return {"data": "id", "render": this.getUnlinkValue};
    }
}