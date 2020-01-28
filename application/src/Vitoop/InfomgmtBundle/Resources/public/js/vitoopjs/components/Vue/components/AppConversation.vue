<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div class="ui-corner-all bordered-box vtp-fh-w75">

            </div>
            <div v-if="conversation" class="ui-corner-all bordered-box vtp-fh-w20">
                <p>
                    Erstellt von: <span>{{ conversation.user.username }}</span>
                </p>
                <p>
                    Erstellt am:
                    <span>{{ moment(conversation.created).format('DD.MM.YYYY') }}</span>
                </p>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "AppConversation",
        data() {
            return {
                moment: window.moment,
                conversation: null
            }
        },
        mounted() {
            axios(`/api/v1/conversations/${this.$route.params.conversationId}`)
            .then(({data}) => {
                this.conversation = data.conversation;
            })
        }
    }
</script>

<style scoped lang="scss">
    .bordered-box {
        vertical-align: top;
    }
</style>
