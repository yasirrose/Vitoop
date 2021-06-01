
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        
    }
);

$.fn.DataTable.ext.pager.numbers_length = 17;


function openAsResourceView(id, type, target) {
    let currentPageNum = $(window.vitoopApp.vtpDatatable.datatableListId).DataTable().page.info().page;
    let link = 'views/';
    console.log(type);
    if ('teli' === type) {
         link = 'html-views/';
    }
    vitoopState.commit('updateTableOpenedResource', {
        id: id,
        type: type,
        page: currentPageNum
    });

    window.open(vitoop.baseUrl + link + id, target);
    return false;
}
