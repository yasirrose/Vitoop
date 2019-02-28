export default class ResourcePopup {
    constructor(resourceId) {
        this.resourceId = resourceId;
    }

    loadResource() {
        window.resourceDetail.setResId(this.resourceId);
        window.resourceDetail.openDialog();

        return false;
    }
}