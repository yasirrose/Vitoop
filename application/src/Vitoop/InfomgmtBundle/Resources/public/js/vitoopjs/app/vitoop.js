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
}


$(function () {
    resourceList.init();
    resourceDetail.init();
    resourceSearch.init();
    resourceProject.init();
    userInteraction.init();
    window.vitoopApp = new VitoopApp();
});