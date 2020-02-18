export default {
    methods: {
        resizeContentHeight(size) {
            this.$store.commit('set', {
                key: 'contentHeight',
                value: size + 32
            })
        }
    }
}
