<template>
    <div id="vtp-content">
        <div v-html="welcome_text" class="blue-bordered" style="padding: 30px"></div>
    </div>
</template>

<script>
    export default {
        name: "UserHome",
        data() {
            return {
                welcome_text: null
            }
        },
        mounted() {
            axios('/api/v1/vitoop-blog')
                .then(({data}) => {
                    this.welcome_text = data.sheet;
                })
                .catch(err => console.dir(err));
        }
    }
</script>

<style scoped lang="scss">
    .blue-bordered {
        border-radius: 6px;
        border: 1px solid #aed0ea;
    }
</style>
