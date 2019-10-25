<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:20px"></th>
        <th><span class="table-head">Titel</span></th>
        <th style="width:21%;"><span class="table-head">Autor</span></th>
        <th style="width:63px;"><span class="table-head">Seiten</span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:42px;" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width:14%;"><span class="table-head">von</span></th>
        <th style="width:54px;"
            v-if="isEdit"
            data-b-sortable="false"
            data-b-searchable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        name: "BookTableHead",
        props: ['dateTitle','linkTitle'],
        inject: ['isEdit']
    }
</script>

<style scoped>

</style>