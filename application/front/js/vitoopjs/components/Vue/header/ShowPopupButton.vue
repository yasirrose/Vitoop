<template>
    <button id="vtp-show-popup"
            class="ui-button ui-state-default ui-widget ui-corner-all ui-button-text-icon-primary"
            style="width: 34px; height: 24px; margin-left: 4px">
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
