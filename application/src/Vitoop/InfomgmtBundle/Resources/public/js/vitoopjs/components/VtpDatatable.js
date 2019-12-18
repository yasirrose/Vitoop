import SendLinkWidget from '../widgets/sendLinkWidget';
import DataStorage from '../datastorage';
import RowPerPageSelect from '../components/RowPerPageSelect';
import HttpService from "../services/HttpService";

export default class VtpDatatable {
    constructor(resType, isAdmin, isCoef, url, resourceId) {
        this.resType = resType;
        this.resourceId = resourceId;
        this.isAdmin = isAdmin;
        this.isCoef = isCoef;
        this.url = url;
        this.datatableListId = 'table.table-datatables';
        this.datastorage = new DataStorage();
        this.rowsPerPage = new RowPerPageSelect();
        this.sendLinkWidget = new SendLinkWidget();
    }

    destroy() {
        $(this.datatableListId).DataTable().destroy();
    }

    init() {
        let self = this;
        // vitoopState.commit('setResourceType', this.resType);
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

        return datatable;
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
            vitoopState.commit('setResourceInfo', json.resourceInfo);
            window.resourceInfo = json.resourceInfo;
        }
    }

    getDatatableOptions() {
        let drawCallback = this.isCoef ? this.dtDrawCallbackCoef : this.dtDrawCallback;
        return {
            autoWidth: false,
            stateSave: false,
            lengthMenu: [ 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 50, 100 ],
            pageLength: this.rowsPerPage.getPageLength(),
            language: this.dtLanguageObject(),
            serverSide: true,
            retrieve: true,
            ajax: {
                url:  this.url,
                data: (data) => {
                    data.tagcnt = vitoopState.state.tagcnt;
                    if (vitoopState.state.table.flagged) {
                        data.flagged = true;
                    }
                    data.isUserHook = vitoopState.state.secondSearch.isBlueFilter;
                    data.isUserRead = vitoopState.state.secondSearch.isReadFilter;
                    if (this.resType == 'pdf' || this.resType == 'teli') {
                        data.dateFrom = vitoopState.state.secondSearch.dateFrom;
                        data.dateTo = vitoopState.state.secondSearch.dateTo;
                    }
                    if (this.resType == 'book') {
                        data.art = vitoopState.state.secondSearch.artFilter;
                    }
                    if (vitoopState.state.resource.id !== null) {
                        data.resource = vitoopState.state.resource.id;
                    }
                    return data;
                }
            },
            search: {
                search: vitoopState.state.secondSearch ? vitoopState.state.secondSearch.searchString : ''
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
        // let projectElem = $('#projectID');
        const projectElem = vitoopState.state.resource.id;
        // if ((typeof(projectElem) != 'undefined') && projectElem.val() > -1) {
            $('input.divider').off();
            const editMode = vitoopState.state.edit;
            var self = this;
            if (editMode) {
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
                url: vitoop.baseUrl +'api/project/' + projectElem + '/divider',
                method: 'GET',
                success: function(data) {
                    dividers = data;
                    let divider = "";
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
                            if (editMode) {
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
                                            url: vitoop.baseUrl + 'api/project/' + projectElem + '/divider',
                                            success: function () {
                                                $('.vtp-uiaction-coefficient, input.divider').attr('disabled', false);
                                                $(this).data('original', $(this).val());
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        upperCoefficient = currentCoefficient;
                    });
                }
            });
        // }
    }

    dtRowCallback(row, data, index) {
        let apiPage = this.api().page;
        if (data.id === null) {
            $(row).addClass('divider-wrapper');
        }
        if (vitoopState.state.edit) {
            $(row).addClass('edit-mode');
        }
        $(row).removeClass('vtp-list-first vtp-list-end vtp-list-last vtp-list-start');
        $(row).addClass('ui-corner-all vtp-uiaction-list-showdetail');

        row.setAttribute('id', `${vitoopState.state.resource.type}-${data.id}`);

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
            "info": "_START_ - _END_<span style='margin: 0 6px;' >aus</span>_TOTAL_<span style='margin: 0 6px'>Datensätzen</span>",
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
            if (vitoopState.state.admin) {
                columns.push(this.getIsDownloadedColumn());
            }
            columns.push(this.getUrlColumn());
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
            if (vitoopState.state.admin) {
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
            if (vitoopState.state.edit) {
                // columns.push(this.getUnlinkColumn());
                columns.push(this.getUrlColumn());
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
            searchable:false,
            orderable:false,
            width:'20px',
            render: (data, type, full, meta) => {
                if (full.id !== null) {
                    let checkedResources = this.datastorage.getObject(this.resType + '-checked');
                    return `
                        <label class="custom-checkbox__wrapper no-title light">
                            <input 
                                class="valid-checkbox open-checkbox-link" 
                                title="anhaken für weitere Verwendung: öffnen/mailen"
                                type="checkbox"
                                ${full.id in checkedResources ? 'checked' : ''} />
                                <span class="custom-checkbox">
                                    <img class="custom-checkbox__check"
                                         src="../../img/check.png" />
                                </span>
                        </label>
                    `;
                } else {
                    return null;
                }
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
        if (vitoopState.state.edit) {
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
        return row.id !== null ? moment(data).format('DD.MM.YYYY') : null;
    }

    getWrapperForTextValue(data, type, row) {
        if (row.id !== null)
            return '<div class="vtp-teasefader-wrapper">'+data+'<div class="vtp-teasefader"></div></div>'
        else
            return this.getDividerName(row)
    }

    getDividerName(row) {
        return !vitoopState.state.edit ? row.text :
            `<input class="divider" type="text" data-coef="${row.coef}" value="${row.text}" data-original="${row.text}">`
    }

    getNameColumn() {
        return {
            data: "name",
            className: 'name-column',
            render: (data, type, row) => this.getWrapperForTextValue(data, type, row)
        }
    }

    getAuthorColumn() {
        return {
            data: "author",
            render: (data,type,row) => {
                return row.id !== null ? this.getWrapperForTextValue(data,type,row) : null;
            }
        };
    }

    getTnopColumn() {
        return {"data": "tnop"};
    }

    getRes12Column() {
        return {"data": "res12count", orderSequence: [ "desc", "asc"]};
    }

    getRatingValue(data, type) {
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
        return {
            data: "avgmark",
            render: (data,type,row) => row.id !== null ? this.getRatingValue(data,type) : null,
            orderSequence: [ "desc", "asc"]};
    }

    getOwnerColumn() {
        return {
            "data": "username",
            render: (data,type,row) => row.id !== null ? this.getWrapperForTextValue(data,type,row) : null
        };
    }

    getIsDownloadedValue(data, type) {
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
        return {"data": "isDownloaded", "render": (data,type,row) => row.id !== null ? this.getIsDownloadedValue(data,type) : null};
    }

    getUrlValue(url) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" href="'+url+'" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getResourceViewValue(id, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" onclick="return openAsResourceView('+id+');" href="#" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getInternalUrlValue(url, type, row, meta) {
        return `<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink"
                   href="${url}">
                       <span class="ui-icon ui-icon-extlink">-></span>
                </a>`;
    }

    getProjectUrlValue(data, type, row, meta) {
        if (row.canRead && row.username === vitoopState.state.user.username || vitoopState.state.admin) {
            return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'project/'+data, type, row, meta);
        }

        return `<span class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink disabled"
                    style="background-color: #DDDDDD">
                    <span class="ui-icon ui-icon-extlink">-></span>
                </span>`;
    }

    getLexiconUrlValue(data, type, row, meta) {
        return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'lexicon/'+data, type, row, meta);
    }

    getUrlColumn() {
        if (vitoopState.state.edit) {
            return {
                render: (data,type,row) => row.id !== null ? this.getUnlinkColumn(row.id) : null
            }
        }

        return {"data": "url", render: (url,type,row) => row.id !== null ? this.getUrlValue(url) : null};
    }

    getUnlinkColumn(id) {
        // return {"data": "id", "render": (data,type,row) => row.id !== null ? this.getUnlinkValue(data) : null};
        return this.getUnlinkValue(id)
    }

    getUnlinkValue(data, type, row, meta) {
        return '<span class="vtp-projectdata-unlink ui-icon ui-icon-close ui-corner-all" onclick="unlinkRes('+data+')"></span>';
    }

    getLexiconUrlColumn() {
        if (vitoopState.state.edit) {
            // return this.getUnlinkColumn();
            return this.getUrlColumn();
        }

        return {data: "id", render: (data,type,row,meta) => row.id !== null ? this.getLexiconUrlValue(data,type,row,meta) : null};
    }

    getProjectUrlColumn() {
        return {
            "data": "id",
            render: (data,type,row,meta) => row.id !== null ? this.getProjectUrlValue(data, type, row, meta) : null
        };
    }

    getUrlTextColumn() {
        return {
            "data": "url",
            render: (data,type,row) => {
                return row.id !== null ? this.getWrapperForTextValue(data,type,row) : null;
            }
        };
    }

    getIsHpValue(data) {
        if (data) {
            return 'ja';
        }

        return 'nein';
    }

    getIsHpColumn() {
        return {
            data: "is_hp",
            render: (data,type,row) => row.id !== null ? this.getIsHpValue(data) : null
        };
    }

    getMapsLinkValue(data, type, row, meta) {
        return '<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink " href="https://nominatim.openstreetmap.org/search.php?polygon=1&q='+row.street+', '+row.zip+', '+row.city+', '+row.code+'" target="_blank"><span class="ui-icon ui-icon-extlink">-></span></a>';
    }

    getMapsLinkColumn() {
        if (vitoopState.state.edit) {
            // return this.getUnlinkColumn();
            return this.getUrlColumn();
        }

        return {"data": "id", "render": (data,type,row) => row.id !== null ? this.getMapsLinkValue(data,type,row) : null};
    }

    getCityColumn() {
        return {"data": "city", "render": (data,type,row) => row.id !== null ? this.getWrapperForTextValue(data,type,row) : null};
    }

    getZipColumn() {
        return {
            "data": "zip"
        };
    }
}