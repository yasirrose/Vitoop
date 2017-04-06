function DataStorage() {
    
}

DataStorage.prototype.getObject = function (key) {
    if (!(key in localStorage)) {
        return {};  
    }

    var value = localStorage.getItem(key);
    if (value[0] === "{") {
        return JSON.parse(value);
    }

    return {};
};

DataStorage.prototype.setObject = function(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

DataStorage.prototype.getAlphaNumValue = function (key, defaultValue) {
    if (defaultValue === undefined) {
        defaultValue = '';
    }

    return localStorage.getItem(key)?localStorage.getItem(key):defaultValue;
};
