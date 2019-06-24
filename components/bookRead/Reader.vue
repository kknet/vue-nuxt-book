<template>
    <div class="reader" @touchstart='touchstart'  @touchend='touchend'>
        112121212
    </div>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    data() {
        return {

        }
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
</style>
