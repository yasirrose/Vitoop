<template>
    <div v-if="`${get('resource').type}` != 'userlist'">
        <div id="vtp-res-dialog" style="display:none" :class="`${get('resource').type}`">
            <div id="resource-notes" style="display: none;">
                <fieldset class="ui-corner-all">
                    <legend>Notizen</legend>
                    <div class="notes-block">
                        <textarea
                            id="vtp-user-notes-textarea"
                            :value="notes"
                            :placeholder="notesPlaceholder">
                        </textarea>
                    </div>
                </fieldset>
            </div>
            <div id="vtp-res-dialog-tabs">
                <ul>
                    <li><a href="#tabs-quickview">Übersicht</a></li>
                    <li id="tab-title-remark"><a href="#tabs-remark">Anmerkungen</a></li>
                    <li id="tab-title-remark-private"><a href="#tabs-remark_private">p</a></li>
                    <li id="tab-title-comments"><a href="#tabs-comments">Kommentare</a></li>

                    <li id="tab-title-rels"><a href="#tabs-assignments">{{ getAssigmentTitle }}</a></li>
                </ul>
                <div id="tabs-quickview">
                    <div id="resource-quickview">
                        <div id="resource-rating"></div>
                        <div id="resource-data"></div>
                        <element-notification id="vtp-user-hook"></element-notification>
                        <div id="resource-tag"></div>
                    </div>
                    <div id="resource-help" style="display:none">
                        <fieldset class="ui-corner-all">
                            <legend>Wo wird welcher Datensatz eingetragen</legend>
                            <div style="color: #3d80b3">
                                <p>Hier kannst Du einen neuen Datensatz eintragen <strong>(Klick auf den oberen Knopf)</strong>. Damit die Aufteilung zwischen Pdf, Textlink usw. Sinn macht, ist es wichtig, dass die Datensätze in der richtigen Kategorie eingetragen werden:</p>
                                <p><strong>Pdf:</strong> Hier kommen nur Pdfs rein mit der URL-Endung ".pdf"</p>
                                <p><strong>Texlink:</strong> Alle Seiten bei denen es hauptsächlich was zum Lesen gibt, außer Pdfs.</p>
                                <p><strong>Link:</strong> Startseiten einer Internetpräsenz und Seiten, die den eigentlichen Inhalt nicht selbst anzeigen, sondern eine große Anzahl von Links enthalten kommen hier rein.</p>
                                <p><strong>Projekt, Lexikon und Buch</strong> ist selbsterklärend. Wenn ein Datensatz falsch eingetragen ist, wird er möglicherweise gelöscht.</p>
                            </div>
                            <div class="user_show_help__wrapper ui-corner-all">
                                <label class="custom-checkbox__wrapper square-checkbox">
                                    <input class="valid-checkbox open-checkbox-link"
                                           id="user_show_help"
                                           name="user_show_help"
                                           :checked="isShowHelp"
                                           type="checkbox"/>
                                    <span class="custom-checkbox">
                                        <img class="custom-checkbox__check"
                                             src="/img/check.png" />
                                    </span>
                                    Hinweis automatisch anzeigen
                                </label>
                            </div>
                        </fieldset>
                    </div>
                </div>
                <div id="tabs-remark">
                    <div id="resource-remark"></div>
                </div>
                <div id="tabs-remark_private">
                    <div id="resource-remark_private"></div>
                </div>
                <div id="tabs-comments">
                    <div id="resource-comments"></div>
                </div>
                <div id="tabs-assignments">
                    <div id="resource-assignments">
                        <div id="resource-lexicon"></div>
                        <div id="resource-project"></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="vtp-res-dialog-help" title="Hilfe"></div>
        <div id="vtp-res-dialog-links" style="display:none"></div>
        <div id="vtp-res-dialog-prompt-links" style="display: none"></div>
        <NotesDialog style="display: none" />
    </div>
    <div v-else>
        <div id="vtp-res-dialog" style="display:none" :class="`${get('resource').type}`">
            <div>
                <div class="user_detail_box">
                    <div id="resource-quickview">
                        <div id="resource-data"></div>
                    </div>
                </div>
                <div id="tabs-user_detail">
                    <div id="resource-user_detail"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapState } from "vuex";
    import NotesDialog from "./NotesDialog.vue";
    import TinyMCEInitializer from "../../../TinyMCEInitializer";
    import ElementNotification from "../helpers/ElementNotification.vue";
    import SelectColor from "../SelectColor.vue";
    import EventBus from "../../../../app/eventBus";

    export default {
        name: "AppDialogs",
        components: {
            SelectColor,
            NotesDialog,
            ElementNotification,
        },
        data() {
            return {
                dialog_initiated: false,
                notesPlaceholder: 'Hier kannst Du private Notizen speichern, die von überall aus zugänglich sind.',
            }
        },
        computed: {
            ...mapState({
              notes: ({ notes }) => notes,
            }),
            ...mapGetters(['get']),
            isShowHelp() {
                return this.get('user') ? this.get('user').is_show_help : false;
            },
            getAssigmentTitle() {
                return 'Verknüpfungen';
            }
        },
        mounted() {
            $('#user_show_help').on('change', function () {
                $.ajax({
                    method: "PATCH",
                    url: vitoop.baseUrl + "api/user/me",
                    data: JSON.stringify({
                        is_show_help: $('#user_show_help').prop('checked')
                    }),
                    dataType: 'json',
                    success: function(data){
                        vitoop.isShowHelp = data.is_show_help;
                        if (data.is_show_help == false) {
                            $('#vtp-bigclosehelp').show();
                        } else {
                            $('#vtp-bigclosehelp').hide();
                        }
                    }
                });
            });

          EventBus.$on('close', () => {
            this.saveNotes();
          });

          EventBus.$on('open', () => {
            if (this.dialog_initiated === false) {
              this.activateTinyMCE();
            }

            let tinyInit = new TinyMCEInitializer();
            let editor = tinyInit.getEditor('vtp-user-notes-textarea')
            editor.setContent(this.notes);
          });
        },
        methods: {
            closeNotes() {
                $('#open-notes-dialog-button').removeClass('ui-state-active');
                $('#resource-notes').removeClass('open');
            },
            saveNotes() {
              let tinyInit = new TinyMCEInitializer();
              let editorContent = tinyInit.getEditorContent('vtp-user-notes-textarea');
              if (editorContent !== this.notes) {
                console.log('saving notes with text ', editorContent)
                this.$store.dispatch('saveNotes', editorContent);
              }

            },
            activateTinyMCE () {
              let tinyInit = new TinyMCEInitializer();
              let options = tinyInit.getCommonOptions();
              options.width = 700;
              options.height = 100;
              options.selector = '#vtp-user-notes-textarea';
              options.init_instance_callback = function () {
                  $('.notes-block > .mce-container').show();
                  $('#vtp-user-notes-textarea').hide();
              }
              tinymce.init(options);
            },
        }
    }
</script>

<style lang="scss">
    @keyframes slide-right {
        to { transform: translateX(0); opacity: 1 }
    }

    #resource-notes {
        overflow: hidden;
        padding-bottom: 1px;
        /*transition: .3s;*/
        display: none;
    }

    .notes-block {
        display: flex;
        margin-bottom: .5rem;

        textarea {
            width: 100%;
            height: 100px;
        }

        &__buttons {

            button {
                min-height: 24px;
                width: 105px;
                padding: 2px 1rem;
                opacity: 0;
                transform: translateX(30px);
            }
        }
    }

    .user_show_help {

        &__wrapper {
            text-align: right;
            color: #2779aa;
            margin: 15px 0 5px;
            border: 1px solid #aed0ea;
            padding: 5px;
        }
    }

    .created-info-lex {

        & > .vtp-fh-w10 {
            display: none;
        }

        & > .vtp-fh-w90.vtp-right {
            width: 100%;
        }
    }

    #lexicon-rights {
        font-size: 13px;
    }

    #resource-data {

        hr {
            border: none;
            background-color: #aed0ea;
            height: 1px;
        }
    }

    .ui-dialog-titlebar, #form-flaginfo {

        .ui-state-active {
            .ui-icon {
                /*background-image: url(/../img/ui-icons_3d80b3_256x240.png) !important;*/
            }
            &:not(.ui-state-disabled):not(th) {
                &:focus {
                    outline: none !important;
                    border-color: #74b2e2 !important;
                }
                &:active {
                    background: linear-gradient(to top, lighten(#7cc0f6, 10%) 40%, lighten(#e8f3fa, 10%) 131%) !important;
                }
            }
        }
    }

    li.ui-state-active {

        &:hover {
            border-bottom: none !important;
        }

        a {
            color: white !important;
        }
    }
</style>
