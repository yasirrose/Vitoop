<template>
    <div>
        <form id="vtp-form-data" v-if="get('conversation')">

            <fieldset class="ui-corner-all">
                <legend>Rating</legend>
                <div id="vtp-rating-slider">
                    <div id="vtp-rating-slider-container">
                        <div id="vtp-rating-slider-slider"></div>
                    </div>
                    <div class="vtp-uiinfo-form-error"></div>
                </div>
            </fieldset>

            <fieldset class="ui-corner-all">
                <legend>Nachricht</legend>
                <div class="vtp-fh-top">
                    <label class="vtp-fh-w20 required" for="conversation_name">Titel:</label>
                    <input type="text"
                           :value="get('conversation').name"
                           id="conversation_name"
                           maxlength="160"
                           class="vtp-fh-w80 vtp-right">
                    <div class="vtp-uiinfo-form-error"></div>
                </div>
                <div class="flex">
                    <label class="required" style="width: 22%">Status:</label>
                    <select id="conversation_status" v-model="status">
                        <option value="public">öffentlich</option>
                        <option value="privat">privat</option>
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
                              rows="10">{{ get('conversation').conversation_data.messages[0] }}
                    </textarea>
                    <div class="vtp-uiinfo-form-error"></div>
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
            }
        }
    }
</script>

<style lang="scss">
    #resource-buttons {
        font-size: 0;
    }
</style>

<style scoped lang="scss">
    .flex {
        display: flex;
    }

    .w-100 {
        width: 100%;
    }

    #conversation_status {
        padding: 0 5px;
        width: 100px;
        background-color: #62bbe9;
        color: white;
    }
</style>
