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
    import ConversationTableHead from "./heads/ConversationTableHead.vue";
    import AllTableHead from "./heads/AllTableHead.vue";
    import UserlistTableHead from "./heads/UserlistTableHead.vue";
    import EventBus from "../../../../app/eventBus";

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
            ProjectTableHead,
            ConversationTableHead,
            AllTableHead,
            UserlistTableHead
        },
        data() {
            return {
                datatable: null
            }
        },
        computed: {
            ...mapGetters([
                'isAdmin', 'getResource', 'getInProject', 'get', 'getResourceType'
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
                    case 'conversation':
                        return 'ConversationTableHead';
                        break
                    case 'all':
                        return 'AllTableHead';
                        break
                    case 'userlist':
                        return 'UserlistTableHead';
                        break
                }
            },
            isCoef() {
                return this.getResource('id') !== null && this.$store.state.inProject
            },
            dateTitle() {
                if (this.isCoef) {
                    return 'Koeff.'
                } else if (this.getResource('id') !== null) {
                    return 'Erschienen'
                } else if (/pdf|teli/.test(this.$route.name)) {
                    return 'Erschienen';
                } else {
                    return 'Eingetragen';
                }
            },
            linkTitle() {
                return this.get('edit') ? 'unlink' : 'link';
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
            },
            currentURL() {
                if (this.get('inProject')) {
                    return `/api/v1/projects/${this.getResource('id')}/${this.getResourceType}`
                }

                if (this.get('conversationInstance')) {
                    return `/api/v1/conversations/${this.getResource('id')}/${this.getResourceType}`
                }

                return `/api/resource/${this.$route.name}`;
            },
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                vm.$store.commit('set', {key: 'coefsToSave', value: []});
            })
        },
        updated() {
            this.update()
        },
        mounted() {
            this.$store.commit('setResourceType', this.$route.name);
            resourceDetail.init();
            this.datatable = this.initTable();
            $('.DataTables_sort_icon').addClass('css_right ui-icon ui-icon-carat-2-n-s');
            EventBus.$on('datatable:reload', () => {
                $('.DataTables_sort_icon').remove();
                this.reinitTable();
            });
        },
        methods: {
            update() {
                this.reinitTable();
                if (!$('.DataTables_sort_icon').hasClass('css_right ui-icon ui-icon-carat-2-n-s'))
                    $('.DataTables_sort_icon').addClass('css_right ui-icon ui-icon-carat-2-n-s');
            },
            setNeededTitles() {
                const teaserFaderWrappers = document.querySelectorAll('.vtp-teasefader-wrapper');
                teaserFaderWrappers.forEach(item => {
                    const text = item.querySelector('.vtp-teasefader-wrapper__text');
                    if (text != null && text.offsetWidth > item.clientWidth) {
                        item.setAttribute('title', text.innerText);
                    }
                });
            },
            onTableDraw() {
                this.setNeededTitles();
                if (this.getResourceType === 'prj') EventBus.$emit('update:my-projects');
                if (this.get('table').data.length >= this.get('table').rowNumber && this.get('resource').id === null) {
                    setTimeout(() => {
                        const content = document.querySelector('#vtp-content');
                        const secondSearch = document.querySelector('#vtp-second-search');
                        const tagList = document.querySelector('#vtp-filterbox');
                        const contentHeight = content.clientHeight + secondSearch.clientHeight + tagList.clientHeight;
                        this.$store.commit('set', {key: 'contentHeight', value: contentHeight});
                    }, 200)
                }
                vitoopState.commit('secondSearchIsSearching', false);
                if (/prj|lex|conversation/.test(this.$route.name)) {
                    $('.vtp-uiaction-open-extlink').on('click', (e) => {
                        e.preventDefault();
                        if (!e.currentTarget.classList.contains('ui-state-disabled')) {
                            this.$store.commit('resetSecondSearchValues');
                            this.$router.push(e.currentTarget.pathname);
                        }
                    });
                }

                $('body').removeClass('overflow-hidden');

                if (this.datatable.page &&  this.datatable.page.info()) {
                    vitoopApp.vtpDatatable.setTotalMessage(this.datatable.page.info().recordsTotal);
                }
            },
            initTable() {
                return vitoopApp.initTable(
                    this.$route.name,
                    this.isAdmin !== null,
                    this.getResource('id') !== null && this.$store.state.inProject, // isCoef
                    `${this.currentURL}?${this.tagParams}`,
                )
                .on('xhr.dt', (e, settings, json, xhr) => {
                    if (json === null) {
                        this.$store.commit('reset');
                        return;
                    }
                    this.$store.commit('updateTableData', json.data);
                    this.$store.commit('setResourceInfo', json.resourceInfo);
                })
                .on('draw', () => {
                    this.onTableDraw();

                    let openedResource = vitoopState.getters.getOpenedResource;
                    let currentPage = this.datatable.page.info().page;
                    if (openedResource.id) {
                      if (openedResource.page === currentPage) {
                        vitoopState.commit('resetTableOpenedResource');
                        $('#'+openedResource.type+'-'+openedResource.id+' > td:first').trigger('click');
                      }
                    }
                })
                .on('page.dt', () => {
                    this.onTableDraw();
                });
            },
            reinitTable() {
                if (('all' === this.$route.name) && !this.$store.state.inProject) {
                  return null;
                }
                this.datatable.off('draw');
                this.datatable.off('page.dt');
                this.datatable.destroy();
                $('.table-datatables tbody').empty();
                this.datatable = this.initTable();
            }
        }
    }
</script>

<style lang="scss">
     @keyframes blinking {
       0% {
         background-color: #d7ebf9;
         background-position: 50% 50%;
         background-repeat: repeat-x;
       }
       50% {
         background-color: #3baae3;
         background-position: 50% 50%;
         background-repeat: repeat-x;
         color: white;
         transform: scale(1.1);
       }
       100% {
         background-color: #d7ebf9;
         background-position: 50% 50%;
         background-repeat: repeat-x;
       }
     }


    .blinking {
        animation-name: blinking;
        animation-duration: 1.5s;
        animation-iteration-count: 5;
    }

    .sorting_disabled {

        .DataTables_sort_icon {
            display: none;
        }
    }

    .dataTables_length {
        position: relative;

        .ui-selectmenu-open {
            top: 0 !important;
            transform: translateY(-100%);
        }

        .ui-selectmenu-button {
            border-radius: 6px !important;
        }
    }

    .coef-column {
        padding-top: 0 !important;
        padding-bottom: 0 !important;
    }
</style>

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
