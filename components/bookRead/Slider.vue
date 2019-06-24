<template>
    <div>
        <!-- 左边侧滑目录 -->
            <transition name="slide-right">
                <div class="slider-left" v-show="menuVisible&&settingVisible==0">
                    <div class="catalog">
                        <span :class="{active:index==active}" v-for="(val,index) of tab" :key="val" @click="onTab(index)">{{val}}</span>
                        
                    </div>
                    <div class="catalog-list" v-show="active==0">
                        <Scroll class="scroll-warpper-app" ref="scroll" :data='bookRead.catalog' @scroll='scroll' listenScroll probeType='3'>
                            <div>
                                <div class="module-header">共{{bookRead.catalog.length}}章</div>
                                <div class="chapter-bar">正文目录</div>
                                <ul>
                                    <li class="border-bottom chapter-title" v-for="val of bookRead.catalog" :key="val.link">{{val.title}}</li>
                                </ul>
                            </div>
                        </Scroll>
                        <ScrollTop :showFlag='showFlag' @backTop='backTop' />
                    </div>
                    <div v-show="active==1"></div>
                </div>
            </transition>
            <transition name="fade">
                <div class="fliter fliter1" v-show="settingVisible==0"  @click="setSettingVisible(-1)"></div>
            </transition>
    </div>
</template>

<script>
import {mixin,scrollTop} from '@/assets/js/mixins'
import Scroll from "@/components/public/Scroll"
export default {
    mixins:[mixin,scrollTop],
    components: {
        Scroll,
    },

    data () {
        return {
            active:0,
            tab:['目录','书签']
        }
    },

    methods: {
        onTab(i) {
            this.active = i
        }
    },
}
</script>

<style lang="scss" scoped>
.slider-left {
    position: relative;
    height: 100vh;
    width: 80%;
    z-index: 3000;
    overflow-x: hidden;
}
.catalog-list {
    position: absolute;
    left: 0;
    top: 12.1vw;
    width: 100%;
    bottom: 0;
    background: #cecece;
    color: #575a5f;
    .scroll-warpper-app {
        height: 100%;
        overflow: hidden;
    }
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
    color: #575a5f;
}
.catalog {
    display: flex;
    align-items: center;
    height: 45px;
    background: #cecece;
    span {
        flex: 1;
        height: 45px;
        line-height: 45px;
        text-align: center;
    }
    .active {
        border-bottom: 2px solid #f44;
    }
}
.fliter1 {
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,.4);
}
</style>
