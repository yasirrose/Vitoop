<template>
    <div id="vtp-nav"
         class="vtp-menu ui-corner-all" style="margin-top: 5px">
        <ul>
            <li>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                    :class="{'vtp-nav-active ui-state-active': $route.name === 'project'}"
                    @click="$router.push({path: `/project/${getResource('id')}`})"
                    v-if="getInProject">
                    Projekt-Hauptseite
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': $route.name === 'lexicon'}"
                   @click="$router.push(`/lexicon/${getResource('id')}`)"
                   v-else-if="!getInProject && getResource('id') && !get('conversationInstance')">
                    {{ $t('page.lexicon') }}
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': $route.name === 'conversation'}"
                   @click="$router.push(`/conversation/${getResource('id')}`)"
                   v-else-if="getResource('id') && get('conversationInstance')">
                    Conversation
                </a>
            </li>
            <li v-if="showConversation">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute('conversation')"
                   :class="{
                    'ui-state-no-content': noContent('conv'),
                    'vtp-nav-active ui-state-active': /conversation/.test($route.name)
                   }">
                    Nachricht
                </a>
            </li>
            <li v-if="isAllInOneList">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute('all')"
                   :class="{
                    'vtp-nav-active ui-state-active': /all/.test($route.name)
                   }" style="padding: 0 17px">
                    verknüpfte Datensätze
                </a>
            </li>
            <li v-for="(value,name) in resources"
                v-if="!isAllInOneList"
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
        <div v-if="get('project')">
            <span v-if="canEdit">
                <help-button help-area="project" />
                <button id="vtp-projectdata-project-live"
                        class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                        :class="{'ui-state-focus ui-state-active': !get('edit')}"
                        @click="projectLiveMode">
                    <span class="ui-button-icon-primary ui-icon ui-icon-clipboard"></span>
                </button>
                <button id="vtp-projectdata-project-edit"
                        class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                        :class="{'ui-state-focus ui-state-active': get('edit')}"
                        @click="projectEditMode">
                    <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                </button>
            </span>
        </div>
        <div v-else-if="getResource('id') && !get('inProject') && !get('conversationInstance')">
            <help-button help-area="lexicon" />
        </div>
        <div v-if="get('conversationInstance')">
            <button id="vtp-projectdata-project-live"
                    class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                    :class="{'ui-state-focus ui-state-active': !get('conversationEditMode')}"
                    @click="conversationEditMode">
                <span class="ui-button-icon-primary ui-icon ui-icon-clipboard"></span>
            </button>
            <button id="vtp-projectdata-project-edit"
                    class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                    v-if="get('conversationInstance').canEdit"
                    :class="{'ui-state-focus ui-state-active': get('conversationEditMode')}"
                    @click="conversationEditMode">
                <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
            </button>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import VtpConfirmMixin from '../mixins/confirmMixin';
    import ShowTagsMixin from '../mixins/showTags';
    import { ResourceList } from "../../../resource_list";
    import HelpButton from "../SecondSearch/HelpButton.vue";
    import SearchByTags from "./SearchByTags.vue";

    export default {
        name: "AppNav",
        components: { HelpButton, SearchByTags },
        mixins: [VtpConfirmMixin, ShowTagsMixin],
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
                'getResource', 'getInProject', 'get', 'getProjectData', 'getIsAllRecords'
            ]),
            canEdit() { // getResource('owner')
                let userRelated = false;
                if (this.get('project')) {
                    userRelated = this.get('project').project_data.rel_users.some(relUser => {
                        return (relUser.user.id === this.get('user').id && !relUser.read_only);
                    });
                }
                return this.get('admin') || userRelated || this.get('resource').owner;
            },
            noContent() {
                return (name) => {
                    return this.getResource('info') ?
                        this.getResource('info')[`${name}c`] === '0' : false
                }
            },
            showConversation() {
                return !(this.getResource('id') !== null)
            },
            isAllInOneList() {
                return this.getIsAllRecords && this.getInProject;
            }
        },
        mounted() {
            const resourceList = new ResourceList();
            resourceList.init();
        },
        methods: {
            changeRoute(name) {
                vitoopState.commit('setResourceType', name);
                this.$router.push(`/${name}`);
            },
            projectEditMode() {
                this.$store.commit('set', {key: 'edit', value: true});
            },
            projectLiveMode() {
                this.$store.commit('set', {key: 'edit', value: false});
            },
            conversationEditMode() {
                this.$store.commit('set',{
                    key: 'conversationEditMode',
                    value: !this.get('conversationEditMode')
                })
            },
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

    #vtp-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #vtp-projectdata-project-live, #vtp-projectdata-project-edit {
        height: 24px;
    }
</style>
