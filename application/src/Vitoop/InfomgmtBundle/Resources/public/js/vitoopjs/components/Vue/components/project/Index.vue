<template>
    <div>
        <app-project v-if="!get('edit')"/>
        <app-project-edit v-else />
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
        mounted() {
            this.$store.commit('setInProject', true);
            resourceProject.init();
        }
    }
</script>

<style scoped>

</style>
