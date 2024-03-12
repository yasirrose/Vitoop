<template>
    <button id="vtp-show-popup"
            :title="$t('label.details')"
            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary vtp-custom-padding"
            style="width: 34px; height: 24px;">
        <i class="fas fa-window-restore" style="font-size: 12px"></i>
    </button>
</template>

<script>
    export default {
        name: "ShowPopupButton",
        mounted() {
            resourceDetail.init();
        }
    }
</script>

<style scoped>

</style>
