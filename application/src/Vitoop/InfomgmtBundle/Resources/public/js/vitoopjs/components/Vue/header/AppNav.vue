<template>
    <div id="vtp-nav"
         class="vtp-menu ui-helper-clearfix ui-corner-all">
        <ul>
            <li>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': getResource('type') === ''}"
                   :href="`/project/${projectId}`"
                   v-if="projectId !== null">
                    Projekt-Hauptseite
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   :class="{'vtp-nav-active ui-state-active': getResource('type') === ''}"
                   :href="`/lexicon/${lexiconId}`"
                   v-else-if="lexiconId !== null">
                    {{ $t('page.lexicon') }}
                </a>
                <a class="vtp-resmenu-homelink vtp-resmenu-homelink-home ui-state-default ui-corner-all"
                   v-else
                   :class="{'vtp-nav-active ui-state-active': activeHomeLink}"
                   @click="toHome">
                    Benutzer-Hauptseite
                </a>
            </li>
            <li v-for="(value,name) in resources" :key="name">
                <a class="vtp-resmenu-reslink ui-state-default ui-corner-all"
                   :class="{
                    'ui-state-no-content': noContent(name),
                    'vtp-nav-active ui-state-active': getResource('type') === name
                   }"
                   :href="`/${name}/?${isResource}`">
                    {{ value }}
                </a>
            </li>
        </ul>
        <search-by-tags v-if="$store.state.user !== null &&
                              getResource('type') !== '' &&
                              getResource('id') === null" />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import SearchByTags from "./SearchByTags.vue"

    export default {
        name: "AppNav",
        components: { SearchByTags },
        inject: [
            'agreeWithTerm',
            'projectId',
            'lexiconId'
        ],
        data() {
            return {
                resources: {
                    prj: 'Projekt',
                    lex: 'Lexikon',
                    pdf: 'Pdf',
                    teli: 'Textlink',
                    book: 'Buch',
                    adr: 'Adresse',
                    link: 'Link'
                }
            }
        },
        computed: {
            ...mapGetters([
                'getResource'
            ]),
            activeHomeLink() {
                return this.getResource('type') === '' ||
                    window.location.pathname === '/' ||
                    window.location.pathname === '/userhome';
            },
            noContent() {
                return (name) => {
                    return this.getResource('info') !== null ?
                        this.getResource('info')[`${name}c`] === '0' : false
                }
            },
            getProjectId() {
                return this.projectId !== null ? `project=${this.projectId}` : '';
            },
            getLexiconId() {
                return this.lexiconId !== null ? `lexicon=${this.lexiconId}` : '';
            },
            isResource() {
                if (this.projectId !== null) {
                    return `project=${this.projectId}`;
                } else if (this.lexiconId !== null) {
                    return `lexicon=${this.lexiconId}`;
                }
            }
        },
        mounted() {
            if (this.resourceInfo !== null) {
                this.$store.commit('setResourceType', '')
            }

            $('#vtp-nav').on('click','a', this.loadResourceListPage);
        },
        methods: {
            toHome() {
                this.$store.commit('setResourceType', '');
                window.location.pathname = "/userhome";
            },
            insertResourceList(responseHtml, textStatus, jqXHR, $_form) {
                let html = $(responseHtml);
                $('#vtp-content').empty().append(html);
                resourceDetail.tgl_ls();
                this.maintainResLinks();
            },
            maintainResLinks(obj_partial_query) {
                if (typeof obj_partial_query === 'undefined') {
                    return;
                }

                $('.vtp-resmenu-reslink').each(function () {
                    let href = $(this).attr('href');
                    href = $.param.querystring(href, obj_partial_query, 0);
                    $(this).attr('href', href);
                });
            },
            loadResourceListPage(e) {
                let url;
                let succ;
                vitoopState.commit('checkIsNotEmptySearchToggle');
                if (typeof e === 'string') {
                    // called manually by resource_detail:[next/previous]Resource for background page flipping
                    // while the resource_detail dialog is in foreground
                    url = e;
                    succ = [ this.insertResourceList, this.secondSuccessFunc ];
                } else if (typeof e === 'undefined') {
                    // called without arguments for a refresh
                    url = this.currentUrl;
                    succ = [this.insertResourceList];
                } else if ($(e.target).attr('id') === 'vtp-search-bytags-form') {
                    // called by refresh (submit) button from tag search
                    url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                    e.preventDefault();
                    succ = [this.insertResourceList];
                } else if ($(e.target).hasClass('vtp-uiaction-search-bytags-clear-taglistbox')) {
                    // called after all tags are removed
                    url = $('#vtp-nav .vtp-nav-active.vtp-resmenu-reslink').attr('href');
                    succ = [this.insertResourceList];
                } else if ($(e.target).is('a')) {//@TODO This check isn't needed when handler is attached to a-elements
                    //called by an handler
                    url = $(e.target).attr('href');
                    e.preventDefault();
                    // decide reslink or homelink
                    if ($(e.target).hasClass('vtp-resmenu-reslink')) {
                        if ($('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-homelink-home')) {
                            $('#vtp-search-bytags-form, #vtp-search-toggle, #vtp-search-help').show('fade', 'slow');
                            vitoopApp.tagSearch.maintainTaglistbox();
                        }
                        // vitoopState.commit('checkIsNotEmptySearchToggle');
                        $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                        $(e.target).addClass('vtp-nav-active ui-state-active');
                        succ = [this.insertResourceList];
                    } else if ($(e.target).hasClass('vtp-resmenu-homelink')) {
                        if ($(e.target).hasClass('vtp-resmenu-homelink-home') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                            $('#vtp-search-bytags-form, #vtp-search-toggle, #vtp-search-help, #vtp-filterbox').hide('fade', 'slow');
                            vitoopState.commit('updateSearchToggle', false);
                            vitoopApp.tagSearch.maintainTaglistbox(true);
                        } else if ($(e.target).hasClass('vtp-resmenu-homelink') && $('#vtp-nav .vtp-nav-active').hasClass('vtp-resmenu-reslink')) {
                            vitoopState.commit('updateSearchToggle', false);
                            vitoopApp.tagSearch.maintainTaglistbox(true);
                        }
                        $('#vtp-nav .vtp-nav-active').removeClass('vtp-nav-active ui-state-active');
                        $(e.target).addClass('vtp-nav-active ui-state-active');
                        succ = [this.insertHomeContent];
                    } else {
                        // @TODO e.g - a in vtp-nav is OK  - but links to other resources?
                        succ = [this.insertResourceList];
                    }
                }

                if (typeof url !== 'undefined') {
                    //in case of successful xhr call the currentUrl is updated
                    succ.unshift(function () {
                        this.currentUrl = url;
                    });
                    $.ajax({
                        url: url,
                        success: succ,
                        error: function (jqXHR, textStatus, errorthrown) {
                            alert(textStatus + ' - ' + errorthrown);
                        },
                        dataType: 'html'
                    });
                } else {
                    console.log('The #APR#handler should be registered on a-elements only');
                }
            },
            insertHomeContent(responseHtml, textStatus, jqXHR, $_form) {
                $('#vtp-content').empty().append(responseHtml);
                resourceProject.init();
            }
        }
    }
</script>

<style scoped>

</style>