<template>
    <div class="reader" @touchstart='touchstart'  @touchend='touchend'>
        <div class="title-top">
            <div class="chapter-title">章节</div>
        </div>
        <div v-for="(items,index) in content" :key="index" class="article">
            <h4 class="chapter-t" :style="{fontSize:fontSize+0.5+'vw'}">第一张：单鹄寡凫</h4>
            <p :style="{fontSize:fontSize + 'vw'}" v-for="(item,index) in items" :key="index">{{item}}</p>
        </div>
    </div>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
let font
if (process.client) {
     font = require('@/assets/js/cache') 
} 
export default {
    props: {
        content: {
            type:Array,
            default() {
                return []
            }
        }
    },

    mixins:[mixin],
    data() {
        return {
            
        }
    },

    mounted () {
        this.setFontSize(font.fontSize.getFontSize())
    },

    methods: {
        touchstart(e) {
            this.touchStartX = e.changedTouches[0].clientX // 手指第一次点击的位置坐标
            this.touchStartTime = e.timeStamp // 点击的时间长度
        },

        touchend(e) {
            e.stopPropagation(); // 禁止传播
            const offsetX = e.changedTouches[0].clientX - this.touchStartX // 偏移的距离
            const time = e.timeStamp - this.touchStartTime // 偏移的时间
            if (time < 500 && offsetX > 40) {
                // this.prevPage() // 下一页
            } else if (time < 500 && offsetX < -40) {
                // this.nextPage() // 上一页
            } else {
                this.showTitleAndMenu()
            }
        },

        showTitleAndMenu() {
            if (this.menuVisible) {
                this.setMenuVisible(false)
                // this.setFontFamilyVisible(false)
            } else {
                this.setMenuVisible(true)
            }
            this.setSettingVisible(-1)
            this.setShowMore(false)
        },
    },
}
</script>

<style lang="scss" scoped>
.reader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #cecece;
    color: #575a5f;
}
.title-top {
    position: fixed;
    top: 0;
    z-index: 1;
    height: 50px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.4);
    .chapter-title {
        width: calc(100% - 40px);
        height: 50px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 14px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
}
.article {
    padding: 0 15px 15px 15px;
    margin-top: 50px;
    h4 {
        font-weight: bold;
    }
    p {
        text-indent: 25px;
        margin: 10px 0px 10px 0px;
        line-height: 1.4;
        color: #575a5f;
    }
}
</style>
