import DataStorage from '../datastorage';

export default class ArtFilter {
    constructor() {
        this.storageKey = 'vtp-list-book-art';
        this.currentValue = '';
        this.artValues = [
            {name: 'XX', value: 'auswählen'},
            {name: 'Sachbuch', value: 'Sachbuch'},
            {name: 'Roman', value: 'Roman'},
            {name: 'Essay', value: 'Essay'},
            {name: 'Erlebnisbericht', value: 'Erlebnisbericht'},
            {name: 'Biografie', value: 'Biografie'},
            {name: 'Autobiografie', value: 'Autobiografie'},
            {name: 'Thriller', value: 'Thriller'}
        ];
        this.storage = new DataStorage();
        this.currentValue = this.storage.getAlphaNumValue(this.storageKey);
    }

    loadFromElement() {
        let artSelect = document.getElementById(this.storageKey);
        let currentOpt = artSelect.options[artSelect.selectedIndex];
        this.currentValue = currentOpt.value;
        this.storage.setItem(this.storageKey, this.currentValue);
    }

    isEmpty() {
        return '' === this.currentValue;
    }

    clear() {
        this.currentValue = '';
        if (document.getElementById(this.storageKey)) {
            document.getElementById(this.storageKey).selectedIndex = -1;
        }
        this.storage.setItem(this.storageKey, this.currentValue);
    }

    getDOMElement () {
        let artSelect = document.createElement('select');
        let options = '<option value=""></option>';
        let self = this;

        this.artValues.forEach(function (art) {
            options += '<option value="'+art.value+'" '+((self.currentValue === art.value)?'selected':'') +'>'
                +art.name+'</option>';
        });
        artSelect.id = this.storageKey;
        artSelect.innerHTML = options;

        return artSelect;
    }
}