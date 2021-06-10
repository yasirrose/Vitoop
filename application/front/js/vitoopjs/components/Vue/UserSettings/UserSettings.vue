<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3" v-if="user">
            <div id="vtp-credentials" class="ui-corner-all">
                <div class="vtp-fh-w100">
                    <h1>{{ user.username }}</h1>
                </div>
                <fieldset class="ui-corner-all margin-top-10">
                    <legend>Einstellungen</legend>
                    <div class="vtp-fh-w25">
                        <p>Textgrösse in den Listen: </p>
                        <v-select :options="fontSizeOptions"
                                  :value="userFontSize"
                                  :clearable="false"
                                  @input="selectFontSize">
                        </v-select>
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
                    <legend>...&Data</legend>
                    <div class="vtp-fh-w100">
                      <label class="custom-checkbox__wrapper square-checkbox">
                        <input class="valid-checkbox open-checkbox-link"
                               v-model="dto.isOpenInSameTabPdf"
                               name="isOpenInSameTabPdf"
                               type="checkbox"/>
                            <span class="custom-checkbox">
                                <img class="custom-checkbox__check"
                                     src="/img/check.png" />
                            </span>
                        Pdf&Data im selben Tab öffnen
                      </label>
                    </div>
                    <div class="vtp-fh-w100">
                      <label class="custom-checkbox__wrapper square-checkbox">
                        <input class="valid-checkbox open-checkbox-link"
                               v-model="dto.isOpenInSameTabTeli"
                               name="isOpenInSameTabTeli"
                               type="checkbox"/>
                        <span class="custom-checkbox">
                                <img class="custom-checkbox__check"
                                     src="/img/check.png" />
                            </span>
                        Teli&Data im selben Tab öffnen
                      </label>
                  </div>
                </fieldset>
                <fieldset class="ui-corner-all margin-top-10">
                    <div class="vtp-fh-w100">
                        <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all" v-show="isSuccess" style="transition: 0s linear all;"><span class="vtp-icon ui-icon ui-icon-info"></span><span>{{ message }}</span></div>
                        <div class="vtp-fh-w70">
                            <p v-show="isDeleting">Soll das Nutzerkonto: "{{ user.username }}" endgültig gelöscht werden?</p>
                            <button v-on:click="isDeleting = true" v-show="!isDeleting" class="ui-state-default ui-corner-all vtp-button-light">Benutzerkonto löschen</button>
                            <button v-on:click="deactivate()" v-show="isDeleting" class="ui-state-default ui-corner-all vtp-fh-w30 vtp-button-light">Ja</button>
                            <button v-on:click="isDeleting = false" v-show="isDeleting" class="ui-state-default ui-corner-all vtp-fh-w30 vtp-button-light">Nein</button>
                        </div>
                        <div class="vtp-fh-w30" style="float: right; text-align: right">
                            <button @click="save()"
                                    v-show="!isDeleting"
                                    :class="isNeedToSave ? 'ui-state-active': ''"
                                    class="ui-state-default ui-corner-all vtp-fh-w30 vtp-button-light"
                                    style="margin-right: 15px">speichern</button> <!-- ui-state-need-to-save -->
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
        data() {
            return {
                n: 0,
                isNeedToSave: false,
                user: {
                    id: null,
                    username: null,
                    heightOfTodoList: null,
                    numberOfTodoElements: null,
                    decreaseFontSize: null,
                    isOpenInSameTabPdf: false,
                    isOpenInSameTabTeli: false,
                },
                isDeleting: false,
                isError: false,
                isSuccess: false,
                message: '',
                errorMessage: '',
                fontSizeOptions: [
                    {
                        label: 'klein',
                        value: 2
                    },
                    {
                        label: 'mittel',
                        value: 1
                    },
                    {
                        label: 'gross',
                        value: 0
                    }
                ],
                dto: {
                    pass1: null,
                    pass2: null,
                    email1: null,
                    email2: null,
                    username1: null,
                    username2: null,
                    isOpenInSameTabPdf: false,
                    isOpenInSameTabTeli: false,
                }
            }
        },
        computed: {
            userFontSize() {
                let label = null;
                this.fontSizeOptions.forEach(option => {
                    if (this.user.decreaseFontSize === option.value) {
                        label = option.label;
                    }
                });
                return label;
            }
        },
        watch: {
            'user.decreaseFontSize'() {
                if (this.n>0) {
                    this.isNeedToSave = true;
                }
            },
            dto: {
                handler(val,oldVal) {
                    this.isNeedToSave = !Object.values(val).every(item => item === null);
                },
                deep: true
            }
        },
        created() {
            let userService = new UserService();
            userService.getCurrentUser()
                .then(currentUser => {
                    this.user.id = currentUser.id;
                    this.user.username = currentUser.username;
                    this.user.heightOfTodoList = currentUser.height_of_todo_list;
                    this.user.numberOfTodoElements = currentUser.number_of_todo_elements;
                    this.user.decreaseFontSize = currentUser.decrease_font_size;
                    this.user.isOpenInSameTabPdf = currentUser.is_open_in_same_tab_pdf;
                    this.user.isOpenInSameTabTeli = currentUser.is_open_in_same_tab_teli;
                    this.dto.isOpenInSameTabPdf = currentUser.is_open_in_same_tab_pdf;
                    this.dto.isOpenInSameTabTeli = currentUser.is_open_in_same_tab_teli;
                });
        },
        methods: {
            selectFontSize(data) {
                this.n = 1;
                this.user.decreaseFontSize = data.value;
            },
            deactivate() {
                let userService = new UserService();
                userService.deactivateUser(this.user.id).then( data => {
                    window.location = data.url;
                }).catch(error => {
                    this.isError = true;
                    this.errorMessage = error.message;
                });
            },
            save() {
                let userService = new UserService();
                userService.updateCredentials(this.user.id, {
                    password: this.dto.pass2,
                    username: this.dto.username2,
                    email: this.dto.email2,
                    heightOfTodoList: this.user.heightOfTodoList,
                    numberOfTodoElements: this.user.numberOfTodoElements,
                    decreaseFontSize: this.user.decreaseFontSize,
                    isOpenInSameTabPdf: this.dto.isOpenInSameTabPdf,
                    isOpenInSameTabTeli: this.dto.isOpenInSameTabTeli
                }).then( data => {
                    vitoopState.commit('setUser', data.user);
                    this.isSuccess = true;
                    this.message = data.message;

                    this.user.id = data.user.id;
                    this.user.username = data.user.username;
                    this.user.heightOfTodoList = data.user.height_of_todo_list;
                    this.user.numberOfTodoElements = data.user.number_of_todo_elements;
                    this.user.decreaseFontSize = data.user.decrease_font_size;
                    this.user.isOpenInSameTabPdf = data.user.is_open_in_same_tab_pdf;
                    this.user.isOpenInSameTabTeli = data.user.is_open_in_same_tab_teli;

                    setTimeout(() => {
                        this.isSuccess = false;
                        this.message = '';
                    }, 3000);
                    this.resetDto();
                }).catch(error => {
                    this.isError = true;
                    this.errorMessage = error.message;
                });
            },
            resetDto() {
                this.dto.email1 = null;
                this.dto.email2 = null;
                this.dto.username1 = null;
                this.dto.username2 = null;
                this.dto.pass1 = null;
                this.dto.pass2 = null;
                this.n = 0;
                this.isNeedToSave = false;
            }
        }
    };
</script>
