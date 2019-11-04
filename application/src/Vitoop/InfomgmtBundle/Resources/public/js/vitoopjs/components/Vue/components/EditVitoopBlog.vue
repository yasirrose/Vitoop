<template>
    <div class="vtp-content">
        <form name="vitoop_blog"
              method="post"
              action="/edit-vitoop-blog"
              id="vtp-form-vitoop-blog"
              novalidate="novalidate">
            <fieldset class="ui-corner-all">
                <legend>Neuigkeiten</legend>
                <div id="vtp-vitoopblog-box">
                    <div id="vtp-vitoopblog-sheet-edit">
                        <textarea id="vitoop_blog_sheet"
                                  name="vitoop_blog[sheet]"
                                  required="required"
                                  aria-hidden="true">
                            {{ welcome_text }}
                        </textarea>
                        <div id="vtp-vitoopblog-save-container">
                            <input type="submit"
                                   id="vitoop_blog_save"
                                   name="vitoop_blog[save]"
                                   value="speichern"
                                   class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default ui-corner-all"
                                   role="button">
                        </div>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import TinyMCEInitializer from "../../TinyMCEInitializer";

    export default {
        name: "EditVitoopBlog",
        data() {
            return {
                welcome_text: `
<h3 style="padding-left: 30px;">
    <span style="color: #003366;">
        <strong>Willkommen auf vitoop.org</strong>
    </span>
</h3>
<p style="padding-left: 30px;">
    <br />
    <span style="color: #003366;">
        Vor einiger Zeit sind Menschen vor allem in die n&auml;chste Bibliothek gegangen, wenn sie sich f&uuml;r ein Thema interessierten und mehr dar&uuml;ber wissen wollten. Heute kann man eine Flut an Informationen zu fast jedem Thema digital und in sekundenschnelle aus verschiedenen Netzwerken abrufen und bekommt eine Flut von Daten in Form von wissenschaftlichen Informationen, Tweets, Bildern, Ger&uuml;chten, Videos und anderen Formaten in endlosen Listen und beliebiger Qualit&auml;t zusammengew&uuml;rfelt. Und alles ist kostenlos, aber auch un&uuml;bersichtlich und in Bezug auf die individuelle Verwertbarkeit zun&auml;chst schwer einzusch&auml;tzen.
    </span>
    <br />
    <br />
    <span style="color: #003366;">
        Die Aufgabe des Journalismus Informationen zu sortieren, zu filtern und in verschiedene Zusammenh&auml;nge einzuordnen wird zunehmend von Suchmaschinen &uuml;bernommen. Diese sind hiermit aber &uuml;berfordert und liefern keine sinnhaften Zusammenh&auml;nge, sondern eine un&uuml;berschaubare Anzahl von Einzelergebnissen, die mehr oder weniger zusammenhanglos nebeneinander stehen. Das Ergebnis ist eine immer gr&ouml;&szlig;ere Masse an verf&uuml;gbarem Informationen, die den Nutzern immer weniger Orientierung bieten. Von ihnen wird dabei immer mehr Informations- und Medienkompetenz abverlangt, um Inhalte miteinander in Beziehung zu setzen, Muster zu erkennen und dabei&nbsp; Optionen f&uuml;r das eigene Handeln abzuleiten.
    </span>
    <br />
    <br />
    <span style="color: #003366;">
        Zwar wird schon seit einiger Zeit wird unter dem Stichwort &bdquo;Semantisches Web&ldquo; daran gearbeitet Inhalte, die sonst nur von Menschen verstanden werden, auch f&uuml;r Maschinen interpretierbar zu machen. Eine solche technokratische Erfassung menschlicher Sinnzusammenh&auml;nge kann der Komplexit&auml;t des menschlichen Intellekts auf absehbare Zeit aber nicht gerecht werden und beinhaltet zudem die Gefahr in ihren Ergebnissen durch den Einfluss von Interessen bewusst oder unbewusst \\"gelenkt\\" zu werden.
    </span>
    </p>
    <p style="padding-left: 60px;">
        <br />
        <strong>
            <span style="color: #003366;">vitoop.org ist ein Versuch der analytischen Vielfalt im Netz eine individuelle und kollektive <br />
                Verkn&uuml;pfung von
            </span>
        </strong>
        <strong>
            <span style="color: #003366;">Einzelinformationen entgegenzusetzen, mit dem Ziel relevante Inhalte zu: </span>
        </strong>
        <br />
        <br />
        <strong>
            <span style="color: #003366;">- ermitteln, </span>
        </strong>
        <br />
        <strong>
            <span style="color: #003366;">- mit Metadaten anzureichern,</span>
        </strong>
        <br />
        <strong>
            <span style="color: #003366;">- nach verschiedenen Kategorien </span>
            <span style="color: #003366;">dynamisch zu sortiert </span>
        </strong>
        <br />
        <strong>
            <span style="color: #003366;">- und sinnvoll aufeinander zu beziehen.</span>
        </strong>
        <br />
        <br />
        <strong>
            <span style="color: #003366;">Dies soll erreicht werden durch die Benutzung der Seite, indem alle Beteiligten durch geringstm&ouml;glichen
                <br />
                Aufwand
            </span>
        </strong>
        <strong>
            <span style="color: #003366;">zur Struktur der Inhalte beitragen k&ouml;nnen, hierdurch den beschriebenen Mehrwert f&uuml;reinander
                <br />generieren und selbst davon profitieren.
                <br />
            </span>
        </strong>
    </p>
    <p style="padding-left: 30px;">
        <span style="color: #003366;">
        <br />
        Zur Zeit befindet sich die Seite in einer geschlossenen Testphase und bietet aktuell nur eine gewisse Grundfunktionalit&auml;t, die aber schon alle wesentlichen Mechanismen beinhaltet um das oben beschriebene Ziel zu erreichen. Nach einer erfolgreichen Testphase wird die Anwendung f&uuml;r die Allgemeinheit zug&auml;nglich gemacht und durch weitere Funktionen, sowie M&ouml;glichkeiten der Integration zus&auml;tzlicher Informationsformate schrittweise
    </span>
    <span style="color: #003366;"> ausgebaut.
        <br />
        <br />
        <br />
    </span>
</p>`
            }
        },
        mounted() {
            const tinyInit = new TinyMCEInitializer();
            const options = tinyInit.getCommonOptions();
            options.selector = 'textarea#vitoop_blog_sheet';
            options.width = 615;
            options.height = 600;
            options.plugins = ['textcolor', 'link', 'media', 'code'];
            options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | media | code'

            tinymce.init(options);
        }
    }
</script>

<style scoped>

</style>