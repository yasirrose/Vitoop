<template>
    <div>
        <div id="vtp-forgot" class="ui-corner-all">
            <form action="/password/forgotPassword" method="post" enctype="application/x-www-form-urlencoded">
                <div class="vtp-fh-top-center">
                    <label for="email">Email:</label>
                    <input class="vtp-fh-w60" type="email" name="email" id="email" required>
                    <input value="send" type="submit" class="ui-corner-all ui-state-default">
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ForgotPassword"
    }
</script>

<style scoped>

</style>
