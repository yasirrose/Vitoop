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
                    <component :is="activeTableHead"
                               :date-title="dateTitle"
                               :link-title="linkTitle"/>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</template>

<script>
    import PdfTableHead from "./heads/PdfTableHead.vue";
    import BookTableHead from "./heads/BookTableHead.vue";
    import TextLinkTableHead from "./heads/TextLinkTableHead.vue";
    import LinkTableHead from "./heads/LinkTableHead.vue";
    import AddressTableHead from "./heads/AddressTableHead.vue";
    import LexiconTableHead from "./heads/LexiconTableHead.vue";
    import ProjectTableHead from "./heads/ProjectTableHead.vue";

    export default {
        name: "Table",
        components: {
            PdfTableHead,
            BookTableHead,
            TextLinkTableHead,
            LinkTableHead,
            AddressTableHead,
            LexiconTableHead,
            ProjectTableHead
        },
        inject: ['isCoef', 'isEdit'],
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
                        return 'LinkTableHead';
                        break
                    case 'adr':
                        return 'AddressTableHead';
                        break
                    case 'lex':
                        return 'LexiconTableHead';
                        break
                    case 'prj':
                        return 'ProjectTableHead';
                        break
                }
            },
            dateTitle() {
                if (this.isCoef !== null) {
                    return 'Koeff.'
                } else if (this.$route.params.restype === 'pdf' || this.$route.params.restype === 'teli') {
                    return 'Erschienen'
                } else {
                    return 'Erstellt';
                }
            },
            linkTitle() {
                return this.isEdit ? 'unlink' : 'link';
            },
        },
        mounted() {
            resourceDetail.init();
            window.vitoopApp.initTable(
                this.$route.params.restype,
                this.$store.state.admin !== null,
                0,
                0,
                `/api/resource/${this.$route.params.restype}`
            );
        }
    }
</script>

<style scoped>

</style>