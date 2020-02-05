<template>
    <div>
        <form id="vtp-form-data" v-if="get('conversationInstance')">
            <fieldset class="ui-corner-all">
                <legend>Nachricht</legend>
                <div class="vtp-fh-top">
                    <label class="vtp-fh-w20 required" for="conversation_name">Titel:</label>
                    <input type="text"
                           :value="get('conversationInstance').conversation.name"
                           id="conversation_name"
                           maxlength="160"
                           class="vtp-fh-w80 vtp-right">
                    <div class="vtp-uiinfo-form-error"></div>
                </div>
                <div class="flex">
                    <label class="required" style="width: 22%">Status:</label>
                    <select id="conversation_status">
                        <option value="false"
                                :selected="!get('conversationInstance').conversation.conversation_data.is_for_related_users">
                            öffentlich
                        </option>
                        <option value="true"
                                :selected="get('conversationInstance').conversation.conversation_data.is_for_related_users">
                            privat
                        </option>
                    </select>
                </div>
                <div class="vtp-fh-middle flex w-100">
                    <label class="vtp-fh-w20 required"
                           style="width: 21%"
                           for="conversation_first-msg">Erste Nachricht:</label>
                    <textarea id="conversation_first-msg"
                              name="prj[description]"
                              required="required"
                              class="vtp-fh-w80 vtp-right"
                              style="height: 115px"
                              rows="10">{{ get('conversationInstance').conversation.conversation_data.messages[0] }}
                    </textarea>
                    <div class="vtp-uiinfo-form-error"></div>
                </div>
                <div style="text-align: right">
                    <input type="submit"
                           @click="saveConversation"
                           class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default ui-corner-all"
                           value="speichern"
                           role="button">
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        name: "ConversationQuickview",
        computed: {
            ...mapGetters(['get'])
        },
        data() {
            return {
                status: null
            }
        },
        methods: {
            changeStatus(status) {
                console.log(status);
            },
            saveConversation() {
                console.log('save');
            }
        }
    }
</script>

<style lang="scss">
    #resource-buttons {
        font-size: 0;
    }

    #resource-quickview {
        span.ui-selectmenu-button {
            width: 100px !important;
            margin-bottom: 0 !important;
        }
    }
</style>

<style scoped lang="scss">
    .flex {
        display: flex;
    }

    .w-100 {
        width: 100%;
    }

    /*#conversation_status {*/
    /*    padding: 0 5px;*/
    /*    width: 100px;*/
    /*    background-color: #62bbe9;*/
    /*    color: white;*/
    /*}*/
</style>
