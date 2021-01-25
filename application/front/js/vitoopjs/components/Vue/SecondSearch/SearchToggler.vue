<template>
<!--    <label ref="cross-1">-->
        <button class="vtp-toggler ui-button ui-state-default ui-widget ui-corner-all ui-button-icon-only vtp-button"
                @click="toggle"
                :title="$t('label.second_search')"
                :class="[(get('searchToggler').isOpened || isHasNotEmptyFields)? 'vtp-toggler-active' : '']">
            <span class="ui-icon"
                  :class="[get('searchToggler').isOpened ? 'ui-icon-arrowthick-1-n' : 'ui-icon-arrowthick-1-s']">
            </span>
        </button>
<!--    </label>-->
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
                setTimeout(() => {
                    vitoopApp.vtpDatatable.rowsPerPage.reloadSelect();
                }, 300);
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

    .ui-state-default.vtp-toggler-active {
        /*background: linear-gradient(to top, #e8f3fa, #7cc0f6);*/
        background: linear-gradient(to bottom, #7cc0f6 , #e8f3fa) no-repeat;
        &:hover {
            /*background: linear-gradient(to top, lighten(#7cc0f6, 10%) , lighten(#e8f3fa, 10%)) no-repeat;*/
            background: linear-gradient(to top, #7cc0f6, #e8f3fa) no-repeat;
        }
        &:active {
            background: linear-gradient(to top, darken(#7cc0f6, 10%) , darken(#e8f3fa, 10%)) no-repeat;
        }
        &:focus {
            border: 1px solid #aed0ea;
        }
    }
</style>
