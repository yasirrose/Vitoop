<template>
    <tr :id="`all-table`" class="vtp-res-dialog-onclick">
        <th style="width: 50px"><span class="table-head">{{ dateTitle }}</span></th>
        <th style="width: 50px"></th>
        <th></th>
        <th style="width: 40%"><span class="table-head">Titel</span></th>
        <th><span class="table-head">Autor</span></th>
        <th data-b-searchable="false"><span class="table-head">Bewertung</span></th>
        <th data-b-searchable="false"><span class="table-head">RR</span></th>
        <th style="width: 45px" data-b-searchable="false"><span class="table-head">{{ linkTitle }}</span></th>
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

<style scoped lang="scss">
    .vtp-res-dialog-onclick {

        th {
            /*padding: 0 !important;*/
        }
    }
</style>
