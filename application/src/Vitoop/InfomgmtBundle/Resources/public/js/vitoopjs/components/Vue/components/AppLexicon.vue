<template>
    <div id="vtp-content">
        <div id="lexicon-main" class="ui-corner-all">
            <div id="vtp-lexicondata-box">
                <div id="vtp-lexicondata-sheet-view" class="ui-corner-all vtp-fh-w70">
                    <div v-html="lexicon.data"></div>
                    <hr/>
                    <div id="lexicon-rights">
                        {{ $t('This article based on the article') }}
                        <a rel="nofollow" :href="lexicon.wikiFullUrl" target="_blank">
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
                           :href="`${lexicon.wikiFullUrl}?action=history`"
                           target="_blank">{{ $t('List of Authors') }}</a> {{ $t('word.available') }}.
                    </div>
                    <div v-if="Object.keys(lexicon.wikiRedirects).length > 0">
                        <p>{{ $t('The following terms have been linked in Vitoop and forwarded in Wikipedia on this Encyclopedia Article') }}:</p>
                        <ul>
                            <li v-for="(value,name) in lexicon.wikiRedirects">
                                {{ value.wikititle }}
                            </li>
                        </ul>
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
            <div id="lexicon-tags"
                 v-html="lexicon.lexicons">
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppLexicon",
        inject: ['lexicon','resourceInfo'],
        mounted() {
            resourceProject.init();
            // resourceDetail.init();
            this.init();
        },
        methods: {
            init() {
                $('#open_lexicon_link').button();
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
                    minLength: 2,
                    appendTo: 'body'
                });
                $('form#form-assign-lexicon').ajaxForm({
                    delegation: true,
                    dataType: 'json',
                    success: [ data => {
                        $('#lexicon-tags').html(data['resource-lexicon']);
                        this.init();
                        $('#lexicon_name_name').focus();
                    }],
                    error: function (jqXHR, textStatus, errorThrown, $form) {
                        $form.empty().append('Vitoooops!: ' + textStatus + ' ' + jqXHR.status + ': ' + jqXHR.statusText);
                    }

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

                $('.vtp-lexiconbox-item').click(function() {
                    $('#open_lexicon_link').attr('href', $(this).data('link')).show(400);
                    var text = $(this).text().trim();
                    var pos = text.search(new RegExp('\\(\\d+\\)'));
                    if (pos > -1) {
                        text = text.substring(0, pos).trim();
                    }
                    $('#lexicon_name_name').val(text);
                });
                $('.vtp-lexicon-submit').click(function(event) {
                    var input = $('#lexicon_name_name');
                    if (input.val() == "") {
                        input.focus();
                        event.preventDefault();
                    }
                });
                $('#lexicon_name_name').on("input", function() {
                    $('#open_lexicon_link').hide(400);
                });
                if ($('#lexicon_name_can_add').val() != "1") {
                    $('#lexicon_name_save').button('disable');
                }
                if ($('#lexicon_name_can_remove').val() != "1") {
                    $('#lexicon_name_remove').button('disable');
                }
            }
        }
    }
</script>

<style scoped>

</style>