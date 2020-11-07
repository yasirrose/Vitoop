<template>
    <fieldset class="ui-corner-all">
        <legend>Registrierung</legend>
        <div id="vtp-register" v-if="!secret_expired">
            <div class="vtp-fh-top">
                <label class="vtp-fh-w20 required" for="user_username">Username</label>
                <input type="text"
                       v-model="$v.name.$model"
                       id="user_username"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error" v-if="$v.name.$error">
                    <div v-if="!$v.name.required">{{ $t('required', {field: 'name' })}}</div>
                    <div v-if="!$v.name.minLength">{{ $t('min_length', {field: 'name', count: 5})}}</div>
                    <div v-if="!$v.name.maxLength">{{ $t('max_length', {field: 'name', count: 14})}}</div>
                </div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_email">eMail</label>
                <input type="text"
                       v-model="$v.email.$model"
                       id="user_email"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error" v-if="$v.email.$error">
                    <div v-if="!$v.email.required">{{ $t('required', {field: 'email' })}}</div>
                    <div v-if="!$v.email.email">{{ $t('invalid', {field: 'email'}) }}</div>
                </div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_password_first">Passwort</label>
                <input type="password"
                       v-model="$v.password.$model"
                       id="user_password_first"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error" v-if="$v.password.$error">
                    <div v-if="!$v.password.required">{{ $t('required', {field: 'password' })}}</div>
                    <div v-if="!$v.password.minLength">{{ $t('min_length', {field: 'password', count: 8})}}</div>
                    <div v-if="!$v.password.maxLength">{{ $t('max_length', {field: 'password', count: 32})}}</div>
                </div>
            </div>
            <div class="vtp-fh-bottom" style="margin-top: 0">
                <label class="vtp-fh-w20 required" for="user_password_second">Passwort wiederholen</label>
                <input type="password"
                       v-model="$v.repeat_password.$model"
                       id="user_password_second"
                       class="vtp-fh-w30">
                <div class="vtp-uiinfo-form-error" v-if="$v.repeat_password.$error">
                    <div v-if="!$v.repeat_password.required">{{ $t('required', {field: 'repeat_password' })}}</div>
                    <div v-else-if="!$v.repeat_password.sameAs">{{ $t('same_as', {field1: 'repeat password', field2: 'password'}) }}</div>
                </div>
            </div>
            <div class="vtp-fh-middle registration-approve">
                <div>
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
                </div>
                <button class="ui-button ui-widget ui-state-default ui-corner-all"
                        :class="{'ui-button-disabled ui-state-disabled': !registration_approve}"
                        :disabled="!registration_approve"
                        @click="registrate">
                    Registrieren
                </button>
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
    import { required, email, maxLength, minLength, sameAs } from 'vuelidate/lib/validators'

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
        validations: {
            name: {
                required,
                minLength: minLength(5),
                maxLength: maxLength(14)
            },
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
                maxLength: maxLength(32)
            },
            repeat_password: {
                required,
                sameAs: sameAs('password')
            }
        },
        mounted() {
            axios(`/register/${this.$route.params.secret}`)
                .then((response) => {

                })
                .catch(err => {
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
                                axios('/api/user/me')
                                    .then(({data}) => {
                                        this.$store.commit('setUser', data);
                                        this.$router.push('/link');
                                    })
                                    .catch(err => console.dir(err));
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

    .registration-approve {
        border: 1px solid #aed0ea;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 10px;
        border-radius: 5px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
</style>
