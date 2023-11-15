<template>
    <div v-if="!loading">
        <app-header :loading="loading" />
        <router-view v-if="notLogin" />
        <app-login v-else />
        <app-footer />
        <app-dialogs></app-dialogs>
        <notification />
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import VitoopApp from "../../app/vitoop";
    import AppHeader from './header/AppHeader.vue';
    import AppContent from "./components/AppContent.vue";
    import AppFooter from "./footer/AppFooter.vue";
    import AppLogin from "./components/AppLogin.vue";
    import AppDialogs from "./components/dialogs/AppDialogs.vue";
    import Notification from "./components/helpers/Notification.vue";
    import ElementNotification from "./components/helpers/ElementNotification.vue";
    import axios from "axios";

    export default {
        name: "VtpApp",
        props: [
            'invitationValue',
            'downloadSize',
            'terms',
            'infoProjectData',
            'dataP'
        ],
        provide() {
            return {
                downloadSize: this.downloadSize,
                invitationValue: this.invitationValue,
                infoProjectData: this.infoProjectData,
                terms: this.terms,
                dataP: this.dataP
            }
        },
        components: { AppFooter, AppHeader, AppContent, AppLogin, AppDialogs, Notification, ElementNotification },
        computed: {
            ...mapGetters(['get','getResourceId']),
            notLogin() {
                return this.$store.state.user !== null ||
                    /userhome|invitation|register|user-agreement|user-datap|forgot-password|change-password|impressum/
                        .test(this.$route.name);
            }
        },
        watch: {
            getResourceId(val, oldVal) {
                const diff = this.get('secondSearch').show + this.get('tagList').show;
                if (val && oldVal === null) {
                  let newRowsAmount = this.get('table').rowNumber + diff - 1;
                  this.$store.commit('updateTableRowNumber', newRowsAmount);
                }

                if (val && oldVal) {
                  this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + diff - 1)
                }

              if (val === null) {
                this.$store.commit('updateTableRowNumber', this.get('table').rowNumber - diff + 1)
              }
                // val ?
                //     this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + diff - 1) :
                //     this.$store.commit('updateTableRowNumber', this.get('table').rowNumber - diff + 1);
            }
        },
        data() {
            return {
                loading: true,
            }
        },
        beforeCreate() {
            this.$store.commit('set', {key: 'edit', value: false});
            this.$store.commit('set', {key: 'inProject', value: false});
            axios('/api/help')
                .then(({data}) => {
                    // data.isAdmin = false;
                    this.$store.commit('setAdmin', data.isAdmin);
                    this.$store.commit('setHelp', {key: 'text', value: data.help.text});
                })
                .catch(err => console.dir(err));

            axios('/api/user/me')
                .then(({data}) => {
                    if (typeof data !== "string") {
                        this.$store.commit('setUser', data);
                    } else {
                        this.$store.commit('setUser', null);
                    }
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    console.dir(err);
                });
            this.$store.dispatch('getNotes');

            window.vitoopApp = new VitoopApp();
            window.vitoopApp.init();
        },
        updated() {
            if (this.$store.state.user !== null) {
                if (!this.get('user').is_agreed_with_term &&
                    !/invitation|register|user-agreement|user-datap/.test(this.$route.name)) {
                    this.$router.push('/user/agreement');
                }
            }
        },
        mounted() {
            axios.interceptors.response.use(response => {
                return response;
            }, error => {
                return Promise.reject(error);
            });
            userInteraction.init();

            vitoopState.commit('setResourceInfo', this.resourceInfo);
            if (window.location.pathname === '/userhome' ||
                window.location.pathname === '/') {
                vitoopState.commit('setResourceType', '');
            }

            $('#vtp-header-toggle-flag input[type=checkbox]').button({
                icons: {
                    primary: "ui-icon-flag"
                },
                text: false
            });

            $('#vtp-header-toggle-flag button').hide();

            $(document).ajaxError((e,xhr) => {
                this.$store.commit('set', { key: 'lexicon', value: null });
                this.$store.commit('set', { key: 'project', value: null });
                this.$store.commit('resetConversation');
                this.$store.commit('setUser', null);
                this.$store.commit('resetResource');
                this.$router.push('/login');
            })
        },
    }
</script>

<style lang="scss">
    .ui-button {
        margin-right: 0;
    }
</style>
