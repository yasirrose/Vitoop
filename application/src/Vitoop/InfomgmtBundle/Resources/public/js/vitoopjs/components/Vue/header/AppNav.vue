<template>
    <div id="vtp-nav"
         class="vtp-menu ui-helper-clearfix ui-corner-all">
        <ul>
            <li>
                <div class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                    :class="{'vtp-nav-active ui-state-active': $route.name === 'project'}"
                    @click="$router.push({path: `/project/${getResource('id')}`})"
                    v-if="getInProject">
                    Projekt-Hauptseite
                </div>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': $route.name === 'lexicon'}"
                   @click="$router.push(`/lexicon/${getResource('id')}`)"
                   v-else-if="!getInProject && getResource('id')">
                    {{ $t('page.lexicon') }}
                </a>
            </li>
            <li v-if="showConversation">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute('conversation')"
                   :class="{
                    'ui-state-no-content': noContent('conversation'),
                    'vtp-nav-active ui-state-active': /conversation/.test($route.name)
                   }">
                    Nachrichten
                </a>
            </li>
            <li v-for="(value,name) in resources"
                v-if="get('conversationInstance') === null"
                :key="name">
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
            'agreeWithTerm'
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
                'getResource', 'getInProject', 'get'
            ]),
            noContent() {
                return (name) => {
                    return this.getResource('info') !== null ?
                        this.getResource('info')[`${name}c`] === '0' : false
                }
            },
            showConversation() {
                return !(this.getResource('id') !== null)
            }
        },
        mounted() {
            const resourceList = new ResourceList();
            resourceList.init();
        },
        methods: {
            toHome() {
                this.$store.commit('setResourceType', '');
                this.$router.push('/userhome');
            },
            changeRoute(name) {
                vitoopState.commit('setResourceType', name);
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
