<template>
    <div id="vtp-header-status">
        <transition name="fade">
            <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all" v-if="infoMsgShow">
                <span class="vtp-icon ui-icon ui-icon-info"></span><span>{{ infoMsg }}</span>
            </div>
        </transition>
        <div v-if="isAdmin && adminToolBar.show">
            <span class="vtp-admin-toolbar download-size">
                {{ $t('label.download.size') }}:
                {{ downloadSize }}
                {{ $t('label.download.mb') }}
            </span>
            <button for="vtp-tgl-flag"
                    @click="refreshWithFlagged"
                    :class="{'ui-state-active': getFlagged}"
                    class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
                    title="Flags bearbeiten">
                <span class="ui-button-icon-primary ui-icon ui-icon-flag"></span>
                <span class="ui-button-text">Flags bearbeiten</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    @click="showTerms"
                    id="button-terms-admin">
                <span class="ui-button-text">{{ $t('label.terms') }}</span>
            </button>
            <button class="vtp-button vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-text-only"
                    @click="showDataP"
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
               @click.prevent="$router.push('/invite')"
               :title="$t('invitations.send')">
                <span class="ui-button-icon-primary ui-icon ui-icon-mail-closed"></span>
                <span class="ui-button-icon-secondary ui-icon ui-icon-pencil"></span>
            </a>
            <a class="vtp-button vtp-uiaction-goto-edithome vtp-admin-toolbar ui-widget ui-state-default ui-corner-all ui-button-icons-only"
               @click.prevent="$router.push('/edit-vitoop-blog')"
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
                        :title="$t('label.remove_tooltip')">
                    <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                </button>
                <select id="user-projects" class="ui-autocomplete-input">
                    <option default>Wähle ein Projekt...</option>
                    <option v-for="(project,index) in myProjects"
                            :key="`${index}-${project.id}`"
                            :value="project.id">
                        {{ project.name }}
                    </option>
                </select>
                <button class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        id="button-checking-links"
                        :title="$t('label.open_tooltip')">
                    <span class="ui-button-text">{{ $t('label.open') }}</span>
                </button>
                <button class="vtp-button ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only"
                        id="button-checking-links-send"
                        :title="$t('label.send_tooltip')">
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
            <button @click.prevent="$router.push('/user/settings')"
               id="vtp-user-userdata"
               class="vtp-button ui-widget ui-state-default ui-corner-all ui-button-icon-only"
               title="Einstellungen">
                <i class="fas fa-bars"></i>
                <span class="ui-button-text"></span>
            </button>
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
                        <input id="header_password"
                               name="_password"
                               type="password"
                               tabindex="2"
                               :placeholder="$t('label.password')" style="width: 94%">
                        <a @click="$router.push('/password/forgotPassword')">
                            {{ $t('label.forgot_password') }}
                        </a>
                    </div>
                    <div class="vtp-fh-w16" style="width: 167px">
                        <input id="header_username" style="width: 94%"
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
    import SendLinkWidget from '../../../widgets/sendLinkWidget'

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
                },
                myProjects: [],
                selectedProject: null,
                infoMsgShow: false,
                infoMsg: ''
            }
        },
        computed: {
            ...mapGetters(['isAdmin', 'getFlagged'])
        },
        mounted() {
            this.sendLinkWidget = new SendLinkWidget();
            this.sendLinkWidget.checkOpenButtonState();

            $('#button-checking-links-remove').off().on('click', (e) => {
                this.sendLinkWidget.clear();
                e.stopPropagation();
                return false;
            });
            $('#vtp-header-toggle-flag input[type=checkbox]').button({
                icons: {
                    primary: "ui-icon-flag"
                },
                text: false
            });
            $('#button-checking-links').off().on('click', (e) => {
                let resourcesCount = this.sendLinkWidget.linkStorage.getAllResourcesSize();

                if (resourcesCount >= 10 && vitoop.isCheckMaxLinks) {
                    $('#vtp-res-dialog-prompt-links').dialog({
                        autoOpen: false,
                        width: 500,
                        modal: true,
                        position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                        buttons: {
                            "Abbrechen": () => {
                                $('#vtp-res-dialog-prompt-links').dialog("close");
                                return;
                            },
                            "Öffnen": () => {
                                this.sendLinkWidget.openAllLinks();
                                $$('#vtp-res-dialog-prompt-links').dialog("close");
                                return;
                            }
                        }
                    });
                    $('#vtp-res-dialog-prompt-links').dialog('open');
                    $('#vtp-res-dialog-prompt-links').html("<p>Bist Du sicher, dass Du " + resourcesCount + " Tabs auf einmal öffen willst?</p>"+
                        "<p><input type='checkbox' class='valid-checkbox' id='vtp-is-check-max-link' value='0' /> nicht nochmal fragen</p>");

                    $('#vtp-is-check-max-link').on('change', () => {
                        $.ajax({
                            method: "PATCH",
                            url: vitoop.baseUrl + "api/user/me",
                            data:JSON.stringify({
                                is_check_max_link: !$('#vtp-is-check-max-link').prop('checked')
                            }),
                            dataType: 'json',
                            success: function(data) {
                                vitoop.isCheckMaxLinks = data.is_check_max_link;
                            }
                        });
                    });

                } else {
                    this.sendLinkWidget.openAllLinks();
                }

                e.stopPropagation();
                return false;
            });
            $('#button-checking-links-send').off().on('click', (e) => {
                $('#vtp-res-dialog-links').dialog({
                    autoOpen: false,
                    width: 720,
                    modal: true,
                    position: { my: 'center top', at: 'center top', of: '#vtp-nav' },
                });
                $('#vtp-res-dialog-links').dialog('open');
                this.sendLinkWidget.getFormFromServer(document.getElementById('sendlink-url').value);

                e.stopPropagation();
                return false;
            });

            if (this.$store.state.user) {
                this.GETMyProjects();
            }

            VueBus.$on('update:my-projects', () => {
                $('#user-projects').selectmenu('destroy');
                this.GETMyProjects();
            });
        },
        methods: {
            GETMyProjects() {
                axios(`/api/v1/my-projects`)
                    .then(({data}) => {
                        this.myProjects = data;
                        $('#user-projects').selectmenu({
                            select: (e, {item}) => {
                                const resourceIds = this.sendLinkWidget.linkStorage.getAllResourcesIds();
                                axios.post(`/api/v1/projects/${item.value}/assignments`, {resourceIds})
                                    .then(response => {
                                        this.infoMsg = `Resources have been added to the project #${item.value}`;
                                        this.infoMsgShow = true;
                                        setTimeout(() => {
                                            this.infoMsg = ``;
                                            this.infoMsgShow = false;
                                        }, 4000);
                                        this.sendLinkWidget.linkStorage.clearAllResources();
                                        VueBus.$emit('datatable:reload');
                                    })
                                    .catch(err => console.dir(err));
                            }
                        });
                    })
                    .catch(err => console.dir(err));
            },
            showTerms() {
                $('#vtp-res-dialog-terms').dialog('open');
                setTimeout(function() {
                    tinymce.execCommand('mceFocus',false,'tiny-terms');
                },400);
            },
            showDataP() {
                $('#vtp-res-dialog-datap').dialog('open');
                setTimeout(function() {
                    tinymce.execCommand('mceFocus',false,'tiny-datap');
                },400);
            },
            invitationValueText() {
                return this.invitation.value ? 'on' : 'off';
            },
            toggle() {
                axios.put(`/invitation/toggle`)
                    .then(({data: {invitation}}) => this.invitation.value = invitation)
                    .catch(err => console.dir(err));
            },
            refreshWithFlagged() {
                this.$store.commit('setFlagged', !this.getFlagged);
                vitoopApp.vtpDatatable.refreshTable();
            }
        }
    }
</script>

<style scoped lang="scss">
    .download-size {
        color: #2779aa;
        margin-right: 6px;
    }

    #user-projects {
        width: auto;
        min-width: 150px;
    }

    #vtp-header-status {
        display: flex;
        justify-content: flex-end;
        padding-top: 3px;
    }

    .fade {

        &-enter {
            opacity: 0;

            &-to {
                opacity: 1;
            }

            &-active {
                transition: 2s;
            }
        }

        &-leave {
            opacity: 1;

            &-to {
                opacity: 0;
            }

            &-active {
                transition: 2s;
            }
        }
    }
</style>
