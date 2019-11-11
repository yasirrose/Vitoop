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
                <help-button help-area="search" text="Hilfe" />
            </span>
            <a class="ui-corner-all ui-state-default"
               @click.prevent="$router.push('/impressum')">
                Impressum
            </a>
        </div>
    </div>
</template>

<script>
    import HelpButton from "../SecondSearch/HelpButton.vue";

    export default {
        name: "AppFooter",
        components: {HelpButton},
        inject: ['agreeWithTerm']
    }
</script>

<style scoped lang="scss">
    #vtp-footer {

        #vtp-imprint {
            display: flex;

            & > span {
                display: flex;

                & > * {
                    margin-right: 4px;
                }
            }

            .ui-state-default {
                padding-left: 8px;
                padding-right: 8px;
            }
        }
    }
</style>