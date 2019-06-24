<template>
    <div class="read-warp">
        <Title @more='more' />
        <Menu @menu='menu'/>
        <More v-show="showMore" />
        <transition name="fade">
            <div class="fliter" v-show="showMore"  @click="showMore=false"></div>
        </transition>
        <!-- 左边侧滑目录 -->
        <transition name="slide-right">
            <div class="slider-left" v-if="settingVisible==0">
                <Chapter :list='bookRead.catalog'  top='12vw' v-if="settingVisible==0"/>
            </div>
        </transition>
        <transition name="fade">
            <div class="fliter fliter1" v-show="settingVisible==0"  @click="setSettingVisible(-1)"></div>
        </transition>
        <!-- 进度条 -->
        <Progress/>
    </div>
</template>

<script>
import Title from '@/components/bookRead/Title'
import Menu from '@/components/bookRead/Menu'
import More from '@/components/bookRead/More'
import Progress from '@/components/bookRead/Progress'
import * as types from '@/store/mutations-type'
import Chapter from "@/components/public/Chapter"
import {mixin,scrollTop} from '@/assets/js/mixins'
import Scroll from "@/components/public/Scroll"
export default {
    mixins:[mixin,scrollTop],
    async asyncData({$axios,store,params}) {
        const id = params.id
        const [data,data1] = await Promise.all([
            $axios.$get(`/api/book?id=${id}`),
            $axios.$get(`/api/chapters?id=${id}`)
        ])
        if (data.code == 10000 && data1.code == 10000) {
            let book = data.book
            book.catalog = data1.data
            store.commit(types.BOOKREAD, book)
        }
    },

    data() {
        return {
            showMore: false,
            showSlider: false,
            showProgress: false,
            active:0
        }
    },
    components: {
        Title,
        Menu,
        More,
        Chapter,
        Scroll,
        Progress
    },

    mounted () {
        console.log(document.querySelectorAll('link'));
            
    },

    methods: {
        more() {
            this.showMore = !this.showMore
        },

        menu(i) {
            if (i == 1) {
                this.showSlider = true
            } else if( i == 2) {
                this.showProgress = true
            }
        }
    },


    watch: {
        // settingVisible(v) {
        //     if (v>-1) {
        //         if (v==0) {
        //             setTimeout(() => {
        //                 document.querySelector('.catalog-list').style.width = '100%'
        //                 setTimeout(() => {
        //                     document.querySelector('.catalog-list').style.width = '80%'
        //                 }, 300);
        //             }, 0);
        //         } 
        //     } else {
        //             document.querySelector('.catalog-list').style.width = '100%'
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.catalog-list {
    height: 100%;
    width: 100%;
    @include scroll(45px,0,#fff);
}
.read-warp {
    overflow: hidden;
}
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
.fliter1 {
    position: fixed;
    z-index: 150;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
}
.slider-left {
    position: relative;
    height: 100vh;
    width: 80%;
    z-index: 3000;
}

</style>
<style scoped>
.slider-left >>> .van-tab__pane {
    width: 100%;
}

.slider-left >>> .van-tabs__wrap {
    width: 100%;
}
</style>

