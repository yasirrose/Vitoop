<template>
    <div class="app-block-resizer"
                           ref="perfect_scrollbar"
                           :style="{height: `${height}px`}">
        <slot></slot>
        <div class="app-block-resizer__trigger"
             @mousedown="resizeStart">
            <i class="fas fa-sort"></i>
        </div>
    </div>
</template>

<script>
    //import VuePerfectScrollbar from 'vue-perfect-scrollbar'
    // import PerfectScrollbar from 'vue3-perfect-scrollbar'
    import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
    import EventBus from "../../../../app/eventBus";
    export default {
        name: "ResizableBlock",
        components: {},
        props: {
            height: {
                type: Number
            }
        },
        mounted() {
            const block = document.querySelector('.app-block-resizer');
            const trigger = document.querySelector('.app-block-resizer__trigger');
            //const bottom = getComputedStyle(trigger).bottom;
            // block.addEventListener('scroll', (e) => {
            //     trigger.style.bottom = `calc(${bottom} - ${e.target.scrollTop}px)`;
            // });
            EventBus.$on('perfect-scroll:resize', () => {
                setTimeout(() => {
                    this.$refs.perfect_scrollbar.update();
                }, 500);
            });
        },
        methods: {
            resizeStart(e) {
                let diff = 0;
                let y = e.screenY;
                const trigger = document.querySelector('.app-block-resizer__trigger');
                const cursorOffsetY = e.clientY - trigger.getBoundingClientRect().y;
                const block = document.querySelector('.app-block-resizer');
                const blockHeight = block.offsetHeight;
                trigger.style.cssText = `
                    position: fixed;
                    top: ${e.clientY - cursorOffsetY}px;
                    left: ${e.clientX - e.offsetX}px;
                `;

                const mouseMove = (e) => {
                    diff = e.screenY - y;
                    trigger.style.top = `${e.clientY - cursorOffsetY}px`;
                    block.style.height = `${blockHeight + diff}px`;
                    this.$emit('resize', blockHeight + diff);
                };

                document.body.addEventListener('mousemove', mouseMove);
                document.body.addEventListener('mouseup', () => {
                    trigger.style.cssText = `
                        position: absolute;
                        top: initial;
                        left: initial;
                        bottom: calc(1px - ${block.scrollTop}px);
                    `;
                    document.body.removeEventListener('mousemove', mouseMove);
                    this.$emit('resize-stop', blockHeight + diff);
                });
            },
        }
    }
</script>

<style scoped lang="scss">
    .app-block-resizer {
        position: relative;

        &__trigger {
            color: #2779aa;
            cursor: pointer;
            position: absolute;
            bottom: 1px;
            right: 4px;
            z-index: 1;
        }
    }
</style>
