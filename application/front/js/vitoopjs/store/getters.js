export default {
    isAdmin(state) {
        return state.admin;
    },
    isLoggedIn: ({ user }) => !!user,
    getListFontSize(state, getters) {
        let currentFontSize = 14;
        currentFontSize -= state.user ? state.user.decrease_font_size : 0;
        return currentFontSize;
    },
    isOpenInSameTabPdf(state, getters) {
        return state.user ? state.user.is_open_in_same_tab_pdf : false;
    },
    isOpenInSameTabTeli(state, getters) {
        return state.user ? state.user.is_open_in_same_tab_teli : false;
    },
    isTeliInHtmlEnable(state, getters) {
        return state.user ? state.user.is_teli_in_html_enable : false;
    },
    getOpenedResource(state) {
       return state.table.openedResource ? state.table.openedResource : {};
    },
    getTableRowNumber(state, getters) {
        let originalPageNumber = state.table.rowNumber ? state.table.rowNumber : 12;
        let offset = 0;
        return originalPageNumber - offset;
    },
    getTableData(state) {
        return state.table.data;
    },
    getResource: (state) => (key) => {
        return state.resource[key];
    },
    getResourceType({ resource }) {
        return resource.type !== 'all' ? resource.type : 'resources';
    },
    getResourceId(state) {
        return state.resource.id;
    },
    getHelp: (state) => (key) => {
        return state.help[key];
    },
    getFlagged(state) {
        return state.table.flagged;
    },
    getProject(state) {
        return state.project;
    },
    getIsAllRecords(state) {
        return state.project ? state.project.project_data.is_all_records : false;
    },
    getProjectData(state) {
        return state.project ? state.project.project_data : state.project;
    },
    getInProject(state) {
        return state.inProject;
    },
    get: (state) => (key) => {
        return state[key];
    },
    getTagListShow(state) {
        return state.tagList.show;
    }
}
