<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:20px"></th>
        <th><span class="table-head">Bezeichnung</span></th>
        <th style="width:22%;"><span class="table-head">URL</span></th>
        <th style="width:50px;" data-b-searchable="false"><span class="table-head">HP</span></th>
        <th style="width: 42px" data-b-sortable="false" data-b-searchable="false"><span class="table-head"></span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:42px;" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width:14%;" data-b-searchable="false"><span class="table-head">von</span></th>
        <th style="width: 44px;"
            data-b-sortable="false"
            data-b-searchable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        name: "LinkTableHead",
        props: ['dateTitle','linkTitle'],
    }
</script>

<style scoped>

</style>
