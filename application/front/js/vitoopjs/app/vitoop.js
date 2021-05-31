import VtpDatatable from '../components/VtpDatatable';
import TinyMCEInitializer from '../components/TinyMCEInitializer';
import SecondSearch from "../components/SecondSearch";
import HelpButton from '../components/HelpButton';
import TagSearch from "../components/TagSearch";
import ResourcePopup from "../components/ResourcePopup";
import UserService from "../services/User/UserService";

export default class VitoopApp {
    constructor () {
        this.helpButton = new HelpButton();
        this.userService = new UserService();
        this.user = this.getUser();
    }

    init() {
        this.secondSearch = new SecondSearch();
        this.tagSearch = new TagSearch();
    }

    initTable(resType, isAdmin, isCoef, url, resourceId) {
        this.vtpDatatable = new VtpDatatable(resType, isAdmin, isCoef, url, resourceId);
        let self = this;
        if (vitoopState.state.user) {
            this.vtpDatatable.changeFontSizeByUserSettings();
            return this.vtpDatatable.init();
        }
        return this.userService.getCurrentUser().then( currentUser => {
            vitoopState.commit('setUser', currentUser);
            this.vtpDatatable.changeFontSizeByUserSettings();
            return this.vtpDatatable.init();
        });
    }

    destroyTable() {
        this.vtpDatatable.destroy();
    }

    getTinyMceOptions () {
        let tinyInit = new TinyMCEInitializer();
        return tinyInit.getCommonOptions();
    }

    highlightTag(event) {
        let parent = $(event.target).parent();
        if (!parent.hasClass('vtp-search-bytags-tag-bulb')) {
            parent.removeClass('vtp-search-bytags-tag-ignore');
            parent.addClass('vtp-search-bytags-tag-bulb');
            this.tagSearch.highlightTag(parent.text().trim(), true);
        } else {
            parent.removeClass('vtp-search-bytags-tag-bulb');
            this.tagSearch.highlightTag(parent.text().trim(), false);
        }
    }

    ignoreTag(event) {
        let parent = $(event.target).parent();
        if (!parent.hasClass('vtp-search-bytags-tag-ignore')) {
            parent.removeClass('vtp-search-bytags-tag-bulb');
            parent.addClass('vtp-search-bytags-tag-ignore');
            this.tagSearch.ignoreTag(parent.text().trim(), true);
        } else {
            parent.removeClass('vtp-search-bytags-tag-ignore');
            this.tagSearch.ignoreTag(parent.text().trim(), false);
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

    openResourcePopup(resourceId) {
        return axios(`/api/v1/resources/${resourceId}`)
            .then(({ data: { resource: { canRead } } }) => {
                let popup = new ResourcePopup(resourceId);
                popup.loadResource(canRead);
                return popup;
            });
    }

    getUser() {
        return vitoopState.state.user;
    }

    isElementExists(elementId) {
        let element = document.getElementById(elementId);
        return (typeof(element) !== 'undefined' && element !== null);
    }
}
