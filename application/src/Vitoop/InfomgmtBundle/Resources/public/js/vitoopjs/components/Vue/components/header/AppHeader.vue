<template>
    <div id="vtp-header" class="ui-corner-all">
        <app-header-status />
        <app-logo />
        <app-nav />
    </div>
</template>

<script>
    import AppHeaderStatus from "./AppHeaderStatus.vue";
    import AppLogo from "./AppLogo.vue";
    import AppNav from "./AppNav.vue";

    export default {
        name: "AppHeader",
        components: {
            AppHeaderStatus,
            AppLogo,
            AppNav
        },
    }
</script>

<style scoped>

</style>