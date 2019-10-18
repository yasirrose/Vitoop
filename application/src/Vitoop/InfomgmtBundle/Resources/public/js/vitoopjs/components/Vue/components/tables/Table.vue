<template>
    <div id="vtp-content">
        <div id="vtp-res-list" class="vtp-uiaction-list-listener">
            <fieldset class="ui-corner-all margin-top-3 empty-datatables" style="display: none">
                <div style="font-size: 42px; color: #2779aa">
                    <p style="padding-left: 30px">
                        .. hier gibt es leider keine Treffer  :-(
                    </p>
                    <p style="font-size: 32px; padding-right: 40px; text-align: right">
                        .. aber wenn Du willst, kannst Du welche eintragen   :-)
                    </p>
                </div>
            </fieldset>
            <table :id="`list-${$route.params.restype}`"
                   class="table-datatables"
                   :data-restype="$route.params.restype">
                <thead>
                    <component :is="activeTableHead" />
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import PdfTableHead from "./heads/PdfTableHead.vue";

    export default {
        name: "Table",
        components: {
            PdfTableHead
        },
        computed: {
            activeTableHead() {
                switch (this.$route.params.restype) {
                    case 'pdf':
                        return 'PdfTableHead';
                        break
                    case 'book':
                        return 'BookTableHead';
                        break
                    case 'teli':
                        return 'TextLinkTableHead';
                        break
                    case 'link':
                        return 'linkTableHead';
                        break
                    case 'adr':
                        return 'AdressTableHead';
                        break
                    case 'lex':
                        return 'LexiconTableHead';
                        break
                    case 'prj':
                        return 'ProjectTableHead';
                        break
                }
            }
        },
        mounted() {
            resourceDetail.init();
            window.vitoopApp.initTable(`${this.$route.params.restype}`, 0, 0, 0, `/api/resource/${this.$route.params.restype}`);
        }
    }
</script>

<style scoped>

</style>