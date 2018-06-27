import VtpDatatable from '../components/VtpDatatable';
import TinyMCEInitializer from '../components/TinyMCEInitializer';

class VitoopApp {
    constructor () {

    }

    initTable(resType, isAdmin, isEdit, isCoef, url, resourceId) {
        let vtpDatatable = new VtpDatatable(resType, isAdmin, isEdit, isCoef, url, resourceId);
        vtpDatatable.init();
    }

    getTinyMceOptions () {
        let tinyInit = new TinyMCEInitializer();
        return tinyInit.getCommonOptions();
    }

    extendTag (event) {
        let parent = $(event.target).parent();
        if (parent.hasClass('vtp-search-bytags-tag-active')) {
            $('.tag-icons-to-hide', parent).hide(400);
            parent.removeClass('vtp-search-bytags-tag-active');
        } else {
            $('.tag-icons-to-hide').hide(400);
            $('.vtp-search-bytags-tag').removeClass('vtp-search-bytags-tag-active');
            $('.tag-icons-to-hide', parent).show(400);
            parent.addClass('vtp-search-bytags-tag-active');
        }
    }

    highlightTag(event) {
        let parent = $(event.target).parent();
        if (!parent.hasClass('vtp-search-bytags-tag-bulb')) {
            parent.removeClass('vtp-search-bytags-tag-ignore');
            parent.addClass('vtp-search-bytags-tag-bulb');
            resourceSearch.highlightTag(parent.text().trim(), true);
        } else {
            parent.removeClass('vtp-search-bytags-tag-bulb');
            resourceSearch.highlightTag(parent.text().trim(), false);
        }

    }

    ignoreTag(event) {
        let parent = $(event.target).parent();
        if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
            parent.removeClass('vtp-search-bytags-tag-bulb');
            parent.addClass('vtp-search-bytags-tag-ignore');
            resourceSearch.ignoreTag(parent.text().trim(), true);
        } else {
            parent.removeClass('vtp-search-bytags-tag-ignore');
            resourceSearch.ignoreTag(parent.text().trim(), false);
        }
    }

    checkUniqueUrl(resource_type, event) {
        let url = event.target.value;
        if (url.length > 0) {
            $.ajax({
                url: vitoop.baseUrl + 'api/'+resource_type+'/url/check',
                method: 'POST',
                data: JSON.stringify({'url': url}),
                success: function(data) {
                    let answer = data;
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

    checkUniqueBook(field, event) {
        let dto = {};
        dto[field] = event.target.value;
        if ('0' != dto[field] && event.target.getAttribute('old') != dto[field]) {
            $.ajax({
                url: vitoop.baseUrl + 'api/book/isbn/check',
                method: 'POST',
                data: JSON.stringify(dto),
                success: function(data) {
                    let answer = data;
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
    }

    checkUniqueAddress(event) {
        let dto = {};
        dto['institution'] =  event.target.value;
        $.ajax({
            url: vitoop.baseUrl + 'api/address/institution/check',
            method: 'POST',
            data: JSON.stringify(dto),
            success: function(data) {
                let answer = data;
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
}


$(function () {
    resourceList.init();
    resourceDetail.init();
    resourceSearch.init();
    resourceProject.init();
    userInteraction.init();
    window.vitoopApp = new VitoopApp();
});