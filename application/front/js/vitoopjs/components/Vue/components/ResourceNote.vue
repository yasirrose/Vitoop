<template>
  <div id="resource-notes">
    <fieldset class="ui-corner-all">
      <legend>Notizen</legend>
      <div class="notes-block">
        <textarea
            v-show="isShowTextareaPopup"
            id="vtp-user-notes-textarea"
            :value="notes"
            @input="onNotesNotes"
            :placeholder="notesPlaceholder">
        </textarea>
      </div>
      <div v-show="!isShowEditorPopup" id="vtp-res-user-notes-result" v-html="notes"></div>
      <div class="notes-block__buttons">
        <button @click="closeNotes"
                v-show="isShowEditorPopup"
                class="ui-state-default ui-corner-all">
          abbrechen
        </button>
        <button @click="activateTinyMCE"
                :class="{ 'ui-state-active': isShowEditorPopup }"
                class="ui-state-default ui-corner-all"
                style="float: right">
          Edit
        </button>
      </div>
    </fieldset>
  </div>
</template>

<script>
import TinyMCEInitializer from "../../TinyMCEInitializer";

export default {
  name: 'ResourceNote',
  data() {
    return {
      notesDirty: false,
      isShowEditorPopup: false,
      isShowTextareaPopup: false,
      notesPlaceholder: 'Hier kannst Du private Notizen speichern, die von überall aus zugänglich sind.',
    }
  },
  methods: {
    onNotesNotes({target: {value}}) {
      this.notesDirty = true;
      this.$store.commit('set', {key: 'notes', value});
    },
    closeNotes() {
      $('#open-notes-dialog-button').removeClass('ui-state-active');
      $('#resource-notes').removeClass('open');
      $('#resource-notes').hide('blind', 'fast');
      this.isShowEditorPopup = false;
      this.isShowTextareaPopup = false;
      tinymce.remove('#vtp-user-notes-textarea');
    },
    saveNotes() {
      let tinyInit = new TinyMCEInitializer();
      let editorContent = tinyInit.getEditorContent('vtp-user-notes-textarea');
      this.$store.dispatch('saveNotes', editorContent);
      this.notesDirty = false;
    },
    activateTinyMCE() {
      let tinyInit = new TinyMCEInitializer();
      let editorContent = tinyInit.getEditorContent('vtp-user-notes-textarea');

      if (null === tinyInit.getEditor('vtp-user-notes-textarea')) {
        let options = tinyInit.getCommonOptions();
        options.width = 700;
        options.height = 100;
        options.selector = '#vtp-user-notes-textarea';
        options.init_instance_callback = function () {
          $('.notes-block > .mce-container').show();
          $('#vtp-user-notes-textarea').hide();
        }
        tinymce.init(options);
      }

      if (true === this.isShowEditorPopup) {
        this.$store.commit('set', {key: 'notes', value: editorContent});
        this.isShowEditorPopup = false;
        this.isShowTextareaPopup = false;

        tinymce.remove('#vtp-user-notes-textarea');
        $('.notes-block > .mce-container').hide();
        $('#vtp-user-notes-textarea').hide();

      } else {
        this.isShowEditorPopup = true;
        this.isShowTextareaPopup = false;

        $('.notes-block > .mce-container').show();
        $('#vtp-user-notes-textarea').hide();
      }
    },

    resetState() {
      if (true === this.isShowEditorPopup) {
        this.activateTinyMCE();
      }
    }
  }
}
</script>
