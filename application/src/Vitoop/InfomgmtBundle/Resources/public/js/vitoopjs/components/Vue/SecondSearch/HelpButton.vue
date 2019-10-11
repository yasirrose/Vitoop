<template>
    <button id="vtp-search-help"
            help-area="search"
            class="vtp-button vtp-help-area-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
            @click="showHelp('search', $event)">
        <span class="ui-icon ui-icon-help"></span>
        <span class="ui-button-text"></span>
    </button>
</template>

<script>
    export default {
        name: "HelpButton",
        methods: {
            showHelp(area,event) {
                event.preventDefault();
                vitoopApp.helpButton.setHelpArea(area);
                $('#vtp-res-dialog-help').dialog('open');
            }
        }
    }
</script>

<style lang="scss" scoped>
    $menu-distance: 4px;

    #vtp-search-help {
        width: 34px;
        margin-right: 0px;
    }
</style>