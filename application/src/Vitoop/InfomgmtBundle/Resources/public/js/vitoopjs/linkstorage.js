import DataStorage from './datastorage';

export default class LinkStorage extends DataStorage {
    constructor() {
        super();
        this.resourceTypes = ['pdf', 'teli', 'book', 'link', 'adr', 'lex', 'prj', 'conversation'];
    }

    isNotEmpty() {
        for (let i = 0; i < this.resourceTypes.length; i++) {
            if (!$.isEmptyObject(this.getObject(this.resourceTypes[i]+'-checked'))) {
                return true;
            }
        }

        return false;
    }

    getAllResorces() {
        let resources = [];
        for (var i = 0; i < this.resourceTypes.length; i++) {
            resources.push(this.getObject(this.resourceTypes[i]+'-checked'));
        }

        return resources;
    }

    getAllResourcesSize() {
        let resourcesSize = 0;
        for (let i = 0; i < this.resourceTypes.length; i++) {
            resourcesSize += Object.keys(this.getObject(this.resourceTypes[i]+'-checked')).length;
        }

        return resourcesSize;
    }

    getAllResourcesByTypes() {
        let resources = {};
        for (let i = 0; i < this.resourceTypes.length; i++) {
            if (!$.isEmptyObject(this.getObject(this.resourceTypes[i]+'-checked'))) {
                resources[this.resourceTypes[i]] = this.getObject(this.resourceTypes[i]+'-checked');
            }
        }

        return resources;
    }

    clearAllResources() {
        for (var i = 0; i < this.resourceTypes.length; i++) {
            this.setObject(this.resourceTypes[i]+'-checked', {});
        }
    }
}
