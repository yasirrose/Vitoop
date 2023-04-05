export default {
    notes: null,
    error: null,
    resource: {
        type: null,
        id: null,
        info: null,
        owner: false
    },

    project: null,
    projectNeedToSave: false,

    lexicon: null,
    conversationInstance: null,

    edit: false,
    inProject: false,
    secondSearch: {
        show: false,
        showDataRange: false,
        showArtSelect: false,
        searchString: '',
        isBlueFilter: 0,
        isReadFilter: 0,
        emailDetailFilter: 0,
        artFilter: '',
        dateFrom: '',
        dateTo: '',
        isSearching: false,
        selectedColor: '',
    },
    searchToggler: {
        isOpened: false,
    },
    table: {
        data: null,
        page: 0,
        rowNumber: 12,
        flagged: false,
        rowNumberBlinker: true,
        openedResource: {
            id: null,
            type: null,
            page: 0
        },
    },
    coefsToSave: [],
    dividersToSave: [],
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
    },
    conversationEditMode: false,
    contentHeight: 342 // 12 rows
}
