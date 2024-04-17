import SendLinkWidget from '../widgets/sendLinkWidget';
import DataStorage from '../datastorage';
import RowPerPageSelect from '../components/RowPerPageSelect';
import HttpService from "../services/HttpService";
import {target} from "vuelidate/lib/params";

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
        $.fn.dataTable.ext.errMode = 'none';
        let datatable = $(this.datatableListId).DataTable(this.getDatatableOptions());
        datatable
            .on('init.dt', function () {
                datatable.search(self.getCurrentSearch());
                datatable.page.len(self.rowsPerPage.getPageLength());
            })
            .on('xhr.dt', () => {
                self.dtAjaxCallback;
            });

        if ((self.resType == 'pdf' || self.resType == 'teli')/* && !vitoopApp.isElementExists('search_date_range'*/) {
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
            create: () => {
                const rowRerPageSelector = document.querySelector('.dataTables_length .ui-selectmenu-button');
                if (vitoopState.state.table.rowNumberBlinker) {
                    rowRerPageSelector.classList.add('blinking');
                    vitoopState.commit('updateTableBlinker', false);
                }
            },
            open: () => {
                const rowRerPageSelector = document.querySelector('.dataTables_length .ui-selectmenu-button');
                rowRerPageSelector.classList.remove('blinking');
            },
            select: (event, ui) => {
                vitoopState.commit('updateTableRowNumber', +ui.item.value);
                datatable.page.len(+ui.item.value);
                datatable.page(vitoopState.state.table.page).draw('page');
            }
        });
        // Handle click on checkbox
        $('table#list-'+self.resType).off().on('click', 'label.custom-checkbox__wrapper', function(e) {
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
        let self = this;
        const options = {
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
                    vitoopState.commit('setTablePage', $(self.datatableListId).DataTable().page());
                    //data.start = $(self.datatableListId).DataTable().page() * self.rowsPerPage.getPageLength();
                    data.tagcnt = vitoopState.state.tagcnt;
                    if (vitoopState.state.table.flagged) {
                        data.flagged = true;
                    }
                    data.isUserHook = vitoopState.state.secondSearch.isBlueFilter;
                    data.isUserRead = vitoopState.state.secondSearch.isReadFilter;
                    data.sendMail = vitoopState.state.secondSearch.emailDetailFilter;
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
                    let colorClass = vitoopState.state.secondSearch.selectedColor.split('-');
                    data.color = colorClass[1];
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
            drawCallback: drawCallback,
            footerCallback: () => {
                $('.dataTables_length .ui-selectmenu-button').attr('title', window.$i18n.global.t('label.perPage'));
            },
            initComplete: function () {
                let datatable = $(self.datatableListId).DataTable();
                let openedResource = vitoopState.getters.getOpenedResource;
                let currentPage = datatable.page.info().page;
                if (openedResource.id && openedResource.page !== currentPage) {
                    setTimeout( function () {
                        datatable.page(openedResource.page).draw(false);
                    }, 100);
                }
            }
        };
        return options;
    }
    setTotalMessage(totalRecords) {
        if (totalRecords === 0 && !vitoopState.state.isSecondSearchBlue) {
            $('td.dataTables_empty').html('Hier gibt es leider keinen Treffer.');
        } else {
            $('td.dataTables_empty').html('Hier gibt es leider keinen Treffen - wenn du willst, kannst du Datensätze zu diesem Thema in die Datenbank eintragen.');
        }
    }
    dtDrawCallback() {

    }
    dtDrawCallbackCoef() {
        VtpDatatable.prototype.setTotalMessage(this.api().page.info().recordsTotal);
        if (this.api().page.info().recordsTotal === 0) {
            return;
        }
        const projectId = vitoopState.state.resource.id;
        $('input.divider').off();
        const editMode = vitoopState.state.edit;
        const self = this;
        const coefInputs = document.querySelectorAll('tr:not(.divider-wrapper) .vtp-uiaction-coefficient');
        const dividersCoefsInputs = document.querySelectorAll('tr.divider-wrapper .vtp-uiaction-coefficient');
        const dividersTextInputs = document.querySelectorAll('tr.divider-wrapper .divider');

        coefInputs.forEach(input => {
            input.addEventListener('input', () => {
                const coefId = input.dataset.rel_id;
                vitoopState.commit('addCoefToSave', { coefId: coefId, value: input.value });
                vitoopState.commit('updateCoef', { coefId: coefId, value: input.value });
            });
        });

        dividersTextInputs.forEach(input => {
            input.addEventListener('input', () => {
                vitoopState.commit('addDividerToSave', {
                    text: input.value,
                    coefficient: input.dataset.coef,
                });
            });
        });

        dividersCoefsInputs.forEach(input => {
            input.addEventListener('input', () => {
                vitoopState.commit('addDividerToSave', {
                    id: input.dataset.rel_id,
                    text: input.closest('tr').querySelector('input.divider').value,
                    coefficient: input.value,
                });
            });
        });

        if (editMode) {
            $('.vtp-projectdata-unlink').on('click', function(e) {
                e.stopPropagation();
                axios.delete(`/api/project/${projectId}/resource/${$(this).data('id')}`)
                    .then(response => {
                        const elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>'+response.message+'</div>');
                        $('#vtp-projectdata-title').prepend(elemSuccess);
                        $(elemSuccess, '#vtp-projectdata-title').hide("fade", 3000);
                        reloadTableAfterCoef();
                    })
                    .catch(err => {
                        console.dir(err);
                        // $('#vtp-projectdata-title').append('<span class="form-error">Vitoooops!: ' + err.message + '</span>');
                    });
            });
        }
        function reloadTableAfterCoef() {
            self.api().clear();
            self.api().ajax.reload();
            $('.vtp-uiaction-coefficient').attr('disabled', false);
        }
    }
    dtRowCallback(row, data, index) {
        const resType = vitoopState.state.resource.type;
        let apiPage = this.api().page;
        if (data.canRead) $(row).addClass('canRead');
        if (data.id === null) {
            $(row).addClass('divider-wrapper');
        }
        if (vitoopState.state.edit) {
            $(row).addClass('edit-mode');
        }
        $(row).removeClass('vtp-list-first vtp-list-end vtp-list-last vtp-list-start');
        $(row).addClass('ui-corner-all vtp-uiaction-list-showdetail');
        resType !== 'all' ? row.setAttribute('id', `${resType}-${data.id}`) : row.setAttribute('id', `${data.type}-${data.id}`);
        if (typeof(resourceId) != 'undefined' && resourceId == data.id) {
            $(row).addClass('show-popup');
        }
        if (data.hasOwnProperty('coef')) {
            $(row).find('td:first').addClass('coef-column');
        }
        if (data.isUserHook !== 0 && data.id !== null) {
            $(row).find('td:first').addClass("vtp-"+data.color);
        }
        if (index === 0 && data.id !== null) {
            row.className += " vtp-list-first";
            if (apiPage.info() && apiPage.info().page == 0) {
                row.className += " vtp-list-start";
            }
        }
        try {
            if (index === 1 && this.api().rows().data()[0].id === null) {
                row.className += " vtp-list-first";
                if (apiPage.info() && apiPage.info().page == 0) {
                    row.className += " vtp-list-start";
                }
            }
            if ((index == (apiPage.len()-1)) && data.id !== null || (apiPage.info() && (apiPage.info().page == (apiPage.info().pages - 1)) && (index == (apiPage.info().recordsDisplay % apiPage.len() - 1)))) {
                row.className += " vtp-list-last";
                if (apiPage.info() && (apiPage.info().page == (apiPage.info().pages - 1))) {
                    row.className += " vtp-list-end";
                }
            }
            if (index === (apiPage.len()-2) && this.api().rows().data()[apiPage.len()-1].id === null) {
                row.className += " vtp-list-last";
                if (apiPage.info() && (apiPage.info().page == (apiPage.info().pages - 1))) {
                    row.className += " vtp-list-end";
                }
            }
        } catch (err) {
            console.dir(err)
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
            .order.neutral()
            .search(vitoopState.state.secondSearch.searchString)
            .draw();
    }
    getDefaultOrder() {
        if (vitoopState.state.secondSearch.dateFrom !== '' && /pdf|teli/.test(this.resType)) {
            return [0, 'asc'];
        }
        // Comment again for detection order by created date
        // else {
        //     return [0, 'desc'];
        // }
        // if (!($('#vtp-lexicondata-title').length)) {
        //     return [];
        // }
        let columns = this.getColumns();
        let columnIndex = -1;
        for (let i=0; i< columns.length; i++) {
            if (columns[i].data === 'res12count' &&
                !!vitoopState.state.resource.id &&
                (!!vitoopState.state.conversationInstance || !!vitoopState.state.lexicon)) {
                columnIndex = i;
                return [i, 'desc']
            }
        }
        if (columnIndex>=0) {
            return [[columnIndex, 'desc']];
        }
        return [];
    }
    getColumns() {
        let columns = [];
        if (this.resType === 'all') {
            return [
                this.getFirstColumn(),
                this.getTypeColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getOwnerColumn(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getUrlAll(),
            ]
        }
        if (this.resType === 'conversation') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getOwnerColumn(),
                this.getMessageCountColumn(),
                this.getRes12Column(),
                this.getUserRead(),
                this.getRatingColumn(),
                this.getConversationUrlColumn()
            ]
        }
        if (this.resType == 'prj') {
            return [
                this.getFirstColumn(),
                this.getCheckboxColumn(),
                this.getNameColumn(),
                this.getOwnerColumn(),
                this.getUserRead(),
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
                this.getUserRead(),
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
                this.getUserRead(),
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
                this.getUserRead(),
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
                this.getUserRead(),
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
                this.getUserRead(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn()
            ];
            if (vitoopState.state.edit) {
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
                this.getUserRead(),
                this.getRatingColumn(),
                this.getRes12Column(),
                this.getOwnerColumn(),
                this.getMapsLinkColumn()
            ];
        }
        if (this.resType == 'userlist') {
            columns = [
                this.getUserlistFirstColumn(),
                this.getUserNameColumn(),
                this.getLastLoginColumn()
            ];
            return columns;
        }
    }
    getUrlAll() {
        if (vitoopState.state.edit) {
            return this.getUrlColumn();
        }
        return {
            render: (data,type,row,meta) => {
                if (row.id !== null) {
                    switch(row.type) {
                        case 'prj':
                            return this.getProjectUrlValue(data, type, row, meta)
                        break
                        case 'lex':
                            return this.getLexiconUrlValue(data,type,row,meta)
                        break
                        case 'pdf':
                            return this.getUrlValue(row.url)
                        break
                        case 'teli':
                            return this.getUrlValue(row.url)
                        break
                        case 'book':
                            return null
                        break
                        case 'adr':
                            return this.getMapsLinkValue(data,type,row)
                        break
                        case 'link':
                            return this.getUrlValue(row.url)
                        break
                    }
                } else {
                    return null
                }
            }
        }
    }
    getTypeColumn() {
        return {
            data: 'type'
        }
    }
    getConversationUrlColumn() {
        return (vitoopState.state.edit) ? this.getUrlColumn() : { "data": "id", render: (data, type, row, meta) => row.id !== null ? this.getConversationUrlValue(data, type, row, meta) : null }
    }
    getConversationUrlValue(data, type, row, meta) {
        if (row.canRead || vitoopState.state.admin) {
            return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl + 'conversation/' + row.id, type, row, meta);
        }
        return '<span class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink ui-state-disabled disabled" style="background-color: #DDDDDD"><span class="ui-icon ui-icon-extlink">-></span></span>';
    }
    getCheckboxColumn() {
        let self = this;
        return {
            searchable: false,
            orderable: false,
            width:'20px',
            render: (data, type, full, meta) => {
                if (full.id !== null && !/prj|lex|conversation/.test(this.resType) && !full.hasOwnProperty('type')) {
                    let checkedResources = this.datastorage.getObject(this.resType + '-checked');
                    return `
                        <label class="custom-checkbox__wrapper no-title light square-checkbox">
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
                } else if (this.resType === 'all' && !/conversation|prj|lex/.test(full.type)) {
                    let checkedResources = this.datastorage.getObject(full.type + '-checked');
                    return `
                        <label class="custom-checkbox__wrapper no-title light square-checkbox">
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
            return `<div class="vtp-teasefader-wrapper">
                        <span class="vtp-teasefader-wrapper__text">${data}</span><div class="vtp-teasefader"></div>
                    </div>`;
        else
            return this.getDividerName(row)
    }
    getDividerName(row) {
        const dividerName = row.text === '' ? 'Überschrift eintragen' : row.text;
        return !vitoopState.state.edit ?
            `<div class="row-title">${dividerName}</div>` :
            `<input class="divider"
                    type="text"
                    placeholder="Überschrift eintragen"
                    data-coef="${row.coef}"
                    value="${row.text}"
                    data-original="${row.text}">`
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
    getMessageCountColumn() {
        return {"data": "countMessage"};
    }
    getTnopColumn() {
        return {"data": "tnop"};
    }
    getRes12Column() {
        return {"data": "res12count", orderSequence: [ "desc", "asc"]};
    }
    getUserRead() {
        return {
            "data": "isUserRead",
            "orderSequence": ["desc", "asc"],
            "render": (data, type, row) => {
                if (data !== 0) {
                    return ":-)";
                } else {
                    return '';
                }
            }
        };
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
        return `<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink" 
                   href="${url}" 
                   target="_blank">
                   <span class="ui-icon ui-icon-extlink">-></span>
                </a>`;
    }
    getInternalUrlValue(url, type, row, meta) {
        return `<a class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink"
                   href="${url}">
                       <span class="ui-icon ui-icon-extlink">-></span>
                </a>`;
    }
    getProjectUrlValue(data, type, row, meta) {
        if (row.canRead || vitoopState.state.admin) {
            return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'project/'+row.id, type, row, meta);
        }
        return `<span class="vtp-extlink vtp-extlink-list vtp-uiaction-open-extlink ui-state-disabled disabled"
                    style="background-color: #DDDDDD">
                    <span class="ui-icon ui-icon-extlink">-></span>
                </span>`;
    }
    getLexiconUrlValue(data, type, row, meta) {
        return VtpDatatable.prototype.getInternalUrlValue(vitoop.baseUrl+'lexicon/'+row.id, type, row, meta);
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
        return this.getUnlinkValue(id)
    }
    getUnlinkValue(id, type, row, meta) {
        return `<button class="vtp-projectdata-unlink ui-corner-all" data-id="${id}">
                    <span class="ui-icon ui-icon-close ui-corner-all"></span>
                </button>`;
    }
    getLexiconUrlColumn() {
        if (vitoopState.state.edit) {
            return this.getUrlColumn();
        }
        return {data: "id", render: (data,type,row,meta) => row.id !== null ? this.getLexiconUrlValue(data,type,row,meta) : null};
    }
    getProjectUrlColumn() {
        if (vitoopState.state.edit) {
            return this.getUrlColumn();
        }
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
    getUserlistFirstColumn() {
        return { data: "createdAt", render: (data, type, row) => this.getcreatedAtDateValue(data, type, row) };
    }
    getcreatedAtDateValue(data, type, row) {
        var createdAtDate = null;
        createdAtDate = (row.createdAt !== null) ? row.createdAt.date : null;
        return createdAtDate != null ? moment(createdAtDate).format('DD.MM.YYYY') : null;
    }
    getUserNameColumn() {
        return {
            data: "username",
            render: (data, type, row) => this.getWrapperForTextValue(data, type, row)
        }
    }
    getLastLoginDateValue(data, type, row) {
        var lastLoginDate = null;
        lastLoginDate = (row.lastLoginedAt !== null) ? row.lastLoginedAt.date : null;
        return lastLoginDate != null ? moment(lastLoginDate).format('DD.MM.YYYY') : null;
    }
    getLastLoginColumn() {
        return { data: "lastLoginedAt", render: (data, type, row) => this.getLastLoginDateValue(data, type, row) };
    }
}
