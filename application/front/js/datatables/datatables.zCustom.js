
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        
    }
);

$.fn.DataTable.ext.pager.numbers_length = 17;


function openAsResourceView(id, type, target, fromLocal) {
    let currentPageNum = $(window.vitoopApp.vtpDatatable.datatableListId).DataTable().page.info().page;
    let link = 'views/';
    if ('teli' === type && false === fromLocal) {
         link = 'html-views/';
    }
    vitoopState.commit('updateTableOpenedResource', {
        id: id,
        type: type,
        page: currentPageNum
    });
    let url = vitoop.baseUrl + link + id;
    if (true === fromLocal) {
        url += '?local=true';
    }

    window.open(url, target);
    return false;
}
