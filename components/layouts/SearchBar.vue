<template>
    <van-search disabled placeholder="请输入搜索关键词" v-model="value" />
</template>

<script>
export default {
    data() {
        return {
            value: ""
        };
    }
};
</script>

