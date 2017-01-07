function ResourcePopup(resourceId) {
    this.resourceId = resourceId;
};

ResourcePopup.prototype.loadResource = function () {
    resourceDetail.setResId(this.resourceId);
    resourceDetail.openDialog();

    return false;
};
