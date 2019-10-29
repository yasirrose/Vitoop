<template>
    <button id="vtp-search-help"
            :help-area="helpArea"
            class="vtp-button vtp-help-area-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
            @click="showHelp">
        <span class="ui-icon ui-icon-help"></span>
        <span class="ui-button-text"></span>
    </button>
</template>

<script>
    import TinyMCEInitializer from "../../TinyMCEInitializer";
    import {mapGetters} from 'vuex';

    export default {
        name: "HelpButton",
        props: {
            helpArea: {
                type: String
            }
        },
        data() {
            return {
                helpPopupId: '#vtp-res-dialog-help',
            }
        },
        computed: {
            ...mapGetters(['getHelp','isAdmin'])
        },
        mounted() {
            // tinyMCE.remove();
            $('#vtp-res-dialog-help').empty();
            this.loadContent();
            $(this.helpPopupId).dialog({
                autoOpen: false,
                width: 850,
                height: 570,
                position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                modal: true,
                open: () => {
                    this.scroll();
                },
                close: () => {
                    if ('#vtp-help-tag' === this.currentElementId) {
                        $('#vtp-res-list tr td.ui-state-active:first').click();
                    }
                }
            });
        },
        methods: {
            showHelp() {
                $(this.helpPopupId).dialog('open');
            },
            loadContent() {
                if (this.isAdmin) {
                    let element = $(`
                        <div class="vtp-fh-w100">
                            <textarea id="help-text"></textarea>
                        </div>
                        <div class="vtp-fh-w100">
                            <button class="ui-corner-all ui-state-default"
                                    id="button-help-save">speichern</button>
                        </div>
                    `);
                    $('#help-text', element).val(this.getHelp('text'));
                    $('#vtp-res-dialog-help').append(element);

                    let tinyInit = new TinyMCEInitializer();
                    let options = tinyInit.getCommonOptions();
                    options.mode = 'exact';
                    options.selector = 'textarea#help-text';
                    options.id = 'tiny-help';
                    options.height = 400;
                    options.plugins.push('code');
                    options.relative_urls = false;
                    options.remove_script_host = false;
                    options.convert_urls = true;
                    options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | code';
                    tinyMCE.init(options);

                    $('#button-help-save').on('click', () => {
                        tinyMCE.triggerSave();
                        $.ajax({
                            url: vitoop.baseUrl +'api/help',
                            method: 'POST',
                            data: JSON.stringify({
                                id: this.getHelp('id'),
                                text: this.getHelp('text')
                            }),
                            success: data => {
                                let elemSuccess = $('<div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"><span class="vtp-icon ui-icon ui-icon-info"></span>Help message saved!</div>');
                                $('#button-help-save').before(elemSuccess);
                                setTimeout(function() {
                                    elemSuccess.hide(400);
                                }, 1000);
                            }
                        });
                    });
                } else {
                    $('#vtp-res-dialog-help').append(this.getHelp('text'));
                }
            },
            resetScroll() {
                this.currentElementId = 'p';
            },
            scroll() {
                if (this.isAdmin) {
                    const offset = $(tinymce.activeEditor.getBody()).find(`#vtp-help-${this.helpArea}`)[0].offsetTop;
                    $(tinymce.activeEditor.dom.doc.documentElement)[0].scrollTop = offset;
                    return;
                }

                $(this.helpPopupId).find(`#vtp-help-${this.helpArea}`).get(0).scrollIntoView();
            }
        }
    }
</script>

<style lang="scss" scoped>
    $menu-distance: 4px;

    #vtp-search-help {
        width: 34px;
        margin-right: 0px;
    }
</style>