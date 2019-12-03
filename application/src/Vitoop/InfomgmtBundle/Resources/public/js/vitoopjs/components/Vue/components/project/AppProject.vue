<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div v-if="project !== null"
                 id="vtp-projectdata-box">
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
            <div v-else>
                Projekt ist für diesen Benutzer nicht verfügbar
            </div>
        </fieldset>
    </div>
</template>

<script>
    export default {
        name: "AppProject",
        data() {
            return {
                project: null,
                resourceInfo: null
            }
        },
        computed: {
            getDate: () => {
                return (date) => {
                    return moment(date).format('DD.MM.YYYY');
                }
            }
        },
        beforeCreate() {
            axios(`/api/v1/projects/${this.$route.params.projectId}`)
                .then(({data}) => {
                    if (!data.hasOwnProperty('success')) {
                        this.project = data.project;
                        this.resourceInfo = data.resourceInfo;
                        this.$store.commit('setResourceOwner', data.isOwner);
                        this.$store.commit('setResourceInfo', data.resourceInfo);
                        this.$store.commit('setResourceId', this.$route.params.projectId);
                        VueBus.$emit('project:loaded', data.project);
                    } else {
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