<template>
    <div id="vtp-cmstitle">
        <div v-if="project"
             id="vtp-projectdata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.project') }}: {{ project.name }}
            </span>
            <div class="vtp-title__buttons">
                <button id="vtp-projectdata-project-close"
                        :title="$t('label.close')"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                        role="button"
                        @click="resetResource('/prj')">
                    <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                    <span class="ui-button-text"></span>
                </button>
            </div>
        </div>
        <div v-else-if="getResource('id') && !get('inProject') && !get('conversationInstance')"
             id="vtp-lexicondata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text" v-if="lexicon">
                {{ $t('label.lexicon') }}: {{ lexicon.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <button id="vtp-projectdata-project-close"
                            :title="$t('label.close')"
                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                            role="button"
                            @click="resetResource('/lex')">
                        <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                        <span class="ui-button-text"></span>
                    </button>
                </span>
            </div>
        </div>
        <div v-else-if="get('conversationInstance')"
             id="vtp-conversation-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.conversation') }}: {{ get('conversationInstance').conversation.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <button id="vtp-projectdata-project-close"
                            :title="$t('label.close')"
                            class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                            role="button"
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

    export default {
        name: "AppCmsTitle",
        data() {
            return {
                project: null,
                lexicon: null,
                conversation: null
            }
        },
        computed: {
            ...mapGetters(['getResource','get','getTableRowNumber','getTableData']),
        },
        mounted() {
            VueBus.$on('remove:project', () => {
                this.$store.commit('setResourceId', null);
            });
            VueBus.$on('project:loaded', (project) => {
                this.project = project;
            });
            VueBus.$on('lexicon:loaded', (lexicon) => {
                this.lexicon = lexicon;
            });
        },
        methods: {
            resetResource(redirectTo) {
                this.project = null;
                this.lexicon = null;
                this.$store.commit('resetConversation');
                this.$store.commit('resetResource');
                if (redirectTo === '/prj') this.$store.commit('setInProject', false);
                redirectTo !== this.$route.path ? this.$router.push(redirectTo) : VueBus.$emit('datatable:reload');
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

        &::v-deep {

            .ui-icon-clipboard {
                background-position: -160px -129px;
            }

            .ui-icon-wrench {
                background-position: -176px -113px;
            }

            .ui-icon-help {
                background-position: -48px -145px;
            }

            .ui-button {
                width: 34px !important;
                height: 17px !important;
                margin: 0 0 0 4px !important;
            }

            .ui-icon-help {
                margin: 0 !important;
            }

            .vtp-help-area-button {
                height: 19px;
            }
        }
    }
</style>
