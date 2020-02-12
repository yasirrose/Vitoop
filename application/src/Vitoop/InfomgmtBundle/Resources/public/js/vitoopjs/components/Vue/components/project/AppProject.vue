<template>
    <div id="vtp-content">
        <fieldset class="ui-corner-all margin-top-3">
            <div id="vtp-projectdata-box" v-if="project !== null">
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
                            $('#vtp-projectdata-sheet-view').on('click', 'a', function (e) {
                                let resourcesParts = this.href.match(/\/(\d+)/);
                                if (resourcesParts !== null) {
                                    e.preventDefault();
                                    vitoopApp.openResourcePopup(resourcesParts[1]);
                                    return false;
                                }
                            });
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
