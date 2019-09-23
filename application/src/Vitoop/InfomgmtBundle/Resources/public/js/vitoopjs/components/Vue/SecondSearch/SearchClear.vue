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
    export default {
        name: "SearchClear",
        methods: {
            clear() {
                this.$store.commit('resetSecondSearch');
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        }
    }
</script>

<style lang="scss" scoped>
    #vtp-search-clear {
        width: 34px;
        margin: 0px 1px 1px 4px;
        height: 22px;
        background: -webkit-linear-gradient(bottom, #e8f3fa, #7cc0f6); /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(top, #7cc0f6 , #e8f3fa); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(top, #7cc0f6 , #e8f3fa); /* For Firefox 3.6 to 15 */
        background: linear-gradient(to top, #7cc0f6 , #e8f3fa);
        /*background-size: 7% auto;*/
        background-repeat: no-repeat;
    }
</style>