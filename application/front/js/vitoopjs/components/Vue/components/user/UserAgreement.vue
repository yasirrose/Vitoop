<template>
    <div class="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-terms-user" class="ui-corner-all" style="padding: 30px">
                <span v-html="terms"></span>
                <div class="vtp-fh-w100" v-if="$store.state.user !== null && !get('user').is_agreed_with_term">
                    <form action="/user/agreement" method="post" id="user_agreement_form">
                        <label class="custom-checkbox__wrapper square-checkbox"
                               style="margin-right: 3px">
                            <input type="checkbox"
                                   v-model="agreed"
                                   name="user_agreed_datap"
                                   id="user_agreed_datap">
                            <span class="custom-checkbox">
                                <img class="custom-checkbox__check"
                                     src="/img/check.png" />
                            </span>
                            <span>
                                Ich habe die Nutzungsbedienungen und die
                                <a href="/user/datap" target="_blank">Datenschutzbedienungen</a>
                                gelesen und akzeptiere sie
                            </span>
                        </label>
                        <input :disabled="!agreed"
                               type="submit"
                               value="Akzeptieren"
                               name="user_agreed"
                               id="button-user-agreed">
                    </form>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import { inject } from 'vue'
    export default {
        name: "UserAgreement",
        setup() {
          const terms = inject('terms')

          return {
            terms
          }
        },
        data() {
            return {
                agreed: this.agreedProp
            }
        },
        computed: {
            ...mapGetters(['get']),
            agreedProp: {
                get() {
                    return this.get('user').is_agreed_with_term;
                },
                set(val) {
                    this.agreed = val;
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .custom-checkbox__wrapper {
        padding-left: 30px;
    }
</style>
