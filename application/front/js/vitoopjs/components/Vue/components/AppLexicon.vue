<template>
    <div id="vtp-content">
        <div id="lexicon-main" class="ui-corner-all" v-if="lexicon">
            <div id="vtp-lexicondata-box">
                <div id="vtp-lexicondata-sheet-view"
                     class="ui-corner-all vtp-fh-w70"
                     :style="{height: `${lexiconHeight}px`}">
                    <div v-html="lexicon.description"></div>
                    <hr/>
                    <div id="lexicon-rights">
                        {{ $t('This article based on the article') }}
                        <a rel="nofollow" :href="lexicon.wiki_fullurl" target="_blank">
                            {{ lexicon.name }}
                        </a> {{ $t('from the free encyclopedia') }}
                        <a rel="nofollow"
                           href="http://de.wikipedia.org/wiki/Wikipedia:Hauptseite"
                           target="_blank">Wikipedia</a> {{ $t('and is available under the license') }}
                        <a rel="nofollow"
                           href="http://www.hier-ihre-webseite-eintragen.de/lokale-fdl.txt"
                           target="_blank">{{ $t('GNU Free Documentation License') }}</a> {{ $t('word.and') }}
                        <a rel="nofollow"
                           href="http://creativecommons.org/licenses/by-sa/3.0/de/"
                           target="_blank">{{ $t('Creative Commons CC-BY-SA 3.0 Unported') }}</a>
                        (<a rel="nofollow"
                            href="http://creativecommons.org/licenses/by-sa/3.0/de/legalcode"
                            target="_blank">{{ $t('Summary (de)') }}</a>). {{ $t('In the Wikipedia is a') }}
                        <a rel="nofollow"
                           :href="`${lexicon.wiki_fullurl}?action=history`"
                           target="_blank">{{ $t('List of Authors') }}</a> {{ $t('word.available') }}.
                    </div>
                </div>
                <div id="vtp-lexicondata-sheet-info" class="ui-corner-all vtp-fh-w20">
                    <p>{{ $t('Linked Records') }}:</p>
                    <p>{{ $t('label.project') }}: <span>{{ resourceInfo.prjc }}</span></p>
                    <p>{{ $t('label.lexicon') }}: <span>{{ resourceInfo.lexc }}</span></p>
                    <p>{{ $t('label.pdf') }}: <span>{{ resourceInfo.pdfc }}</span></p>
                    <p>{{ $t('label.textlink') }}: <span>{{ resourceInfo.telic }}</span></p>
                    <p>{{ $t('label.link') }}: <span>{{ resourceInfo.linkc }}</span></p>
                    <p>{{ $t('label.book') }}: <span>{{ resourceInfo.bookc }}</span></p>
                    <p>{{ $t('label.address') }}: <span>{{ resourceInfo.adrc }}</span></p>
                </div>
            </div>
            <div id="lexicon-tags">
                <div id="form-assign-lexicon">
                    <fieldset class="ui-corner-all">
                        <legend>Verknüpfungen mit Lexikonartikel</legend>
                        <div class="autocomplete-wrapper">
                            <input ref="autocomplete_input"
                                   type="text"
                                   id="lexicon_name_name"
                                   maxlength="128"
                                   v-model.trim="autocomplete"
                                   class="vtp-fh-w40 ui-autocomplete-input" autocomplete="off">
                            <button @click="add"
                                    ref="add"
                                    :disabled="lexicon.can_add < 1"
                                    class="vtp-uiinfo-anchor vtp-lexicon-submit ui-button ui-widget ui-state-default ui-corner-all"
                                    :class="{'ui-state-disabled': lexicon.can_add < 1}">
                                + <span v-if="lexicon.can_add > 0">{{ lexicon.can_add }}</span>
                            </button>
                            <button @click="remove"
                                    :disabled="lexicon.can_remove < 1"
                                    class="vtp-uiinfo-anchor vtp-lexicon-submit ui-button ui-widget ui-state-default ui-corner-all"
                                    :class="{'ui-state-disabled': lexicon.can_remove < 1}">
                                - <span v-if="lexicon.can_remove > 0">{{ lexicon.can_remove }}</span>
                            </button>
                            <a class="vtp-uiinfo-anchor vtp-lexicon-submit ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                               v-if="currentTag !== null && autocomplete.length > 0"
                               @click="openLexicon"
                               id="open_lexicon_link" role="button">
                                öffnen
                            </a>
                            <div class="vtp-uiinfo-form-error"></div>
                        </div>
                        <div id="vtp-lexiconbox" class="vtp-collectionbox ui-corner-all">
                            <span v-for="tag in lexiconTags"
                                  :key="tag.id"
                                  @click="selectLexicon(tag)"
                                  class="vtp-lexiconbox-item ui-corner-all"
                                  :data-link="`http://localhost:8080/lexicon/${tag.id}`">
                                <span class="vtp-icon-lex ui-icon ui-icon-document-b"></span>
                                {{ tag.name }}
                                <span class="vtp-lexiconbox-cntres">({{ tag.cnt_res }})</span>
                            </span>
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "AppLexicon",
        data() {
            return {
                autocomplete: null,
                lexicon: null,
                currentTag: null,
                lexiconTags: [],
                resourceInfo: null,
                lexiconTagsHeight: 0
            }
        },
        computed: {
            ...mapGetters(['get']),
            lexiconHeight() {
                return this.lexiconTagsHeight ?
                    this.get('contentHeight')-this.lexiconTagsHeight-32-27 : this.get('contentHeight');
            }
        },
        mounted() {
            this.$store.commit('set', {key: 'coefsToSave', value: []});
            resourceProject.init();
            this.loadLexicon();
            this.getLexicons();
        },
        methods: {
            openLexicon() {
                this.$router.push(`/lexicon/${this.currentTag.id}`);
                this.loadLexicon();
                this.getLexicons();
                this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + 1);
                this.reset();
            },
            loadLexicon() {
                axios(`/api/v1/lexicons/${this.$route.params.lexiconId}`)
                    .then(({data}) => {
                        this.lexicon = data.lexicon;
                        this.resourceInfo = data.resourceInfo;
                        this.$store.commit('set', { key: 'lexicon', value: data.lexicon });
                        this.$store.commit('setResourceInfo', data.resourceInfo);
                        this.$store.commit('setResourceId', this.$route.params.lexiconId);
                    })
                    .catch(err => console.dir(err));
            },
            reset() {
                this.autocomplete = null;
                this.currentTag = null;
                this.$refs.autocomplete_input.focus();
            },
            add() {
                axios.post(`/api/v1/lexicons/${this.lexicon.id}/assignments`, {
                    name: this.autocomplete
                })
                .then(response => {
                    this.reset();
                    this.loadLexicon();
                    this.getLexicons();
                })
                .catch(err => console.dir(err));
            },
            remove() {
                axios.delete(`/api/v1/lexicons/${this.lexicon.id}/assignments/${this.currentTag.id}`)
                    .then(() => {
                        this.reset();
                        this.getLexicons();
                    })
                    .catch(err => console.dir(err));
            },
            selectLexicon(lexicon) {
                this.autocomplete = lexicon.name;
                this.currentTag = lexicon;
                // this.$refs.add.focus();
            },
            getLexicons() {
                axios(`/api/v1/lexicons/${this.$route.params.lexiconId}/assignments`)
                    .then(({data}) => {
                        this.lexiconTags = data;
                        setTimeout(() => {
                            this.init();
                        }, 100);
                    })
                    .catch(err => console.dir(err));
            },
            init() {
                $('#lexicon_name_save').on('click', function() {
                    $('#tab-title-rels').removeClass('ui-state-no-content');
                });
                $('#lexicon_name_name').autocomplete({
                    source: function (request, response) {
                        $.ajax({
                            url: 'https://de.wikipedia.org/w/api.php',
                            data: {
                                format: 'json',
                                action: 'opensearch',
                                continue: '',
                                limit: 10,
                                namespace: 0,
                                search: request.term
                            },
                            dataType: 'jsonp',
                            cache: true,
                            context: $('#lexicon'),
                            success: function (data) {
                                response(data[1]);
                            }
                        });
                    },
                    select: (e,ui) => {
                        this.autocomplete = ui.item.value;
                        this.$refs.add.focus();
                    },
                    minLength: 1,
                    appendTo: 'body'
                });

                $('#lexicon-tags input[type=submit]').button({
                    icons: {
                        primary: "ui-icon-disk"
                    }
                });

                !$('#lexicon-tags .vtp-uiinfo-info').length || $('#lexicon-tags .vtp-uiinfo-info').position({
                    my: 'right top',
                    at: 'right bottom',
                    of: '#lexicon-tags .vtp-uiinfo-anchor',
                    collision: 'none'
                }).hide("fade", 3000);

                const lexiconTags = document.querySelector('#lexicon-tags');
                this.lexiconTagsHeight = lexiconTags ? lexiconTags.clientHeight : 0;
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../../../../css/variables/colors";
    .ui-button {
        padding: .2em 1em;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
    }

    .autocomplete-wrapper {
        display: flex;
        align-items: center;

        .ui-autocomplete-input {
            margin-right: 4px;

            + button {
                margin-right: 4px;
            }
        }

        .ui-button {
            padding: 4px 12px 2px;
            width: auto;
        }
    }

    #open_lexicon_link {
        padding: 4px 15px;
        margin: 0 0 0 4px;
        line-height: 1;
    }

    #vtp-lexicondata-sheet-view {
        transition: .3s;
    }

    #lexicon_name_name {
        color: $vitoop-blue-color;
    }
</style>
