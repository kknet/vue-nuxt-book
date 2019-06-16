<template>

    <font>
        <span :class="{'active':active==index}" @click="select(index)" v-for="(val,index) of nav" :key="val.name">{{val.name}}</span>
    </font>
</template>

<script>
export default {
    
    props: {
        nav: {
            type: Array,
            default () {
                return [{
                    name:'男生'
                },{
                    name:'女生'
                }]
            }
        }
    },
    data() {
        return {
            active: 0
        }
    },

    methods: {
        select(i) {
            this.active = i
            this.$emit('change', i)
        }
    },
    
}
</script>

<style lang="scss" scoped>
font {
    display: flex;
    padding: 5px 0;
    span {
        text-align: center;
        padding: 8px 14px;
        color: #ed424b;
        border: 1px solid #ed424b;
        margin-right: -1px;

        &.active {
            color: #fff;
            background: #ed424b;
        }
    }

    span:first-child {
        border-radius: 4px 0 0 4px;
    }

    span:last-child {
        border-radius: 0 4px 4px 0;
    }
}
</style>
