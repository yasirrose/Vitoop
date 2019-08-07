<template>
    <label>
        <input type="checkbox" value="1" v-model="isOpened"/><span class="vtp-toggler ui-button ui-state-default ui-widget ui-corner-all ui-button-icon-only vtp-button" v-bind:class="[(isOpened || isHasNotEmptyFields)? 'vtp-toggler-active' : '']"><span class="ui-icon" v-bind:class="[isOpened ? 'ui-icon-arrowthick-1-n' : 'ui-icon-arrowthick-1-s']"></span></span>
    </label>
</template>

<script>
    export default {
        name: "SearchToggler",
        computed: {
            isOpened: {
                get() {
                    return this.$store.state.searchToggler.isOpened;
                },
                set (value) {
                    this.$store.commit('updateSearchToggle', value == 1);
                    vitoopApp.vtpDatatable.rowsPerPage.checkDOMState();
                }
            },
            isHasNotEmptyFields: {
                get() {
                    return this.$store.state.searchToggler.isNotEmpty;
                }
            }
        },
    };
</script>

<style lang="scss" scoped>
    $menu-distance: 4px;

    label {
        vertical-align: baseline;
    }

    input[type=checkbox] {
        display: none;
    }

    .vtp-toggler {
        width: 34px;
        margin-top: 0px;
        margin-left: $menu-distance;
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