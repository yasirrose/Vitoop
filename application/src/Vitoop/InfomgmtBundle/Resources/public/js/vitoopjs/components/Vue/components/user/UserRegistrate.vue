<template>
    <fieldset class="ui-corner-all">
        <legend>Registrierung</legend>
        <div id="vtp-register" v-if="!secret_expired">
            <div class="vtp-fh-top">
                <label class="vtp-fh-w20 required" for="user_username">Username</label>
                <input type="text"
                       v-model="name"
                       id="user_username"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_email">eMail</label>
                <input type="text"
                       v-model="email"
                       id="user_email"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_password_first">Passwort</label>
                <input type="password"
                       v-model="password"
                       id="user_password_first"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error"></div>
            </div>
            <div class="vtp-fh-bottom">
                <label class="vtp-fh-w20 required" for="user_password_second">Passwort wiederholen</label>
                <input type="password"
                       v-model="repeat_password"
                       id="user_password_second"
                       class="vtp-fh-w30">
            </div>
            <div class="vtp-fh-middle">
                <input type="checkbox"
                       v-model="registration_approve"
                       id="user_registration_approve"
                       tabindex="20" style="-webkit-appearance: checkbox; margin-left: 0px">
                <label for="user_registration_approve">
                    Ich habe die
                    <a href="/user/agreement" target="_blank">Nutzungsbedienungen</a>
                    und die
                    <a href="/user/datap" target="_blank">Datenschutzbedienungen</a>
                    gelesen und akzeptiere sie.
                </label>
                <div class="right">
                    <button class="ui-button ui-widget ui-state-default ui-corner-all"
                            :class="{'ui-button-disabled ui-state-disabled': !registration_approve}"
                            :disabled="!registration_approve"
                            @click="registrate">
                        Registrieren
                    </button>
                </div>
            </div>
            <div>
                <h1>So klappt's mit der Registrierung:</h1>
                <p>Dein Username sollte mindestens 5 Zeichen, höchstens jedoch 14 Zeichen haben.</p>
                <p>Im Usernamen erlaubt sind alle Sonderzeichen (siehe unten), das Leerzeichen und alle Klein- und Großbuchstaben, Ziffern, Umlaute und das scharfe s.</p>
                <p>Deine eMail-Adresse ist für andere User nicht sichtbar.</p>
                <p>Dein Passwort sollte mindestens 8, höchstens jedoch 32 Zeichen haben. Erlaubt sind alle Zeichen wie beim Usernamen, jedoch ohne das Leerzeichen.</p>
                <p>Ferner sollte das Passwort nicht nur aus Kleinbuchstaben, nur aus Großbuchstaben oder nur aus Zahlen bestehen. Bitte mische mindestens zwei davon und wenn Du willst gerne ein oder auch mehrere Sonderzeichen dazu.</p>
                <p>Erlaubte Sonderzeichen: !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~</p>
                <p>Es besteht keine Klarnamen-Pflicht</p>
            </div>
        </div>
        <div v-else>Deine Einladung ist leider abgelaufen. Sende ein Antwort auf Deine Einladungsmail um eine neue zu erhalten.</div>
    </fieldset>
</template>

<script>
    export default {
        name: "UserRegistrate",
        data() {
            return {
                name: null,
                email: null,
                password: null,
                repeat_password: null,
                registration_approve: false,

                secret_expired: false
            }
        },
        computed: {
            // validation: {
                // username: {
                //     required,
                //     minLength(5)
                // },
                // password: {
                //     required,
                //     minlength(8)
                // }
            // }
        },
        mounted() {
            axios(`/register/${this.$route.params.secret}`)
                .then((response) => {
                    debugger
                })
                .catch(err => {
                    debugger
                    this.secret_expired = true;
                })
        },
        methods: {
            registrate() {
                const formData = new FormData();
                formData.append("user[username]", this.name);
                formData.append("user[email]", this.email);
                formData.append("user[password][first]", this.password);
                formData.append("user[password][second]", this.repeat_password);
                formData.append("user_registration_approve", this.registration_approve);

                axios.post(`/register/${this.$route.params.secret}`, formData)
                    .then(response => {
                        const formData = new FormData();
                        formData.append("_username", this.name);
                        formData.append("_password",  this.password);
                        formData.append("_target_path", '/account');
                        axios.post('/login_check', formData)
                            .then(response => {
                                
                            })
                            .catch(err => console.dir(err));
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