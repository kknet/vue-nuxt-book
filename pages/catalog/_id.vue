<template>
    <div>
        <van-nav-bar title="书籍目录" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <Chapter :list='list'/>
    </div>
</template>

<script>
import Chapter from "@/components/public/Chapter"
export default {
    validate({ params }) {
        if (params.id.length == 24) {
            return true
        }
        return false
    },

    async asyncData({$axios,route,store}) {
        const id = route.params.id
        if (store.state.catalogList.hasOwnProperty(id)) {  // 如果vuex里面有数据就不去请求接口
            return {
                list: store.state.catalogList[id]
            }
        }
        const bookAtoc = await $axios.$get(`/zhuishu/atoc?view=summary&book=${id}`)     // 这个是书籍源
        const book_id = bookAtoc[0]._id

        const data = await $axios.$get(`/api/chapters?id=${book_id}`)
        if (data.code == 10000) {
            store.dispatch('setCatalog', {id,list:data.data})
            return {
                list: data.data
            }
        }
    },

    data () {
        return {
            
            list: []
        }
    },
    components: {
        
        Chapter
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },

        
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';

</style>
