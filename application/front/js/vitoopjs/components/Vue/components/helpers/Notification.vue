<template>
    <transition name="fade">
        <div class="vtp-notification vtp-uiinfo-info ui-state-highlight ui-corner-all" v-if="show">
            <span class="vtp-icon ui-icon ui-icon-info"></span><span>{{ message }}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Notification",
        data() {
            return {
                show: false,
                message: ''
            }
        },
        mounted() {
            VueBus.$on('notification:show', message => {
                this.show = true;
                this.message = message;
                setTimeout(() => {
                    this.show = false;
                    this.message = '';
                }, 3000);
            })
        }
    }
</script>

<style scoped lang="scss">
    .vtp-notification {
        top: 20px;
        right: 20px;
    }
</style>
