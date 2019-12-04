<template>
    <div>
        <div v-if="project !== null">
            <app-project v-if="!get('edit')"
                         :project="project"
                         :resource-info="resourceInfo" />
            <app-project-edit v-else />
        </div>
        <div v-else>
            Projekt ist für diesen Benutzer nicht verfügbar
        </div>
    </div>
</template>

<script>
    import AppProject from "./AppProject.vue";
    import AppProjectEdit from "./AppProjectEdit.vue";
    import {mapGetters} from "vuex";

    export default {
        name: "Index",
        components: {
            AppProject, AppProjectEdit
        },
        data() {
            return {
                project: null,
                resourceInfo: null
            }
        },
        computed: {
            ...mapGetters(['get'])
        },
        updated() {
            this.getProjectInfo();
        },
        mounted() {
            this.getProjectInfo();
            this.$store.commit('setInProject', true);
            resourceProject.init();
        },
        methods: {
            getProjectInfo() {
                axios(`/api/v1/projects/${this.$route.params.projectId}`)
                    .then(({data}) => {
                        if (!data.hasOwnProperty('success')) {
                            this.project = data.project;
                            this.resourceInfo = data.resourceInfo;
                            this.$store.commit('setResourceOwner', data.isOwner);
                            this.$store.commit('setResourceInfo', data.resourceInfo);
                            this.$store.commit('setResourceId', this.$route.params.projectId);
                            VueBus.$emit('project:loaded', data.project);
                        } else {
                            this.$store.commit('resetResource');
                        }
                    })
                    .catch(err => {
                        console.dir(err);
                    });
            }
        }
    }
</script>

<style scoped>

</style>