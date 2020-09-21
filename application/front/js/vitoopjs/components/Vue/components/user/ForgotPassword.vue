<template>
    <div id="vtp-forgot" class="ui-corner-all">
        <div class="vtp-fh-top-center">
            <label>
                Email:
                <input v-model="email" class="vtp-fh-w60"
                       type="email"
                       required>
            </label>
            <button class="vtp-button ui-corner-all ui-state-default"
                    :class="{'ui-state-disabled': email === ''}"
                    :disabled="email === ''"
                    @click="send">Send</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword",
        data() {
            return {
                email: ''
            }
        },
        methods: {
            send() {
                axios.post('/api/v1/users/passwords', {email: this.email})
                    .then(response => {
                        this.email = null;
                        VueBus.$emit('notification:show', 'New password has been sent on your email.');
                    })
                    .catch(err => console.dir(err));
            }
        }
    }
</script>

<style scoped lang="scss">
    .vtp-fh-top-center {
        display: flex;
        align-items: center;
        justify-content: center;

        label {
            margin-right: 4px;
        }
    }
</style>
