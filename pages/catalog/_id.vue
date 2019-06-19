<template>
    <div>
        <van-nav-bar title="书籍目录" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <van-tabs v-model="active">
            <van-tab title="目录">
                <div class="catalog-list">
                    <Scroll class="scroll-warpper-app" ref="scroll" @scroll='scroll' listenScroll probeType='3'>
                        <div>
                            <div class="module-header">共{{list.length}}章</div>
                            <div class="chapter-bar">正文目录</div>
                            <ul>
                                <li class="border-bottom chapter-title" v-for="val of list" :key="val.link" @click="read(val.link)">{{val.title}}</li>
                            </ul>
                        </div>
                    </Scroll>
                    <ScrollTop :showFlag='showFlag' @backTop='backTop'/>
                </div>
            </van-tab>
            <van-tab title="书签">内容 4</van-tab>
        </van-tabs>
    </div>
</template>

<script>
import Scroll from "@/components/public/Scroll"
import {scrollTop} from '@/assets/js/mixins'
export default {
    mixins:[scrollTop],
    validate({ params }) {
        if (params.id.length == 24) {
            return true
        }
        return false
    },

    async asyncData({$axios,route,store}) {
        const id = route.params.id
        const data = await $axios.$get(`/api/chapters?id=${id}`)
        if (data.code == 10000) {
            return {
                list: data.data
            }
        }
    },

    data () {
        return {
            active:0,
            list: []
        }
    },
    components: {
        Scroll,
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },

        read(link) {

        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';
@import '~@/assets/css/mixin.scss';
.catalog-list {
    @include scroll(90px,0,#fff);
}
.module-header {
    font-size: 14px;
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
}
.chapter-bar {
    font-size: 14px;
    color: #969ba3;
    background: #f6f7f9;
    padding: 0 20px;
    height: 50px;
    line-height: 50px;
}
.chapter-title {
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    color: #333;
}
</style>
