<template>
    <button id="vtp-search-clear"
            class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
            @click="clear"
            role="button"
            title="">
        <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
        <span class="ui-button-text"></span>
    </button>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "SearchClear",
        computed: {
            ...mapGetters(['get'])
        },
        methods: {
            clear() {
                this.$store.commit('resetSecondSearch');
                this.$store.commit('secondSearchIsSearching', false);
                EventBus.$emit('datatable:reload');
                resourceList.loadResourceListPage(e);
                this.$store.commit('resetSearchContent');
                this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + 1);
                vitoopApp.vtpDatatable.rowsPerPage.reloadSelect();
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #vtp-search-clear {
        width: 34px;
        margin: 0px 2px 0 4px;
        height: 24px;
        background: linear-gradient(to top, #7cc0f6 , #e8f3fa) no-repeat;
        &:hover {
            background: linear-gradient(to top, lighten(#7cc0f6, 10%) , lighten(#e8f3fa, 10%)) no-repeat;
        }
        &:active {
            background: linear-gradient(to top, darken(#7cc0f6, 10%) , darken(#e8f3fa, 10%)) no-repeat;
        }
    }
</style>
