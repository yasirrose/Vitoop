function LinkStorage() {
    this.storage = new DataStorage();
    this.resourceTypes = ['pdf', 'book', 'teli', 'link', 'adr', 'lex', 'prj'];
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

