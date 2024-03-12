<template>
    <button id="vtp-search-help"
            :help-area="helpArea"
            class="vtp-button vtp-help-area-button ui-state-default ui-button ui-widget ui-corner-all vtp-custom-padding"
            :class="{ 'text-button': text !== null }"
            :title="$t('label.help')"
            @click="openDialog">
        <span v-if="text === null" class="ui-icon ui-icon-help"></span>
        <span v-else class="ui-button-text">{{ text }}</span>
    </button>
</template>

<script>
    import HelpButton from "../../HelpButton";

    export default {
        name: "HelpButton",
        props: {
            helpArea: {
                type: String
            },
            text: {
                type: String,
                default: null
            }
        },
        mounted() {
            vitoopApp.helpButton = new HelpButton();
        },
        methods: {
            openDialog() {
                vitoopApp.helpButton.setHelpArea(this.helpArea);
                $(vitoopApp.helpButton.helpPopupId).dialog('open');
            }
        }
    }
</script>

<style lang="scss" scoped>
    $menu-distance: 4px;

    #vtp-search-help {
        width: initial;
        margin-right: 0px;

        &.text-button {
            height: initial;
            font-family: inherit;
        }

        .ui-icon-help {
            position: static;
            width: 16px;
            left: 0;
            margin: 0 8px;
        }

        .ui-button-text {
            padding: 0;
            text-indent: initial;
        }
    }
</style>
