<template>
    <div v-if="flag&&content.length>50" class="text">
        <div class="close" @click="check" v-text="content.trim().replace(/\s/g,'')">
        </div>
        <span @click="check">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qianjin"></use>
            </svg>
        </span>
    </div>
    <div class="open" v-else v-html="formatText(content)" @click="check"></div>
</template>

<script>
import {mixin} from "@/assets/js/mixins";
export default {
    mixins: [mixin],
    props: {
        content: {
            type:String,
            default:''
        }
    },

    data() {
        return {
            flag: true
        }
    },

    methods: {
        check() {
            if (this.content.length < 50) {
                return
            }
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
@import '~@/assets/css/mixin.scss';
.text,.open {
    color: #333;
    line-height: 1.6;
    position: relative;
    margin: 0px 0 15px 0;
    padding-top: 10px;
}

.close {
    @include ellipsis2(3)
    
}
.text {
    span {
        position: absolute;
        right: 0;
        bottom: 0px;
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
