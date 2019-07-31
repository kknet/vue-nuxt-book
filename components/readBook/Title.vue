<template>
<transition name="slide-down">
    <div class="title-wrapper" v-show="menuVisible">
        <div class="left" @click="$router.go(-1)">
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
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    methods: {
        more() {
            this.setShowMore(!this.showMore)
        }
    },
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
