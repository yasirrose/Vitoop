export default class ResourcePopup {
    constructor(resourceId) {
        this.resourceId = resourceId;
    }

    loadResource(canRead) {
        window.resourceDetail.setResId(this.resourceId);
        window.resourceDetail.openDialog(canRead);

        return false;
    }
}
