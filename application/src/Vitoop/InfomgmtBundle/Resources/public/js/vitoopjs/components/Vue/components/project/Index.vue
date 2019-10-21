<template>
    <div>
        <app-project v-if="!edit" />
        <app-project-edit v-else />
    </div>
</template>

<script>
    import AppProject from "./AppProject.vue";
    import AppProjectEdit from "./AppProjectEdit.vue";

    export default {
        name: "Index",
        components: {
            AppProject, AppProjectEdit
        },
        data() {
            return {
                edit: false
            }
        },
        beforeRouteUpdate(to,from,next) {
            this.edit = to.query.edit;
            next();
        },
        mounted() {
            resourceProject.init();
            this.edit = this.$route.query.edit;
        }
    }
</script>

<style scoped>

</style>