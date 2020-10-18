<template>
    <div id="vtp-notes-dialog" title="Notizen">
        <textarea :value="notes" @input="onChange"></textarea>
        <div class="text-right">
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

    export default {
        name: "NotesDialog",
        data() {
            return {
                dirty: false,
            }
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
                    close: this.closeDialog
                });
            },
            save() {
                this.$store.dispatch('saveNotes', this.notes);
                this.dirty = false;
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
        margin-bottom: .5rem;

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

    .save-button {
        padding: 5px 20px;
    }
</style>
