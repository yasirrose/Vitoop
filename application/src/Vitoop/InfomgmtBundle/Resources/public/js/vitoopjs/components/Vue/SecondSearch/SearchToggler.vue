<template>
    <label ref="cross-1">
        <span class="vtp-toggler ui-button ui-state-default ui-widget ui-corner-all ui-button-icon-only vtp-button"
              @click="toggle"
              :class="[(get('searchToggler').isOpened || isHasNotEmptyFields)? 'vtp-toggler-active' : '']">
            <span class="ui-icon"
                  :class="[get('searchToggler').isOpened ? 'ui-icon-arrowthick-1-n' : 'ui-icon-arrowthick-1-s']">
            </span>
        </span>
    </label>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "SearchToggler",
        computed: {
            ...mapGetters(['get']),
            isHasNotEmptyFields() {
                return this.get('secondSearch').searchString !== '';
            }
        },
        methods: {
            toggle() {
                $('body').addClass('overflow-hidden');
                this.$store.commit('updateSearchToggler', !this.get('searchToggler').isOpened);
                const rowNumberDiff = this.get('searchToggler').isOpened ? -1 : 1;
                this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + rowNumberDiff);
                vitoopApp.vtpDatatable.rowsPerPage.reloadSelect();
            }
        }
    };
</script>

<style lang="scss" scoped>
    $menu-distance: 4px;

    label {
        vertical-align: baseline;
        display: inline-block;
    }

    input[type=checkbox] {
        display: none;
    }

    .vtp-toggler {
        width: 34px;
        margin-top: 0px;
        margin-right: 0px;
    }

    .vtp-toggler-active {
        background: -webkit-linear-gradient(bottom, #7cc0f6, #e8f3fa); /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(top, #e8f3fa, #7cc0f6); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(top, #e8f3fa, #7cc0f6); /* For Firefox 3.6 to 15 */
        background: linear-gradient(to top, #e8f3fa, #7cc0f6);
        /*background-size: 7% auto;*/
        background-repeat: no-repeat;
    }
</style>
