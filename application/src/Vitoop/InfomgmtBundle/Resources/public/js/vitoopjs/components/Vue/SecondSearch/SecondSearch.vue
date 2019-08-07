<template>
    <transition name="fade">
        <div v-show="show" id="vtp-second-search-box" class="dataTables_filter ui-corner-all vtp-blue">
            <div id="search_blue_box"><input id="search_blue" v-model="isBlue" type="checkbox" value="1" name="search_blue">
                <div v-show="showDataRange" id="search_date_range"><input id="search_date_from" class="range-filter" type="text" value="" v-model="dateFrom" name="search_date_from" placeholder="Datum von"><input id="search_date_to" class="range-filter" type="text" value="" name="search_date_to"  v-model="dateTo" placeholder="Datum bis"><button class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only" @click="dateRangeSearch" v-bind:class="{ 'ui-state-active': isDateRangeChanged }" id="vtp_search_date"><span class="ui-icon ui-icon-search"></span><span class="ui-button-text"></span></button></div>
            </div>
            <div id="vtp-second-search-panel">
                <div id="vtp-second-search-is-read">
                    <label>
                        <input type="checkbox" value="1" v-model="isRead"><span class="ui-button ui-state-default ui-widget ui-corner-all vtp-button"  v-bind:class="{ 'ui-state-active': isRead }">{{ getReadButtonLabel }}</span>
                    </label>
                </div>
                <label>
                    <input type="search" class="vtp-second-search-input" placeholder="ergebnisliste durchsuchen" v-model="search" aria-controls="list-link">
                </label>
                <search-clear></search-clear>
            </div>
            <v-select v-show="showArtSelect" :options="artOptions" v-model="artFilter" :clearable="false"></v-select>
        </div>
    </transition>
</template>

<script>
    import vSelect from 'vue-select/src/components/Select.vue';
    import SearchClear from './SearchClear.vue'

    export default {
        name: "SecondSearch",
        data: function() {
            return {
                artOptions: [
                    {label: 'Bücher-Auswahl', value: ''},
                    {label: 'XX', value: 'auswählen'},
                    {label: 'Sachbuch', value: 'Sachbuch'},
                    {label: 'Roman', value: 'Roman'},
                    {label: 'Essay', value: 'Essay'},
                    {label: 'Erlebnisbericht', value: 'Erlebnisbericht'},
                    {label: 'Biografie', value: 'Biografie'},
                    {label: 'Autobiografie', value: 'Autobiografie'},
                    {label: 'Thriller', value: 'Thriller'}
                ],
            };
        },
        components: {
            vSelect,
            SearchClear
        },
        created() {
            this.$store.dispatch("fetchCurrentUser");
        },
        computed: {
            isBlue: {
                get() {
                    return this.$store.state.secondSearch.isBlueFilter;
                },
                set(value) {
                    this.$store.commit('updateBlueFilter', value ? 1 : 0);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            isRead: {
                get() {
                    return this.$store.state.secondSearch.isReadFilter;
                },
                set(value) {
                    this.$store.commit('updateReadFilter', value ? 1 : 0);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            search: {
                get() {
                    return this.$store.state.secondSearch.searchString;
                },
                set(value) {
                    this.$store.commit('updateSecondSearch', value);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            artFilter: {
                get() {
                    return this.restoreArtFilter(this.$store.state.secondSearch.artFilter);
                },
                set (artFilter) {
                    this.$store.commit('updateArtFilter', artFilter.value);
                    vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
                }
            },
            dateFrom: {
                get() {
                    return this.$store.state.secondSearch.dateFrom;
                },
                set (value) {
                    this.$store.commit('updateDateFrom', value);
                }
            },
            dateTo: {
                get() {
                    return this.$store.state.secondSearch.dateTo;
                },
                set (value) {
                    this.$store.commit('updateDateTo', value);
                }
            },
            isDateRangeChanged: function() {
                return ;
            },
            showDataRange: function () {
                return this.$store.state.secondSearch.showDataRange;
            },
            showArtSelect: function () {
                return this.$store.state.secondSearch.showArtSelect;
            },
            show: function () {
                return this.$store.state.secondSearch.show;
            },
            getReadButtonLabel: function () {
                if (this.$store.state.secondSearch.isReadFilter) {
                    return 'gelesen :-)';
                }

                return 'gelesen';
            }
        },
        methods: {
            getLabelForArtFilterOption(value) {
                for (let i = 0; i < this.artOptions.length; i++) {
                    if (this.artOptions[i].value == value) {
                        return this.artOptions[i].label;
                    }
                }

                return '';
            },
            restoreArtFilter(value) {
                let filter = {
                    value: '',
                    label: ''
                };
                filter.value = value;
                filter.label = this.getLabelForArtFilterOption(value);

                return filter;
            },
            dateRangeSearch () {

                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $vitoop-body-background-color: #cfe7f7;

    .vtp-blue {
        background: #7bc0f6; /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #7bc0f6 , $vitoop-body-background-color); /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #7bc0f6 , $vitoop-body-background-color); /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #7bc0f6 , $vitoop-body-background-color); /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #7bc0f6 , $vitoop-body-background-color); /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 85px;
    }

    #vtp-second-search-is-read{
        float: left;

        input[type=checkbox] {
            display: none;
        }

        span {
            height: 22px;
            padding: 0px 13px;
            line-height: 17px;
            font-size: 90%;
            vertical-align: middle;
        }
    }

    #vtp-second-search-box::v-deep {
        height: 24px;
        margin-top: 5px;

        .dropdown {
            &.v-select {
                 width: 200px;
                 margin-left: 125px
            }
        }

        .dropdown-toggle {
            height: 22px;
            margin-top: 1px;
            padding: 0px !important;

            .selected-tag {
                color: #2779aa;
            }
        }
    }

    #vtp-second-search-panel {
        padding: 1px;
        float: right;
    }

    .vtp-second-search-input {
        width: 220px;
    }

    #search_date_range {
        margin-left: 120px;
        // margin-bottom: 1px;
        //width: 35%;
        // padding-top: 1px;
        input {
            margin-top: 0px;
            margin-right: 6px;
            width: 130px;
            vertical-align: baseline;
        }
        label {
            vertical-align: baseline;
        }

        #vtp_search_date {
            height: 22px;
            margin-bottom: 1px;
        }
    }

</style>