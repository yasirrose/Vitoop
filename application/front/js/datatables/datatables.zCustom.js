
$.fn.dataTable.ext.search.push(
    function(settings, data, dataIndex) {
        
    }
);

$.fn.DataTable.ext.pager.numbers_length = 17;


function openAsResourceView(id, target) {
    let currentPageNum = $(window.vitoopApp.vtpDatatable.datatableListId).DataTable().page.info().page;
    vitoopState.commit('updateTableOpenedResource', {
        id: id,
        type: 'pdf',
        page: currentPageNum
    });
    window.open(vitoop.baseUrl + 'views/'+id, target);
    return false;
}
