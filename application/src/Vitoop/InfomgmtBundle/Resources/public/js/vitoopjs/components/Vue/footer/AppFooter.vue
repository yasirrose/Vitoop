<template>
    <div id="vtp-footer" class="ui-corner-all">
        <div id="vtp-footer-homelink">
            © 2018 by <a class="vtp-homelink" href="/">vitoop<span>.org</span></a>
        </div>
        <div id="vtp-imprint">
            <span v-if="$store.state.user !== null">
                <a v-if="agreeWithTerm"
                   class="ui-corner-all ui-state-default"
                   href="/tags">
                    Tags
                </a>
                <button class="ui-corner-all ui-state-default" id="button-help">Hilfe</button>
            </span>
            <a class="ui-corner-all ui-state-default" href="/impressum">Impressum</a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppFooter",
        props: ['agreeWithTerm']
    }
</script>

<style scoped>

</style>