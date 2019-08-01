<template>
    <Loading v-show='loading'/>
</template>

<script>
import Loading from './Load'
export default {
    data: () => ({
        loading: false
    }),
    components: {
        Loading,
    },
    methods: {
        start() {
            this.loading = true;
        },
        finish() {
            this.loading = false;
        }
    }
};
</script>

