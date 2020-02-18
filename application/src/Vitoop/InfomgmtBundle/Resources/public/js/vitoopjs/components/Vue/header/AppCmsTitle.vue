<template>
    <div id="vtp-cmstitle">
        <div v-if="project !== null"
             id="vtp-projectdata-title"
             class="ui-corner-all vtp-cmstitle">
<!--            getResource('id') !== null && get('inProject')-->
            <span class="vtp-title__text">
                {{ $t('label.project') }}: {{ project.name }}
            </span>
            <div class="vtp-title__buttons">
                <help-button help-area="project" />
                <span v-if="canEdit" style="display: flex">
                    <button id="vtp-projectdata-project-live"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            :class="{'ui-state-focus ui-state-active': !get('edit')}"
                            @click="projectLiveMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-clipboard"></span>
                    </button>
                    <button id="vtp-projectdata-project-edit"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            :class="{'ui-state-focus ui-state-active': get('edit')}"
                            @click="projectEditMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                    </button>
                </span>
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
        <div v-else-if="getResource('id') !== null && !get('inProject')"
             id="vtp-lexicondata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text" v-if="lexicon !== null">
                {{ $t('label.lexicon') }}: {{ lexicon.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <help-button help-area="lexicon" />
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
        <div v-else-if="get('conversationInstance') !== null"
             id="vtp-conversation-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.conversation') }}: {{ get('conversationInstance').conversation.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <button id="vtp-projectdata-project-edit"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            v-if="get('conversationInstance').canEdit"
                            :class="{'ui-state-focus ui-state-active': get('conversationEditMode')}"
                            @click="conversationEditMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                    </button>
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
    import HelpButton from "../SecondSearch/HelpButton.vue";

    export default {
        name: "AppCmsTitle",
        components: { HelpButton },
        inject: [
            'asProjectOwner',
        ],
        data() {
            return {
                project: null,
                lexicon: null
            }
        },
        computed: {
            ...mapGetters(['getResource','get','getTableRowNumber']),
            canEdit() { //getResource('owner')
                const userRelated = this.project.project_data.rel_users.some(relUser => {
                    return (relUser.user.id === this.get('user').id && !relUser.read_only);
                });
                return this.get('admin') || userRelated;
            },
            cmsTitleShows() {
                return this.project !== null ||
                    (this.getResource('id') !== null && !this.get('inProject')) ||
                    this.get('conversationInstance') !== null;
            }
        },
        watch: {
            cmsTitleShows(val) {
                val ?
                this.$store.commit('set', {key: 'contentHeight', value: this.get('contentHeight')-25}) :
                this.$store.commit('set', {key: 'contentHeight', value: this.get('contentHeight')+25})
            }
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
            projectEditMode() {
                this.$store.commit('set', {key: 'edit', value: true});
            },
            projectLiveMode() {
                this.$store.commit('set', {key: 'edit', value: false});
            },
            conversationEditMode() {
                this.$store.commit('set',{
                    key: 'conversationEditMode',
                    value: !this.get('conversationEditMode')
                })
            },
            resetResource(redirectTo) {
                this.project = null;
                this.lexicon = null;
                this.$store.commit('resetConversation');
                this.$store.commit('resetResource');
                this.$store.commit('updateTableRowNumber', this.getTableRowNumber + 1);
                if (redirectTo === '/prj') this.$store.commit('setInProject', false);
                redirectTo !== this.$route.path ? this.$router.push(redirectTo) : VueBus.$emit('datatable:reload');
            }
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

            .ui-icon-close {
                background-position: -80px -129px;
            }

            .ui-button {
                width: 30px !important;
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
