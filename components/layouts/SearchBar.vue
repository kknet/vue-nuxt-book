<template>
    <van-search disabled :placeholder="title" @click="search"/>
</template>

<script>
export default {

    props: {
        title: {
            type: String,
            default: '我要当神棍'
        }
    },

    methods: {
        search() {
            this.$router.push({name:'search'})
        }
    }
};
</script>

