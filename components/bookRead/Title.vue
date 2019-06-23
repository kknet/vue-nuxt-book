<template>
<transition name="slide-down">
    <div class="title-wrapper" >
        <div class="left">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-houtui"></use>
            </svg>
        </div>
        <div class="right" @click="more">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-gengduo"></use>
            </svg>
        </div>
    </div>
</transition>
</template>

<script>
export default {
    methods: {
        more() {
            this.$emit('more')
        }
    }
}
</script>

<style lang="scss" scoped>
.title-wrapper {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    top: 0;
    left: 0;
    z-index: 210;
    width: 100%;
    height: 48px;
    box-shadow: 0 8px 8px rgba(0, 0, 0, .15);
    font-size: 20px;
    background: #cecece;
    color: #575a5f;
    .left {
        padding-left: 5px;
    }
    .right {
        padding-right: 5px;
    }
    .icon {
        padding: 10px;
    }
}
</style>
