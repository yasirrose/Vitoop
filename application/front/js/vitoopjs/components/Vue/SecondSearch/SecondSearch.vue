<template>
    <transition name="slide">
        <div v-show="get('secondSearch').show"
             id="vtp-second-search-box"
             class="dataTables_filter ui-corner-all" :class=" $store.state.secondSearch.selectedColor ">
            <div id="search_blue_box" title="Lesezeichen anzeigen">
                <select-color />
                <div v-show="/pdf|teli/.test(get('resource').type)"
                     id="search_date_range">
                    <div class="has-cross-icon">
                        <input id="search_date_from"
                               class="range-filter"
                               type="text"
                               value=""
                               v-model="dateFrom"
                               name="search_date_from"
                               placeholder="Datum von"
                               @keyup.enter="dateRangeSearch">
                        <i class="fa fa-times"
                           :class="{show: get('secondSearch').dateFrom}"
                           @click="dateFrom = ''"></i>
                    </div>
                    <div class="has-cross-icon">
                        <input id="search_date_to"
                               class="range-filter"
                               type="text"
                               value=""
                               name="search_date_to"
                               v-model="dateTo"
                               placeholder="Datum bis"
                               @keyup.enter="dateRangeSearch">
                        <i class="fa fa-times"
                           :class="{show: get('secondSearch').dateTo}"
                           @click="dateTo = ''"></i>
                    </div>
                    <button class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
                            @click="dateRangeSearch"
                            :class="{ 'ui-state-active': isDateRangeChanged }"
                            id="vtp_search_date">
                        <span class="ui-icon ui-icon-search"></span>
                        <span class="ui-button-text"></span>
                    </button>
                </div>
                <div id="art-select">
                    <v-select v-show="get('secondSearch').showArtSelect"
                              :options="artOptions"
                              v-model="artFilter"
                              :clearable="false">
                    </v-select>
                </div>
            </div>
            <div id="vtp-second-search-panel">
                <button class="ui-button ui-state-default ui-widget ui-corner-all vtp-button second_search_email_details_btn" id="vtp-second-search-mail-detail" title="Änderungen in Anmerkung oder Kommentare - mich per Mail informieren" @click="emailDetailToggle" :class="{ 'ui-state-active': $store.state.secondSearch.emailDetailFilter }"><i class="fa fa-paper-plane"></i></button>
                    <button class="ui-button ui-state-default ui-widget ui-corner-all vtp-button"
                          id="vtp-second-search-is-read"
                          @click="isReadToggle"
                          :class="{ 'ui-state-active': $store.state.secondSearch.isReadFilter }">
                        {{ getReadButtonLabel }}
                    </button>
                <label class="has-cross-icon"
                       style="position: relative">
                    <input type="search"
                           class="vtp-second-search-input"
                           placeholder="ergebnisliste durchsuchen"
                           v-model="search"
                           aria-controls="list-link">
                    <img src="/img/loader.gif"
                         v-if="$store.state.secondSearch.isSearching"
                         class="preloader" />
                    <i class="fa fa-times"
                       :class="{ show: search.length > 0 && !$store.state.secondSearch.isSearching }"
                       @click="search = ''"></i>
                </label>
                <search-clear></search-clear>
            </div>
        </div>
    </transition>
</template>

<script>
import vSelect from 'vue-select/src/components/Select.vue';
import SearchClear from './SearchClear.vue';
import { mapGetters } from 'vuex';
import SelectColor from "../components/SelectColor.vue";

export default {
    name: "SecondSearch",
    data: function () {
        return {
            isDateRangeChanged: false,
            artOptions: [
                { label: 'Bücher-Auswahl', value: '' },
                { label: 'XX', value: 'auswählen' },
                { label: 'Sachbuch', value: 'Sachbuch' },
                { label: 'Roman', value: 'Roman' },
                { label: 'Essay', value: 'Essay' },
                { label: 'Erlebnisbericht', value: 'Erlebnisbericht' },
                { label: 'Biografie', value: 'Biografie' },
                { label: 'Autobiografie', value: 'Autobiografie' },
                { label: 'Thriller', value: 'Thriller' }
            ],
        };
    },
    components: {
        vSelect,
        SearchClear,
        SelectColor,
    },
    computed: {
        ...mapGetters(['get']),
        isBlue: {
            get() {
                return this.$store.state.secondSearch.isBlueFilter;
            },
            set(value) {
                this.$store.commit('updateBlueFilter', value ? 1 : 0);
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        },
        search: {
            get() {
                return this.$store.state.secondSearch.searchString;
            },
            set(value) {
                this.$store.commit('secondSearchIsSearching', true);
                this.$store.commit('updateSecondSearch', value);
                vitoopApp.vtpDatatable.rowsPerPage.reloadSelect();
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        },
        artFilter: {
            get() {
                return this.restoreArtFilter(this.$store.state.secondSearch.artFilter);
            },
            set(artFilter) {
                this.$store.commit('updateArtFilter', artFilter.value);
                vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            }
        },
        dateFrom: {
            get() {
                return this.$store.state.secondSearch.dateFrom;
            },
            set(value) {
                this.isDateRangeChanged = true;
                this.$store.commit('updateDateFrom', value);
            }
        },
        dateTo: {
            get() {
                return this.$store.state.secondSearch.dateTo;
            },
            set(value) {
                this.isDateRangeChanged = true;
                this.$store.commit('updateDateTo', value);
            }
        },
        getReadButtonLabel: function () {
            if (this.$store.state.secondSearch.isReadFilter) {
                return 'gelesen :-)';
            }
            return 'gelesen';
        }
    },
    methods: {
        isReadToggle() {
            this.$store.commit('updateReadFilter', !this.$store.state.secondSearch.isReadFilter ? 1 : 0);
            vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
        },
        emailDetailToggle() {
            this.$store.commit('updateEmailDetailFilter', !this.$store.state.secondSearch.emailDetailFilter ? 1 : 0);
            vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
        },
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
        dateRangeSearch() {
            vitoopApp.vtpDatatable && vitoopApp.vtpDatatable.refreshTable();
            this.isDateRangeChanged = false;
        },
    }
}
</script>

<style lang="scss" scoped>
    $vitoop-body-background-color: #cfe7f7;
    $table-row-height: 25px;
    .preloader {
        position: absolute;
        top: 50%;
        right: 10px;
        width: 16px;
        transform: translateY(-50%);
    }
    .vtp-blue {
        background: #7bc0f6;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #7bc0f6, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #7bc0f6, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #7bc0f6, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #7bc0f6, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    .vtp-gray {
        background: #4e4d4d;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #4e4d4d, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #4e4d4d, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #4e4d4d, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #4e4d4d, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    .vtp-cyan {
        background: #8feeee;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #8feeee, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #8feeee, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #8feeee, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #8feeee, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    .vtp-lime {
        background: #87ee87;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #87ee87, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #87ee87, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #87ee87, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #87ee87, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    .vtp-yellow {
        background: #f5f568;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #f5f568, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #f5f568, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #f5f568, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #f5f568, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    .vtp-red {
        background: #f39090;
        /* For browsers that do not support gradients */
        background: -webkit-linear-gradient(left, #f39090, $vitoop-body-background-color);
        /* For Safari 5.1 to 6.0 */
        background: -o-linear-gradient(right, #f39090, $vitoop-body-background-color);
        /* For Opera 11.1 to 12.0 */
        background: -moz-linear-gradient(right, #f39090, $vitoop-body-background-color);
        /* For Firefox 3.6 to 15 */
        background: linear-gradient(to right, #f39090, $vitoop-body-background-color);
        /* Standard syntax */
        background-repeat: no-repeat;
        background-size: 285px;
    }
    #vtp-second-search-is-read {
        height: 24px;
        padding: 0px 15px;
        font-size: 90%;
        margin-right: 4px;
        display: flex;
        align-items: center;
        line-height: 1.3;
    }
    #vtp-second-search-box::v-deep {
        height: 26px;
        margin-top: 2px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: .3s;
        .dropdown {
            &.v-select {
                width: 200px;
                margin-left: 125px
            }
        }
        .dropdown-toggle {
            height: 22px;
            font-size: 13px;
            padding: 0px !important;
            .selected-tag {
                color: #2779aa;
            }
        }
    }
    #vtp-second-search-box::v-deep .colorDropdown {
        height: 26px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: .3s;
        .dropdown {
            &.v-select {
                width: 200px;
                margin-left: 125px
            }
        }
        .dropdown-toggle {
            height: 18px;
            font-size: 13px;
            padding: 0px !important;
            .selected-tag {
                color: #2779aa;
                margin-top: -4px;
            }
        }
    }
    #vtp-second-search-panel {
        padding: 1px;
        display: flex;
        align-items: center;
    }
    .vtp-second-search-input {
        width: 220px;
        font-size: 13px;
        padding-left: 15px;
    }
    #search_date_range {
        margin-left: 120px;
        display: flex;
        align-items: center;
        input {
            margin-top: 0px;
            margin: 0;
            margin-right: 4px;
            width: 130px;
            vertical-align: baseline;
            font-size: 13px;
        }
        label {
            vertical-align: baseline;
        }

        #vtp_search_date {
            height: 24px;
        }
    }
    #search_blue_box {
        height: $table-row-height;
        padding-right: 20px;
        padding-left: 10px;
        display: flex;
        align-items: center;
    }
    #search_blue {
        margin: 4px 2px 4px;
        position: relative;
        width: 14px;
        height: 16px;
        border: 1px solid #111;
        background: #fff;
        -moz-appearance: checkbox;
        -webkit-appearance: checkbox;
        /*-webkit-appearance: none;*/
        appearance: none;
    }
</style>