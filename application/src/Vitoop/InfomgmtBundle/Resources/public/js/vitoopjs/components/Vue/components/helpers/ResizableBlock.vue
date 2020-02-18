<template>
    <div class="app-block-resizer" :style="{height: `${height}px`}">
        <slot></slot>
        <div class="app-block-resizer__trigger"
             @mousedown="resizeStart">
            <i class="fas fa-sort"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ResizableBlock",
        props: {
            height: {
                type: Number
            }
        },
        mounted() {
            const block = document.querySelector('.app-block-resizer');
            const trigger = document.querySelector('.app-block-resizer__trigger');
            const bottom = getComputedStyle(trigger).bottom;
            block.addEventListener('scroll', (e) => {
                trigger.style.bottom = `calc(${bottom} - ${e.target.scrollTop}px)`;
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
            triggerPositioningWhenScroll() {

            }
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
        }
    }
</style>
