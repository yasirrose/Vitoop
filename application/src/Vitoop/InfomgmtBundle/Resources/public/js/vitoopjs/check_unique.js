function checkUniqueUrl(resource_type, event)
{
    var url = event.target.value;
    if (url.length > 0) {
        $.ajax({
            url: vitoop.baseUrl + 'api/'+resource_type+'/url/check',
            method: 'POST',
            data: JSON.stringify({'url': url}),
            success: function(data) {
                var answer = data;
                if (answer.unique) {
                    $('#unique-url-error').hide();
                    $('#'+resource_type+'_save').prop('disabled', false);
                } else {
                    $('#'+resource_type+'_save').prop('disabled', true);
                    $('#unique-url-error-id').text(answer.id);
                    $('#unique-url-error-name').text(answer.title);
                    $('#unique-url-error').show();
                }
            }
        });
    }
}