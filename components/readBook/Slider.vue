<template>
    <div>
        <!-- 左边侧滑目录 -->
        <transition name="slide-right">
            <div class="slider-left" v-show="menuVisible&&settingVisible==0">
                <div class="catalog">
                    <span :class="{active:index==active}" v-for="(val,index) of tab" :key="val" @click="onTab(index)">
                        <font>{{val}}</font> <i v-if="index==0">(共{{bookRead.catalog.length}}章)</i><i v-if="index==1">(0个书签)</i>
                    </span>
                </div>
                <div class="catalog-list" v-show="active==0">
                    <DynamicScroller :items="bookRead.catalog" :min-item-size="54" class="scroller">
                        <template v-slot="{ item, index, active }">
                            <DynamicScrollerItem 
                                :item="item" 
                                :active="active" 
                                :size-dependencies="[item.link]" 
                                :data-index="index" 
                                :data-active="active" 
                                :title="item.title" :class="[title === item.title?'active':'',item.isVip?'vip':'']" class="border-bottom chapter-title" @click.native="click_chapter_title(index)">
                            <span class="title">{{item.title}}</span>
                            <svg v-if="item.isVip" class="icon" aria-hidden="true">
                                <use xlink:href="#icon-suo"></use>
                            </svg>
                            </DynamicScrollerItem>
                        </template>
                    </DynamicScroller>
                </div>
                <div v-show="active==1"></div>
            </div>
        </transition>
        <transition name="fade">
            <div class="fliter fliter1" v-show="settingVisible==0" @click="onClose"></div>
        </transition>
    </div>
</template>

<script>
import {
    mixin,
    scrollTop
} from '@/assets/js/mixins'
import {
    DynamicScroller,
    DynamicScrollerItem
} from 'vue-virtual-scroller'
export default {
    mixins: [mixin, scrollTop],
    components: {
        DynamicScroller,
        DynamicScrollerItem
    },

    props: {
        title: {
            type: String,
            default: ''
        },

    },

    data() {
        return {
            active: 0,
            tab: [`目录`, '书签'],
            index: 0,
            list: [],
            newArr: []
        }
    },

    methods: {
        onTab(i) {
            this.active = i
        },

        click_chapter_title(index) {
            this.setSettingVisible(-1)
            this.setMenuVisible(false)
            this.$emit('chapter', index)
        },

        onClose() {
            this.setSettingVisible(-1)
            this.setMenuVisible(false)
        },
    },

}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
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
    overflow: hidden;
}

.chapter-title {
    padding: 0 20px;
    height: 45px;
    line-height: 45px;
    color: #575a5f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include ellipsis();
}

.catalog {
    display: flex;
    align-items: center;
    height: 45px;
    background: #cecece;
    span {
        flex: 1;
        display: flex;
        height: 45px;
        line-height: 45px;
        align-items: center;
        justify-content: center;
    }

    .active {
        border-bottom: 2px solid #f44;
    }
    i {
        font-size: 12px;
        margin-left: 5px;
    }
}

.fliter1 {
    position: fixed;
    z-index: 300;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
}

.active {
    font-weight: bold;
    font-size: 16px;
}
.vip {
    color: #999;
}
.no-data {
    text-align: center;
    margin-top: 30px;
    padding-top: 15px;
}
.scroller {
  height: 100%;
}
.title {
    width: 100%;
    @include ellipsis();
}
</style>
