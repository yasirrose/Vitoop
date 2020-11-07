<template>
    <div id="vtp-nav"
         class="vtp-menu ui-corner-all" style="margin-top: 4px">
        <ul style="display: flex">
            <li>
                <button class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                    :class="{'vtp-nav-active ui-state-active': $route.name === 'project'}"
                    @click="$router.push({path: `/project/${getResource('id')}`})"
                    v-if="getInProject">
                    Projekt-Hauptseite
                </button>
                <button class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': $route.name === 'lexicon'}"
                   @click="$router.push(`/lexicon/${getResource('id')}`)"
                   v-else-if="!getInProject && getResource('id') && !get('conversationInstance')">
                    {{ $t('page.lexicon') }}
                </button>
                <button class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': $route.name === 'conversation-item'}"
                   @click="$router.push(`/conversation/${getResource('id')}`)"
                   v-else-if="getResource('id') && get('conversationInstance')">
                    Conversation
                </button>
            </li>
            <li v-if="showConversation">
                <button class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute('conversation')"
                   :class="{
                    'ui-state-no-content': noContent('conv'),
                    'vtp-nav-active ui-state-active': /conversation/.test($route.name)
                   }">
                    Nachricht
                </button>
            </li>
            <li v-if="isAllInOneList">
                <button class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute('all')"
                   :class="{
                    'vtp-nav-active ui-state-active': /all/.test($route.name)
                   }" style="padding: 0 17px">
                    verknüpfte Datensätze
                </button>
            </li>
            <li v-for="(value,name) in resources"
                v-if="!isAllInOneList"
                :key="name">
                <button class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   @click="changeRoute(name)"
                   :class="{
                    'ui-state-no-content': noContent(name),
                    'vtp-nav-active ui-state-active': $route.name === name
                   }">
                    {{ value }}
                </button>
            </li>
        </ul>
        <div class="d-flex align-center">
            <div v-if="get('project')">
                <button id="vtp-project-save-coef"
                        class="ui-state-default ui-state-active"
                        @click="save"
                        :class="{show: get('coefsToSave').length || get('dividersToSave').length}">
                    <span>speichern</span>
                </button>
                <ButtonOpenNotes />
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
                <ButtonOpenNotes />
                <help-button help-area="lexicon" />
            </div>
            <div v-if="get('conversationInstance')">
                <div class="d-flex align-center">
                    <ButtonOpenNotes style="margin-right: 4px" />
                    <help-button help-area="conversation" />
                    <div v-if="get('conversationInstance').canEdit &&
                               get('conversationInstance').conversation.conversation_data.is_for_related_users"
                         style="margin-left: 4px">
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
    import { mapGetters, mapState } from 'vuex';
    import VtpConfirmMixin from '../mixins/confirmMixin';
    import ShowTagsMixin from '../mixins/showTags';
    import { ResourceList } from "../../../resource_list";
    import HelpButton from "../SecondSearch/HelpButton.vue";
    import SearchByTags from "./SearchByTags.vue";
    import ShowPopupButton from "./ShowPopupButton.vue";
    import ButtonOpenNotes from "../components/dialogs/ButtonOpenNotes.vue";

    export default {
        name: "AppNav",
        components: { HelpButton, SearchByTags, ShowPopupButton, ButtonOpenNotes },
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
            ...mapState({
                dividers: ({ dividersToSave }) => dividersToSave,
                dividerTexts: ({ dividersToSave }) => dividersToSave.filter(divider => !divider.hasOwnProperty('id')),
                dividerCoefs: ({ dividersToSave }) => dividersToSave.filter(divider => divider.hasOwnProperty('id')),
            }),
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
            save() {
                this.saveCoefficients()
                    .then(msg => {
                        console.log(msg);
                        this.saveDividerTexts()
                            .then((msg) => {
                                console.log(msg);
                                this.updateDividerCoefs()
                                    .then(() => {
                                        this.$store.commit('set', {key: 'coefsToSave', value: []});
                                        this.$store.commit('set', {key: 'dividersToSave', value: []});
                                        VueBus.$emit('datatable:reload');
                                    });
                            });
                    });
            },
            saveCoefficients() {
                return new Promise((resolve, reject) => {
                    console.log('start');
                    if (this.get('coefsToSave').length) {
                        this.get('coefsToSave').forEach((coefObj, index) => {
                            this.checkIfDividerExist(coefObj.value)
                                .then(dividerExist => {
                                    console.log('divider exist ', dividerExist);
                                    if (!dividerExist) {
                                        this.addNewDivider(coefObj.value)
                                            .then(() => {
                                                this.saveCoef(coefObj, index)
                                                    .then(last => {
                                                        if (last) resolve('last coef saved');
                                                    })
                                            })
                                            .catch(err => console.dir(err))
                                    } else {
                                        this.saveCoef(coefObj, index)
                                            .then(last => {
                                                if (last) resolve('last coef saved');
                                            });
                                    }
                                })
                                .catch(err => console.dir(err))
                        });
                    } else {
                        resolve('there are no coefs');
                    }
                });
            },
            saveCoef(coefObj,index) {
                return axios.post(`/api/rrr/${coefObj.coefId}/coefficient`, {
                    value: coefObj.value
                })
                    .then(() => {
                        return index === this.get('coefsToSave').length-1;
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
            },
            saveDividerTexts() {
                return new Promise((resolve, reject) => {
                    if (this.dividerTexts.length) {
                        console.log('start divider texts');
                        this.dividerTexts.forEach((divider, index) => {
                            this.updateDividerText(divider, index)
                                .then(last => {
                                    if (last) resolve('last divider text updated');
                                });
                        })
                    } else {
                        resolve('there are no divider texts')
                    }
                });
            },
            updateDividerText(divider, index) {
                return axios.post(`/api/project/${this.getResourceId}/divider`, divider)
                    .then(() => {
                        return index === this.dividerTexts.length - 1;
                    })
                    .catch(err => console.dir(err));
            },
            updateDividerCoefs() {
                return new Promise((resolve, reject) => {
                    if (this.dividerCoefs.length) {
                        this.dividerCoefs.forEach((divider, index) => {
                            this.updateDividerCoef(divider, index)
                                .then(last => {
                                    if (last) resolve();
                                })
                        })
                    } else {
                        resolve();
                    }
                })
            },
            updateDividerCoef(divider, index) {
                return axios.put(`/api/v1/projects/${this.getResourceId}/dividers/${divider.id}`, divider)
                    .then(() => {
                        return index === this.dividerCoefs.length - 1;
                    })
                    .catch(({ response: { data } }) => {
                        this.$store.commit('set', { key: 'dividersToSave', value: [] });
                        VueBus.$emit('notification:show', data.messages[0]);
                    });
            }
        }
    }
</script>

<style scoped lang="scss">

    .vtp-menu {

        li {

            button {
                height: 24px;
            }
        }
    }

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
        position: relative;
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
