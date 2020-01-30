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
                <div class="ui-corner-all bordered-box">
                    <h3>Benutzer</h3>
                    <div v-for="rel_user in conversation.conversation_data.rel_users">
                        {{ rel_user.user.username }}
                    </div>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import Centrifuge from 'centrifuge'
    import SockJS from 'sockjs-client'
    import tinyMCEInitializer from '../../TinyMCEInitializer'

    export default {
        name: "AppConversation",
        data() {
            return {
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
                        console.log(data);
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
            toggleNewMessageArea() {
                this.newMessageArea.opened = !this.newMessageArea.opened;
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
                lastMsgElement.scrollIntoView(false);
            }
        }
    }
</script>

<style scoped lang="scss">
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
