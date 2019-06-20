<template>
    <ul>
        <li v-for="(val,index) of items" :key="val.text">
            <span :class="{active:val.text===active}" @click="item(index,val.text)">{{val.text}}</span>
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        activeItem: {
            type: String,
            default: '全部'
        }
    },

    data() {
        return {
            active:this.$route.query.type || '全部',
            items: [{
                    value: -1,
                    text: "全部"
                },
                {
                    value: 21,
                    text: "玄幻"
                },
                {
                    value: 1,
                    text: "奇幻"
                },
                {
                    value: 2,
                    text: "武侠"
                },
                {
                    value: 22,
                    text: "仙侠"
                },
                {
                    value: 4,
                    text: "都市"
                },
                {
                    value: 5,
                    text: "历史"
                },
                {
                    value: 7,
                    text: "游戏"
                },
                {
                    value: 9,
                    text: "科幻"
                },
                {
                    value: 10,
                    text: "灵异"
                }
            ]
        }
    },
    
    methods: {
        item(i,val) {
            this.active = val
            this.$emit('change',val)
        }
    }
}
</script>

<style lang="scss" scoped>
ul {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    background: #f1f2f3;
    li {
        width: 14%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        color: rgba(0, 0, 0, 0.4);
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        margin: 10px;
        span {
            border-radius: 10px;
            width: 100%;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid #f1f2f3;
        }
        .active {
            color: #ed424b;
            border: 1px solid #ed424b;
        }
    }
}
</style>

