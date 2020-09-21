<template>
    <div id="vtp-login-main-container" class="ui-corner-all">
        <div id="vtp-change-pass-container">
            <div id="vtp-login">
                <div class="vtp-fh-top">
                    <label for="password" class="vtp-fh-w40">{{ $t('label.password') }}:</label>
                    <input v-model="password"
                           class="vtp-fh-w65"
                           type="password"
                           id="password">
                </div>
                <div class="vtp-fh-bottom">
                    <label for="pwd2" class="vtp-fh-w40">{{ $t('label.repeat_password') }}:</label>
                    <input v-model="repeatPassword"
                           class="vtp-fh-w65"
                           type="password"
                           id="pwd2">
                </div>
                <div class="vtp-uiinfo" v-if="errorMessage">
                    {{ errorMessage }}
                </div>
                <div class="vtp-submit-wrapper">
                    <button class="ui-state-default ui-corner-all"
                            @click="submit"
                            :class="{'ui-state-disabled': !isValid}"
                            :disabled="!isValid">
                        {{ $t('label.send') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ChangePassword",
        data() {
            return {
                password: null,
                repeatPassword: null,
                errorMessage: null
            }
        },
        computed: {
            isValid() {
                return this.password === this.repeatPassword && this.repeatPassword;
            }
        },
        mounted() {

        },
        methods: {
            submit() {
                axios.put('/api/v1/users/passwords', {
                    token: this.$route.params.token,
                    password: this.password
                })
                .then(() => {
                    this.errorMessage = null;
                    this.$router.push('/login');
                })
                .catch(err => {
                    this.errorMessage = err.response.data.messages[0];
                })
            }
        }
    }
</script>

<style scoped>

</style>
