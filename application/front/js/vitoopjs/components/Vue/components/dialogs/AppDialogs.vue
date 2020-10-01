<template>
    <div>
        <div id="vtp-res-dialog" style="display:none" :class="`${get('resource').type}`">
            <div id="vtp-res-dialog-tabs">
                <ul>
                    <li><a href="#tabs-quickview">Übersicht</a></li>
                    <li id="tab-title-remark"><a href="#tabs-remark">Anmerkungen</a></li>
                    <li id="tab-title-remark-private"><a href="#tabs-remark_private">p</a></li>
                    <li id="tab-title-comments"><a href="#tabs-comments">Kommentare</a></li>
                    <li id="tab-title-rels"><a href="#tabs-assignments">Verknüpfungen</a></li>
                </ul>
                <div id="tabs-quickview">
                    <div id="resource-quickview">
                        <div id="resource-rating"></div>
                        <div id="resource-data"></div>
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
                            <div style="text-align: right; color: #2779aa; margin: 15px 5px 5px;">
                                <p>
                                    <input type="checkbox"
                                           name="user_show_help"
                                           id="user_show_help" style="-webkit-appearance: checkbox;">
                                    <!-- {%if app.user and app.user.getIsShowHelp()%}checked{%endif%} -->
                                    <label for="user_show_help">Hinweis automatisch anzeigen</label>
                                </p>
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
    </div>
</template>

<script>
    import {mapGetters} from "vuex"

    export default {
        name: "AppDialogs",
        computed: {
            ...mapGetters(['get'])
        }
    }
</script>

<style lang="scss">
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
