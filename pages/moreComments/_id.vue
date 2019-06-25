<template>
    <div>
        <van-nav-bar :title="$route.query.title" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <div class="comment">
            <Scroll ref="scroll" :data='dataArr' class="scroll-warpper-app" pullup @scrollToEnd='scrollToEnd' :click='false' @scroll='scroll' listenScroll probeType='3'>
                <div>
                    <Comment :list='dataArr'/>
                </div>
            </Scroll>
            <ScrollTop :showFlag='showFlag' @backTop='backTop' />
        </div>
    </div>
</template>

<script>
import Comment from '@/components/public/Comment'
import Scroll from "@/components/public/Scroll"
import { mixin ,page,scrollTop} from '@/assets/js/mixins'

export default {
    mixins:[mixin,page,scrollTop],
    validate({ params }) {
        if (params.id.length == 24) {
            return true
        }
        return false
    },

    async asyncData({$axios,route,store}) {
        const id = route.params.id
        if (store.state.comments.hasOwnProperty(id)) {  // 如果vuex里面有数据就不去请求接口
            return {
                dataArr: store.state.comments[id].list,
            }
        }
        const data = await $axios.$get(`/api/comment`,{
            params: {
                start: 0,
                id
            }
        })
        if (data.code == 10000) {
            store.dispatch('setComments', {
                id,
                list:data.comment.docs,
                start:0
            })
            return {
                dataArr: data.comment.docs,
            }
        }
    },

    components: {
        Comment,
        Scroll
    },

    data() {
        return {
            start: 0,
            probeType:3,
        }
    },
    methods: {
        onClickLeft() {
            // this.$router.push({ name: `book-id`, params: { id:this.$route.params.id } })
            this.$router.go(-1)
        },

        async scrollToEnd() {
            const id = this.$route.params.id
            if (this.comments[id].list.length >= 15) {
                try {
                    if (this.isLocked()) return // 必须等待上一次请求完成
                    this.locked()//开始请求之前锁住
                    this.$toast.loading({
                        mask: true,
                        message: '加载中...'
                    });
                    this.start = this.comments[id].start + 20
                    const data = await this.$axios.$get(`/api/comment`,{
                        params: {
                            start: this.start,
                            id
                        }
                    })
                    if (data.code == 10000) {
                        this.unLocked() // 解锁
                        this.$toast.clear()
                        const arr = this.comments[id].list.concat(data.comment.docs)    // 存入vuex
                        this.dataArr = this.dataArr.concat(data.comment.docs)
                        this.setCommentsMap({    // 存入vuex
                            id,
                            list:arr,
                            start:this.start
                        })
                    }
                } catch (error) {
                    this.unLocked() // 解锁
                    this.$toast.clear()
                    setTimeout(() => {
                        this.$toast.fail('请求失败');
                    }, 500);
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';
@import '~@/assets/css/mixin.scss';
.comment{
    @include scroll(45px,0,#fff);
}
</style>
<style scoped>
ul >>> li {
    padding:15px;
    width: calc(100% - 30px);
    overflow: hidden;
}
ul >>> li:last-child {
    border:0;
}
ul >>> li:first-child {
    margin-top:0;
}
</style>
