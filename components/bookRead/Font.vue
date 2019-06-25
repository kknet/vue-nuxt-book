<template>
<transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible&&settingVisible == 3">
        <div class="setting-font-size">
            <div class="preview" :style="{fontSize: fontSizeList[0].fontSize + 'vw'}">A</div>
            <div class="select">
                <div class="select-wrapper" v-for="item in fontSizeList" :key="item.fontSize" @click="onSetFontSize(item.fontSize)">
                    <div class="line"></div>
                    <div class="point-wrapper">
                        <div class="point" v-show="fontSize == item.fontSize">
                            <div class="small-point"></div>
                        </div>
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <div class="preview" :style="{fontSize: fontSizeList[fontSizeList.length - 1].fontSize + 'vw'}">A</div>
        </div>
        <!-- <div class="setting-font-family">
            <div class="setting-font-family-text-wrapper" @click="showFontFamilyPopup">
                <span class="setting-font-family-text">{{defaultFontFamily}}</span>
            </div>
            <div class="setting-font-family-icon-wrapper">
                <span class="icon-forward"></span>
            </div>
        </div> -->
    </div>
</transition>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
import {FONT_SIZE_LIST} from '@/assets/js/book'
let font
if (process.client) {
     font = require('@/assets/js/cache') 
} 
export default {
    mixins: [mixin],
    data() {
        return {
            fontSizeList: FONT_SIZE_LIST,
        }
    },

    methods: {
        onSetFontSize(size) {
            font.fontSize.setFontSize(size)
            this.setFontSize(size)
        },
        showFontFamilyPopup() {
            this.setFontFamilyVisible(true)
        }
    },

}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.setting-wrapper {
    position: absolute;
    bottom: 48px;
    left: 0;
    z-index: 280;
    display: flex;
    flex-direction: column;
    width: 100%;
    height:90px;
    background: #cecece;
    
    box-shadow: 0 -8px 8px rgba(0, 0, 0, .15);

    .setting-font-size {
        flex: 2;
        display: flex;
        height: 100%;

        .preview {
            flex: 0 0 40px;
            @include center;
            color: #575a5f;
        }

        .select {
            display: flex;
            flex: 1;

            .select-wrapper {
                flex: 1;
                display: flex;
                align-items: center;
                color: #575a5f;
                &:first-child {
                    .line {
                        &:first-child {
                            border-top: none;
                        }
                    }
                }

                &:last-child {
                    .line {
                        &:last-child {
                            border-top: none;
                        }
                    }
                }

                .line {
                    flex: 1;
                    height: 0;
                    border-top: 1px solid #575a5f;
                }

                .point-wrapper {
                    position: relative;
                    flex: 0 0 0;
                    width: 0;
                    height: 7px;
                    border-left: 1px solid #575a5f;

                    .point {
                        position: absolute;
                        top: -8px;
                        left: -10px;
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #cecece;
                        border: 1px solid rgba(0, 0, 0, .15);
                        box-shadow: 0 4px 4px rgba(0, 0, 0, .15);
                        @include center;

                        .small-point {
                            width: 5px;
                            height:5px;
                            background: black;
                            border-radius: 50%;
                        }
                    }
                }
            }
        }
    }

    .setting-font-family {
        flex: 1;
        font-size: 14px;
        @include center;

        .setting-font-family-text-wrapper {
            @include center;
        }

        .setting-font-family-icon-wrapper {
            @include center;
        }
    }
}
</style>
