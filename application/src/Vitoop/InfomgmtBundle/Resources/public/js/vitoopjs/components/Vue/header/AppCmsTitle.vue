<template>
    <div id="vtp-cmstitle">
        <div v-if="project.id !== null"
             id="vtp-projectdata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.project') }}: {{ project.name }}
            </span>
            <input type="hidden" id="projectID" :value="project.id"/>
            <div class="vtp-title__buttons">
                <span v-if="asProjectOwner" style="display: flex">
                    <help-button help-area="project" />
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
                        :title="$t('label.close')">
                </button>
            </div>
        </div>
        <div v-else-if="lexicon.id"
             id="vtp-lexicondata-title"
             class="ui-corner-all vtp-cmstitle">
            <span class="vtp-title__text">
                {{ $t('label.lexicon') }}: {{ lexicon.name }}
            </span>
            <div class="vtp-title__buttons">
                <span style="display: flex">
                    <help-button help-area="lexicon" />
                    <button id="vtp-lexicondata-lexicon-close" :title="$t('label.close')" class=""></button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import HelpButton from "../SecondSearch/HelpButton.vue";

    export default {
        name: "AppCmsTitle",
        components: { HelpButton },
        inject: [
            'asProjectOwner',
            'project',
            'lexicon',
        ],
        computed: {
            isEdit() {
                if (this.$route.query.hasOwnProperty('edit')) {
                    return JSON.parse(this.$route.query.edit);
                } else {
                    return false
                }
            }
        },
        mounted() {
            VueBus.$on('remove:project', () => {
                this.project.id = null;
            })
        },
        methods: {
            projectEditMode() {
                if (this.$route.query.hasOwnProperty('edit')) {
                    this.$router.push({
                        path: `/project/${this.project.id}`,
                        query: {edit: !JSON.parse(this.$route.query.edit)}
                    });
                } else {
                    this.$router.push({path: `/project/${this.project.id}`, query: {edit: true}});
                }
            },
            projectLiveMode() {
                this.$router.push({path: `/project/${this.project.id}`, query: null});
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

            .vtp-help-area-button {
                height: 19px;
            }
        }
    }
</style>