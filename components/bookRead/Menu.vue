<template>
<transition name="slide-up">
    <div class="menu-wrapper">
        <div class="icon-wrapper" @click="menu(0)">
            <svg class="icon fenlei2" aria-hidden="true">
                <use xlink:href="#icon-fenlei2"></use>
            </svg>
        </div>
        <div class="icon-wrapper" @click="menu(1)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-jindutiao"></use>
            </svg>
        </div>
        <div class="icon-wrapper" @click="menu(2)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-taiyang"></use>
            </svg>
        </div>
        <div class="icon-wrapper" @click="menu(3)">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-A"></use>
            </svg>
        </div>
        <!-- <EbookSettingFont />
        <EbookSettingFontPopup />
        <EbookSettingTheme /> -->
        
    </div>
</transition>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    data () {
        return {
            showSlider:false
        }
    },

    components: {
        
    },

    methods: {
        menu(i) {
            this.setSettingVisible(i)
        },
    },
}
</script>

<style lang="scss" scoped>
.menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 200;
    display: flex;
    width: 100%;
    height: 48px;
    background: #cecece;
    color: #575a5f;
    box-shadow: 0 -8px 8px rgba(0, 0, 0, .15);
    font-size: 20px;

    &.hide-box-shadow {
        box-shadow: none;
    }
    .fenlei2 {
        font-size: 15px;
    }
    .icon-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
