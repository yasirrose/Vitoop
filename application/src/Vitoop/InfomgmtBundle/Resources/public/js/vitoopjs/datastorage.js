export default class DataStorage {
    constructor() {
    }

    getObject(key) {
        if (!(key in localStorage)) {
            return {};
        }

        let value = localStorage.getItem(key);
        if (value[0] === "{") {
            return JSON.parse(value);
        }

        return {};
    }

    setObject(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getAlphaNumValue (key, defaultValue) {
        if (typeof defaultValue === 'undefined') {
            defaultValue = '';
        }

        return localStorage.getItem(key)?localStorage.getItem(key):defaultValue;
    }

    setItem(key, value) {
        localStorage.setItem(key, value);
    }
}
