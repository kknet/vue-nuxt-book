<template>
    <div>
        <van-nav-bar :title="book.title"  left-arrow @click-left="onClickLeft">
            <van-icon name="search" slot="right" />
            <van-icon name="qr" slot="right" />
        </van-nav-bar>
        <BookDetail/>
        <div class="btns border-bottom">
            <van-button type="danger" size="small">点击阅读</van-button>
            <van-button size="small">危险按钮</van-button>
            <van-button size="small">VIP订阅</van-button>
        </div>
        <img :src="book.cover | URL" class="book-cover-blur">
        <BookLongIntro/>
    </div>
</template>

<script>
import mixin from "@/assets/js/mixins";
import BookDetail from '@/components/book/BookDetail'
import BookLongIntro from '@/components/book/BookLongIntro'

import * as types from '@/store/mutations-type'
const BOOK = require('@/assets/js/conf').BOOK
export default {
    mixins: [mixin],
    validate ({ params}) {
        console.log(params.id.length);
        if (params.id.length == 24) {
            return true
        }
        return false
        // return router.replace('/index')
    },
    async asyncData({$axios,route,store}) {
        const data = await $axios.$get(`/api/book?id=${route.params.id}`)
        if (data.code == 10000) {
            store.commit(types.BOOK, data.book)
            return {
                books:data.book
            }
        }
        
    },

    data() {
        return {
            books:{}
        }
    },

    components: {
        BookDetail,
        BookLongIntro,
    },

    
    
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~./index.scss';
</style>

