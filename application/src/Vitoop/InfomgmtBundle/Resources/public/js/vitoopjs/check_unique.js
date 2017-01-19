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

function checkUniqueBook(field, event)
{
    var dto = {};
    dto[field] = event.target.value;
    $.ajax({
        url: vitoop.baseUrl + 'api/book/isbn/check',
        method: 'POST',
        data: JSON.stringify(dto),
        success: function(data) {
            var answer = data;
            if (answer.unique) {
                $('#unique-book-error').hide();
                $('#book_save').prop('disabled', false);
            } else {
                $('#book_save').prop('disabled', true);
                $('#unique-book-error-id').text(answer.id);
                $('#unique-book-error-name').text(answer.title);
                $('#unique-book-error').show();
            }
        }
    });
}

function checkUniqueAddress(event)
{
    var dto = {};
    dto['institution'] =  event.target.value;
    $.ajax({
        url: vitoop.baseUrl + 'api/address/institution/check',
        method: 'POST',
        data: JSON.stringify(dto),
        success: function(data) {
            var answer = data;
            if (answer.unique) {
                $('#unique-address-error').hide();
                $('#address_save').prop('disabled', false);
            } else {
                $('#address_save').prop('disabled', true);
                $('#unique-address-error-id').text(answer.id);
                $('#unique-address-error-name').text(answer.title);
                $('#unique-address-error').show();
            }
        }
    });
}