<template>
    <div id="vtp-cmstitle">
        <div v-if="getResource('id') !== null"
             id="vtp-projectdata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text" v-if="project !== null">
                {{ $t('label.project') }}: {{ project.name }}
            </span>
<!--            <input type="hidden" id="projectID" :value="project.id"/>-->
            <div class="vtp-title__buttons">
                <help-button help-area="project" />
                <span v-if="getResource('owner')" style="display: flex">
                    <button id="vtp-projectdata-project-live"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            :class="{'ui-state-focus ui-state-active': !isEdit}"
                            @click="projectLiveMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-clipboard"></span>
                    </button>
                    <button id="vtp-projectdata-project-edit"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            :class="{'ui-state-focus ui-state-active': isEdit}"
                            @click="projectEditMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                    </button>
                </span>
                <button id="vtp-projectdata-project-close"
                        :title="$t('label.close')"
                        class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-icon-primary"
                        role="button" @click="resetResource('/prj')">
                    <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                    <span class="ui-button-text"></span>
                </button>
            </div>
        </div>
        <div v-else-if="getResource('id') !== null"
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
            isEdit() {
                if (this.$route.query.hasOwnProperty('edit')) {
                    return JSON.parse(this.$route.query.edit);
                } else {
                    return false
                }
            },
            ...mapGetters(['getResource'])
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
                if (this.$route.query.hasOwnProperty('edit')) {
                    this.$router.push({
                        path: `/project/${this.getResource('id')}`,
                        query: {edit: !JSON.parse(this.$route.query.edit)}
                    });
                } else {
                    this.$router.push({path: `/project/${this.getResource('id')}`, query: {edit: true}});
                }
            },
            projectLiveMode() {
                this.$router.push({path: `/project/${this.getResource('id')}`, query: null});
            },
            resetResource(redirectTo) {
                this.$store.commit('resetResource');
                this.$router.push(redirectTo);
                if (redirectTo === '/prj') this.$store.commit('setInProject', false);
            }
        }
    }
</script>

<style scoped lang="scss">
    #vtp-lexicondata-title {
        display: flex;
        align-items: center;
        padding: 3px 10px 4px 15px !important;
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