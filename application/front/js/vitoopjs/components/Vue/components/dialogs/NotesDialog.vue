<template>
    <div id="vtp-notes-dialog" title="Notizen">
        <textarea v-show="isShowTextarea"
            id="vtp-user-notes-textarea-common"
            :value="notes"
            @input="onChange"
            :placeholder="placeholder">
        </textarea>
        <div v-show="!isShowEditor" id="vtp-user-notes-result" v-html="notes">
        </div>
        <div class="text-right">
            <button @click="activateTinyMCE"
                    :class="{ 'ui-state-active': isShowEditor }"
                    class="mce-button ui-state-default ui-corner-all">
              Edit
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
                isShowEditor: false,
                isShowTextarea: false,
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
                  if (true === this.isShowEditor) {
                    let editorContent = tinyInit.getEditor('vtp-user-notes-textarea-common').getContent();
                    this.$store.commit('set', { key: 'notes',  value: editorContent});
                    this.isShowEditor = false;
                    this.isShowTextarea = false;

                    $('#vtp-notes-dialog > .mce-container').hide();
                    $('#vtp-user-notes-textarea-common').show();
                  } else {
                    this.isShowEditor = true;
                    this.isShowTextarea = false;

                    $('#vtp-notes-dialog > .mce-container').show();
                    $('#vtp-user-notes-textarea-common').hide();
                  }
                } else if (false === this.isShowEditor) {
                  tinymce.remove('#vtp-user-notes-textarea-common');
                  let options = tinyInit.getCommonOptions();
                  options.height = 345;
                  options.selector = '#vtp-user-notes-textarea-common';
                  options.init_instance_callback = function () {
                    $('#vtp-notes-dialog > .mce-container').show();
                    $('#vtp-user-notes-textarea-common').hide();
                  }
                  tinymce.init(options);
                  this.isShowEditor = true;
                  this.isShowTextarea = false;
                } else {
                  this.isShowEditor = false;
                  this.isShowTextarea = false;

                  $('#vtp-notes-dialog > .mce-container').hide();
                  $('#vtp-user-notes-textarea-common').hide();
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
