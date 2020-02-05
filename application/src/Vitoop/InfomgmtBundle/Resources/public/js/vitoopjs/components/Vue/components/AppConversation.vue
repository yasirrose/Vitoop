<template>
    <div id="vtp-content" class="conversation">
        <fieldset class="ui-corner-all margin-top-3" v-if="conversationInstance">
            <div class="conversation__messages ui-corner-all bordered-box vtp-fh-w75"
                 ref="messagesWrapper">
                <fieldset v-for="(message,index) in conversationInstance.conversation.conversation_data.messages"
                          class="conversation__message ui-corner-all"
                          :class="{'mb-0': index === conversationInstance.conversation.conversation_data.messages.length-1}">
                    <legend>
                        {{ message.user.username }} |
                        {{ moment(message.date.date).format('DD.MM.YYYY') }} |
                        {{ moment(message.date.date).format('kk:mm') }}
                    </legend>
                    <div class="conversation__message__text" v-html="message.message"></div>
                </fieldset>
                <div v-if="!conversationInstance.conversation.conversation_data.messages.length"
                     style="padding: 10px 0">
                    Es gibt keine Nachrichten
                </div>
                <div class="conversation__new-message" :class="{opened: newMessageArea.opened}">
                    <textarea placeholder="type message..."
                              id="new-message-textarea"
                              v-model="newMessageArea.message"></textarea>
                    <div style="text-align: right">
                        <button @click="postMessage"
                                class="conversation__save-message ui-corner-all ui-state-default">
                            speichern
                        </button>
                    </div>
                </div>
            </div>
            <div class="conversation__info">
                <div class="ui-corner-all bordered-box">
                    <div class="d-flex" style="margin-bottom: 5px">
                        <span class="w-50">Erstellt von:</span>
                        <span class="w-50 text-right">{{ conversationInstance.conversation.user.username }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 5px">
                        <span class="w-50">Erstellt am:</span>
                        <span class="w-50 text-right">{{ moment(conversationInstance.conversation.created).format('DD.MM.YYYY') }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 5px">
                        <span class="w-50">Status:</span>
                        <span class="w-50 text-right">{{ conversationStatus }}</span>
                    </div>
                    <button class="ui-corner-all ui-state-default"
                            @click="toggleNewMessageArea"
                            style="
                                margin-top: 10px;
                                padding-bottom: 5px;
                                padding-top: 5px;
                                width: 100%;">
                        antworten
                    </button>
                </div>
                <div class="ui-corner-all bordered-box"
                     v-if="!get('conversationEditMode') && conversationInstance.conversation.conversation_data.rel_users.length">
                    <h3>Benutzer</h3>
                    <div v-for="rel_user in conversationInstance.conversation.conversation_data.rel_users">
                        {{ rel_user.user.username }}
                    </div>
                </div>

                <div v-if="get('conversationEditMode')"
                     class="ui-corner-all bordered-box"
                     style="overflow: visible">
                    <div v-if="conversationInstance.conversation.conversation_data.rel_users.length">
                        <div class="prj-edit-header">
                            <div class="vtp-fh-w60">
                                <span><strong>Benutzer</strong></span>
                            </div>
                            <div class="vtp-fh-w35">
                                <span><strong>Rechte</strong></span>
                            </div>
                        </div>
                        <div style="margin-bottom: 15px">
                            <div v-for="rel in conversationInstance.conversation.conversation_data.rel_users">
                                <div class="vtp-fh-w60">
                                    <label :for="`userReadOnly-${rel.user.id}`"
                                           style="margin-right: 20px">{{ rel.user.username }}</label>
                                </div>
                                <div class="vtp-fh-w35" style="text-align: left">
                                    <input type="checkbox"
                                           :value="!rel.read_only"
                                           :checked="!rel.read_only"
                                           @change="changeRight(rel,$event)"
                                           :name="`userReadOnly-${rel.user.id}`"
                                           class="valid-checkbox" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="vtp-fh-w100 vtp-new-user-search">
                        <div style="vertical-align: top; margin-bottom: 5px">
                            <label for="newUser"><strong>Neuer Benutzer:</strong></label>
                        </div>
                        <v-select :options="options"
                                  ref="v_select"
                                  label="username"
                                  @input="selectUser"
                                  @search="searchUser"/>
                        <button @click="addUser()"
                                :disabled="this.user === null"
                                :title="UserButtonTitle"
                                class="ui-corner-all vtp-fh-w60 ui-state-default vtp-button">
                            verknüpfen
                        </button>
                        <button @click="removeUser()"
                                :disabled="!canRemoveUser"
                                :title="UserButtonTitle"
                                class="ui-corner-all vtp-fh-w40 ui-state-default vtp-button"
                                style="float: right">
                            löschen
                        </button>
                    </div>
<!--                    <span v-if="isError"-->
<!--                          id="error-span"-->
<!--                          class="form-error">-->
<!--                                    Vitoooops!: <span ng-bind="message"></span>-->
<!--                                </span>-->
<!--                    <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"-->
<!--                         v-if="isSuccess" style="transition: 0s linear all;">-->
<!--                        <span class="vtp-icon ui-icon ui-icon-info"></span>-->
<!--                        <span>{{ message }}</span>-->
<!--                    </div>-->
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import vSelect from "vue-select";
    import Centrifuge from 'centrifuge'
    import SockJS from 'sockjs-client'
    import tinyMCEInitializer from '../../TinyMCEInitializer'

    export default {
        name: "AppConversation",
        components: {vSelect},
        data() {
            return {
                options: [],
                user: null,

                centrifuge: null,
                moment: window.moment,
                newMessageArea: {
                    opened: false,
                    message: null
                },
                conversationInstance: null
            }
        },
        computed: {
            ...mapGetters(['get','getResource']),
            conversationStatus() {
                return this.conversationInstance.conversation.conversation_data.is_for_related_users ? 'privat' : 'public';
            },
            UserButtonTitle() {
                return this.user === null ? 'Benutzer auswählen' : null
            },
            canRemoveUser() {
                return this.user !== null && (this.get('admin') || this.conversationInstance.isOwner);
            }
        },
        mounted() {
            this.centrifuge = new Centrifuge('https://centrifugal.vitoop.de:8000/connection/sockjs', {
                sockjs: SockJS
            });

            this.getConversation()
                .then(data => {
                    this.centrifuge.setToken(data.token);
                    this.centrifuge.subscribe(`${this.conversationInstance.conversation.id}`, ({data}) => {
                        const pushNewMessage = new Promise((resolve,reject) => {
                            this.conversationInstance.conversation.conversation_data.messages.push(data);
                            resolve();
                        });
                        pushNewMessage.then(() => this.scrollToBottom());
                    });
                    this.centrifuge.connect();
                    return
                })
                .then(() => {
                    this.scrollToBottom();
                    tinyMCE.remove('#new-message-textarea');
                    const tinyMceOptions = new tinyMCEInitializer().getCommonOptions();
                    tinyMceOptions.selector = '#new-message-textarea';
                    tinyMceOptions.height = 150;
                    tinyMceOptions.init_instance_callback = editor => {
                        editor.on('keyup', e => {
                            this.newMessageArea.message = e.target.innerHTML;
                        });
                    };
                    tinyMCE.init(tinyMceOptions);
                })
                .catch(err => console.dir(err));
        },
        methods: {
            getConversation() {
                return axios(`/api/v1/conversations/${this.$route.params.conversationId}`)
                .then(({data}) => {
                    this.$store.commit('set', {
                        key: 'conversationInstance',
                        value: data
                    });
                    this.conversationInstance = data;
                    return data;
                })
                .catch(err => console.dir(err));
            },
            changeRight(rel,e) {
                rel.read_only = JSON.parse(e.target.value);
                const formData = new FormData();
                formData.append('userId', rel.user.id);
                formData.append('read_only', rel.read_only);
                axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/read`, formData)
                    .then(response => {

                    })
                    .catch(err => console.dir(err));
            },
            selectUser(user) {
                this.user = user;
            },
            searchUser(search) {
                // toDo Waiting for back-end
                const formData = new FormData();
                formData.append('symbol', search);
                axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/user/find`, formData)
                    .then(({data}) => {
                        this.options = data;
                    })
                    .catch(err => console.dir(err));
            },
            addUser() {
                const formData = new FormData();
                formData.append("userId", this.user.id);
                formData.append("username", this.user.username);
                axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/user`, formData)
                    .then(({data}) => {
                        this.getConversation();
                    })
                    .catch(err => console.dir(err));
            },
            removeUser() {
                axios.delete(`/api/v1/conversations/${this.conversationInstance.conversation.id}/user/${this.user.id}`)
                    .then(({data}) => {
                        this.getConversation();
                    })
                    .catch(err => console.dir(err));
            },
            toggleNewMessageArea() {
                this.newMessageArea.opened = !this.newMessageArea.opened;
                setTimeout(() => {
                    this.scrollToBottom();
                }, 400);
            },
            postMessage() {
                const formData = new FormData();
                formData.append('message', this.newMessageArea.message);
                axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/messages`, formData)
                    .then(({data}) => {
                        this.newMessageArea.opened = false;
                        this.centrifuge.publish(`${this.conversationInstance.conversation.id}`, data)
                            .then(res => {
                                console.log('successfully published',res);
                            })
                            .catch(err => console.dir(err));
                    })
                    .catch(err => console.dir(err))
            },
            scrollToBottom() {
                // const lastMsgElement = document.querySelector('.conversation__message:last-child');
                // if (lastMsgElement) lastMsgElement.scrollIntoView(false);
                document.querySelector('.conversation__new-message').scrollIntoView(false);
            }
        }
    }
</script>

<style scoped lang="scss">

    .dropdown {
        margin-bottom: 5px;
    }

    .prj-edit-header {
        margin-bottom: 15px;
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

    .bordered-box {
        vertical-align: top;
    }

    .conversation {
        color: #2779aa;

        &::v-deep {

            .mce-tinymce {
                margin-bottom: 10px;
            }

            .conversation__message {

                p {
                    margin: 0;
                }
            }
        }

        &__new-message {
            overflow: hidden;
            height: 0;
            transition: .4s;

            &.opened {
                /*height: auto;*/
                height: 265px;
            }
        }

        &__messages {
            width: 76%;
            max-height: 70vh;
            overflow: auto;
            padding-bottom: 1.1rem;
        }

        &__info {
            width: 22%;
            display: inline-block;
            float: right;
        }

        &__message {
            border-color: #517c95;

            &:not(:first-child) {
                margin-top: 1rem;
            }

            legend {
                color: #517c95;
                font-weight: 600;
                font-size: 12px;
                margin: 0 10px;
            }

            &__text {
                padding: 0 5px 5px;
            }
        }

        &__save-message {
            padding: 5px 10px;
        }
    }
</style>
