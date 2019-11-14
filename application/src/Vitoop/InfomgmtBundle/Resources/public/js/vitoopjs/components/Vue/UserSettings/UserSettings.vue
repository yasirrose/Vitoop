<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-credentials" class="ui-corner-all">
                <div class="vtp-fh-w100">
                    <h1>{{ user.username }}</h1>
                </div>
                <fieldset class="ui-corner-all margin-top-10">
                    <legend>Einstellungen</legend>
                    <div class="vtp-fh-w25">
                        <p>Textgrösse in den Listen: </p>
                        <v-select :options="fontSizeOptions" :clearable="false" v-model="dto.decreaseFontSize"></v-select>
                    </div>
                </fieldset>
                <fieldset class="ui-corner-all margin-top-10">
                    <legend>Account-Daten</legend>
                    <div class="vtp-fh-w100">
                        <div class="vtp-fh-w25">
                            <p>Passwort ändern</p>
                            <form id="user_password" name="user_password">
                                <div class="vtp-fh-w100">
                                    <input type="password" name="pass1" id="pass1" v-model="dto.pass1"/>
                                </div>
                                <div class="vtp-fh-w100">
                                    <input v-bind:class="dto.pass1 != dto.pass2 ? 'red-border': ''" type="password" name="pass2" id="pass2" v-model="dto.pass2"/>
                                </div>
                                <div class="vtp-fh-w100" v-show="dto.pass1 != dto.pass2">Die Eingaben müssen übereinstimmen.</div>
                            </form>
                        </div>
                        <div class="vtp-fh-w25">
                            <p>Email-Adresse ändern</p>
                            <form id="user_email" name="user_email">
                                <div class="vtp-fh-w100">
                                    <input type="email" name="email1" id="email1" v-model="dto.email1"/>
                                </div>
                                <div class="vtp-fh-w100">
                                    <input v-bind:class="dto.email1 != dto.email2 ? 'red-border': ''" type="email" name="email2" id="email2" v-model="dto.email2"/>
                                </div>
                                <div class="vtp-fh-w100" v-show="dto.email1 != dto.email2">Die Eingaben müssen übereinstimmen.</div>
                            </form>
                        </div>
                        <div class="vtp-fh-w25">
                            <p>Nutzername ändern</p>
                            <form id="user_name" name="user_name">
                                <div class="vtp-fh-w100">
                                    <input type="text" name="username1" id="username1" v-model="dto.username1" />
                                </div>
                                <div class="vtp-fh-w100">
                                    <input v-bind:class="dto.username1 != dto.username2 ? 'red-border': ''" type="text" name="username2" id="username2" v-model="dto.username2" />
                                </div>
                                <div class="vtp-fh-w100" v-show="dto.username1 != dto.username2">Die Eingaben müssen übereinstimmen.</div>
                            </form>
                        </div>
                    </div>
                </fieldset>
                <fieldset class="ui-corner-all margin-top-10">
                    <div class="vtp-fh-w100">
                        <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all" v-show="isSuccess" style="transition: 0s linear all;"><span class="vtp-icon ui-icon ui-icon-info"></span><span>{{ message }}</span></div>
                        <div class="vtp-fh-w70">
                            <p v-show="isDeleting">Soll das Nutzerkonto: "{{ user.username }}" endgültig gelöscht werden?</p>
                            <button v-on:click="isDeleting = true" v-show="!isDeleting" class="ui-corner-all vtp-button-light">Benutzerkonto löschen</button>
                            <button v-on:click="deactivate()" v-show="isDeleting" class="ui-corner-all vtp-fh-w30 vtp-button-light">Ja</button>
                            <button v-on:click="isDeleting = false" v-show="isDeleting" class="ui-corner-all vtp-fh-w30 vtp-button-light">Nein</button>
                        </div>
                        <div class="vtp-fh-w30" style="float: right; text-align: right">
                            <button v-on:click="save()"
                                    v-show="!isDeleting"
                                    v-bind:class="isNeedToSave ? 'ui-state-need-to-save': ''"
                                    class="ui-corner-all vtp-fh-w30 vtp-button-light"
                                    style="margin-right: 15px">speichern</button>
                            <span v-show="isError" id="error-span" class="form-error"><span>{{ errorMessage }}</span></span>
                        </div>
                    </div>
                </fieldset>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import UserService from "../../../services/User/UserService";
    import vSelect from 'vue-select/src/components/Select.vue';

    export default {
        name: 'user-settings',
        components: {
            vSelect
        },
        props: {

        },
        data() {
            return {
                n: 0,
                isNeedToSave: false,
                user: {
                    id: '',
                    username: '',
                    heightOfTodoList: '',
                    numberOfTodoElements: '',
                    decreaseFontSize: 0
                },
                isDeleting: false,
                isError: false,
                isSuccess: false,
                message: '',
                errorMessage: '',
                fontSizeOptions: [{label: 'klein', value: '1'}, {label: 'gross', value: '0'}],
                dto: {
                    pass1: '',
                    pass2: '',
                    email1: '',
                    email2: '',
                    username1: '',
                    username2: '',
                    decreaseFontSize: {
                        value: 1,
                        label: 'klein'
                    }
                }
            }
        },
        watch: {
            user: {
                handler() {
                    this.n++;
                    if (this.n > 2) {
                        this.isNeedToSave = true;
                    }
                },
                deep: true
            },
            dto: {
                handler() {
                    this.n++;
                    if (this.n > 2) {
                        this.isNeedToSave = true;
                    }
                },
                deep: true
            }
        },
        created() {
            let self = this;
            let userService = new UserService();
            let userObj = this.user;
            let dto = this.dto;
            userService.getCurrentUser().then(function (currentUser) {
                userObj.id = currentUser.id;
                userObj.username = currentUser.username;
                userObj.heightOfTodoList = currentUser.height_of_todo_list;
                userObj.numberOfTodoElements = currentUser.number_of_todo_elements;
                userObj.decreaseFontSize = currentUser.decrease_font_size;
                self.updateDtoDecreaseValue(userObj.decreaseFontSize);
            });
        },
        methods: {
            deactivate() {
                let userService = new UserService();
                let self = this;
                userService.deactivateUser(this.user.id).then(function (data) {
                    window.location = data.url;
                }).catch(function (error) {
                    self.isError = true;
                    self.errorMessage = error.message;
                });
            },
            save() {
                if (false === this.isNeedToSave) {
                    return false;
                }

                let self = this;
                let userService = new UserService();
                userService.updateCredentials(self.user.id, {
                    password: self.dto.pass2,
                    username: self.dto.username2,
                    email: self.dto.email2,
                    heightOfTodoList: self.user.heightOfTodoList,
                    numberOfTodoElements: self.user.numberOfTodoElements,
                    decreaseFontSize: self.dto.decreaseFontSize.value
                }).then(function (data) {
                    vitoopState.commit('setUser', data.user);
                    self.isSuccess = true;
                    self.message = data.message;
                    setTimeout(function () {
                        self.isSuccess = false;
                        self.message = '';
                    }, 3000);

                    self.user.id = data.user.id;
                    self.user.username = data.user.username;
                    self.user.heightOfTodoList = data.user.height_of_todo_list;
                    self.user.numberOfTodoElements = data.user.number_of_todo_elements;
                    self.user.decreaseFontSize = data.user.decrease_font_size;
                    self.updateDtoDecreaseValue(self.user.decreaseFontSize);

                    window.vitoopApp.user = data.user;

                    //reset dto
                    self.dto.email1 = '';
                    self.dto.email2 = '';
                    self.dto.username1 = '';
                    self.dto.username2 = '';
                    self.dto.pass1 = '';
                    self.dto.pass2 = '';

                }).catch(function (error) {
                    self.isError = true;
                    self.errorMessage = error.message;
                });
            },
            getLabelForFontOption(value) {
                for (let i = 0; i < this.fontSizeOptions.length; i++) {
                    if (this.fontSizeOptions[i].value == value) {
                        return this.fontSizeOptions[i].label;
                    }
                }

                return '';
            },
            updateDtoDecreaseValue(value) {
                this.dto.decreaseFontSize.value = value;
                this.dto.decreaseFontSize.label = this.getLabelForFontOption(value);
            }
        }
    };
</script>
