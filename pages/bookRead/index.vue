<template>
<div>
    <Title @more='more' />
    <Menu />
    <More v-show="showMore" />
    <transition name="fade">
        <div class="fliter" v-show="showMore" @touchmove='showMore=false' @click="showMore=false"></div>
    </transition>
</div>
</template>

<script>
import Title from '@/components/bookRead/Title'
import Menu from '@/components/bookRead/Menu'
import More from '@/components/bookRead/More'

export default {
    data() {
        return {
            showMore: false
        }
    },
    components: {
        Title,
        Menu,
        More,
    },

    methods: {
        more() {
            this.showMore = !this.showMore
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
        padding-left: 15px;
    }

    .right {
        padding-right: 15px;
    }
}

.fliter {
    position: fixed;
    z-index: 150;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
</style>
