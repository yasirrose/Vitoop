<template>
    <div>
        <label class="ui-state-default ui-corner-all"
               v-if="$store.state.admin">
            Import Records
            <input type="file" @change="uploadFile" />
        </label>
    </div>
</template>

<script>
export default {
    name: "ImportRecords",
    data() {
        return {
            file: null,
        }
    },
    methods: {
        uploadFile({ target: { files } }) {
            this.file = files[0];
            if (this.file) {
                const formData = new FormData();
                formData.append('file', this.file);
                axios.post('/api/v1/imported-resources', formData)
                    .then(response => {
                        VueBus.$emit('notification:show', 'Record has been imported.');
                        this.file = null;
                    });
            }
        },
    },
};
</script>

<style scoped lang="scss">
    label.ui-state-default {
        padding: 0 6px;
        height: 22px;
        display: flex;
        align-items: center;

        input {
            width: 0;
            height: 0;
            opacity: 0;
            position: absolute;
        }
    }
</style>
