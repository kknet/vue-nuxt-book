<template>
    <van-tabbar class="border-top">
        <van-tabbar-item
            @click="$router.push({ name: val.page,query:val.query })"
            v-for="(val,index) of tabArr"
            :key="val.id"
            :icon="val.icon"
            :class="{'actives':active==index}"
        >{{val.title}}</van-tabbar-item>
    </van-tabbar>
</template>

<script>
export default {
    props:{
        active:{
            type:[Number,String],
            default:0
        }
    },
    data () {
        return {
            tabArr: [
                { id: 1, title: "首页", icon: "wap-home",page:'index' },
                { id: 2, title: "分类", icon: "wap-nav",page:'category',query:{gender:'male'} },
                { id: 3, title: "排行榜", icon: "label-o",page:'rank',query:{gender:'male'} },
                { id: 4, title: "我的", icon: "contact",page:'myBook' }
            ],
        }
    }
}
</script>

<style lang="scss" scoped>
.footer-copy {
    text-align: center;
    color: #969ba3;
    font-weight: 300;
    font-family: sans-serif;
    padding: 20px 0 20px 0;
}

.van-tabbar-item--active {
    color:#7d7e80;
}
</style>
