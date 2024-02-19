<template>
    <fieldset class="ui-corner-all">
        <form @submit.prevent="submitForm">
        <legend>Registrierung</legend>
        <div id="vtp-register" v-if="!secretExpired">
            <div class="vtp-fh-top">
                <label class="vtp-fh-w20 required" for="user_username">Username</label>
                <input type="text"
                    v-model="formData.name"
                    id="user_username"
                    class="vtp-fh-w30"
                >
                <div class="vtp-uiinfo-form-error" v-if="v$.$error">
                    <div v-for="error in v$.$errors" :key="error.$uid">                        
                        <span v-if="error.$property == 'name' && error.$validator == 'required'">{{ $t('required', {field: 'name' })}}</span>
                        <span v-if="error.$property == 'name' && error.$validator == 'minLength'">{{ $t('min_length', {field: 'name', count: 5})}}</span>
                        <span v-if="error.$property == 'name' && error.$validator == 'maxLength'">{{ $t('max_length', {field: 'name', count: 14})}}</span>
                    </div>
                </div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_email">eMail</label>
                <input type="text"
                    v-model="formData.email"
                    id="user_email"
                    class="vtp-fh-w30"
                >
                <div class="vtp-uiinfo-form-error" v-if="v$.$error">
                    <div v-for="error in v$.$errors" :key="error.$uid">    
                        <span v-if="error.$property == 'email' && error.$validator == 'required'">{{ $t('required', {field: 'email' })}}</span>
                        <span v-if="error.$property == 'email' && error.$validator == 'minLength'">{{ $t('invalid', {field: 'email'}) }}</span>
                    </div>
                </div>
            </div>
            <div class="vtp-fh-middle">
                <label class="vtp-fh-w20 required" for="user_password_first">Passwort</label>
                <input type="password"
                    v-model="formData.password"
                    id="user_password_first"
                    class="vtp-fh-w30"
                >
                <div class="vtp-uiinfo-form-error" v-if="v$.$error">
                    <div v-for="error in v$.$errors" :key="error.$uid">                        
                        <span v-if="error.$property == 'password' && error.$validator == 'required'">{{ $t('required', {field: 'password' })}}</span>
                        <span v-if="error.$property == 'password' && error.$validator == 'minLength'">{{ $t('min_length', {field: 'password', count: 8})}}</span>
                        <span v-if="error.$property == 'password' && error.$validator == 'maxLength'">{{ $t('max_length', {field: 'password', count: 32})}}</span>
                    </div>
                </div>
            </div>
            <div class="vtp-fh-bottom" style="margin-top: 0">
                <label class="vtp-fh-w20 required" for="user_password_second">Passwort wiederholen</label>
                <input type="password"
                    v-model="formData.confirmPassword"
                    id="user_password_second"
                    class="vtp-fh-w30"
                >
                <div class="vtp-uiinfo-form-error" v-if="v$.$error">
                    <div v-for="error in v$.$errors" :key="error.$uid">                        
                        <span v-if="error.$property == 'confirmPassword' && error.$validator == 'required'">{{ $t('required', {field: 'confirmPassword' })}}</span>
                        <span v-if="error.$property == 'confirmPassword' && error.$validator == 'sameAs'">{{ $t('same_as', {field1: 'repeat password', field2: 'password'}) }}</span>
                    </div>
                </div>
            </div>
            <div class="vtp-fh-middle registration-approve">
                <div>
                    <input type="checkbox"
                           v-model="formData.registrationApprove"
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
                        :class="{'ui-button-disabled ui-state-disabled': !formData.registrationApprove}"
                        :disabled="!formData.registrationApprove"
                        type="submit">
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
                <p>Erlaubte Sonderzeichen: !"#$%&'()*+,-./:;&lt;=&gt;?@[\]^_`{|}~</p>
                <p>Es besteht keine Klarnamen-Pflicht</p>
            </div>
        </div>
        <div v-else>Deine Einladung ist leider abgelaufen. Sende ein Antwort auf Deine Einladungsmail um eine neue zu erhalten.</div>
        </form>
    </fieldset>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import { required, email, maxLength, minLength, sameAs } from '@vuelidate/validators';

const formData = reactive({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    registrationApprove: false
});

const secretExpired = ref(false);

const rules = computed(() => {
    return {
        name: {
            required, 
            minLength: minLength(5), 
            maxLength: maxLength(14)
        },
        email: {
            required, 
            email
        },
        password: {
            required,
            minLength: minLength(8),
            maxLength: maxLength(32)
        },
        confirmPassword: {
            required,
            sameAs: sameAs(formData.password)
        }
    };
});

const route = useRoute();

const router = useRouter();

const store = useStore();

const v$ = useVuelidate(rules, formData);

const submitForm = async () => {
    const result = await v$.value.$validate();

    if (result) {
        register();
    }
};

const checkSecretExpiration = () => {
    axios(`/register/${route.params.secret}`)
        .then((response) => {
        })
        .catch(err => {
            secretExpired.value = true;
        })
    ;
};

const register = () => {
    const form = new FormData();

    form.append("user[username]"            , formData.name);
    form.append("user[email]"               , formData.email);
    form.append("user[password][first]"     , formData.password);
    form.append("user[password][second]"    , formData.confirmPassword);
    form.append("user_registration_approve" , formData.registrationApprove);

    axios.post(`/register/${route.params.secret}`, form)
        .then(response => {
            const form = new FormData();
            form.append("_username"     , formData.name);
            form.append("_password"     , formData.password);
            form.append("_target_path"  , '/account');

            axios.post('/login', form)
                .then(response => {
                    axios('/api/user/me')
                        .then(({data}) => {
                            store.commit('setUser', data);
                            router.push('/link');
                        })
                        .catch(err => console.dir(err));
                })
                .catch(err => console.dir(err))
            ;
        })
        .catch(err => console.dir(err))
    ;
};

onMounted(async () => await checkSecretExpiration());
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
