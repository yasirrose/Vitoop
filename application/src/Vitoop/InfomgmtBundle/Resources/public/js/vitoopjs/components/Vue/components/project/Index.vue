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
        inject: ['editMode'],
        data() {
            return {
                edit: false
            }
        },
        mounted() {
            this.edit = this.editMode === "1";
        }
    }
</script>

<style scoped>

</style>