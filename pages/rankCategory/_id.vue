<template>
    <div>
        <van-nav-bar :title="title" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <div class="rank-details">
            <Scroll :data='dataArr' class="scroll-warpper-app" pullup ref="scroll" @scrollToEnd='scrollToEnd' @scroll='scroll' listenScroll probeType='3'>
                <div>
                    <Items @change='changeItem'/>
                    <BookItem class="rank-list" align rank :list='dataArr'/>
                </div>
            </Scroll>
            <ScrollTop :showFlag='showFlag' @backTop='backTop' />
        </div>
    </div>
</template>

<script>
import Items from '@/components/rankCategory/Item'
import BookItem from '@/components/public/BookItem'
import {page,scrollTop} from '@/assets/js/mixins'
import Scroll from "@/components/public/Scroll"
const {
    BASE_URL2
} = require('@/assets/js/conf')
export default {
    mixins:[scrollTop,page],
    data() {
        return {
            start: 0,
            title: this.$route.query.title,
            gender: this.$route.query.gender,
            major: this.$route.query.major,
            type: 'hot',
        }
    },

    async asyncData({route, store,  params, query,$axios}) {
        if (!query.type || query.type === '全部') {
            const data = await $axios.$get(`/zhuishu/ranking/${params.id}`)
            if (data.ok) {
                return {
                    dataArr:data.ranking.books
                }
            }
        } else {
            const data = await $axios.$get(`${BASE_URL2}`, {
                params: {
                    gender: query.gender,
                    type: 'hot',
                    start: 0,
                    limit: 20,
                    major: query.type,
                    }
                })  
            if (data.ok) {
                return {
                    dataArr:data.books,
                    total: data.total,
                }
            }
        }   
        
    },

    components: {
        Items,
        BookItem,
        Scroll,
    },

    methods: {
        onClickLeft() {
                this.$router.go(-1)
        },

        changeItem(val) {
            this.dataArr = []
            this.major = val
            this.start = 0
            this.$router.replace({
                name:'rankCategory-id',
                params: {
                    id:this.$route.params.id,
                },
                query: {
                    gender: this.$route.query.gender,
                    type: val,
                    title: this.$route.query.title
                }
            })
            this.getList(val)
        },

        async getList(type,flag) {
            try {
                if (this.isLocked()) return // 必须等待上一次请求完成
                this.locked()//开始请求之前锁住
                if (flag) {
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                }
                const data = await this.$axios.$get(`${BASE_URL2}`, {
                params: {
                        gender: this.gender,
                        type:'hot',
                        start: this.start,
                        limit: 20,
                        major: this.major,
                    }
                })
                if (data.ok) {
                    this.setTotal(data.total)  // 总条数
                    this.unLocked() // 解锁
                    if (flag) {
                        this.setNewData(data.books)
                        this.$toast.clear()
                    } else {
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
            if (this.dataArr.length >= 20) {
                if (this.hasMore()) {
                    this.start += 20
                    this.getList(this.type,true)
                } else {
                    this.$toast('没有更多数据了~~')
                }
            }
        },
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';
@import '~@/assets/css/mixin.scss';

.rank-details {
    @include scroll(45px, 0, #fff);
}
.rank-list {
    padding: 15px;
}
</style>
