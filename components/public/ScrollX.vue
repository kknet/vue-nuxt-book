<template>
    <div class="horizontal-container">
        <div class="scroll-wrapper" ref="scroll">
            <div class="scroll-content">
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
    mounted() {
        this.$nextTick(() => {
            this.init();
        })
    },
    beforeDestroy() {
        this.scroll.destroy();
    },
    methods: {
        init() {
            this.scroll = new BScroll(this.$refs.scroll, {
                scrollX: true,
                click: false,
                probeType: 1 // listening scroll hook
            });
            this._registerHooks(["scroll", "scrollEnd"], pos => {
            });
        },
        _registerHooks(hookNames, handler) {
            hookNames.forEach(name => {
                this.scroll.on(name, handler);
            });
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        }
    }
};
</script>

<style lang="scss" scoped>
.horizontal-container {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;

    .scroll-wrapper {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
    }

    .scroll-content {
        display: inline-block;
    }

    .scroll-item {
        display: inline-block;
    }

}
</style>
