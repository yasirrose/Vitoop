<template>
    <div>
        <app-header />
    </div>
</template>

<script>
    import AppHeader from './components/header/AppHeader.vue'
    export default {
        name: "VtpApp",
        props: [
            'downloadSize',
            'invitation',
            'agreeWithTerm'
        ],
        provide() {
            return {
                downloadSize: this.downloadSize,
                invitationValue: this.invitation,
                agreeWithTerm: this.agreeWithTerm
            }
        },
        components: {AppHeader},
        beforeCreate() {
            axios('/api/help')
                .then(({data}) => {
                    this.$store.commit('setAdmin', data.isAdmin);
                })
                .catch(err => console.dir(err));

            axios('/api/user/me')
                .then(({data}) => {
                    this.$store.commit('setUser', data);
                })
                .catch(err => console.dir(err));
        },
        mounted() {
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

<style scoped>

</style>