<template>
    <div style="margin: -24px 0 0 0;">
        <form id="vtp-search-bytags-form"
              style="padding: 0 8px 0 0.5em"
              action=""
              method="get"
              novalidate="novalidate">
            <div id="vtp-search-bytags-form-input-container">
                <input id="vtp-search-bytags-taglist"
                       name="taglist[]"
                       type="text"
                       placeholder="tag (Suchbegriff) eingeben">
            </div>
            <div id="vtp-search-bytags-form-buttons">
                <input id="vtp-search-bytags-restype"
                       name="restype"
                       type="hidden"
                       :value="getResource('type')"/>
                <select id="vtp-search-bytags-tagcnt"
                        title="Übereinstimmungen der Tags"
                        name="tagcnt"
                        size="1"
                        style="width: 52px">
                    <option value="">-</option>
    <!--                {% for i in 1..9 %}-->
    <!--                <option value="{{ i }}" {{ ((tagcnt is defined) and (tagcnt == i) ) ? 'selected' : '' }}>{{ i }}</option>-->
    <!--                {% endfor %}-->
                </select>
                <button id="vtp-search-bytags-form-submit"
                        class="vtp-button ui-state-default ui-button ui-widget ui-corner-all ui-button-icon-only"
                        type="submit"
                        name="submit"
                        value="Suche">
                    <span class="ui-button-icon-primary ui-icon ui-icon-refresh"></span>
                </button>
                <span id="vtp-search-bytags-form-buttons-vue">
                    <help-button></help-button>
                    <search-toggler></search-toggler>
                </span>
            </div>
        </form>
        <app-tag-list />
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import HelpButton from '../SecondSearch/HelpButton.vue'
    import SearchToggler from '../SecondSearch/SearchToggler.vue'
    import AppTagList from "./AppTagList.vue"

    export default {
        name: "SearchByTags",
        components: {
            HelpButton, SearchToggler, AppTagList
        },
        computed: {
            ...mapGetters(['getResource'])
        },
        mounted() {
            try {
                vitoopApp.tagSearch.init();
            } catch (e) {

            }
        }
    }
</script>

<style scoped>

</style>