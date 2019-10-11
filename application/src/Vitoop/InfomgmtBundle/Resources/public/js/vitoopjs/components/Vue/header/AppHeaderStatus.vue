<template>
    <div id="vtp-header-status">
        <div v-if="isAdmin && adminToolBar.show">
            <span class="vtp-admin-toolbar download-size">
                {{$t('label.download.size')}}:
                {{ downloadSize }}
                {{$t('label.download.mb')}}
            </span>
            <form id="vtp-header-toggle-flag"
                  class="vtp-admin-toolbar"
                  style="display: none;"
                  action="/userhome"
                  method="get"
                  enctype="application/x-www-form-urlencoded">
                <label for="vtp-tgl-flag" class="vtp-button">{{ $t('label.flags.edit') }}</label>
                <input id="vtp-tgl-flag" class="vtp-uiaction-toggle-flag" name="flagged" type="checkbox" value="1">
                <button class="vtp-button" type="submit">{{ $t('label.flags.edit') }}</button>
            </form>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    id="button-terms-admin">
                <span class="ui-button-text">{{ $t('label.terms') }}</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    id="button-data-p">
                <span class="ui-button-text">{{ $t('label.datap') }}</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    @click="invitation.toggle"
                    id="invitations-toggle">
                {{ $t('invitations.label') }}:
                <span>
                    {{ $t(`label.checkbox.${invitation.text()}`) }}
                </span>
            </button>
            <a class="vtp-button vtp-uiaction-goto-invite vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-icons-only"
               href="/invite"
               role="button"
               :title="$t('invitations.send')">
                <span class="ui-button-icon-primary ui-icon ui-icon-mail-closed"></span>
                <span class="ui-button-icon-secondary ui-icon ui-icon-pencil"></span>
            </a>
            <a class="vtp-button vtp-uiaction-goto-edithome vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-icons-only"
               href="/edit-vitoop-blog"
               :title="$t('homepage.edit')">
                <span class="ui-button-icon-primary ui-icon ui-icon-home"></span>
                <span class="ui-button-icon-secondary ui-icon ui-icon-pencil"></span>
            </a>
        </div>
        <div v-if="$store.state.user !== null"
             style="display: flex;align-items: center;">
            <div id="button-checking-links__wrapper">
                <button class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
                        id="button-checking-links-remove"
                        :title="$t('label.remove_tooltip')"
                        style="display:none">
                    <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                </button>
                <button class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        id="button-checking-links"
                        :title="$t('label.open_tooltip')"
                        style="display:none">
                    <span class="ui-button-text">{{ $t('label.open') }}</span>
                </button>
                <button class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        id="button-checking-links-send"
                        :title="$t('label.send_tooltip')"
                        style="display:none">
                    <span class="ui-button-text">{{ $t('label.send') }}</span>
                </button>
            </div>
            <form id="vtp-header-login"
                  action="/logout"
                  method="get"
                  style="margin: 0 3px;"
                  enctype="application/x-www-form-urlencoded">
                <button id="vtp-user-loginform-logout"
                        class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-text-icon-secondary"
                        role="button"
                        :title="$t('logout.message')"
                        :value="$t('logout.label')"
                        type="submit">
                    <span class="ui-button-text">{{ $store.state.user.username }}</span>
                    <span class="ui-button-icon-secondary ui-icon ui-icon-power"></span>
                </button>
            </form>
            <button id="vtp-admin-toolbar-toggle"
                    v-if="isAdmin" style="margin-right: 3px;"
                    @click="adminToolBar.toggle()"
                    class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only">
                <span class="ui-button-icon-primary ui-icon ui-icon-notice"></span>
                <span class="ui-button-text"></span>
            </button>
            <a href="/user/settings"
               id="vtp-user-userdata"
               class="vtp-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
               title="Einstellungen">
                <i class="fas fa-bars"></i>
                <span class="ui-button-text"></span>
            </a>
        </div>
        <div v-else>
            <form id="vtp-header-login"
                  action="/login_check"
                  method="post"
                  enctype="application/x-www-form-urlencoded">
                <div class="login-container">
                    <div class="vtp-fh-w5">
                        <button id="vtp-user-loginform-login"
                                class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
                                value="login"
                                tabindex="3"
                                type="submit"
                                :title="$t('label.signin')">
                            <span class="ui-button-icon-primary ui-icon ui-icon-person"></span>
                        </button>
                    </div>
                    <div class="vtp-fh-w16 forgotPass" style="width: 167px">
                        <input id="password"
                               name="_password"
                               type="password"
                               tabindex="2"
                               :placeholder="$t('label.password')" style="width: 94%">
                        <a href="/password/forgotPassword">
                            {{ $t('label.forgot_password') }}
                        </a>
                    </div>
                    <div class="vtp-fh-w16" style="width: 167px">
                        <input id="username" style="width: 94%"
                               name="_username"
                               tabindex="1"
                               type="text"
                               :placeholder="$t('label.username')">
                        <a href="/invitation/new"
                           v-if="invitation.value">
                            {{ $t('label.signup') }}
                        </a>
                    </div>
                </div>
            </form><br/>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "AppHeaderStatus",
        inject: [
            'downloadSize',
            'invitationValue'
        ],
        data() {
            return {
                adminToolBar: {
                    show: false,
                    toggle: () => {
                        this.adminToolBar.show = !this.adminToolBar.show;
                    }
                },
                invitation: {
                    value: this.invitationValue,
                    text: this.invitationValueText,
                    toggle: this.toggle
                }
            }
        },
        computed: {
            ...mapGetters(['isAdmin'])
        },
        methods: {
            invitationValueText() {
                return this.invitation.value ? 'on' : 'off';
            },
            toggle() {
                axios.put(`/invitation/toggle`)
                    .then(({data: {invitation}}) => this.invitation.value = invitation)
                    .catch(err => console.dir(err));
            },
        }
    }
</script>

<style scoped lang="scss">
    .download-size {
        color: #2779aa;
        margin-right: 6px;
    }

    #vtp-header-status {
        display: flex;
        justify-content: flex-end;
    }
</style>