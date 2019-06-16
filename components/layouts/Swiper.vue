<template>
    <div class="swiper">
        <van-swipe :autoplay="5000" indicator-color="white">
            <van-swipe-item v-for="val of swiper" :key="val">
                <img :src="val"/>
        </van-swipe-item>
        </van-swipe>
    </div>
</template>

<script>
export default {
    props: {
        swiper: {
            type: Array,
            default () {
                return [];
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.swiper {
    height: 0;
    padding: 15px 4.5% 30% 4.5%;
    background: #fff;
}

img {
    width: 100%;
    border-radius: 5px;
    max-height: 102px;
    object-fit: cover;
}

.van-swipe {
    border-radius: 5px;
}
</style>
