<template>
    <div id="vtp-footer" class="ui-corner-all">
        <div id="vtp-footer-homelink">
           © {{ currentYear }} by <a class="vtp-homelink" href="/">vitoop<span>.org</span></a>
        </div>
        <div id="vtp-imprint">
            <span v-if="isLoggedIn">
                <a v-if="get('user').is_agreed_with_term && get('admin')"
                   class="ui-corner-all ui-state-default"
                   @click="$router.push('/tags')">
                    Tags
                </a>
                <a @click="$router.push('/user/datap')"
                   class="ui-corner-all ui-state-default">
                    Datenschutz
                </a>
                <a @click="$router.push('/user/agreement')"
                   class="ui-corner-all ui-state-default">
                    Nutzungsbedingungen
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
    import { mapGetters } from "vuex";

    export default {
        name: "AppFooter",
        components: {HelpButton},
        computed: {
            ...mapGetters(['get', 'isLoggedIn']),
            currentYear() {
                return moment().year();
            }
        }
    }
</script>

<style scoped lang="scss">
    #vtp-footer {

        #vtp-imprint {
            display: flex;

            a, button {
                padding-top: 4px;
                padding-bottom: 4px;
            }

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
