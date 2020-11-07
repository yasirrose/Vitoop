<template>
    <div v-if="getProject">
        <app-project v-if="!get('edit')" :projectHeightProp="projectHeight" />
        <app-project-edit v-else />
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
        beforeCreate() {
            axios(`/api/v1/projects/${this.$route.params.projectId}`)
                .then(({data}) => {
                    if (!data.hasOwnProperty('success')) {
                        this.$store.commit('setResourceOwner', data.isOwner);
                        this.$store.commit('setResourceInfo', data.resourceInfo);
                        this.$store.commit('set', {key: 'project', value: data.project});
                        this.$store.commit('setResourceId', this.$route.params.projectId);
                        VueBus.$emit('project:loaded', data.project);
                    } else {
                        this.$store.commit('set', {key: 'inProject', value: false});
                        this.$store.commit('resetResource');
                    }
                })
                .catch(err => console.dir(err));
        },
        mounted() {
            this.$store.commit('set', {key: 'coefsToSave', value: []});
            this.$store.commit('setInProject', true);
            resourceProject.init();
            this.projectHeight = this.get('contentHeight')-32-28;
        }
    }
</script>

<style scoped>

</style>
