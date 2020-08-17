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
        <div class="d-flex align-center">
            <div v-if="get('project')">
                <button id="vtp-project-save-coef"
                        class="ui-state-default ui-state-active"
                        @click="saveNewCoefs"
                        :class="{show: get('coefsToSave').length}">
                    <span>speichern</span>
                </button>
                <help-button help-area="project" />
                <span v-if="canEdit">
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
                <div class="d-flex align-center">
                    <help-button help-area="conversation" />
                    <div v-if="get('conversationInstance').canEdit" style="margin-left: 4px">
                        <button id="vtp-projectdata-project-live"
                                class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                                :class="{'ui-state-focus ui-state-active': !get('conversationEditMode')}"
                                @click="conversationEditMode">
                            <span class="ui-button-icon-primary ui-icon ui-icon-clipboard"></span>
                        </button>
                        <button id="vtp-projectdata-project-edit"
                                class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
                                :class="{'ui-state-focus ui-state-active': get('conversationEditMode')}"
                                @click="conversationEditMode">
                            <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                        </button>
                    </div>
                </div>
            </div>
            <ShowPopupButton v-if="getResourceId" />
        </div>
        <transition name="fade">
            <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"
                 v-if="get('error')">
                {{ get('error') }}
            </div>
        </transition>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import VtpConfirmMixin from '../mixins/confirmMixin';
    import ShowTagsMixin from '../mixins/showTags';
    import { ResourceList } from "../../../resource_list";
    import HelpButton from "../SecondSearch/HelpButton.vue";
    import SearchByTags from "./SearchByTags.vue";
    import ShowPopupButton from "./ShowPopupButton.vue";

    export default {
        name: "AppNav",
        components: { HelpButton, SearchByTags, ShowPopupButton },
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
                'getResource', 'getResourceId', 'getInProject', 'get', 'getProjectData', 'getIsAllRecords'
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
                if (this.get('conversationInstance').canEdit) {
                    this.$store.commit('set', {
                        key: 'conversationEditMode',
                        value: !this.get('conversationEditMode')
                    })
                }
            },
            saveNewCoefs() {
                this.get('coefsToSave').forEach((coefObj,index) => {
                    this.checkIfDividerExist(coefObj.value)
                        .then(dividerExist => {
                            if (!dividerExist) {
                                this.addNewDivider(coefObj.value)
                                    .then(() => {
                                        this.saveCoef(coefObj,index)
                                    })
                                    .catch(err => console.dir(err))
                            } else {
                                this.saveCoef(coefObj,index)
                            }
                        })
                        .catch(err => console.dir(err))
                })
            },
            saveCoef(coefObj,index) {
                return axios.post(`/api/rrr/${coefObj.coefId}/coefficient`, {
                    value: coefObj.value
                })
                    .then(() => {
                        if (index === this.get('coefsToSave').length-1) {
                            this.$store.commit('set', {key: 'coefsToSave', value: []});
                            VueBus.$emit('datatable:reload');
                        }
                    })
                    .catch(err => console.dir(err));
            },
            checkIfDividerExist(coefValue,index) {
                return axios(`/api/project/${this.get('resource').id}/divider`)
                    .then(({data}) => {
                        const includesCoef = Object.keys(data).includes(Math.floor(coefValue).toString());
                        if (Math.floor(coefValue) > Object.values(data).length-1 && !includesCoef) {
                            return false;
                        }
                        return true;
                    })
                    .catch(err => console.dir(err))
            },
            addNewDivider(dividerValue,index) {
                return axios.post(`/api/v1/projects/${this.get('resource').id}/dividers`, {
                    text: '',
                    coefficient: dividerValue
                })
                    .then(() => {
                        return
                    })
                    .catch(err => console.dir(err));
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

    #vtp-nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    #vtp-projectdata-project-live, #vtp-projectdata-project-edit {
        height: 24px;
    }

    @import "../../../../../css/variables/colors";
    #vtp-project-save-coef {
        height: 24px;
        font-weight: normal;
        border-radius: 6px;
        padding: 0 20px 2px;
        opacity: 0;
        z-index: -1;
        transform: translateX(-30px);
        transition: .3s;
        //color: $vitoop-red-color;
        //border-color: $vitoop-red-color;

        &.show {
            opacity: 1;
            z-index: 1;
            transform: translateX(0);
        }
    }
</style>
