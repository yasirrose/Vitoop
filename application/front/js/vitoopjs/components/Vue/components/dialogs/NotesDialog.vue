<template>
    <div id="vtp-notes-dialog" title="Notizen">
        <textarea
            id="vtp-user-notes-textarea-common"
            :value="notes"
            :placeholder="placeholder">
        </textarea>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import TinyMCEInitializer from "../../../TinyMCEInitializer";

    export default {
        name: "NotesDialog",
        data() {
            return {
                dialog_initiated: false,
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
            init() {
                $('#vtp-notes-dialog').dialog({
                    autoOpen: false,
                    width: 720,
                    height: 500,
                    position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                    modal: true,
                    close: this.closeDialog,
                    open: this.openDialog,
                });
            },
            closeDialog () {
              this.save()
            },
            openDialog () {
              if (this.dialog_initiated === false) {
                this.dialog_initiated = true;
                this.activateTinyMCE();
              } else {
                let tinyInit = new TinyMCEInitializer();
                let editor = tinyInit.getEditor('vtp-user-notes-textarea-common')
                editor.setContent(this.notes);
              }
            },
            save() {
              let tinyInit = new TinyMCEInitializer();
              let editorContent = tinyInit.getEditorContent('vtp-user-notes-textarea-common');
              if (editorContent !== this.notes) {
                this.$store.dispatch('saveNotes', editorContent);
              }
            },
            activateTinyMCE () {
              let tinyInit = new TinyMCEInitializer();
              let options = tinyInit.getCommonOptions();
              options.height = 345;
              options.selector = '#vtp-user-notes-textarea-common';
              options.init_instance_callback = function () {
                  $('#vtp-notes-dialog > .mce-container').show();
                  $('#vtp-user-notes-textarea-common').hide();
              }
              tinymce.init(options);
              $('#vtp-notes-dialog > .mce-container').hide();
              $('#vtp-user-notes-textarea-common').hide();
            },
        }
    }
</script>

<style scoped lang="scss">
    #vtp-notes-dialog {
        display: flex;
        flex-direction: column;
        padding: 2px 2px .3rem;
        overflow: hidden;
    }

    #vtp-user-notes-result {
      border: 1px solid #aed0ea;
      padding: 1rem;
      resize: none;
      height: 387px;
      overflow: scroll;
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
