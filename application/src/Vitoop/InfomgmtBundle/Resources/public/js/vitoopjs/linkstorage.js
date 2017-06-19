function LinkStorage() {
    this.storage = new DataStorage();
    this.resourceTypes = ['pdf', 'teli', 'book', 'link', 'adr', 'lex', 'prj'];
};

LinkStorage.prototype.isNotEmpty = function () {
    for (var i = 0; i < this.resourceTypes.length; i++) {
        if (!$.isEmptyObject(this.storage.getObject(this.resourceTypes[i]+'-checked'))) {
            return true;
        }
    }

    return false;
};

LinkStorage.prototype.getAllResorces = function () {
    var resources = new Array();
    for (var i = 0; i < this.resourceTypes.length; i++) {
        resources.push(this.storage.getObject(this.resourceTypes[i]+'-checked'));
    }

    return resources;
};

LinkStorage.prototype.getAllResorcesByTypes = function () {
    var resources = {};
    for (var i = 0; i < this.resourceTypes.length; i++) {
        if (!$.isEmptyObject(this.storage.getObject(this.resourceTypes[i]+'-checked'))) {
            resources[this.resourceTypes[i]] = this.storage.getObject(this.resourceTypes[i]+'-checked');
        }
    }

    return resources;
};

LinkStorage.prototype.clearAllResources = function () {
    for (var i = 0; i < this.resourceTypes.length; i++) {
        this.storage.setObject(this.resourceTypes[i]+'-checked', {});
    }
};
