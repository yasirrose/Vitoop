<template>
    <div class="ui-corner-all margin-top-3">
        <div id="vtp-projectdata-box">
<!--            {% if infoprojectdata is defined and infoprojectdata is not empty %}-->
            <div class="vtp-uiinfo-info ui-state-highlight ui-corner-all">
                <span class="vtp-icon ui-icon ui-icon-info"></span>{{ "infoprojectdata" }}
            </div>
<!--            {% endif %}-->
            <div id="vtp-projectdata-sheet-view"
                 class="ui-corner-all vtp-fh-w75"
                 v-html="project.data">
            </div>
            <div id="vtp-projectdata-sheet-info" class="ui-corner-all vtp-fh-w20">
                <p>
                    Erstellt von: <span>{{ project.user_name }}</span>
                </p>
                <p>
                    Erstellt am: <span>{{ project.created }}</span>
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
    </div>
</template>

<script>
    export default {
        name: "AppProject",
        inject: ['project', 'resourceInfo'],
    }
</script>

<style scoped>

</style>