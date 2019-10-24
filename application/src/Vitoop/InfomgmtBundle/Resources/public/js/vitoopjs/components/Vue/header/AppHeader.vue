<template>
    <div id="vtp-header" class="ui-corner-all">
        <app-header-status v-if="!loading" />
        <app-logo />
        <app-nav />
        <search-by-tags v-if="showTags" />
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
    import SearchByTags from "./SearchByTags.vue";

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
            AppTagList,
            SearchByTags
        },
        computed: {
            showTags() {
                return this.$route.params.hasOwnProperty('restype') &&
                    this.$store.state.user !== null &&
                    this.$store.state.resource.id === null;
            }
        }
    }
</script>

<style scoped>

</style>