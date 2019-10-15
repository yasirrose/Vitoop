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
        mounted() {

        }
    }
</script>

<style scoped>

</style>