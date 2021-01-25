<template>
    <div id="vtp-login-main-container" class="ui-corner-all">
        <div id="vtp-login-container">
<!--            {% if error %}-->
            <div id="vtp-login-error" class="ui-state-highlight ui-corner-all" v-if="error">
                <span class="vtp-fh-w35"></span>
                <span class="vtp-fh-w60">{{ $t(error.message) }}</span>
            </div>
<!--            {% endif %}-->
            <div id="vtp-login" class="ui-corner-all">
                <form action="/login"
                      method="post"
                      enctype="application/x-www-form-urlencoded">
                    <div class="vtp-fh-top">
                        <label for="username" class="vtp-fh-w40">{{ $t('label.username') }}:</label>
                        <input id="username" class="vtp-fh-w55" name="_username" type="text">
                    </div>
                    <div class="vtp-fh-bottom" style="margin-top: 10px">
                        <label for="password" class="vtp-fh-w40">{{ $t('label.password') }}:</label>
                        <input id="password" class="vtp-fh-w55" name="_password" type="password">
                    </div>

<!--                    <input type="hidden" name="_target_path" value="/account" />-->

                    <div class="vtp-submit-wrapper">
                        <a class="small"
                           style="margin-top: 5px"
                           @click="$router.push('/password/forgotPassword')">
                            {{ $t('label.forgot_password') }}
                        </a>
                        <input :value="$t('label.signin')" type="submit" id="login-button-main">
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppLogin",
        data() {
            return {
                error: null
            }
        },
        mounted() {
            $('#login-button-main').button();
        }
    }
</script>

<style scoped lang="scss">
    .small {
        color: #2779aa;
        font-size: 12px;
    }
</style>
