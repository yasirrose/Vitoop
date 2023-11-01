<template>
    <div id="vtp-cmstitle">
        <div v-if="getProject" class="ui-corner-all vtp-cmstitle" id="vtp-projectdata-title">
            <span class="vtp-title__text">
                {{ $t('label.project') }}: {{ getProject.name }}
            </span>
            <div class="vtp-title__buttons">
                <button id="vtp-projectdata-project-close" :title="$t('label.close')"
                    class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"
                    @click="resetResource('/prj')">
                    <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                    <span class="ui-button-text"></span>
                </button>
            </div>
        </div>
        <div v-else-if="getResource('id') && !get('inProject') && !get('conversationInstance')" id="vtp-lexicondata-title" class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text" v-if="get('lexicon')">
                {{ $t('label.lexicon') }}: {{ get('lexicon').name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <button id="vtp-projectdata-project-close" :title="$t('label.close')"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"
                        @click="resetResource('/lex')">
                        <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                        <span class="ui-button-text"></span>
                    </button>
                </span>
            </div>
        </div>
        <div v-else-if="get('conversationInstance')" id="vtp-conversation-title" class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.conversation') }}: {{ get('conversationInstance').conversation.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <button id="vtp-projectdata-project-close" :title="$t('label.close')"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary" role="button"
                        @click="resetResource('/conversation')">
                        <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                        <span class="ui-button-text"></span>
                    </button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import EventBus from "../../../app/eventBus";

    export default {
        name: "AppCmsTitle",
        computed: {
            ...mapGetters([
                'getResource',
                'get',
                'getTableRowNumber',
                'getTableData',
                'getProject',
            ]),
        },
        methods: {
            resetResource(redirectTo) {
                if (this.get('projectNeedToSave') && redirectTo === '/prj') {
                    EventBus.$emit('confirm-dialog:open');
                } else {
                    this.$store.commit('set', { key: 'lexicon', value: null });
                    this.$store.commit('set', { key: 'project', value: null });
                    this.$store.commit('resetConversation');
                    this.$store.commit('resetResource');
                    if (redirectTo === '/prj') this.$store.commit('setInProject', false);
                    redirectTo !== this.$route.path ? this.$router.push(redirectTo) : EventBus.$emit('datatable:reload');
                }
            },
        }
    }
</script>

<style scoped lang="scss">
    #vtp-lexicondata-title {
        display: flex;
        align-items: center;
    }

    .vtp-title__buttons {



      :deep(.ui-icon-clipboard) {
          background-position: -160px -129px;
      }

      :deep(.ui-icon-wrench) {
          background-position: -176px -113px;
      }

      :deep(.ui-icon-help) {
          background-position: -48px -145px;
      }

      :deep(.ui-button) {
          width: 34px !important;
          height: 17px !important;
          margin: 0 0 0 4px !important;
      }

      :deep(.ui-icon-help) {
          margin: 0 !important;
      }

      :deep(.vtp-help-area-button) {
          height: 19px;
      }

    }
</style>
