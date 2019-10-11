<template>
    <div id="vtp-header" class="ui-corner-all">
        <app-header-status v-if="!loading" />
        <app-logo />
        <app-nav />
        <app-tag-list />
        <app-cms-title />
        <div id="vtp-second-search">
            <second-search />
        </div>
    </div>
</template>

<script>
    import AppHeaderStatus from "./AppHeaderStatus.vue";
    import AppLogo from "./AppLogo.vue";
    import AppNav from "./AppNav.vue";
    import AppTagList from "./AppTagList.vue";
    import AppCmsTitle from "./AppCmsTitle.vue";
    import SecondSearch from "../SecondSearch/SecondSearch.vue";

    export default {
        name: "AppHeader",
        props: {
            loading: {
                type: Boolean
            }
        },
        components: {
            AppHeaderStatus,
            AppLogo,
            AppNav,
            AppCmsTitle,
            SecondSearch,
            AppTagList
        },
    }
</script>

<style scoped>

</style>