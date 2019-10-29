<template>
    <div class="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-terms-user" class="ui-corner-all">
                <span v-html="terms"></span>
                <div class="vtp-fh-w100" v-if="$store.state.user !== null && !agreeWithTerm">
                    <form action="/user/agreement" method="post" id="user_agreement_form">
                        <input type="checkbox" name="user_agreed_datap" id="user_agreed_datap" style="-webkit-appearance: checkbox;">
                        <span>
                            Ich habe die Nutzungsbedienungen und die
                            <a href="/user/datap" target="_blank">Datenschutzbedienungen</a>
                            gelesen und akzeptiere sie
                        </span>
                        <input type="submit" value="Akzeptieren" name="user_agreed" id="button-user-agreed">
                    </form>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "UserAgreement",
        inject: ['agreeWithTerm','terms']
    }
</script>

<style scoped>

</style>