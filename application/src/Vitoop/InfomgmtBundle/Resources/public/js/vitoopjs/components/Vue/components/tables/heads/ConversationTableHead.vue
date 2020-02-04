<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th><span class="table-head">Titel</span></th>
        <th style="width:15%;"><span class="table-head">Autor</span></th>
        <th style="width:96px;" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width: 54px"
            data-b-sortable="false"
            data-b-searchable="false">
            <span class="table-head">{{ linkTitle }}</span>
        </th>
    </tr>
</template>

<script>
    export default {
        props: ['dateTitle','linkTitle']
    }
</script>

<style scoped>

</style>
