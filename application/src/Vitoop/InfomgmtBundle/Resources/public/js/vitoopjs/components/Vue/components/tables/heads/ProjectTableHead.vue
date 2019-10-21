<template>
    <tr :id="`${$route.params.restype}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:20px"></th>
        <th><span class="table-head">Projektname</span></th>
        <th style="width:14%;"><span class="table-head">Projektmeister</span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:42px;" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width: 54px;" data-b-searchable="false" data-b-sortable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        name: "ProjectTableHead",
        props: ['dateTitle','linkTitle'],
    }
</script>

<style scoped>

</style>