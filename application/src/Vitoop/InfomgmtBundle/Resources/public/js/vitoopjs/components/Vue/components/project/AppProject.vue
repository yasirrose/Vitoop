<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box" v-if="getProject">
                <resizable-block id="vtp-projectdata-sheet-view"
                                 :height="projectHeightProp"
                                 @resize-stop="resizeContentHeight"
                                 class="ui-corner-all vtp-fh-w75">
                    <div v-html="getProject.project_data.sheet"></div>
                </resizable-block>
                <div v-if="get('resource').info"
                     id="vtp-projectdata-sheet-info"
                     class="ui-corner-all vtp-fh-w20">
                    <p>
                        Erstellt von: <span>{{ getProject.user.username }}</span>
                    </p>
                    <p>
                        Erstellt am: <span>{{ getDate(getProject.created) }}</span>
                    </p>
                    <br/>
                    <p>{{ $t('Linked Records') }}:</p>
                    <p>{{ $t('label.project') }}: <span>{{ get('resource').info.prjc }}</span></p>
                    <p>{{ $t('label.lexicon') }}: <span>{{ get('resource').info.lexc }}</span></p>
                    <p>{{ $t('label.pdf') }}: <span>{{ get('resource').info.pdfc }}</span></p>
                    <p>{{ $t('label.textlink') }}: <span>{{ get('resource').info.telic }}</span></p>
                    <p>{{ $t('label.link') }}: <span>{{ get('resource').info.linkc }}</span></p>
                    <p>{{ $t('label.book') }}: <span>{{ get('resource').info.bookc }}</span></p>
                    <p>{{ $t('label.address') }}: <span>{{ get('resource').info.adrc }}</span></p>
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
        props: {
            projectHeightProp: {
                type: Number
            }
        },
        computed: {
            ...mapGetters(['get','getProject']),
            getDate: () => {
                return (date) => {
                    return moment(date).format('DD.MM.YYYY');
                }
            },
        },
        mounted() {
            setTimeout(() => {
                this.openResourcePopup('#vtp-projectdata-sheet-view');
            });
        },
    }
</script>

<style scoped lang="scss">
    #vtp-projectdata-sheet-view {
        transition: .3s;
        height: 600px;
    }
</style>
