<template>
    <div id="vtp-content" class="conversation">
        <fieldset class="ui-corner-all margin-top-3" v-if="conversation">
            <div class="conversation__messages ui-corner-all bordered-box vtp-fh-w75"
                 ref="messagesWrapper">
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
                <fieldset v-for="message in conversation.conversation_data.messages"
                          class="conversation__message ui-corner-all">
                    <legend>
                        {{ message.user.username }} |
                        {{ moment(message.date.date).format('DD MM YYYY') }} |
                        {{ moment(message.date.date).format('hh:mm') }}
                    </legend>
                    <div class="conversation__message__text" v-html="message.message"></div>
                </fieldset>
                <div v-if="!conversation.conversation_data.messages.length">
                    Es gibt keine Nachrichten
                </div>
            </div>
            <div class="conversation__info">
                <div class="ui-corner-all bordered-box">
                    <div class="d-flex" style="margin-bottom: 5px">
                        <span class="w-50">Erstellt von:</span>
                        <span class="w-50 text-right">{{ conversation.user.username }}</span>
                    </div>
                    <div class="d-flex" style="margin-bottom: 5px">
                        <span class="w-50">Erstellt am:</span>
                        <span class="w-50 text-right">{{ moment(conversation.created).format('DD.MM.YYYY') }}</span>
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
                     v-if="!get('conversationEditMode') && conversation.conversation_data.rel_users.length">
                    <h3>Benutzer</h3>
                    <div v-for="rel_user in conversation.conversation_data.rel_users">
                        {{ rel_user.user.username }}
                    </div>
                </div>

                <div v-if="get('conversationEditMode')"
                     class="ui-corner-all bordered-box"
                     style="overflow: visible">
                    <div class="prj-edit-header">
                        <div class="vtp-fh-w60">
                            <span><strong>Benutzer</strong></span>
                        </div>
                        <div class="vtp-fh-w35">
                            <span><strong>Rechte</strong></span>
                        </div>
                    </div>
                    <div v-for="rel in conversation.conversation_data.rel_users">
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
                                class="ui-corner-all vtp-fh-w60 ui-state-default vtp-button">verknüpfen</button>
                        <button @click="removeUser()"
                                class="ui-corner-all vtp-fh-w40 ui-state-default vtp-button" style="float: right">löschen</button>
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
                conversation: null
            }
        },
        computed: {
            ...mapGetters(['get','getResource']),
            conversationStatus() {
                return this.conversation.conversation_data.is_for_related_users ? 'privat' : 'public';
            }
        },
        mounted() {
            this.centrifuge = new Centrifuge('https://centrifugal.vitoop.de:8000/connection/sockjs', {
                sockjs: SockJS
            });

            axios(`/api/v1/conversations/${this.$route.params.conversationId}`)
                .then(({data}) => {
                    this.$store.commit('set', {
                        key: 'conversation',
                        value: data.conversation
                    });

                    this.centrifuge.setToken(data.token);
                    this.conversation = data.conversation;

                    this.centrifuge.subscribe(`${this.conversation.id}`, ({data}) => {
                        const pushNewMessage = new Promise((resolve,reject) => {
                            this.conversation.conversation_data.messages.push(data);
                            resolve();
                        });
                        pushNewMessage.then(() => this.scrollToLastMessage());
                    });
                    this.centrifuge.connect();
                    return
                })
                .then(() => {
                    this.scrollToLastMessage();
                    tinyMCE.remove('#new-message-textarea');
                    const tinyMceOptions = new tinyMCEInitializer().getCommonOptions();
                    tinyMceOptions.selector = '#new-message-textarea';
                    tinyMceOptions.height = 150;
                    tinyMceOptions.toolbar = 'styleselect | bold italic underline | indent outdent | bullist numlist | forecolor backcolor';
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

            changeRight(rel,e) {
                rel.read_only = JSON.parse(e.target.value);
            },
            selectUser(user) {
                this.user.userId = user.id;
                this.user.username = user.username;
            },
            searchUser(search) {
                // toDo Waiting for back-end
                // axios(`/api/project/${this.getResource('id')}/user/find?s=${search}`)
                //     .then(({data}) => {
                //         this.options = data;
                //     })
                //     .catch(err => console.dir(err));
            },
            addUser() {
                axios.post(`/api/v1/conversations/${this.conversation.id}/user`, {
                    userId: 87,
                    username: 'test3'
                })
                    .then(response => {
                        console.log(response)
                        // this.getProjectData();
                    })
                    .catch(err => console.dir(err));
            },
            removeUser() {
                axios.delete(`/api/v1/conversations/${this.conversation.id}/user/${this.user.userId}`)
                    .then(response => {
                        console.log(response);
                        // this.getProjectData();
                    })
                    .catch(err => console.dir(err));
            },

            toggleNewMessageArea() {
                this.newMessageArea.opened = !this.newMessageArea.opened;
                if (this.newMessageArea.opened) {
                    document.querySelector('.conversation__messages').scrollTop = 0;
                }
            },
            postMessage() {
                const formData = new FormData();
                formData.append('message', this.newMessageArea.message);
                axios.post(`/api/v1/conversations/${this.conversation.id}/messages`, formData)
                    .then(({data}) => {
                        this.newMessageArea.opened = false;
                        this.centrifuge.publish(`${this.conversation.id}`, data)
                            .then(res => {
                                console.log('successfully published',res);
                            })
                            .catch(err => console.dir(err));
                    })
                    .catch(err => console.dir(err))
            },
            scrollToLastMessage() {
                const lastMsgElement = document.querySelector('.conversation__message:last-child');
                if (lastMsgElement) lastMsgElement.scrollIntoView(false);
            }
        }
    }
</script>

<style scoped lang="scss">

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

            &:not(:last-child) {
                margin-bottom: 1rem;
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
