<template>
    <transition name="fade">
        <div class="backTop-warpper" v-show='showFlag' @click="back">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-icon-test"></use>
        </svg>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
        showFlag: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        back() {
            this.$emit('backTop')
        },
    }
}
</script>

<style lang="scss">
.backTop-warpper {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.3);
    right: 5%;
    bottom: 5vw;
    position: fixed;
    z-index: 1000;
    background: #fff;

    .icon {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 20px;
        transform: translate(-50%, -50%);
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active below version 2.1.8 */
    {
    opacity: 0;
}
</style>
