<template>
    <div id="vtp-cmstitle">
        <div v-if="project.id"
             id="vtp-projectdata-title"
             class="ui-corner-all">
            <span class="vtp-title__text">
                {{ $t('label.project') }}: {{ project.name }}
            </span>
            <input type="hidden" id="projectID" :value="project.id"/>
            <div class="vtp-title__buttons">
                <button id="vtp-projectdata-project-help"
                        help-area="project"
                        :class="{'vtp-help-offset': asProjectOwner}"
                        class="vtp-help-area-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only">
                    <span class="ui-button-icon-primary ui-icon ui-icon-help"></span>
                    <span class="ui-button-text"></span>
                </button>
                <span v-if="asProjectOwner" style="display: flex">
                    <button id="vtp-projectdata-project-live"></button>
                    <button id="vtp-projectdata-project-edit"
                            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                            :class="{'ui-state-focus ui-state-active': JSON.parse($route.query.edit)}"
                            @click="projectEditMode">
                        <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                    </button>
                </span>
                <button id="vtp-projectdata-project-close" :title="$t('label.close')"
                        class=""></button>
            </div>
        </div>
        <div v-else-if="lexicon.id"
             id="vtp-lexicondata-title"
             class="ui-corner-all">
            <span>{{ $t('label.lexicon') }}: {{ lexicon.name }}</span>
            <button id="vtp-lexicondata-lexicon-help"
                    help-area="lexicon"
                    class="vtp-help-area-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only">
                <span class="ui-button-icon-primary ui-icon ui-icon-help"></span>
                <span class="ui-button-text"></span>
            </button>
            <button id="vtp-lexicondata-lexicon-close" :title="$t('label.close')" class=""></button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppCmsTitle",
        inject: [
            'asProjectOwner',
            'project',
            'lexicon',
        ],
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
            }
        }
    }
</script>

<style scoped>

</style>