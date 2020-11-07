export default {
    computed: {
        showTags() {
            return /conversation|prj|lex|pdf|teli|adr|book|link/.test(this.$route.name) &&
                this.get('user') !== null &&
                this.getResource('id') === null && this.get('conversationInstance') === null;
        }
    }
}
