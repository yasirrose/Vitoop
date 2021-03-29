<template>
    <div style="margin: -24px 0 0 700px">
        <form id="vtp-search-bytags-form"
              style="padding: 0 8px 0 0.5em"
              action=""
              method="get"
              novalidate="novalidate">
            <div id="vtp-search-bytags-form-input-container" class="has-cross-icon">
                <input id="vtp-search-bytags-taglist"
                       v-model="searchByTags"
                       name="taglist[]"
                       type="text"
                       placeholder="tag (Suchbegriff) eingeben">
                <i class="fa fa-times"
                   :class="{show: searchByTags !== null}"
                   @click="searchByTags = null"></i>
            </div>
            <div id="vtp-search-bytags-form-buttons">
                <input id="vtp-search-bytags-restype"
                       name="restype"
                       type="hidden"
                       :value="getResource('type')"/>
                <select id="vtp-search-bytags-tagcnt"
                        title="Übereinstimmungen der Tags"
                        name="tagcnt"
                        size="1"
                        style="width: 58px">
                    <option value="0">-</option>
                </select>
                <transition name="translate">
                    <!-- <button id="vtp-search-bytags-form-submit"
                            class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
                            value="Suche"
                            :class="{'ui-state-active': active}"
                            v-if="active"
                            @click="reloadTable">
                        <span class="ui-button-icon-primary ui-icon ui-icon-refresh"></span>
                    </button> -->
                </transition>
                <span id="vtp-search-bytags-form-buttons-vue">
                    <ButtonOpenNotes />
                    <help-button help-area="search" />
                    <search-toggler></search-toggler>
                </span>
            </div>
        </form>
        <div id="vtp-filterbox">
            <div id="vtp-search-bytags-taglistbox"
                 class="ui-corner-all">
                <span class="vtp-search-bytags-tag ui-corner-all"
                      :class="{
                        'vtp-search-bytags-tag-ignore': tag.isIgnored,
                        'ui-state-active': tag.isHighlighted,
                        'vtp-search-bytags-tag-active': tag.extended
                      }"
                      v-for="tag in tags"
                      :key="tag.text">
                    <span class="vtp-icon-tag ui-icon ui-icon-tag"
                          @click="extendTag(tag,$event)">
                    </span>
                    <span class="vtp-search-bytags-content"
                          @click="extendTag(tag,$event)">
                        {{ tag.text }}
                    </span>
                    <span title="in der Ergebnisliste nach oben sortieren"
                          class="ui-icon ui-icon-lightbulb tag-icons-to-hide vtp-icon-bulb"
                          style="display: none"
                          @click="highlightTag(tag)"></span>
                    <span title="Datensätze mit diesem Tag aussortieren"
                          class="ui-icon ui-icon-cancel tag-icons-to-hide vtp-icon-cancel"
                          style="display: none"
                          @click="ignoreTag(tag)">
                    </span>
                    <span title="Tag entfernen"
                          class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"
                          @click="removeTag(tag)">
                    </span>
                </span>
                <button id="vtp-icon-clear-taglistbox"
                        class="vtp-button vtp-uiaction-search-bytags-clear-taglistbox"
                        @click="removeAllTags">
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HelpButton from '../SecondSearch/HelpButton.vue'
    import SearchToggler from '../SecondSearch/SearchToggler.vue'
    import AppTagList from "./AppTagList.vue"
    import DataStorage from "../../../datastorage"
    import RowPerPageSelect from "../../RowPerPageSelect";
    import ButtonOpenNotes from "../components/dialogs/ButtonOpenNotes.vue";

    export default {
        name: "SearchByTags",
        components: {
            HelpButton, SearchToggler, AppTagList, ButtonOpenNotes
        },
        data() {
            return {
                active: false,
                searchByTags: null,
                tags: [],
                ignoredTags: [],
                highlightedTags: [],
                tagCount: 0,
                igCount: 0,
                hlCount: 0,
                tagcnt: 0,
                cnttags: 0,
                isChanged: false,
                tagSearchListId: '#vtp-search-bytags-taglist',
                tagSearchAreaId: '#vtp-search-bytags-taglistbox',
                tagSearchFormId: '#vtp-search-bytags-form',
                tagCntId: '#vtp-search-bytags-tagcnt',
                datastorage: new DataStorage(),
                tagsDSKey: 'dt-tags',
                ignoredTagsDSKey: 'dt-ignoredTags',
                highlightedTagsDSKey: 'dt-highlightedTags',
                tagcntDSKey: 'dt-tagCnt',
            }
        },
        computed: {
            ...mapGetters(['getResource','get','getTagListShow'])
        },
        watch: {
            getTagListShow(show) {
                if (show) {
                    this.$store.commit('updateTableRowNumber', this.get('table').rowNumber - 1);
                    VueBus.$emit('datatable:reload');
                } else {
                    this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + 1);
                    VueBus.$emit('datatable:reload');
                }
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            closeDialog() {
                console.log('close dialog');
            },
            removeAllTags(e) {
                this.resetTags();
                this.cnttags = 0;
                this.tagcnt = 0;
                this.$store.commit('set', {key: 'tagcnt', value: this.tagcnt});
                this.saveTagsToStorage();
                this.updateAutocomplete($('#vtp-search-bytags-taglist'));
                this.maintainCntTags();
                // $('#vtp-search-bytags-form-submit').blur();
                this.active = false;
                this.isChanged = false;
                resourceList.loadResourceListPage(e);
            },
            removeTag(tag) {
                this.tags.splice(_.findIndex(this.tags, tag), 1);
                const index_i = this.ignoredTags.indexOf(tag.text);
                const index_h = this.highlightedTags.indexOf(tag.text);

                if (index_i > -1) this.ignoredTags.splice(index_i, 1);
                if (index_h > -1) this.highlightedTags.splice(index_h, 1);

                this.$store.commit('setTags', {
                    key: 'tags',
                    tags: this.tags.map(tag => tag.text)
                });
                this.$store.commit('setTags', {key: 'tags_i', tags: this.ignoredTags});
                this.$store.commit('setTags', {key: 'tags_h', tags: this.highlightedTags});

                this.updateAutocomplete($('#vtp-search-bytags-taglist'));
                this.maintainCntTags();
                if (this.tags.length > 0) 
                    VueBus.$emit('datatable:reload');
            },
            extendTag(tag,event) {
                let parent = $(event.target).parent();
                if (tag.extended) {
                    $('.tag-icons-to-hide', parent).hide(400);
                    tag.extended = false;
                } else {
                    tag.extended = true;
                    $('.tag-icons-to-hide', parent).show(400);
                }
            },
            init() {
                this.loadTagsFromStorage();
                this.tags.forEach(tag => {
                    tag.extended = false;
                    tag.isHighlighted = this.highlightedTags.indexOf(tag.text) !== -1;
                    tag.isIgnored = this.ignoredTags.indexOf(tag.text) !== -1;
                });
                $(this.tagCntId).val(this.tagcnt);
                $(this.tagCntId).selectmenu().selectmenu("refresh", true);
                $(this.tagSearchFormId).on('keypress', this.tagSearchListId, function (e) {
                    if (e.keyCode == 13) {
                        // prevent submitting the form by hitting the enter key (or
                        // numpad-enter)
                        e.preventDefault();
                    }
                });

                $(this.tagSearchFormId).on('submit', (e, secondSuccessFunc) => {
                    resourceList.loadResourceListPage(e, secondSuccessFunc);
                    // $('#vtp-search-bytags-form-submit').blur();
                    this.active = false;
                    this.isChanged = false;
                });

                let searchByTag = $(this.tagSearchListId);
                if (searchByTag.length > 0) {
                    searchByTag.autocomplete({
                        source:
                            vitoop.baseUrl + (['tag', 'suggest'].join('/')) +
                            '?extended=1&ignore=' +
                            this.ignoredTags.map(tag => tag.text).join() +
                            this.tags.map(tag => tag.text).join(),
                        minLength: 1,
                        autoFocus: false,
                        select: (event, ui) => {
                            if (typeof ui != "undefined") {
                                ui.item.isHighlighted = false;
                                ui.item.isIgnored = false;
                                ui.item.extended = false;
                                $('body').addClass('overflow-hidden');
                                this.pushTag(ui.item);
                                event.preventDefault();
                            }
                            // $('#vtp-search-bytags-taglist').val('');
                            this.searchByTags = null;
                            this.updateAutocomplete(searchByTag);
                            if (this.tags.length > 1) {
                                // $(this.tagSearchFormId).submit();
                                VueBus.$emit('datatable:reload');
                            }
                        },
                        response: (e, ui) => {
                            if (0 === ui.content.length) {
                                ui.content.push({cnt:"",text:".. das tag existiert nicht."});
                                return;
                            }
                            // filter already selected tag ui.content
                            for (let i = 0; i < ui.content.length; i += 1) {
                                if ((this.tags.indexOf(ui.content[i].value) > -1)||(this.ignoredTags.indexOf(ui.content[i].value) > -1)) {
                                    ui.content.splice(i, 1);
                                    i -= 1;
                                }
                            }
                        }
                    }).data("ui-autocomplete")._renderItem = function(ul, item) {
                        item.label = item.text;
                        let span = "<div class='vtp-search-bytags-item'>"+item.text + "</div><span>"+item.cnt+"</span>";
                        if (item.cnt == "") {
                            return $("<li class='ui-state-disabled' style='margin: 0px'></li>").append(span).appendTo(ul);
                        }
                        return $("<li></li>").append(span).appendTo(ul);
                    };
                }

                $('#vtp-icon-clear-taglistbox').button({
                    icons: {
                        primary: 'ui-icon-close'
                    },
                    text: false
                });

                $('#vtp-search-bytags-tagcnt').on('selectmenuchange', () => {
                    this.tagcnt = +$('#vtp-search-bytags-tagcnt').val();
                    this.active = true;
                    this.$store.commit('set', {key: 'tagcnt', value: this.tagcnt});
                    this.saveTagsToStorage();
                    VueBus.$emit('datatable:reload');
                });

                this.maintainCntTags();

                if (this.tags.length > 0) {
                    $(this.tagSearchFormId).submit();
                }
            },
            loadTagsFromStorage() {
                this.tags = this.datastorage.getArray(this.tagsDSKey);
                this.ignoredTags = this.datastorage.getArray(this.ignoredTagsDSKey);
                this.highlightedTags = this.datastorage.getArray(this.highlightedTagsDSKey);
                this.tagcnt = this.datastorage.getAlphaNumValue(this.tagcntDSKey);
                this.tagCount = this.tags.length;
                this.igCount = this.ignoredTags.length;
                this.hlCount = this.highlightedTags.length;
            },
            saveTagsToStorage() {
                this.datastorage.setArray(this.tagsDSKey, this.tags);
                this.datastorage.setArray(this.ignoredTagsDSKey, this.ignoredTags);
                this.datastorage.setArray(this.highlightedTagsDSKey, this.highlightedTags);
                this.datastorage.setItem(this.tagcntDSKey, this.tagcnt)
            },
            resetTags() {
                this.tags = [];
                this.ignoredTags = [];
                this.highlightedTags = [];

                this.$store.commit('setTags', {key: 'tags', tags: []});
                this.$store.commit('setTags', {key: 'tags_i', tags: []});
                this.$store.commit('setTags', {key: 'tags_h', tags: []});

                this.tagCount = 0;
                this.igCount = 0;
                this.hlCount = 0;
            },
            changeColor() {
                if ((!this.isChanged) && ((this.tagCount != this.tags.length) || (this.igCount != this.ignoredTags.length) || (this.hlCount != this.highlightedTags.length))) {
                    this.active = true;
                    this.isChanged = true;
                }
                this.tagCount = this.tags.length;
                this.igCount = this.ignoredTags.length;
                this.hlCount = this.highlightedTags.length;
            },
            ignoreTag(tag) {
                tag.isIgnored = !tag.isIgnored;
                tag.isIgnored ? this.ignoredTags.push(tag.text) : this.ignoredTags.splice(_.findIndex(this.tags, tag.text), 1);
                this.maintainCntTags();
                this.saveTagsToStorage();
                this.$store.commit('setTags', {
                    key: 'tags',
                    tags: this.tags.filter(tag => !tag.isIgnored).map(tag => tag.text)
                });
                this.$store.commit('setTags', {key: 'tags_i', tags: this.ignoredTags});
                this.changeColor();
                VueBus.$emit('datatable:reload');
            },
            highlightTag(tag) {
                tag.isHighlighted = !tag.isHighlighted;
                tag.isHighlighted ? this.highlightedTags.push(tag.text) : this.highlightedTags.splice(_.findIndex(this.tags, tag.text), 1);
                this.maintainCntTags();
                this.saveTagsToStorage();
                this.$store.commit('setTags', {key: 'tags_h', tags: this.highlightedTags});
                this.changeColor();
                VueBus.$emit('datatable:reload');
            },
            pushTag(tag) {
                if (tag == '') {
                    return;
                }
                if (this.tags.indexOf(tag) === -1) {
                    this.tags.push(tag);
                    this.$store.commit('setTags', {
                        key: 'tags',
                        tags: this.tags.filter(tag => !tag.isIgnored).map(tag => tag.text)
                    });
                    this.maintainCntTags();
                }
            },
            maintainCntTags() {
                let $_options;
                this.cnttags = this.tags.length;
                this.saveTagsToStorage();
                this.maintainTaglistbox();

                $_options = $('#vtp-search-bytags-tagcnt option');
                if ((($_options.length - 1) + 1 ) === this.cnttags) {
                    $('<option></option>').val(this.cnttags).text(this.cnttags).appendTo('#vtp-search-bytags-tagcnt');
                } else if ((($_options.length - 1) - 1) === this.cnttags) {
                    $_options.filter('[value="' + (this.cnttags + 1) + '"]').remove();
                } else {
                    $('#vtp-search-bytags-tagcnt').empty();
                    $('<option></option>').val(0).text('-').appendTo('#vtp-search-bytags-tagcnt');
                    for (var i = 1; i <= this.cnttags; i += 1) {
                        $('<option></option>').val(i).text(i).appendTo('#vtp-search-bytags-tagcnt');
                    }
                }

                if ((this.cnttags === 0) && (this.ignoredTags.length > 0)) {
                    // $('#vtp-search-bytags-form-submit').attr("disabled", "disabled");
                } else {
                    // $('#vtp-search-bytags-form-submit').removeAttr("disabled");
                }

                this.tagcnt = (this.tagcnt > this.cnttags) ? this.cnttags : this.tagcnt;
                $('#vtp-search-bytags-tagcnt').val(this.tagcnt);

                let tempCount = (this.tags.length == 1)?(1):(this.tagcnt);
                if (typeof $('#vtp-search-bytags-tagcnt').selectmenu('instance') === 'undefined') {
                    $('select#vtp-search-bytags-tagcnt').selectmenu();
                } else {
                    $('select#vtp-search-bytags-tagcnt').selectmenu("refresh");
                }

                $('#vtp-search-bytags-form span.ui-selectmenu-button').removeAttr('tabIndex');
                $('#vtp-search-bytags-tagcnt-button').attr('title', 'Übereinstimmungen der Tags');
            },
            maintainTaglistbox(force_hide) {
                if (typeof force_hide === "undefined") {
                    force_hide = false;
                }

                let displayCallback = function () {
                    let rowPerPage = new RowPerPageSelect();
                    rowPerPage.reloadSelect();
                };

                if (force_hide) {
                    $('#vtp-search-bytags-taglistbox').hide('blind', 'fast', displayCallback);
                    vitoopState.commit('updateTagListShowing', false);
                    return;
                }
                if ((this.tags.length === 0) && (this.ignoredTags.length === 0) || !$(this.tagSearchFormId).is(':visible')) {
                    $('#vtp-search-bytags-taglistbox').hide('blind', 'fast', displayCallback);
                    vitoopState.commit('updateTagListShowing', false);
                } else {
                    $('#vtp-search-bytags-taglistbox').show('blind', 'fast', displayCallback);
                    vitoopState.commit('updateTagListShowing', true);
                }

            },
            updateAutocomplete (searchByTag) {
                searchByTag.autocomplete(
                    'option',
                    'source',
                    vitoop.baseUrl + (['tag', 'suggest'].join('/')) + '?extended=1&ignore='+this.tags.map(tag => tag.text).join()
                );
            },
        }
    }
</script>

<style lang="scss">
    .ui-menu-item {
        display: flex !important;
        box-sizing: border-box;

        &.ui-state-focus {
            width: 100% !important;
        }

        .vtp-search-bytags-item {
            flex: 1;
            width: auto !important;
        }
    }
</style>

<style scoped lang="scss">

    #vtp-filterbox {
        margin-top: 2px;
        margin-left: -700px;
    }

    #vtp-search-bytags-taglistbox {
        display: flex;
        padding-right: 45px;
        flex-wrap: wrap;

        .vtp-search-bytags-tag {
            transition: .3s;
            display: flex;
            align-items: center;
        }
    }

    .translate {

        &-enter {
            width: 0 !important;
            transform: scale(.3) !important;
            opacity: .3;

            &-to {
                /*width: 62px !important;*/
                transform: scale(1) !important;
                opacity: 1 !important;
            }

            &-active {
                transition: .3s !important;
            }
        }

        &-leave {
            /*width: 62px !important;*/
            transform: scale(1) !important;
            opacity: 1 !important;

            &-to {
                width: 0 !important;
                transform: scale(.3) !important;
                opacity: .3;
            }

            &-active {
                transition: .3s !important;
            }
        }
    }
</style>
