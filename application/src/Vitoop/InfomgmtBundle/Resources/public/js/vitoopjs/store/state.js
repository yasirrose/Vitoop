export default {
    resource: {
        type: null,
        id: null,
        info: null,
        owner: false
    },
    edit: false,
    inProject: false,
    secondSearch: {
        show: false,
        showDataRange: false,
        showArtSelect: false,
        searchString: '',
        isBlueFilter: 0,
        isReadFilter: 0,
        artFilter: '',
        dateFrom: '',
        dateTo: '',
        isSearching: false
    },
    searchToggler: {
        isOpened: false,
    },
    table: {
        rowNumber: 12,
        flagged: false
    },
    tagList: {
        show: false,
    },
    tags: [],
    tags_h: [],
    tags_i: [],
    tagcnt: null,
    user: null,
    admin: false,
    help: {
        text: null,
        id: null
    }
}