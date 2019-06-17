<template>
    <div v-if="flag" class="text">
        <div class="close" @click="check" v-text="book.longIntro.trim().replace(/\s/g,'')">
        </div>
        <span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qianjin"></use>
            </svg>
        </span>
        
    </div>

    <div class="open" v-else v-html="formatText(book.longIntro)" @click="check">

    </div>
</template>

<script>
import mixin from "@/assets/js/mixins";
export default {
    mixins: [mixin],
    data() {
        return {
            flag: true
        }
    },

    methods: {
        check() {
            this.flag = !this.flag
        },
        formatText(text) {
            if (!text) {
                return text;
            }
            // 回车转成换行符
            text = text.replace(/\r\n/g, "<br>&#12288;&#12288;");
            text = text.replace(/\n/g, "<br>&#12288;&#12288;");
            return text;
        }
    },
}
</script>

<style lang="scss" scoped>
.text,.open {
    color: #333;
    padding: 15px 15px 0 15px;
    line-height: 1.6;
    position: relative;
}

.close {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* autoprefixer: ignore next */
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    
}
.text {
    span {
        position: absolute;
        right: 15px;
        bottom: -2px;
        width:40px;
        height:20px;
        text-align: right;
        background: linear-gradient(to right,rgba(255,255,255,0),#fff 50px);
        .icon {
            color:#bbb;
            font-size:16px;
            transform: rotate(90deg);
        }
    }
}

.open {
    text-indent: 2em;

}
</style>
