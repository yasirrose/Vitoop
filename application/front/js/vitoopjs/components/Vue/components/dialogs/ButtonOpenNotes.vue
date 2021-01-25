<template>
    <button @click="openNotes"
            :title="$t('label.notes')"
            class="ui-state-default ui-corner-all vtp-button"
            style="width: 34px">
        <span class="ui-icon ui-icon-document-b"></span>
    </button>
</template>

<script>
    export default {
        name: "ButtonOpenNotes",
        methods: {
            openNotes() {
                $('#vtp-notes-dialog').dialog('open');
            },
        },
    }
</script>

<style scoped lang="scss">
    .vtp-button {

        .ui-icon {
            display: inline-block;
            margin-top: 3px;
        }
    }
</style>
