<template>
<transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible == 2">
        <div class="setting-theme">
            <div class="setting-theme-item" v-for="(item, index) in themeList" :key="index" @click="setTheme(item.name)">
                <div class="preview" :class="{'selected': item.name === defaultTheme}" :style="{background: item.style.body.background}"></div>
                <div class="text" :class="{'selected': item.name === defaultTheme}">{{item.name}}</div>
            </div>
        </div>
    </div>
</transition>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
import {themeList} from '@/assets/js/book'
let thems
if (process.client) {
     thems = require('@/assets/js/cache') 
}  
export default {
    mixins: [mixin],
    data() {
        return {
            themeList: themeList(),
            defaultTheme:''
        }
    },

    mounted () {
        this.defaultTheme = thems.theme.getTheme()
    },
    methods: {
        setTheme(name) {
            this.setDefaultTheme(name)
            this.currentBook.rendition.themes.select(this.defaultTheme)
            this.initGlodTheme()
        }

    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.setting-wrapper {
    position: absolute;
    bottom: 48px;
    left: 0;
    z-index: 300;
    width: 100%;
    height: 90px;
    background: #cecece;
    box-shadow: 0 -8px 8px rgba(0, 0, 0, .15);
    color: #575a5f;
    .setting-theme {
        height: 100%;
        display: flex;

        .setting-theme-item {
            flex: 1;
            display: flex;
            flex-direction: column;
            padding: 5px;
            box-sizing: border-box;

            .preview {
                flex: 1;
                border: 1px solid #ccc;
                box-sizing: border-box;

                &.selected {
                    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, .1);
                    border: 1.5px solid #333;
                }
            }

            .text {
                flex: 0 0 20px;
                font-size: 14px;
                @include center;
                &.selected {
                    color: #333;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>
