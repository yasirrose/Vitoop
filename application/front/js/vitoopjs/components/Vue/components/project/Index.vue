<template>
    <div v-if="getProject">
        <router-view :projectHeightProp="projectHeight"></router-view>
    </div>
</template>

<script>
    import AppProject from "./AppProject.vue";
    import AppProjectEdit from "./AppProjectEdit.vue";
    import {mapGetters} from "vuex";
    import openResourcePopupMixin from "../../mixins/openResourcePopupMixin";

    export default {
        name: "Index",
        mixins: [openResourcePopupMixin],
        components: {
            AppProject, AppProjectEdit
        },
        data() {
            return {
                projectHeight: 0
            }
        },
        computed: {
            ...mapGetters(['get','getProject'])
        },
        created() {
            this.loadProject();
        },
        mounted() {
            this.$store.commit('set', {key: 'coefsToSave', value: []});
            this.$store.commit('setInProject', true);
            resourceProject.init();
            this.projectHeight = this.get('contentHeight')-32-28;
            VueBus.$on('refresh', () => {
               this.loadProject();
            });
        },
        methods: {
            loadProject() {
                axios(`/api/v1/projects/${this.$route.params.projectId}`)
                    .then(({data}) => {
                        if (!data.hasOwnProperty('success')) {
                            this.$store.commit('setResourceOwner', data.isOwner);
                            this.$store.commit('setResourceInfo', data.resourceInfo);
                            // this.$store.commit('setResourceType', 'prj');
                            this.$store.commit('set', {key: 'project', value: data.project});
                            this.$store.commit('setResourceId', this.$route.params.projectId);
                            VueBus.$emit('project:loaded', data.project);
                        } else {
                            this.$store.commit('set', {key: 'inProject', value: false});
                            this.$store.commit('resetResource');
                        }
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped>

</style>
