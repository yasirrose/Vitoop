<template>
    <div>
        <app-header :loading="loading" />
<!--        <app-content />-->
    </div>
</template>

<script>
    import VitoopApp from "../../app/vitoop";
    import AppHeader from './header/AppHeader.vue';
    import AppContent from "./components/AppContent.vue";

    export default {
        name: "VtpApp",
        props: [
            'downloadSize',
            'invitation',
            'agreeWithTerm',
            'projectId',
            'projectName',
            'lexiconId',
            'lexiconName',
            'resourceInfo',
            'asProjectOwner'
        ],
        provide() {
            return {
                downloadSize: this.downloadSize,
                invitationValue: this.invitation,
                agreeWithTerm: this.agreeWithTerm,
                projectId: this.projectId,
                projectName: this.projectName,
                lexiconId: this.lexiconId,
                lexiconName: this.lexiconName,
                asProjectOwner: this.asProjectOwner
            }
        },
        components: { AppHeader, AppContent },
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
                    this.$store.commit('setUser', data);
                    this.loading = false;
                })
                .catch(err => {
                    this.loading = false;
                    console.dir(err);
                });
        },
        mounted() {
            window.vitoopApp = new VitoopApp();
            vitoopApp.init();
            resourceDetail.init();
            resourceProject.init();
            userInteraction.init();

            if (this.projectId || this.lexiconId) {
                const id = this.projectId !== null ? this.projectId : this.lexiconId;
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