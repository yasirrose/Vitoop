<template>
    <div id="vtp-nav"
         class="vtp-menu ui-helper-clearfix ui-corner-all">
        <ul>
            <li>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': getResource('type') === ''}"
                   :href="`/project/${project.id}`"
                   v-if="project.id !== null">
                    Projekt-Hauptseite
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': getResource('type') === ''}"
                   :href="`/lexicon/${lexicon.id}`"
                   v-else-if="lexicon.id !== null">
                    {{ $t('page.lexicon') }}
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   v-else
                   :class="{'vtp-nav-active ui-state-active': activeHomeLink}"
                   @click="toHome">
                    Benutzer-Hauptseite
                </a>
            </li>
            <li v-for="(value,name) in resources" :key="name">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   :class="{
                    'ui-state-no-content': noContent(name),
                    'vtp-nav-active ui-state-active': getResource('type') === name
                   }"
                   :href="`/${name}/?${isResource}`">
                    {{ value }}
                </a>
            </li>
        </ul>
        <search-by-tags v-if="$store.state.user !== null &&
                              getResource('type') !== '' &&
                              getResource('id') === null" />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SearchByTags from "./SearchByTags.vue"
    import { ResourceList } from "../../../resource_list"

    export default {
        name: "AppNav",
        components: { SearchByTags },
        inject: [
            'agreeWithTerm',
            'project',
            'lexicon'
        ],
        data() {
            return {
                resources: {
                    prj: 'Projekt',
                    lex: 'Lexikon',
                    pdf: 'Pdf',
                    teli: 'Textlink',
                    book: 'Buch',
                    adr: 'Adresse',
                    link: 'Link'
                }
            }
        },
        computed: {
            ...mapGetters([
                'getResource'
            ]),
            activeHomeLink() {
                return this.getResource('type') === '' ||
                    window.location.pathname === '/' ||
                    window.location.pathname === '/login' ||
                    window.location.pathname === '/userhome';
            },
            noContent() {
                return (name) => {
                    return this.getResource('info') !== null ?
                        this.getResource('info')[`${name}c`] === '0' : false
                }
            },
            getProjectId() {
                return this.project.id !== null ? `project=${this.project.id}` : '';
            },
            getLexiconId() {
                return this.lexicon.id !== null ? `lexicon=${this.lexicon.id}` : '';
            },
            isResource() {
                if (this.project.id !== null) {
                    return `project=${this.project.id}`;
                } else if (this.lexicon.id !== null) {
                    return `lexicon=${this.lexicon.id}`;
                }
            }
        },
        mounted() {
            if (this.resourceInfo !== null) {
                this.$store.commit('setResourceType', '')
            }
            const resourceList = new ResourceList();
            resourceList.init();
        },
        methods: {
            toHome() {
                this.$store.commit('setResourceType', '');
                window.location.pathname = "/userhome";
            },
        }
    }
</script>

<style scoped>

</style>