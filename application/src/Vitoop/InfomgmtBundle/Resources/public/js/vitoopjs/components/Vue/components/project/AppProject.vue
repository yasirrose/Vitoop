<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box">
<!--                <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all"-->
<!--                     v-if="infoProjectData !== null && infoProjectData !== ''">-->
<!--                    <span class="vtp-icon ui-icon ui-icon-info"></span>{{ infoProjectData }}-->
<!--                </div>-->
                <div id="vtp-projectdata-sheet-view"
                     class="ui-corner-all vtp-fh-w75"
                     v-html="project.project_data.sheet">
                </div>
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
    export default {
        name: "AppProject",
        props: {
            project: {
                type: Object
            },
            resourceInfo: {
                type: Object
            }
        },
        computed: {
            getDate: () => {
                return (date) => {
                    return moment(date).format('DD.MM.YYYY');
                }
            }
        },
    }
</script>

<style scoped lang="scss">
    #vtp-projectdata-sheet-view {
        height: 600px;
    }
</style>