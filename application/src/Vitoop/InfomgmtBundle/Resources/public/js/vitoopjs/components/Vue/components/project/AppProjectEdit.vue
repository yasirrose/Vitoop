<template>
    <div class="ui-corner-all margin-top-3">
        <div id="vtp-projectdata-box">
<!--            {% if infoprojectdata is defined and infoprojectdata is not empty %}-->
            <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all">
                <span class="vtp-icon ui-icon ui-icon-info"></span>{{ "infoprojectdata" }}
            </div>
<!--            {% endif %}-->
<!--            {% if editMode %}-->
            <div v-if="editProject">
<!--                <input type="text"-->
<!--                       style="display: none"-->
<!--                       ng-init="projectId={{ project.getID }}"-->
<!--                       v-model="projectId">-->
                <div class="vtp-fh-w60">
<!--                    <form name="projectSheetForm">-->
<!--                        <textarea ui-tinymce="tinymceOptions"-->
<!--                                  v-model="editProject.project_data.sheet"-->
<!--                                  name="projectText"></textarea>-->
<!--                    </form>-->
                    <quill-editor v-model="editProject.project_data.sheet" />
                </div>
                <div id="vtp-projectdata-sheet-info-edit"
                     class="vtp-fh-w25 ui-corner-all"
                     v-if="isLoaded">
                    <form name="projectDataForm">
                        <div class="vtp-fh-w100" style="vertical-align: top; text-align: center; margin-top: 5px">
                            <div>
                                <button @click="save"
                                        :class="{
                                        'ui-corner-all ui-state-default': false,
                                        'ui-corner-all ui-state-need-to-save': false}"
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
<!--                        {% if (showasprojectowner is not null) and (showasprojectowner) %}-->
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
<!--                                {% verbatim %}-->
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
<!--                                {% endverbatim %}-->
                            </div>
<!--                        {%endif%}-->
                    </form>
<!--                    {% if (showasprojectowner is not null) and (showasprojectowner) %}-->
                    <div class="vtp-fh-w100" style="vertical-align: top; margin-top: 20px; color: #2779aa; font-size: 14px">
                        <div class="vtp-fh-w100" style="vertical-align: top; margin-bottom: 5px">
                            <label for="newUser"><strong>Neuer Benutzer:</strong></label>
                        </div>
                        <div class="vtp-fh-w100 vtp-new-user-search">
<!--                            <div angucomplete id="usernames-autocomplete"-->
<!--                                 placeholder="Search users"-->
<!--                                 pause="300"-->
<!--                                 selectedobject="user"-->
<!--                                 url="../api/project/{{ editProject.id }}/user/find?s="-->
<!--                                 titlefield="username"-->
<!--                                 inputclass="vtp-fh-w97"-->
<!--                                 style="margin-bottom: 5px"></div>-->
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
                            <span ng-bind="message"></span>
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
<!--            {% endif %}-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppProjectEdit",
        inject: ['project'],
        data() {
            return {
                isError: false,
                isSuccess: false,
                isOwner: false,
                isDeleting: false,
                isLoaded: false,
                editProject: null,
                tinymceOptions: null
            }
        },
        mounted() {
            this.tinymceOptions = window.vitoopApp.getTinyMceOptions();
            this.tinymceOptions.width = 800;
            this.tinymceOptions.height = 550;
            this.tinymceOptions.plugins = ['textcolor', 'link', 'media', 'resourceurl'];
            this.tinymceOptions.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor | link unlink resourceurl';

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
            save() {
                axios.post(`api/project/${this.project.id}`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => console.dir(err));
            },
            remove() {
                axios.delete(`api/project/${this.project.id}`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => console.dir(err));
            },
            addUser() {
                axios(`api/project/${this.project.id}/user`)
                    .then(response => {
                        console.log(response);
                    })
                    .catch(err => console.dir(err));
            },
            removeUser() {
                axios.delete(`api/project/${this.project.id}/user/${this.user.originalObject.id}`)
                    .then(response => {
                        console.log(response)
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped>

</style>