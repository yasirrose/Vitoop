function unlinkRes(id)
{
    var projectID = $('#projectID').val();
    $.ajax({
        dataType: 'json',
        delegate: true,
        method: 'DELETE',
        url: '../api/project/' + projectID + '/resource/'+id,
        success: function (jqXHR) {
            if (jqXHR.status == 'error') {
                $('#vtp-projectdata-title').append('<span class="form-error">Vitoooops!: ' + jqXHR.message + '</span>');
            } else {
                var elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>'+jqXHR.message+'</div>');
                $('#vtp-projectdata-title').prepend(elemSuccess);
                $(elemSuccess, '#vtp-projectdata-title').hide("fade", 3000);
                resourceList.loadResourceListPage();
            }
        }
    });
}