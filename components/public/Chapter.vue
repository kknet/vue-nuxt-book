<template>
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
            <ScrollTop :showFlag='showFlag' @backTop='backTop' />
        </div>
    </van-tab>
    <van-tab title="书签">内容 4</van-tab>
</van-tabs>
</template>

<script>
import Scroll from "@/components/public/Scroll"
import {scrollTop} from '@/assets/js/mixins'
export default {
    mixins:[scrollTop],
    props: {
        list: {
            type: Array,
            default() {
                return []
            }
        }
    },

    data() {
        return {
            active:0,
        }
    },

    components: {
        Scroll,
    }
}
</script>

<style lang="scss" scoped>
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
