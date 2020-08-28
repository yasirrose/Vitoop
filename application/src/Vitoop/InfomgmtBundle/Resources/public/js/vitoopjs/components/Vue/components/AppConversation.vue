<template>
    <div id="vtp-content" class="conversation">
        <fieldset class="ui-corner-all margin-top-3" v-if="conversationInstance">
            <resizable-block @resize-stop="resizeContentHeight"
                             :height="conversationHeight"
                             class="conversation__messages ui-corner-all bordered-box vtp-fh-w75">
                <fieldset v-for="(message,index) in conversationInstance.conversation.conversation_data.messages"
                          :key="message.id"
                          class="conversation__message ui-corner-all"
                          :class="{
                            'edit': get('admin')
                      }">
                    <legend>
                        {{ message.user.username }} |
                        {{ moment(message.date.date).format('DD.MM.YYYY') }} |
                        {{ moment(message.date.date).format('kk:mm') }}
                    </legend>
                    <div class="conversation__message__text" v-html="message.message"></div>
                    <div v-if="get('admin') && get('conversationEditMode')" class="conversation__message__edit">
                        <button class="ui-state-default"
                                @click="editMessage(message)">
                            <span class="ui-button-icon-primary ui-icon ui-icon-wrench"></span>
                        </button>
                        <button :title="$t('label.close')"
                                class="ui-state-default"
                                @click="deleteMessage(message.id)">
                            <span class="ui-button-icon-primary ui-icon ui-icon-close"></span>
                        </button>
                    </div>
                </fieldset>
                <div v-if="!conversationInstance.conversation.conversation_data.messages.length">
                    Es gibt keine Nachrichten
                </div>
                <div class="conversation__new-message" :class="{opened: newMessage.opened}">
                    <textarea placeholder="type message..."
                              id="new-message-textarea"
                              v-model="newMessage.message">
                    </textarea>
                    <div style="text-align: right">
                        <button @click="postMessage"
                                class="conversation__save-message ui-corner-all ui-state-default">
                            speichern
                        </button>
                    </div>
                </div>
            </resizable-block>
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
                            :disabled="toggleNewMessageAreaDisabled"
                            :class="{'ui-state-disabled': toggleNewMessageAreaDisabled}"
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
                    <div class="vtp-fh-w100 vtp-new-user-search" v-if="conversationStatus === 'privat'">
                        <div style="vertical-align: top; margin-bottom: 5px">
                            <label><strong>Neuer Benutzer:</strong></label>
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
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import vSelect from "vue-select";
    import Centrifuge from 'centrifuge';
    import SockJS from 'sockjs-client';
    import tinyMCEInitializer from '../../TinyMCEInitializer';
    import ResizableBlock from "./helpers/ResizableBlock.vue";
    import openResourcePopupMixin from "../mixins/openResourcePopupMixin";

    export default {
        name: "AppConversation",
        components: {ResizableBlock, vSelect},
        mixins: [openResourcePopupMixin],
        data() {
            return {
                options: [],
                user: null,
                centrifuge: null,
                moment: window.moment,
                newMessage: {
                    opened: false,
                    message: null,
                    edit: false,
                    id: null
                },
                toggleNewMessageAreaDisabled: false,
                conversationInstance: null,
                conversationHeight: 0,
                resourceIds: [],
                selectedResourceId: null
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
            this.centrifuge = new Centrifuge('https://vitoop.org/connection/sockjs', {
                sockjs: SockJS
            });

            this.getConversation()
                .then(data => {
                    setTimeout(() => {
                        this.openResourcePopup('.conversation__message__text');
                    });
                    this.centrifuge.setToken(data.token);
                    this.centrifuge.subscribe(`${this.conversationInstance.conversation.id}`, ({data}) => {
                        const pushNewMessage = new Promise((resolve,reject) => {
                            this.conversationInstance.conversation.conversation_data.messages.push(data);
                            resolve();
                        });
                        pushNewMessage.then(() => this.scrollToBottom(400));
                    });
                    this.centrifuge.connect();
                    resourceDetail.init();
                    return
                })
                .then(() => {
                    tinyMCE.remove('#new-message-textarea');
                    const tinyMceOptions = new tinyMCEInitializer().getCommonOptions();
                    tinyMceOptions.selector = '#new-message-textarea';
                    tinyMceOptions.height = 150;

                    tinyMceOptions.init_instance_callback = editor => {
                        let resourceId = null;
                        editor.on('ExecCommand', e => {
                            this.addResourceId(e);
                            this.removeResourceId(e);
                        });
                        editor.on('click', e => {
                            this.selectResource(e);
                        });
                    };

                    tinyMCE.init(tinyMceOptions);
                    if (this.get('contentHeight') > 342) {
                        this.conversationHeight = this.get('contentHeight') - 32-25;
                    } else {
                        const appHeaderHeight = document.getElementById('vtp-header').offsetHeight;
                        const appFooterHeight = document.getElementById('vtp-footer').offsetHeight;
                        this.conversationHeight = window.innerHeight - appHeaderHeight - appFooterHeight - 5 - 1 - 32 - 14;
                    }
                })
                .catch(err => console.dir(err));
        },
        methods: {
            selectResource(e) {
                const href = e.target.getAttribute('href');
                this.selectedResourceId = href && /resources\/(\d+)/.test(href) ? href.match(/(\d+)/)[0] : null;
            },
            addResourceId(e) {
                if (/^<a href=/.test(e.value) && /resources\/(\d+)/.test(e.value)) {
                    this.selectedResourceId = e.value.match(/(\d+)/)[0];
                    this.resourceIds.push(this.selectedResourceId);
                }
            },
            removeResourceId(e) {
                if (e.command === 'unlink') {
                    const index = this.resourceIds.indexOf(this.selectedResourceId);
                    if (index > -1) {
                        this.resourceIds.splice(index, 1);
                    }
                }
            },
            editMessage(message) {
                this.newMessage.opened = true;
                this.newMessage.message = message.message;
                this.newMessage.edit = true;
                this.newMessage.id = message.id;
                this.scrollToBottom(400);
                tinyMCE.activeEditor.setContent(message.message);
            },
            deleteMessage(messageID) {
                axios.delete(`/api/v1/conversations/${this.conversationInstance.conversation.id}/messages/${messageID}`)
                    .then(response => {
                        const deletedMessageIndex = _.findIndex(this.conversationInstance.conversation.conversation_data.messages, {id: messageID});
                        document.querySelectorAll('.conversation__message')[deletedMessageIndex].classList.add('delete-animation');
                        setTimeout(() => this.conversationInstance.conversation.conversation_data.messages.splice(deletedMessageIndex, 1),500);
                        tinyMCE.activeEditor.setContent('');
                        this.newMessage.opened = false;
                        this.newMessage.edit = false;
                    })
                    .catch(err => console.dir(err))
            },
            getConversation() {
                return axios(`/api/v1/conversations/${this.$route.params.conversationId}`)
                .then(({data}) => {
                    this.$store.commit('set', {
                        key: 'conversationInstance',
                        value: data
                    });
                    this.conversationInstance = data;

                    this.$store.commit('setResourceOwner', data.isOwner);
                    this.$store.commit('setResourceInfo', data.resourceInfo);
                    this.$store.commit('setResourceId', this.$route.params.conversationId);

                    return data;
                })
                .catch(err => console.dir(err));
            },
            changeRight(rel,e) {
                rel.read_only = JSON.parse(e.target.value);
                const formData = new FormData();
                formData.append('userId', rel.user.id);
                formData.append('read', rel.read_only);
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
                this.toggleNewMessageAreaDisabled = true;
                tinyMCE.activeEditor.setContent('');
                this.newMessage.opened = !this.newMessage.opened;
                this.newMessage.edit = false;
                this.newMessage.opened ? this.scrollToBottom(400) : this.hideNewMessageArea();
            },
            saveAssignments() {
                axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/assignments`, {
                    resourceIds: this.resourceIds
                })
                    .then(response => {
                        this.resourceIds = [];
                        this.getConversation();
                    })
                    .catch(err => console.dir(err));
            },
            postMessage() {
                const formData = new FormData();
                if (!this.newMessage.edit) { // post new message
                    formData.append('message', tinyMCE.get('new-message-textarea').getContent());
                    axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/messages`, formData)
                        .then(({data}) => {
                            this.centrifuge.publish(`${this.conversationInstance.conversation.id}`, data)
                                .then(res => {
                                    this.newMessage.opened = false;
                                    this.hideNewMessageArea(true);
                                    this.openResourcePopup('.conversation__message__text');

                                    this.saveAssignments();
                                })
                                .catch(err => console.dir(err));
                        })
                        .catch(err => console.dir(err))
                } else { // update selected message
                    formData.append('updatedMessage', tinyMCE.get('new-message-textarea').getContent());
                    axios.post(`/api/v1/conversations/${this.conversationInstance.conversation.id}/messages/${this.newMessage.id}`, formData)
                        .then((response) => {
                            const updatedMessageIndex = _.findIndex(this.conversationInstance.conversation.conversation_data.messages, {id: this.newMessage.id});
                            this.conversationInstance.conversation.conversation_data.messages[updatedMessageIndex].message = tinyMCE.get('new-message-textarea').getContent();
                            this.newMessage.edit = false;
                            this.newMessage.opened = false;
                            this.hideNewMessageArea();

                            this.saveAssignments();
                            setTimeout(() => {
                                this.openResourcePopup('.conversation__message__text');
                            })
                        })
                        .catch(err => console.dir(err));
                }
            },
            hideNewMessageArea(afterPublished) {
                const block = document.querySelector('.app-block-resizer');
                const scrollTop = JSON.parse(JSON.stringify(block.scrollTop));
                const newMsgAreaHeight = JSON.parse(JSON.stringify(document.querySelector('.conversation__new-message').clientHeight));
                const lastAddedMsg = document.querySelectorAll('.conversation__message:last-of-type')[0];
                const lastAddedMsgHeight = lastAddedMsg.clientHeight + parseInt(window.getComputedStyle(lastAddedMsg).getPropertyValue('margin-top'));
                const scrollDiff = afterPublished ? newMsgAreaHeight - lastAddedMsgHeight : newMsgAreaHeight;
                setTimeout(() => {
                    const animation = setInterval(() => {
                        if (scrollTop - block.scrollTop >= scrollDiff) {
                            clearInterval(animation);
                            this.toggleNewMessageAreaDisabled = false;
                            VueBus.$emit('perfect-scroll:resize');
                            return
                        }
                        block.scrollTop -= 30;
                    }, 20);
                    this.extraClearInterval(animation);
                }, 400);
            },
            scrollToBottom(timeout) {
                const block = document.querySelector('.app-block-resizer');
                let scrollHeight = 0;
                setTimeout(() => {
                    scrollHeight = block.scrollHeight - block.clientHeight;
                    const animation = setInterval(() => {
                        if (block.scrollTop >= scrollHeight) {
                            clearInterval(animation);
                            this.toggleNewMessageAreaDisabled = false;
                            return
                        }
                        block.scrollTop = block.scrollTop + 30;
                    }, 20);
                    // this.extraClearInterval(animation);
                }, timeout);
            },
            extraClearInterval(animation) {
                setTimeout(() => {
                    clearInterval(animation);
                    this.toggleNewMessageAreaDisabled = false;
                }, 1000);
            }
        }
    }
</script>

<style>
    body {
        user-select: none;
    }

    .vtp-resource-link {
        color: black !important;
    }

    .conversation__message__text a {
        color: #2779aa !important;
    }

    hr {
        border-color: #aed0ea !important;
    }
</style>

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
            opacity: 0;
            height: 0;
            transition: .4s;

            &.opened {
                opacity: 1;
                margin-top: 10px;
                margin-bottom: 1rem;
                height: 267px;
            }
        }

        &__messages {
            width: 77.1%;
            overflow: auto;
            padding-bottom: 0;
            padding-right: 20px;
            position: relative;
            transition: .3s;
        }

        &__info {
            width: 20.4%;
            display: inline-block;
            float: right;
        }

        &__message {
            border-color: #517c95;
            transition: .5s;
            margin-bottom: 1rem;

            &.delete-animation {
                background: #d9ecfa;
                transform: scale(0);
                /*height: 0;*/
            }

            &:not(:first-child) {
                margin-top: 1rem;
            }

            legend {
                color: #517c95;
                font-weight: 600;
                font-size: 12px;
                margin: 0 10px;
            }

            &.edit {
                display: flex;
                position: relative;

                .conversation__message__text {
                    padding-right: 70px;
                }

                .conversation__message__edit {
                    position: absolute;
                    right: 5px;
                    bottom: 5px;
                }
            }

            &__text {
                padding: 0 5px 5px;
            }

            &__edit {

                button {
                    border-radius: 6px;
                }
            }
        }

        &__save-message {
            padding: 5px 10px;
        }
    }
</style>
