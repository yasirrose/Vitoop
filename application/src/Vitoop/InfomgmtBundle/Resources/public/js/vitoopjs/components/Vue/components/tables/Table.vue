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
            <table :id="`list-${$route.name}`"
                   class="table-datatables"
                   :data-restype="$route.name">
                <thead>
                    <component :is="activeTableHead"
                               :date-title="dateTitle"
                               :link-title="linkTitle" />
                </thead>
                <tbody>
                    <div class="preloader">
                        <img src="/img/loader.gif" />
                    </div>
                </tbody>
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

    import {mapGetters} from "vuex";

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
        data() {
            return {
                datatable: null
            }
        },
        computed: {
            ...mapGetters([
                'isAdmin', 'getResource', 'getInProject', 'get'
            ]),
            activeTableHead() {
                switch (this.$route.name) {
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
                } else if (this.$route.name === 'pdf' || this.$route.name === 'teli') {
                    return 'Erschienen'
                } else {
                    return 'Erstellt';
                }
            },
            linkTitle() {
                return this.isEdit ? 'unlink' : 'link';
            },
            tagParams() {
                const params = [];
                if (this.get('tags').length > 0) {
                    this.get('tags').forEach(tag => {
                        params.push(`taglist[]=${tag}`);
                    });
                    this.get('tags_i').forEach(tag => {
                        params.push(`taglist_i[]=${tag}`);
                    });
                    this.get('tags_h').forEach(tag => {
                        params.push(`taglist_h[]=${tag}`);
                    });
                    return params.join('&');
                }
                return null
            }
        },
        updated() {
            this.reinitTable();
            $('.DataTables_sort_icon').addClass('css_right ui-icon ui-icon-carat-2-n-s');
        },
        mounted() {
            resourceDetail.init();
            this.datatable = this.initTable();
            $('.DataTables_sort_icon').addClass('css_right ui-icon ui-icon-carat-2-n-s');

            VueBus.$on('datatable:reload', () => {
                $('.DataTables_sort_icon').remove();
                this.reinitTable();
            });
        },
        methods: {
            onTableDraw() {
                vitoopState.commit('secondSearchIsSearching', false);
                $('body').removeClass('overflow-hidden');
                if (/prj|lex/.test(this.$route.name)) {
                    $('.vtp-uiaction-open-extlink').on('click', (e) => {
                        e.preventDefault();
                        this.$router.push(e.currentTarget.pathname);
                    });
                }
            },
            initTable() {
                return vitoopApp.initTable(
                    this.$route.name,
                    this.isAdmin !== null,
                    0,
                    this.getResource('id') !== null && this.$store.state.inProject, // isCoef
                    `/api/resource/${this.$route.name}?${this.tagParams}`,
                ).on('draw', () => {
                    this.onTableDraw();
                })
                .on('page.dt', () => {
                    this.onTableDraw();
                });
            },
            reinitTable() {
                this.datatable.off('draw');
                this.datatable.off('page.dt');
                this.datatable.destroy();
                $('.table-datatables tbody').empty();
                this.datatable = this.initTable();
            }
        }
    }
</script>

<style scoped lang="scss">
    .preloader {
        height: 100px;
        display: table-row;

        img {
            width: 40px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>