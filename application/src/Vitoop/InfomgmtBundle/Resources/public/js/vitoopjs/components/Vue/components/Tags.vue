<template>
    <div id="vtp-res-tags" class="scrollbar-inner">
        <table id="tags-list" class="dataTable table-datatables noscroll-container">
            <thead>
            <tr style="">
                <th style="width: 29%" class="ui-state-default">Tag:</th>
                <th class="ui-state-default">X</th>
                <th class="ui-state-default">Projekt:</th>
                <th class="ui-state-default">Lexicon:</th>
                <th class="ui-state-default">Pdf:</th>
                <th class="ui-state-default">Textlink:</th>
                <th class="ui-state-default">Link:</th>
                <th class="ui-state-default">Buch:</th>
                <th class="ui-state-default">Adresse:</th>
            </tr>
            </thead>
            <tbody>
                <tr class="ui-corner-all"
                    :class="{even: index % 2 === 0}"
                    v-for="(tag,index) in tags"
                    :key="tag.id">
                    <td>{{ tag.text }}:</td>
                    <td>{{ tag.cnt }}</td>
                    <td>{{ tag.prjc }}</td>
                    <td>{{ tag.lexc }}</td>
                    <td>{{ tag.pdfc }}</td>
                    <td>{{ tag.telic }}</td>
                    <td>{{ tag.linkc }}</td>
                    <td>{{ tag.bookc }}</td>
                    <td>{{ tag.adrc }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        name: "Tags",
        inject: ['tags'],
        mounted() {
            $('#tags-list').scrolltable({
                stripe: true,
                maxHeight: 350
            });
        }
    }
</script>

<style scoped>

</style>