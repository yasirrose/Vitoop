<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box" v-if="project !== null">
                <resizable-block id="vtp-projectdata-sheet-view"
                                 :height="get('contentHeight')-32"
                                 @resize-stop="resizeContentHeight"
                                 class="ui-corner-all vtp-fh-w75">
                    <div v-html="project.project_data.sheet"></div>
                </resizable-block>
                <div id="vtp-projectdata-sheet-info" class="ui-corner-all vtp-fh-w20">
                    <p>
                        Erstellt von: <span>{{ project.user.username }}</span>
                    </p>
                    <p>
                        Erstellt am: <span>{{ getDate(project.created) }}</span>
                    </p>
                    <br/>
                    <p>{{ $t('Linked Records') }}:</p>
                    <p>{{ $t('label.project') }}: <span>{{ resourceInfo.prjc }}</span></p>
                    <p>{{ $t('label.lexicon') }}: <span>{{ resourceInfo.lexc }}</span></p>
                    <p>{{ $t('label.pdf') }}: <span>{{ resourceInfo.pdfc }}</span></p>
                    <p>{{ $t('label.textlink') }}: <span>{{ resourceInfo.telic }}</span></p>
                    <p>{{ $t('label.link') }}: <span>{{ resourceInfo.linkc }}</span></p>
                    <p>{{ $t('label.book') }}: <span>{{ resourceInfo.bookc }}</span></p>
                    <p>{{ $t('label.address') }}: <span>{{ resourceInfo.adrc }}</span></p>
                </div>
            </div>
        </fieldset>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ResizableBlock from "../helpers/ResizableBlock.vue";
    import openResourcePopupMixin from "../../mixins/openResourcePopupMixin";

    export default {
        name: "AppProject",
        components: { ResizableBlock },
        mixins: [openResourcePopupMixin],
        data() {
            return {
                project: null,
                resourceInfo: null
            }
        },
        computed: {
            ...mapGetters(['get']),
            getDate: () => {
                return (date) => {
                    return moment(date).format('DD.MM.YYYY');
                }
            }
        },
        created() {
            axios(`/api/v1/projects/${this.$route.params.projectId}`)
                .then(({data}) => {
                    if (!data.hasOwnProperty('success')) {
                        this.project = data.project;
                        this.resourceInfo = data.resourceInfo;
                        this.$store.commit('setResourceOwner', data.isOwner);
                        this.$store.commit('setResourceInfo', data.resourceInfo);
                        this.$store.commit('setResourceId', this.$route.params.projectId);
                        VueBus.$emit('project:loaded', data.project);

                        setTimeout(() => {
                            this.openResourcePopup('#vtp-projectdata-sheet-view')
                        });
                    } else {
                        this.$store.commit('set', {key: 'inProject', value: false});
                        this.$store.commit('resetResource');
                    }
                })
                .catch(err => {
                    console.dir(err);
                });
        },
    }
</script>

<style scoped lang="scss">
    #vtp-projectdata-sheet-view {
        height: 600px;
    }
</style>
