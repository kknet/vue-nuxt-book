<template>
    <div class="read-warp">
        <!-- 顶部title -->
        <Title/>
        <!-- 底部菜单 -->
        <Menu/>
        <!-- 更多 -->
        <More/>
        <!-- 左边侧滑目录 -->
        <Slider/>
        <!-- 进度条 -->
        <Progress/>
        <!-- 设置主题 -->
        <Theme/>
        <!-- 设置字体 -->
        <Font/>
        <!-- 文章内容 -->
        <Reader/>
    </div>
</template>

<script>
import Title from '@/components/bookRead/Title'
import Menu from '@/components/bookRead/Menu'
import Theme from '@/components/bookRead/Theme'
import Font from '@/components/bookRead/Font'
import Reader from '@/components/bookRead/Reader'
import More from '@/components/bookRead/More'
import Progress from '@/components/bookRead/Progress'
import Slider from '@/components/bookRead/Slider'
import * as types from '@/store/mutations-type'
import Chapter from "@/components/public/Chapter"
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    async asyncData({$axios,store,params}) {
        const id = params.id
        const [data,data1] = await Promise.all([
            $axios.$get(`/api/book?id=${id}`),
            $axios.$get(`/api/chapters?id=${id}`)
        ])
        if (data.code == 10000 && data1.code == 10000) {
            let book = data.book
            book.catalog = data1.data
            store.commit(types.BOOKREAD, book)
        }
    },

    data() {
        return {

        }
    },
    components: {
        Title,
        Menu,
        More,
        Chapter,
        Slider,
        Progress,
        Theme,
        Font,
        Reader,
    },

    mounted () {
        // console.log(document.querySelectorAll('link'));
    },

   
    beforeRouteLeave (to, from, next) {
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
        next()
    }


}
</script>

<style lang="scss" scoped>

</style>


