<template>
    <div id="vtp-header" class="ui-corner-all">
        <app-header-status v-if="!loading" />
        <app-logo />
        <app-cms-title />
        <app-nav />
        <search-by-tags v-if="showTags" />
        <div id="vtp-second-search" v-if="showTags">
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
    import {mapGetters} from 'vuex';
    import ShowTagsMixin from '../mixins/showTags';

    export default {
        name: "AppHeader",
        mixins: [ShowTagsMixin],
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
            ...mapGetters(['getResource','get']),
        }
    }
</script>

<style scoped>

</style>
