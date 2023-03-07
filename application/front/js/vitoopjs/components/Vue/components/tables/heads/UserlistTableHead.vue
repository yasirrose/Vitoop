<template>
    <tr :id="`${$route.name}-table`" class="vtp-res-dialog-onclick">
        <th style="width:96px;"><span class="table-head">{{ dateTitle }}</span></th>
        <th><span class="table-head">User</span></th>
        <th style="width:14%;"><span class="table-head">last login</span></th>
    </tr>
</template>
<script>
export default {
    name: "UserlistTableHead",
    props: ['dateTitle'],
}
</script>