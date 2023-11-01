<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box" v-if="getProject">
                <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"
                     v-if="infoProjectData !== null && infoProjectData !== '' && infoProjectData.length > 0">
                    <span class="vtp-icon ui-icon ui-icon-info"></span>{{ infoProjectData }}
                </div>
                <div class="vtp-fh-w60"
                     style="flex: 1;margin: 8px; margin-right: 20px">
                    <textarea :value="getProject.project_data.sheet"
                              ref="sheet"
                              @change="$store.commit('setProjectData', {key: 'sheet', value: $refs.sheet.value})"
                              id="edit-project-textarea"
                              name="edit-project-textarea">
                    </textarea>
                </div>
                <div style="width: 19%; margin: 8px">
                    <div id="vtp-projectdata-sheet-info-edit"
                         class="ui-corner-all"
                         v-if="isLoaded">
                        <div class="vtp-fh-w100" style="vertical-align: top; text-align: center; margin-top: 5px">
                            <div>
                                <button @click="save"
                                        class="ui-corner-all ui-state-default"
                                        :class="{'ui-corner-all ui-state-active': get('projectNeedToSave')}"
                                        style="padding-bottom: 5px; padding-top: 5px; width: 100%">speichern</button> <!-- ui-state-need-to-save -->
                            </div>
                            <div style="vertical-align: bottom; text-align: left; color: #2779aa; font-size: 14px; padding-top: 20px;">
                                <div>
                                    <label id="sperren-vabel"
                                           class="custom-checkbox__wrapper square-checkbox">
                                        <input class="valid-checkbox open-checkbox-link"
                                               v-model="getProject.project_data.is_private"
                                               ref="is_private"
                                               @change="$store.commit('setProjectData', {key: 'is_private', value: $refs.is_private.checked})"
                                               name="projectIsPrivate"
                                               type="checkbox"/>
                                        <span class="custom-checkbox">
                                            <img class="custom-checkbox__check"
                                                 src="/img/check.png" />
                                        </span>
                                        Projekt sperren
                                    </label>
                                </div>
                                <div>
                                    <label id="verstecken-vabel"
                                           class="custom-checkbox__wrapper square-checkbox">
                                        <input class="valid-checkbox open-checkbox-link"
                                               v-model="getProject.project_data.is_for_related_users"
                                               ref="is_for_related_users"
                                               @change="$store.commit('setProjectData', {key: 'is_for_related_users', value: $refs.is_for_related_users.checked})"
                                               name="projectForRelated"
                                               type="checkbox"/>
                                        <span class="custom-checkbox">
                                            <img class="custom-checkbox__check"
                                                 src="/img/check.png" />
                                        </span>
                                        Projekt verstecken
                                    </label>
                                </div>
                                <div>
                                    <label class="custom-checkbox__wrapper square-checkbox">
                                        <input class="valid-checkbox open-checkbox-link"
                                               v-model="getProject.project_data.is_all_records"
                                               ref="is_all_records"
                                               @change="$store.commit('setProjectData', {key: 'is_all_records', value: $refs.is_all_records.checked})"
                                               name="allInOneList"
                                               id="allInOneList"
                                               type="checkbox"/>
                                        <span class="custom-checkbox">
                                            <img class="custom-checkbox__check"
                                                 src="/img/check.png" />
                                        </span>
                                        Eine Datensatzliste
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="vtp-fh-w100 vtp-ui-corner-all blau"
                             v-if="getProject.project_data.rel_users.length > 0"
                             style="vertical-align: top; margin-top: 20px; font-size: 14px">
                            <div class="prj-edit-header">
                                <div class="vtp-fh-w60">
                                    <span>Benutzer</span>
                                </div>
                                <div class="vtp-fh-w35">
                                    <span>Rechte</span>
                                </div>
                            </div>
                            <div v-for="rel in getProject.project_data.rel_users">
                                <div class="vtp-fh-w60">
                                    <label :for="`userReadOnly-${rel.user.id}`"
                                           style="margin-right: 20px">{{ rel.user.username }}</label>
                                </div>
                                <div class="vtp-fh-w35" style="text-align: left">
                                    <label class="custom-checkbox__wrapper square-checkbox">
                                        <input class="valid-checkbox open-checkbox-link"
                                               :id="`userReadOnly-${rel.user.id}`"
                                               :value="!rel.read_only"
                                               :checked="!rel.read_only"
                                               @change="changeRight(rel,$event)"
                                               :name="`userReadOnly-${rel.user.id}`"
                                               type="checkbox"/>
                                        <span class="custom-checkbox">
                                            <img class="custom-checkbox__check"
                                                 src="/img/check.png" />
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div class="vtp-fh-w100" style="vertical-align: top; margin-top: 20px; color: #2779aa; font-size: 14px">
                            <div class="vtp-fh-w100" style="vertical-align: top; margin-bottom: 5px">
                                <label for="newUser"><strong>Neuer Benutzer:</strong></label>
                            </div>
                            <div class="vtp-fh-w100 vtp-new-user-search">
                                <vue-select :options="options"
                                          ref="v_select"
                                          label="username"
                                          @input="selectUser"
                                          @search="searchUser"/>
                                <button @click="addUser()"
                                        class="ui-corner-all vtp-fh-w60 ui-state-default vtp-button">
                                    verknüpfen
                                </button>
                                <button @click="removeUser()"
                                        class="ui-corner-all vtp-fh-w40 ui-state-default vtp-button"
                                        style="float: right">
                                    löschen
                                </button>
                            </div>
                            <span v-if="isError"
                                  id="error-span"
                                  class="form-error">
                                    Vitoooops!: <span ng-bind="message"></span>
                                </span>
                            <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"
                                 v-if="isSuccess" style="transition: 0s linear all;">
                                <span class="vtp-icon ui-icon ui-icon-info"></span>
                                <span>{{ message }}</span>
                            </div>
                        </div>
                        <div class="vtp-fh-w100" v-if="getResource('owner')">
                            <p v-if="isDeleting">
                                Dieser Vorgang kann nicht rückgängig gemacht werden. Soll das Projekt wirklich gelöscht werden?
                            </p>
                            <button @click="isDeleting = true"
                                    :disabled="get('projectNeedToSave')"
                                    v-if="!isDeleting"
                                    class="ui-state-default ui-corner-all vtp-button-light"
                                    :class="{ 'ui-state-disabled': get('projectNeedToSave') }"
                                    style="margin-top: 20px; width: 100%">
                                Projekt löschen
                            </button>
                            <button @click="remove"
                                    v-if="isDeleting"
                                    class="ui-state-default ui-corner-all vtp-fh-w30 vtp-button-light">Ja</button>
                            <button @click="isDeleting = false"
                                    v-if="isDeleting"
                                    class="ui-state-default ui-corner-all vtp-fh-w30 vtp-button-light">Nein</button>
                        </div>
                        <div class="vtp-fh-w100 vtp-new-user-info"></div>
                    </div>
                </div>
            </div>
        </fieldset>
        <div id="confirm-dialog">
            <div class="message">Soll das Projekt vor dem Schließen gespeichert werden?</div>
            <div class="buttons" style="margin-bottom: 5px;">
                <button @click="cancel" class="ui-state-default ui-corner-all vtp-button">Nein</button>
                <button @click="saveAndRedirect" class="ui-state-default ui-corner-all vtp-button">Ja</button>
            </div>
        </div>
    </div>
</template>

<script>
    import VueSelect from "vue-select";
    import { mapGetters, mapState } from "vuex";
    import EventBus from "../../../../app/eventBus";

    export default {
        name: "AppProjectEdit",
        inject: ['infoProjectData'],
        components: {VueSelect},
        data() {
            return {
                message: null,
                isError: false,
                isSuccess: false,
                isDeleting: false,
                isLoaded: false,
                options: [],
                user: null,
            }
        },
        watch: {
            getProject: {
                deep: true,
                handler(val, oldVal) {
                    if (oldVal !== null) {
                        this.$store.commit('set',{
                            key: 'projectNeedToSave',
                            value: true,
                        });
                    }
                }
            }
        },
        computed: {
            ...mapGetters(['getResource','get','getProject']),
            ...mapState({
                project: ({ project }) => project,
            })
        },
        beforeRouteLeave(to, from, next) {
            if (this.get('projectNeedToSave')) {
                $('#confirm-dialog').dialog('open');
            } else {
                next();
            }
        },
        mounted() {
            this.getProjectData();

            $('#confirm-dialog').dialog({
                autoOpen: false,
                width: 431,
                height: 170,
                position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                modal: true,
            });

            EventBus.$on('confirm-dialog:open', () => {
                $('#confirm-dialog').dialog('open');
            });
        },
        methods: {
            changeRight(rel,e) {
                rel.read_only = JSON.parse(e.target.value);
            },
            getProjectData() {
                this.isLoaded = true;
                setTimeout(() => {
                    this.$refs.v_select.clearSelection();
                    tinymce.remove('#edit-project-textarea');
                    let options = vitoopApp.getTinyMceOptions();
                    options.mode = 'exact';
                    options.selector = '#edit-project-textarea';
                    options.height= this.get('contentHeight')-32-27-76;
                    options.plugins = ['textcolor', 'link', 'code'];
                    options.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink | code';
                    options.init_instance_callback = (editor) => {
                        this.$store.commit('set',{
                            key: 'projectNeedToSave',
                            value: false,
                        });
                        editor.on('MouseLeave', (e) => {
                            var link = e.target.querySelector("link[rel*='shortcut icon']")

                            if(link){
                                $(link).attr("href",vitoop.baseUrl+"/favicon.ico")
                                $(link).attr("data-mce-href",vitoop.baseUrl+"/favicon.ico")
                            }

                            this.$store.commit('setProjectData', {
                                key: 'sheet',
                                value: e.target.querySelector('.mce-content-body ').innerHTML,
                            });

                        });
                    };
                    tinymce.init(options);
                })
            },
            selectUser(user) {
                this.user = user;
            },
            searchUser(search) {
                axios(`/api/project/${this.getResource('id')}/user/find?s=${search}`)
                    .then(({data}) => {
                        this.options = data;
                    })
                    .catch(err => console.dir(err));
            },
            saveAndRedirect() {
                this.save()
                    .then(() => {
                        this.redirect();
                    });
            },
            redirect() {
                $('#confirm-dialog').dialog('close');
                this.$store.commit('set',{
                    key: 'projectNeedToSave',
                    value: false,
                });
                this.$router.push(`/project/${this.getResource('id')}`);
            },
            cancel() {
                $('#confirm-dialog').dialog('close');
                this.$store.commit('set',{
                    key: 'projectNeedToSave',
                    value: false,
                });
                this.$router.push(`/project/${this.getResource('id')}`)
                    .then(() => {
                        EventBus.$emit('refresh');
                    });
            },
            save() {
                return axios.post(`/api/project/${this.getResource('id')}`, this.getProject)
                    .then((response) => {
                        this.$store.commit('set',{
                            key: 'projectNeedToSave',
                            value: false,
                        });
                        return response;
                    })
                    .catch(err => console.dir(err));
            },
            remove() {
                axios.delete(`/api/project/${this.getResource('id')}`)
                    .then(response => {
                        this.$store.commit('setInProject', false);
                        this.$store.commit('resetResource');
                        EventBus.$emit('project:loaded', null);
                        this.$router.push('/prj');
                    })
                    .catch(err => console.dir(err));
            },
            addUser() {
                axios.post(`/api/project/${this.getResource('id')}/user`, this.user)
                    .then(({data: {rel}}) => {
                        this.$store.commit('addProjectRelUser', rel);
                    })
                    .catch(err => console.dir(err));
            },
            removeUser() {
                axios.delete(`/api/project/${this.getResource('id')}/user/${this.user.id}`)
                    .then(({data: {rel}}) => {
                        this.$store.commit('removeProjectRelUser', rel.id);
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped lang="scss">
    #confirm-dialog {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .message {
            font-size: 16px;
            color: #2779aa;
            padding: 1.5rem 0;
        }

        .buttons {
            display: flex;
            justify-content: space-between;

            button {
                min-width: 5rem;
            }
        }
    }

    #vtp-projectdata-box {
        display: flex;
    }

    #vtp-projectdata-sheet-info-edit {
        overflow: visible;
    }

    .dropdown {
        margin-bottom: 5px;
    }

    .vtp-new-user-search {

        :deep(.dropdown-toggle) {
          background: white;
          height: 28px;
          padding: 1px 0 4px;
        }

        :deep(.form-control) {
          margin-top: 0 !important;
        }
    }

    .custom-checkbox {
        &__wrapper {
            padding-left: 25px;
        }
    }
</style>
