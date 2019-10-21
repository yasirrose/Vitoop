<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box" v-if="editProject">
                <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"
                     v-if="infoProjectData !== null && infoProjectData !== ''">
                    <span class="vtp-icon ui-icon ui-icon-info"></span>{{ infoProjectData }}
                </div>
                <div class="vtp-fh-w60"
                     style="flex: 1;margin-right: 30px;border: 1px solid #aed0ea;border-radius: 6px;overflow: hidden">
                    <quill-editor v-model="editProject.project_data.sheet"
                                  :options="editorOptions" />
                </div>
                <div style="width: 26%">
                    <div id="vtp-projectdata-sheet-info-edit"
                         class="ui-corner-all"
                         v-if="isLoaded">
                        <div class="vtp-fh-w100" style="vertical-align: top; text-align: center; margin-top: 5px">
                            <div>
                                <button @click="save"
                                        class="ui-corner-all ui-state-default"
                                        :class="{'ui-corner-all ui-state-need-to-save': needToSave}"
                                        style="padding-bottom: 5px; padding-top: 5px; width: 100%">speichern</button>
                            </div>
                            <div style="vertical-align: bottom; text-align: left; color: #2779aa; font-size: 14px; padding-top: 10px;">
                                <div class="vtp-fh-w70">
                                    <input type="checkbox"
                                           v-model="editProject.project_data.is_private"
                                           name="projectIsPrivate"
                                           style="-webkit-appearance: checkbox"/>
                                    <label for="projectIsPrivate" id="sperren-vabel">Projekt sperren</label>
                                </div>
                                <div class="vtp-fh-w70">
                                    <input type="checkbox"
                                           v-model="editProject.project_data.is_for_related_users"
                                           name="projectForRelated" style="-webkit-appearance: checkbox"/>
                                    <label for="projectForRelated" id="verstecken-vabel">Projekt verstecken</label>
                                </div>
                            </div>
                        </div>
        <!--                    {% if (showasprojectowner is not null) and (showasprojectowner) %}-->
                            <div class="vtp-fh-w100 vtp-ui-corner-all blau"
                                 v-if="editProject.project_data.rel_users.length > 0"
                                 style="vertical-align: top; margin-top: 20px; font-size: 14px">
                                <div class="prj-edit-header">
                                    <div class="vtp-fh-w60">
                                        <span><strong>Benutzer</strong></span>
                                    </div>
                                    <div class="vtp-fh-w35">
                                        <span><strong>Rechte</strong></span>
                                    </div>
                                </div>
        <!--                            {% verbatim %}-->
                                    <div v-for="rel in editProject.project_data.rel_users">
                                        <div class="vtp-fh-w60">
                                            <label :for="`userReadOnly-${rel.user.id}`"
                                                   style="margin-right: 20px">{{ rel.user.username }}</label>
                                        </div>
                                        <div class="vtp-fh-w35" style="text-align: left">
                                            <input type="checkbox"
                                                   v-model="rel.read_only"
                                                   :name="`userReadOnly-${rel.user.id}`"
                                                   class="valid-checkbox" />
                                        </div>
                                    </div>
        <!--                            {% endverbatim %}-->
                            </div>
        <!--                    {%endif%}-->
        <!--                    {% if (showasprojectowner is not null) and (showasprojectowner) %}-->
                        <div class="vtp-fh-w100" style="vertical-align: top; margin-top: 20px; color: #2779aa; font-size: 14px">
                            <div class="vtp-fh-w100" style="vertical-align: top; margin-bottom: 5px">
                                <label for="newUser"><strong>Neuer Benutzer:</strong></label>
                            </div>
                            <div class="vtp-fh-w100 vtp-new-user-search">
                                <v-select :options="options"
                                          label="username"
                                          @input="selectUser"
                                          @search="searchUser"/>
                                <button @click="addUser()"
                                        class="ui-corner-all vtp-fh-w60 ui-state-default vtp-button">verknüpfen</button>
                                <button @click="removeUser()"
                                        class="ui-corner-all vtp-fh-w40 ui-state-default vtp-button" style="float: right">löschen</button>
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
                        <div class="vtp-fh-w100" v-if="isOwner">
                            <p v-if="isDeleting">
                                Dieser Vorgang kann nicht rückgängig gemacht werden. Soll das Projekt wirklich gelöscht werden?
                            </p>
                            <button @click="isDeleting = true"
                                    v-if="!isDeleting"
                                    class="ui-corner-all vtp-button-light" style="margin-top: 20px; width: 100%">Projekt löschen</button>
                            <button @click="remove"
                                    v-if="isDeleting"
                                    class="ui-corner-all vtp-fh-w30 vtp-button-light">Ja</button>
                            <button @click="isDeleting = false"
                                    v-if="isDeleting"
                                    class="ui-corner-all vtp-fh-w30 vtp-button-light">Nein</button>
                        </div>
                        <div class="vtp-fh-w100 vtp-new-user-info"></div>
        <!--                    {%endif%}-->
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import vSelect from "vue-select";

    export default {
        name: "AppProjectEdit",
        inject: ['project','infoProjectData'],
        components: {vSelect},
        data() {
            return {
                message: null,
                isError: false,
                isSuccess: false,
                isOwner: false,
                isDeleting: false,
                isLoaded: false,
                editProject: null,

                options: [],
                user: null,
                needToSave: false,

                editorOptions: {
                    modules: {
                        toolbar: [
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            ['bold', 'italic', 'underline', 'blockquote', 'strike', { 'script': 'super' }, { 'script': 'sub' }, 'code-block'],
                            [{ 'align': [] }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            ['link', 'image', 'video'],
                            [{ 'color': [] }, { 'background': [] }]
                        ],
                        syntax: {
                            highlight: text => hljs.highlightAuto(text).value
                        }
                    }
                }
            }
        },
        watch: {
            editProject: {
                deep: true,
                handler(val, oldVal) {
                    if (oldVal !== null) {
                        this.needToSave = true;
                    }
                }
            }
        },
        mounted() {
            resourceDetail.init();

            axios(`/api/project/${this.project.id}`)
                .then(({data}) => {
                    this.isLoaded = true;
                    this.editProject = data.project;
                    console.log(data);
                })
                .catch(err => {
                    this.isLoaded = true;
                    console.dir(err);
                });
        },
        methods: {
            selectUser(user) {
                this.user = user;
            },
            searchUser(search) {
                axios(`/api/project/${this.project.id}/user/find?s=${search}`)
                    .then(({data}) => {
                        this.options = data;
                    })
                    .catch(err => console.dir(err));
            },
            save() {
                axios.post(`/api/project/${this.project.id}`, this.editProject)
                    .then(response => {
                        console.log(response);
                        this.needToSave = false;
                    })
                    .catch(err => console.dir(err));
            },
            remove() {
                axios.delete(`/api/project/${this.project.id}`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => console.dir(err));
            },
            addUser() {
                axios.post(`/api/project/${this.project.id}/user`, this.user)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => console.dir(err));
            },
            removeUser() {
                axios.delete(`/api/project/${this.project.id}/user/${this.user.id}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped lang="scss">
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

        &::v-deep {

            .dropdown-toggle {
                background: white;
                height: 28px;
                padding: 1px 0 4px;
            }

            .form-control {
                margin-top: 0 !important;
            }
        }
    }
</style>