<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:20px"></th>
        <th style="width:34%;"><span class="table-head">Bezeichnung</span></th>
        <th style="width:21%;"><span class="table-head">Autor</span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:42px;" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width:14%;"><span class="table-head">von</span></th>
        <th style="width:8%;" data-b-searchable="false"
            v-if="$store.state.admin">
            <span class="table-head">Stored</span>
        </th>
        <th style="width: 54px;"
            data-b-sortable="false"
            data-b-searchable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        name: "TextLinkTableHead",
        props: ['dateTitle','linkTitle'],
    }
</script>

<style scoped>

</style>