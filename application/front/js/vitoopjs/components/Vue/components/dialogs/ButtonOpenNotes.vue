<template>
    <button @click="openNotes"
            class="ui-state-default ui-corner-all vtp-button"
            style="width: 34px">
<!--        <i class="fa fa-sticky-note" style="font-size: 12px"></i>-->
        <span class="ui-icon ui-icon-document-b"></span>
<!--        <i class="far fa-file" style="font-size: 12px"></i>-->
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

<style scoped>

</style>
