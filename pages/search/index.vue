<template>
    <div>
        <van-search placeholder="请输入搜索关键词" v-model="value" show-action @cancel='cancel' @search='search' @clear='clear'/>
        <div v-if="!keywords.length&&!dataArr.length&&!noWords">
            <div class="search-title">大家都在搜</div>
            <div class="search-tags">
                <span v-for="val of searchWords" :key="val.word" @click="keyWord(val.word)">{{val.word}}</span>
            </div>
            <div class="search-title">搜索历史</div>
            <div class="search-tags">
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
                <span>超级学神</span>
            </div>
        </div>
        <div v-if="keywords.length&&!dataArr.length">
            <div v-for="val of keywords" :key="val" @click="onWords(val)" class="words border-bottom">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-fenxiang"></use>
                </svg>
                <span>{{val}}</span>
            </div>
        </div>
        <div class="nodata gray" v-if="!keywords.length&&!dataArr.length&&noWords">暂无数据~~</div>
        <!-- 书本列表 -->
        <div v-if="dataArr.length" class="books-list">
            <Scroll :data='dataArr' class="scroll-warpper-app" pullup ref="scroll" @scrollToEnd='scrollToEnd' @scroll='scroll' listenScroll probeType='3'>
                <BookItem :list='dataArr' align/>
            </Scroll>
            <ScrollTop :showFlag='showFlag' @backTop='backTop' />
        </div>
    </div>
</template>

<script>
import * as types from '@/store/mutations-type'
import {mixin,page,scrollTop} from '@/assets/js/mixins'
import BookItem from '@/components/public/BookItem'
import Scroll from "@/components/public/Scroll"
export default {
    mixins:[mixin,page,scrollTop],
    data () {
        return {
            value:'',
            keywords:[],    //关键字结果
            start: 0,
            noWords: false, // 没有关键字
        }
    },

    async asyncData({$axios,store}) {
        const data = await $axios.$get(`/zhuishu/book/search-hotwords`)
        if (data.ok) {
            let temp = Math.floor(Math.random() * 80 + 1);
            let words = data.searchHotWords.slice(temp, temp + 7);
            store.commit(types.SEARCH_WORDS, words)
        }
    },

    components: {
        BookItem,
        Scroll,
    },

    methods: {
        search() {

        },

        cancel() {
            this.value = ''
            this.$router.go(-1)
        },

        clear() {

        },

        async keyWord(query) {  
            this.value = query
            
        },

        async onSearch(query) {
            const data = await this.$axios.$get(`/zhuishu/book/auto-complete`,{
                params:{
                    query
                }
            })
            
            if (data.ok) {
                this.keywords = data.keywords
                if (!data.keywords.length) {
                    this.noWords = true
                }
            }
        },

        // 最终搜索结果
        async onWords(query,flag) {
            setTimeout(() => {
                this.value = query
            }, 20);
            try {
                if (this.isLocked()) return // 必须等待上一次请求完成
                this.locked()//开始请求之前锁住
                if (flag) {
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                }
                const data = await this.$axios.$get('/zhuishu/book/fuzzy-search',{
                    params:{
                        query,
                        limit:15,
                        start:this.start
                    }
                })
                if (data.ok) {
                    this.setTotal(data.total)  // 总条数
                    this.unLocked() // 解锁
                    
                    if (flag) {
                        this.setNewData(data.books)
                        this.$toast.clear()
                        if (!data.books.length) {
                            this.$toast.clear()
                            this.$toast('没有更多数据了~~')
                            
                        }
                    } else {
                        if (!data.books.length) {
                            this.noWords = true
                            this.keywords = []
                        }
                        this.dataArr = data.books
                    }
                }
            } catch (error) {
                this.unLocked() // 解锁
                this.$toast.clear()
                setTimeout(() => {
                    this.$toast.fail('请求失败');
                }, 500);
            }
            
        },
    
        scrollToEnd() {
            if (this.dataArr.length >= 14) {
                if (this.hasMore()) {
                    this.start += 20
                    this.onWords(this.value,true)
                } else {
                    this.$toast('没有更多数据了~~')
                }
            }
        }
    },

    watch: {
        value(newV) {
            // setTimeout(() => {
            //     this.dataArr = []
            // }, 20);
            if (newV) {
                if (this.dataArr.length) {
                    this.dataArr = []
                    this.start = 0
                } else {
                    this.noWords = true
                    this.keywords = []
                    this.onSearch(newV)
                }
            } else {
                this.keywords = []
                this.start = 0
                this.noWords = false
                this.dataArr = []
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.books-list {
    @include scroll(55px, 0, #fff);
    padding: 0 15px;
}
.search-title {
    background: rgba(0,0,0,.03);
    padding: 15px;
    color: #969ba3;
    font-size: 14px;
}
.search-tags {
    padding: 15px 5px 10px 15px;
    span {
        display: inline-block;
        padding: 2.133vw 2.667vw;
        border: 1px solid grey;
        color: grey;
        border-radius: 5.333vw;
        margin-bottom: 2.667vw;
        margin-right: 2.133vw;
    }
    
}
.words {
    height: 45px;
    line-height: 45px;
    display: flex;
    align-items: center;
    padding: 0 15px;
    color: #666;
    font-size: 14px;
    .icon {
        margin-right: 10px;
    }
}

</style>
