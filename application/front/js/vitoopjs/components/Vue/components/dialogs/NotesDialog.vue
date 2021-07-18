<template>
    <div id="vtp-notes-dialog" title="Notizen">
        <textarea
            id="vtp-user-notes-textarea-common"
            :value="notes"
            @input="onChange"
            :placeholder="placeholder">
        </textarea>
        <div class="text-right">
            <button @click="activateTinyMCE"
                    class="mce-button ui-state-default ui-corner-all">
              MCE
            </button>
            <button @click="save"
                    :class="{ 'ui-state-active': dirty }"
                    class="save-button ui-state-default ui-corner-all">
                Speichern
            </button>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TinyMCEInitializer from "../../../TinyMCEInitializer";

    export default {
        name: "NotesDialog",
        data() {
            return {
                dirty: false,
                placeholder: 'Hier kannst Du private Notizen speichern, die von überall aus zugänglich sind.',
            };
        },
        computed: {
            ...mapState({
                notes: ({ notes }) => notes,
            })
        },
        mounted() {
            this.init();
        },
        methods: {
            onChange({ target: { value } }) {
                this.dirty = true;
                this.$store.commit('set', { key: 'notes', value });
            },
            init() {
                $('#vtp-notes-dialog').dialog({
                    autoOpen: false,
                    width: 720,
                    height: 500,
                    position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                    modal: true,
                    close: this.closeDialog,
                });
            },
            save() {
                this.$store.dispatch('saveNotes', this.notes);
                this.dirty = false;
            },
            activateTinyMCE () {
                let tinyInit = new TinyMCEInitializer();
                if (tinyInit.isEditorActive('vtp-user-notes-textarea-common')) {
                    tinyMCE.remove('#vtp-user-notes-textarea-common');
                } else {
                    let options = tinyInit.getCommonOptions();
                    options.height = 345;
                    options.selector = 'textarea#vtp-user-notes-textarea-common';
                    tinyMCE.init(options);
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #vtp-notes-dialog {
        display: flex;
        flex-direction: column;
        padding: 2px 2px .3rem;
    }

    textarea {
        flex: 1;
        background: transparent;
        border: 1px solid #aed0ea;
        padding: 1rem;
        resize: none;
        /*height: 387px;*/

        &:focus {
            outline: none;
        }

        &::-webkit-scrollbar {
            width: 1em;
        }

        &::-webkit-scrollbar-track {
            box-shadow: inset 0 0 6px red;
        }

        &::-webkit-scrollbar-thumb {
            background-color: green;
            outline: 1px solid yellow;
        }
    }

    .save-button, .mce-button {
        margin-top: .5rem;
        padding: 5px 20px;
    }
</style>
