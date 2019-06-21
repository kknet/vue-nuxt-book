<template>
    <div>
        <NavHeader @select='select' title="我的书架" :nav='nav' category class="border-bottom"  :active='active' isSearch/>
        <NavFooter active='3'/>
    </div>
</template>

<script>
import NavFooter from "@/components/public/NavFooter"
import NavHeader from "@/components/public/NavHeader"

export default {
    components: {
        NavFooter,
        NavHeader
    },

    data() {
        return {
            active:0,
            nav:['我的书架','最近阅读']
        }
    },

    methods: {
        select(i) {
            this.active = i
            // this.$refs.scroll.scrollTo(0,0,0)
            // if (i == 0) {
            //     this.$router.replace({
            //         path: 'category',query:{gender:'male'}
            //     })
                
            // } else {
            //     this.$router.replace({
            //         path: 'category',query:{gender:'female'}
            //     })
            // }
        },
    },
}
</script>

<style>

</style>
