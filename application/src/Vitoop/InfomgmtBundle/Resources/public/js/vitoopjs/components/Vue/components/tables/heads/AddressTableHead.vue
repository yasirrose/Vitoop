<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:20px"></th>
        <th><span class="table-head">Institution</span></th>
        <th style="width:5%;"><span class="table-head">PLZ</span></th>
        <th style="width:15%;"><span class="table-head">Ort</span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:42px;" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width:14%;"><span class="table-head">von</span></th>
        <th style="width: 54px;" data-b-sortable="false" data-b-searchable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        name: "AddressTableHead",
        props: ['dateTitle','linkTitle'],
    }
</script>

<style scoped>

</style>