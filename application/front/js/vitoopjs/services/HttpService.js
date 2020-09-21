import deparam from 'deparam';

export default class HttpService {
    encodeQueryData(data) {
        const ret = [];
        for (let d in data) {
            if (Array.isArray(data[d])) {
                for (let arrKey in data[d]) {
                    ret.push(encodeURIComponent(d) + '[]=' + encodeURIComponent(data[d][arrKey]));
                }

            } else {
                ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
            }

        }
        return ret.join('&');
    }

    parseParams(str) {
        return deparam(str);

        return str.split('&').reduce(function (params, param) {
            let paramSplit = param.split('=').map(function (value) {
                return decodeURIComponent(value.replace(/\+/g, ' '));
            });
            params[paramSplit[0]] = paramSplit[1];
            return params;
        }, {});
    }

     getQueryStringValue (key) {
        return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
    }



}