<template>
  <div id="vtp-content">
    <fieldset class="ui-corner-all margin-top-3" v-if="user">
      <div id="vtp-credentials" class="ui-corner-all">
        <div class="vtp-fh-w100">
          <h1>{{ user.username }}</h1>
        </div>
        <fieldset class="ui-corner-all margin-top-10">
          <legend>Einstellungen</legend>
          <div class="vtp-fh-w25 text_size_dropdown">
            <p>Textgrösse in den Listen: </p>
            <vue-select
                :options="fontSizeOptions"
                v-model="user.decreaseFontSize"
                :clearable="false"
            >
            </vue-select>
          </div>
        </fieldset>
        <fieldset class="ui-corner-all margin-top-10">
          <legend>Account-Daten</legend>
          <div class="vtp-fh-w100">
            <div class="vtp-fh-w25">
              <p>Passwort ändern</p>
              <form id="user_password" name="user_password">
                <div class="vtp-fh-w100">
                  <input type="password" name="pass1" id="pass1" v-model="dto.pass1" autocomplete="new-password" @input="isPassModified = true"/>
                </div>
                <div class="vtp-fh-w100">
                  <input v-bind:class="dto.pass1 != dto.pass2 ? 'red-border': ''" type="password" name="pass2" id="pass2" v-model="dto.pass2"/>
                </div>
                <div class="vtp-fh-w100 vtp-uiinfo-form-error" v-if="passwordError">{{ passwordError }}</div>
              </form>
            </div>
            <div class="vtp-fh-w25">
              <p>Email-Adresse ändern</p>
              <form id="user_email" name="user_email">
                <div class="vtp-fh-w100">
                  <input type="email" name="email1" id="email1" v-model="dto.email1" @input="isEmailModified = true"/>
                </div>
                <div class="vtp-fh-w100">
                  <input v-bind:class="dto.email1 != dto.email2 ? 'red-border': ''" type="email" name="email2" id="email2" v-model="dto.email2"/>
                </div>
                <div class="vtp-fh-w100 vtp-uiinfo-form-error" v-if="emailError">{{ emailError }}</div>
              </form>
            </div>
            <div class="vtp-fh-w25">
              <p>Nutzername ändern</p>
              <form id="user_name" name="user_name">
                <div class="vtp-fh-w100">
                  <input type="text" name="username1" id="username1" v-model="dto.username1" @input="isUsernameModified = true"/>
                </div>
                <div class="vtp-fh-w100">
                  <input v-bind:class="dto.username1 != dto.username2 ? 'red-border': ''" type="text" name="username2" id="username2" v-model="dto.username2" />
                </div>
                <div class="vtp-fh-w100 vtp-uiinfo-form-error" v-if="usernameError">{{ usernameError }}</div>
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
          <div v-if="isAdmin" class="vtp-fh-w100">
            <label class="custom-checkbox__wrapper square-checkbox">
              <input class="valid-checkbox open-checkbox-link"
                     v-model="dto.isTeliInHtmlEnable"
                     name="isTeliInHtmlEnable"
                     type="checkbox"/>
              <span class="custom-checkbox">
                                <img class="custom-checkbox__check"
                                     src="/img/check.png" />
                            </span>
              Teli in html
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
                      :class="{'ui-button-disabled ui-state-disabled': !isNeedToSave}"
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

import {mapGetters} from "vuex";

    export default {
      name: 'user-settings',
      components: {

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
            isTeliInHtmlEnable: false,
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
            isTeliInHtmlEnable: false,
          },
          isPassModified: false,
          isEmailModified: false,
          isUsernameModified: false,
          passwordError: '',
          emailError: '',
          usernameError: ''
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
        },
        ...mapGetters(['isAdmin'])
      },
      watch: {
        'user.decreaseFontSize'(newVal, oldVal) {
          // if (this.n>0) {
          if(oldVal !== null && newVal !== oldVal) {
            this.isNeedToSave = true;
          }
        },
        dto: {
          handler(val,oldVal) {
            // this.isNeedToSave = !Object.values(val).every(item => item === null);
            this.isNeedToSave = !Object.values(val).every((item, index) => item === oldVal[index]);
          },
          deep: true
        }
      },
      created() {
        this.getData()
      },
      methods: {
        getData(){
          let userService = new UserService();
          userService.getCurrentUser()
              .then(currentUser => {
                this.user.id = currentUser.id;
                this.user.username = currentUser.username;
                this.user.heightOfTodoList = currentUser.height_of_todo_list;
                this.user.numberOfTodoElements = currentUser.number_of_todo_elements;
                this.user.decreaseFontSize = this.fontSizeOptions.filter(data => data.value == currentUser.decrease_font_size)[0];
                this.user.isOpenInSameTabPdf = currentUser.is_open_in_same_tab_pdf;
                this.user.isOpenInSameTabTeli = currentUser.is_open_in_same_tab_teli;
                this.dto.isOpenInSameTabPdf = currentUser.is_open_in_same_tab_pdf;
                this.dto.isOpenInSameTabTeli = currentUser.is_open_in_same_tab_teli;
                this.dto.isTeliInHtmlEnable = currentUser.is_teli_in_html_enable;
              });
        },
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
          if(!this.isNeedToSave) {
            return false;
          }
          if (this.isPassModified) {
              if (this.dto.pass1 !== this.dto.pass2) {
                this.passwordError = "Die Eingaben müssen übereinstimmen";
                return false;
              }
              if (!this.isPasswordValid(this.dto.pass1)) {
                this.passwordError = "Das Passwort muss zwischen 8 und 14 Zeichen lang sein.";
                return false;
              }else {
                this.passwordError = "";
              }
          }
          if (this.isEmailModified) {
              if (this.dto.email1 !== this.dto.email2) {
                this.emailError = "Die Eingaben müssen übereinstimmen";
                return false;
              }else{
                this.emailError = "";
              }
          }
          if (this.isUsernameModified) {
              if (this.dto.username1 !== this.dto.username2) {
                this.usernameError = "Die Eingaben müssen übereinstimmen";
                return false;
              }
              if (!this.isUsernameValid(this.dto.username1)) {
                this.usernameError = "Das name muss zwischen 5 und 14 Zeichen lang sein.";
                return false;
              }else{
                this.usernameError = "";
              }
          }
          let userService = new UserService();
          userService.updateCredentials(this.user.id, {
            password: this.dto.pass2,
            username: this.dto.username2,
            email: this.dto.email2,
            heightOfTodoList: this.user.heightOfTodoList,
            numberOfTodoElements: this.user.numberOfTodoElements,
            decreaseFontSize: this.user.decreaseFontSize.value,
            isOpenInSameTabPdf: this.dto.isOpenInSameTabPdf,
            isOpenInSameTabTeli: this.dto.isOpenInSameTabTeli,
            isTeliInHtmlEnable: this.dto.isTeliInHtmlEnable
          }).then( data => {
            vitoopState.commit('setUser', data.user);
            this.isSuccess = true;
            this.message = data.message;

                    this.getData()

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
          this.isPassModified = false;
          this.isEmailModified = false;
          this.isUsernameModified = false;
          this.passwordError = '';
          this.emailError = '';
          this.usernameError = '';
        },
        isPasswordValid(pass) {
          return pass.length >= 8 && pass.length <= 32;
        },
        isUsernameValid(username) {
          return username.length >= 5 && username.length <= 14;
        }
      }
    };
</script>
