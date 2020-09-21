<template>
    <fieldset class="ui-corner-all">
        <legend>Einladung</legend>
        <div id="vtp-invite-container">
            <div v-if="!success" style="width: 100%">
                <div class="vtp-fh-middle">
                    <label class="vtp-fh-w90 required"
                           for="invitation_new_email">
                        Kostenlos registrieren
                    </label>
                </div>
                <div class="vtp-fh-middle">
                    <input type="text"
                           id="invitation_new_email"
                           v-model="$v.email.$model"
                           placeholder="bitte mail-Adresse eingeben"
                           class="vtp-fh-w100" />
                    <div class="vtp-uiinfo-form-error" v-if="$v.email.$error">
                        <div v-if="!$v.email.required">{{ $t('required', {field: 'email'}) }}</div>
                        <div v-if="!$v.email.email">{{ $t('invalid', {field: 'email'}) }}</div>
                    </div>
                </div>
                <div class="vtp-fh-right">
                    <button class="vtp-uiinfo-anchor ui-button ui-widget ui-state-default"
                            :class="{'ui-button-disabled ui-state-disabled': $v.$invalid}"
                            :disabled="$v.$invalid"
                            @click="sendInvite">
                        Senden
                    </button>
                </div>
            </div>
            <div v-else>
                {{ success_msg }}
            </div>
        </div>
    </fieldset>
</template>

<script>
    import { required, email } from 'vuelidate/lib/validators'

    export default {
        name: "UserInvitation",
        data() {
            return {
                email: '',
                success: false,
                success_msg: 'Es wurde eine Einladungsmail an die eingetragene Adresse geschickt.'
            }
        },
        validations: {
            email: {
                required,
                email
            }
        },
        methods: {
            sendInvite() {
                let formData = new FormData();
                formData.append('invitation_new[email]', this.$v.email.$model);
                axios.post('/invitation/new', formData)
                    .then((response) => {
                        this.$v.email.$model = '';
                        this.success = true;
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped lang="scss">
    #vtp-invite-container {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .ui-button {
        padding: 0 1em;
        height: 24px;
        border-radius: 6px;
    }
</style>