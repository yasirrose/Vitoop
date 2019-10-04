<template>
    <div>
        <app-header />
    </div>
</template>

<script>
    import AppHeader from './components/AppHeader.vue'
    export default {
        name: "VtpApp",
        props: [
            'downloadSize',
            'invitation'
        ],
        provide() {
            return {
                downloadSize: this.downloadSize,
                invitationValue: this.invitation
            }
        },
        components: {AppHeader}
    }
</script>

<style scoped>

</style>