<template>
    <div id="vtp-nav"
         class="vtp-menu ui-helper-clearfix ui-corner-all">
        <ul>
            <li>
                <div class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                    :class="{'vtp-nav-active ui-state-active': $route.name === 'project'}"
                    @click="$router.push({path: `/project/${project.id}`})"
                    v-if="project.id !== null">
                    Projekt-Hauptseite
                </div>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': getResource('type') === ''}"
                   :href="`/lexicon/${lexicon.id}`"
                   v-else-if="lexicon.id !== null">
                    {{ $t('page.lexicon') }}
                </a>
                <div class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   v-else
                   :class="{'vtp-nav-active ui-state-active': $route.path === '/userhome'}"
                   @click="toHome">
                    Benutzer-Hauptseite
                </div>
            </li>
            <li v-for="(value,name) in resources" :key="name">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute(name)"
                   :class="{
                    'ui-state-no-content': noContent(name),
                    'vtp-nav-active ui-state-active': $route.name === name
                   }">
                    {{ value }}
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { ResourceList } from "../../../resource_list"

    export default {
        name: "AppNav",
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
                this.$router.push('/userhome');
            },
            changeRoute(name) {
                this.$router.push(`/${name}`);
            }
        }
    }
</script>

<style scoped lang="scss">
    .vtp-resmenu-homelink {
        font-size: 1em;
        padding: 0 0.5em;
        font-weight: normal !important;
        text-decoration: none;
        width: auto;
        height: 22px;
        line-height: 22px;
    }
</style>