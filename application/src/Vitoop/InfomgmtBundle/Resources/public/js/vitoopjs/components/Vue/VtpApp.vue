<template>
    <div v-if="!loading">
        <app-header :loading="loading" />
        <router-view v-if="$store.state.user !== null || $route.path === '/userhome'" />
        <app-login v-else />
        <app-footer />
    </div>
</template>

<script>
    import VitoopApp from "../../app/vitoop";
    import AppHeader from './header/AppHeader.vue';
    import AppContent from "./components/AppContent.vue";
    import AppFooter from "./footer/AppFooter.vue";
    import AppLogin from "./components/AppLogin.vue";

    // styles for quill text editor
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {
        name: "VtpApp",
        props: [
            'isCoef',
            'project',
            'lexicon',
            'downloadSize',
            'invitation',
            'agreeWithTerm',
            'resourceInfo',
            'asProjectOwner',
            'editMode',
            'isEdit',
            'infoProjectData'
        ],
        provide() {
            return {
                isCoef: this.isCoef,
                project: this.project,
                lexicon: this.lexicon,
                downloadSize: this.downloadSize,
                invitationValue: this.invitation,
                agreeWithTerm: this.agreeWithTerm,
                resourceInfo: this.resourceInfo,
                asProjectOwner: this.asProjectOwner,
                editMode: this.editMode,
                isEdit: this.isEdit,
                infoProjectData: this.infoProjectData
            }
        },
        components: { AppFooter, AppHeader, AppContent, AppLogin },
        data() {
            return {
                loading: true
            }
        },
        beforeCreate() {
            axios('/api/help')
                .then(({data}) => {
                    this.$store.commit('setAdmin', data.isAdmin);
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
        mounted() {
            userInteraction.init();

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
        }
    }
</script>

<style lang="scss">
    body {
        /*background-color: #2b2b2b;*/
    }

    .ui-button {
        margin-right: 0;
    }
</style>