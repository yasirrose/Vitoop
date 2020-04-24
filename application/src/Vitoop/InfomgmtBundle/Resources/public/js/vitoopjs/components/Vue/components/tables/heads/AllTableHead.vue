<template>
    <tr :id="`all-table`" class="vtp-res-dialog-onclick">
        <th style="width:50px"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width:25px"></th>
        <th style="width:1px"></th>
        <th style="width:40%"><span class="table-head">Titel</span></th>
        <th style="width:90px"><span class="table-head">Autor</span></th>
        <th style="width:96px" data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th style="width:22px" data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width: 32px" data-b-searchable="false"><span class="table-head">Unlink</span></th>
    </tr>
</template>

<script>
    import {mapGetters} from 'vuex';

    export default {
        name: "AllTableHead",
        props: ['dateTitle','linkTitle'],
        computed: {
            ...mapGetters(['get'])
        }
    }
</script>

<style scoped>

</style>
