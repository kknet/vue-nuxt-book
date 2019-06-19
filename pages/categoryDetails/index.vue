<template>
    <div>
        <van-nav-bar :title="minor" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <van-tabs v-model="active" @change='onTab'>
            <div class="category-details">
                <Scroll :data='dataArr' class="scroll-warpper-app" pullup ref="scroll" @scrollToEnd='scrollToEnd' @scroll='scroll' listenScroll probeType='3'>
                    <div>
                        <van-tab :title="val.title" v-for="val of tabs" :key="val.title">
                            <BookItem align :list='dataArr' class="item"/>
                        </van-tab>
                    </div>
                </Scroll>
                <ScrollTop :showFlag='showFlag' @backTop='backTop' />
            </div>
        </van-tabs>
    </div>
</template>

<script>
import Scroll from "@/components/public/Scroll"
import BookItem from "@/components/public/BookItem"
const {
    BASE_URL2
} = require('@/assets/js/conf')
import {
    scrollTop,page
} from '@/assets/js/mixins'
export default {
    mixins: [scrollTop,page],
    async asyncData({
        route,
        store,
        query,
        $axios
    }) {
        const data = await $axios.$get(`${BASE_URL2}`, {
            params: {
                gender: query.gender,
                type: query.type,
                start: 0,
                limit: 20,
                major: query.major,
                minor: query.minor,
            }
        })

        if (data.ok) {
            return {
                dataArr: data.books,
                total: data.total,
            }
        }
    },

    data() {
        return {
            active: 0,
            tabs: [{
                    title: '最热',
                    type: 'hot'
                },
                {
                    title: '新书',
                    type: 'new'
                },
                {
                    title: '好评',
                    type: 'reputation'
                },
                {
                    title: '完结',
                    type: 'over'
                },
            ],
            start: 0,
            gender: this.$route.query.gender,
            major: this.$route.query.major,
            minor: this.$route.query.minor,
            type: this.$route.query.type,
        }
    },

    created() {
        this.active = this.tabs.findIndex(item => item.type === this.type)
    },

    components: {
        BookItem,
        Scroll,
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },

        onTab(i) {
            this.dataArr = []
            this.type = this.tabs[i].type
            this.start = 0
            this.$router.replace({
                path: '/categoryDetails',
                query: {
                    gender: this.gender,
                    major: this.major,
                    minor: this.minor,
                    type:this.type
                }
            })
            this.$refs.scroll.scrollTo(0,0,0)
            this.getList(this.type)
        },

        async getList(type,flag) {
            if (this.isLocked()) return // 必须等待上一次请求完成
            this.locked()//开始请求之前锁住
            const data = await this.$axios.$get(`${BASE_URL2}`, {
            params: {
                gender: this.gender,
                type,
                start: this.start,
                limit: 20,
                major: this.major,
                minor: this.minor,
                }
            })
            if (data.ok) {
                this.setTotal(data.total)  // 总条数
                this.unLocked() // 解锁
                if (flag) {
                    this.setNewData(data.books)
                } else {
                    this.dataArr = data.books
                }
                
                
            }
        },

        // 分页
        scrollToEnd() {
            
            if (this.dataArr.length >= 20) {
                if (this.hasMore()) {
                    this.start += 20
                    this.getList(this.type,true)
                } else {
                    this.$toast('没有更多数据了~~')
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';
@import '~@/assets/css/mixin.scss';

.category-details {
    @include scroll(90px, 0, #fff);
}

.item {
    padding: 15px;
}

</style>
