function ResourceType() {
    this.resourceTypes = ['pdf', 'teli', 'book', 'link', 'adr', 'lex', 'prj'];
};

ResourceType.prototype.constructor = ResourceType;
ResourceType.prototype.getAllResourceTypes = function () {
    return this.resourceTypes;
};