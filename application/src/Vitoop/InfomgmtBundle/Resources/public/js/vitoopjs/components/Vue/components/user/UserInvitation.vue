<template>
    <fieldset class="ui-corner-all">
        <legend>Einladung</legend>
        <div id="vtp-invite-container">
<!--            {{ form_errors(fv) }}-->
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w90 required"
                       for="invitation_new_email">
                    Kostenlos registrieren
                </label>
            </div>
            <div class="vtp-fh-middle">
                <input type="text"
                       id="invitation_new_email"
                       v-model="email"
                       placeholder="bitte mail-Adresse eingeben"
                       class="vtp-fh-w100" />
<!--                <div class="vtp-uiinfo-form-error">{{ form_errors(fv.email) }}</div>-->
            </div>
            <div class="vtp-fh-right">
                <button class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default"
                        @click="sendInvite">
                    Senden
                </button>
            </div>
            <div class="vtp-fh-bottom" v-if="success">
                {{ success_msg }}
            </div>
        </div>
    </fieldset>
</template>

<script>
    export default {
        name: "UserInvitation",
        data() {
            return {
                email: '',
                success: false,
                success_msg: 'Es wurde eine Einladungsmail an die eingetragene Adresse geschickt.'
            }
        },
        methods: {
            sendInvite() {
                // invitation_new[email]
                let formData = new FormData();
                formData.append('invitation_new[email]', this.email);
                axios.post('/invitation/new', formData)
                    .then((response) => {
                        console.log(response);
                        // this.email = '';
                        this.success = true;
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped lang="scss">
    .ui-button {
        padding: 0 1em;
        height: 24px;
        border-radius: 6px;
    }
</style>