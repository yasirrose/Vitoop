<template>
    <div v-if="!loading">
        <app-header :loading="loading" />
        <router-view v-if="notLogin" />
        <app-login v-else />
        <app-footer />
        <app-dialogs></app-dialogs>
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

    export default {
        name: "VtpApp",
        props: [
            'isCoef',
            'project',
            'lexicon',
            'downloadSize',
            'invitation',
            'resourceInfo',
            'asProjectOwner',
            'editMode',
            'infoProjectData',
            'tags',
            'terms',
            'dataP'
        ],
        provide() {
            return {
                isCoef: this.isCoef,
                project: this.project,
                lexicon: this.lexicon,
                downloadSize: this.downloadSize,
                invitationValue: this.invitation,
                resourceInfo: this.resourceInfo,
                asProjectOwner: this.asProjectOwner,
                editMode: this.editMode,
                infoProjectData: this.infoProjectData,
                tags: this.tags,
                terms: this.terms,
                dataP: this.dataP
            }
        },
        components: { AppFooter, AppHeader, AppContent, AppLogin, AppDialogs },
        computed: {
            ...mapGetters(['get','getResourceId']),
            notLogin() {
                return this.$store.state.user !== null ||
                    /userhome|invitation|register|user-agreement|user-datap/.test(this.$route.name);
            }
        },
        watch: {
            getResourceId(val) {
                const diff = this.get('secondSearch').show + this.get('tagList').show;
                val ?
                    this.$store.commit('updateTableRowNumber', this.get('table').rowNumber + diff) :
                    this.$store.commit('updateTableRowNumber', this.get('table').rowNumber - diff);
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
            window.vitoopApp = new VitoopApp();
            vitoopApp.init();
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
            userInteraction.init();
            resourceDetail.init();

            if (this.project.id || this.lexicon.id) {
                const id = this.project.id !== null ? this.project.id : this.lexicon.id;
                this.$store.commit('setResourceId', id);
            } else {
                this.$store.commit('setResourceId', null);
            }

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
                console.log(xhr.status);
                this.$store.commit('setUser', null);
                this.$router.push('/userhome');
            })
        },
    }
</script>

<style lang="scss">
    .ui-button {
        margin-right: 0;
    }
</style>
