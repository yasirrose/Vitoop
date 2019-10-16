<template>
    <div id="vtp-content">
        <div v-if="project.id !== null || lexicon.id !== null">
            <app-project v-if="project.id !== null" />
            <app-lexicon v-else />
        </div>
    </div>
</template>

<script>
    import AppProject from "./project/Index.vue";
    import AppLexicon from "./AppLexicon.vue";

    export default {
        name: "AppContent",
        inject: ['project','lexicon'],
        components: {
            AppProject, AppLexicon
        }
    }
</script>

<style scoped>

</style>