<template>
    <div id="vtp-filterbox">
        <div id="vtp-search-bytags-taglistbox"
             class="ui-corner-all">
                <span class="vtp-search-bytags-tag ui-corner-all"
                      :class="{
                        'vtp-search-bytags-tag-ignore': tag.isIgnored,
                        'vtp-search-bytags-tag-bulb': tag.isHighlighted,
                        'vtp-search-bytags-tag-active': tag.extended
                      }"
                      v-for="tag in tags"
                      :key="tag.text">
                    <span class="vtp-icon-tag ui-icon ui-icon-tag"
                          @click="extendTag(tag,$event)">
                    </span>
                    <span class="vtp-search-bytags-content"
                          @click="extendTag(tag,$event)">
                        {{ tag.text }}
                    </span>
                    <span title="in der Ergebnisliste nach oben sortieren"
                          class="ui-icon ui-icon-lightbulb tag-icons-to-hide vtp-icon-bulb"
                          style="display: none"
                          @click="highlightTag(tag)"></span>
                    <span title="Datensätze mit diesem Tag aussortieren"
                          class="ui-icon ui-icon-cancel tag-icons-to-hide vtp-icon-cancel"
                          style="display: none"
                          @click="ignoreTag(tag)">
                    </span>
                    <span title="Tag entfernen"
                          class="vtp-icon-close vtp-uiaction-search-bytags-removetag ui-icon ui-icon-close"
                          @click="removeTag(tag)">
                    </span>
                </span>
            <button id="vtp-icon-clear-taglistbox"
                    class="vtp-button vtp-uiaction-search-bytags-clear-taglistbox"
                    @click="removeAllTags">
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppTagList",
        props: {
            tags: {
                type: Array
            }
        },
        methods: {
            extendTag(tag, event) {
                this.$emit('tag:extend', {tag, event});
            },
            removeTag(tag) {
                this.$emit('tag:remove', tag);
            },
            highlightTag(tag) {
                this.$emit('tag:highlight', tag);
            },
            ignoreTag(tag) {
                this.$emit('tag:ignore', tag);
            },
            removeAllTags(event) {
                this.$emit('tags:remove-all', event);
            }
        }
    }
</script>

<style scoped>

</style>
