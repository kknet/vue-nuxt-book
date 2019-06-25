<template>
    <div class="read-warp">
        <!-- 顶部title -->
        <Title/>
        <!-- 底部菜单 -->
        <Menu/>
        <!-- 更多 -->
        <More/>
        <!-- 左边侧滑目录 -->
        <Slider @chapter='chapter'/>
        <!-- 进度条 -->
        <Progress/>
        <!-- 设置主题 -->
        <Theme/>
        <!-- 设置字体 -->
        <Font/>
        <!-- 文章内容 -->
        <Reader :content='content'/>
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
        const [data,data1,data3] = await Promise.all([
            $axios.$get(`/api/book?id=${id}`),
            $axios.$get(`/api/chapters?id=${id}`),
            // $axios.$get(`/chapter/`+encodeURIComponent(this.chapterList.chapters[this.chapterCount].link))
        ])
        if (data.code == 10000 && data1.code == 10000) {
            let book = data.book
            book.catalog = data1.data
            store.commit(types.BOOKREAD, book)
        }
    },

    data() {
        return {
            chapterCount:0, // 当前章节
            content: [], // 章节内容
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
        this.getBookContent()
    },

   
    beforeRouteLeave (to, from, next) {
        this.setMenuVisible(false)
        this.setSettingVisible(-1)
        next()
    },

    methods: {
        chapter(index) {
            this.chapterCount = index
        },

        async getBookContent() {
            const data = await this.$axios.$get(`/chapter/`+encodeURIComponent(this.bookRead.catalog[this.chapterCount].link))
            if (data.ok) {
                this.content = this.content.concat([data.chapter.body.split(/\n/)]);
                console.log(this.content);
                
            }
        }
    }


}
</script>

<style lang="scss" scoped>

</style>


