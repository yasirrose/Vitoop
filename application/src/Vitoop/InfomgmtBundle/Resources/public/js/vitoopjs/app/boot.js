import VitoopApp from "./vitoop";

$(function () {
    window.vitoopApp = new VitoopApp();
    window.vitoopApp.init();
    resourceList.init();
    resourceDetail.init();
    resourceSearch.init();
    resourceProject.init();
    userInteraction.init();
});