<template>
    <van-popup v-model="show" position="top" overlay @click-overlay='hide' class="pop" :close-on-click-overlay='false'>
        <Nav popup/>
    </van-popup>
</template>

<script>
import Nav from '@/components/layouts/Nav'
export default {
    components: {
        Nav,
    },
    
    props: {
        show: {
            type: Boolean,
            default: false        
        }
    },

    data () {
        return {
            
        }
    },

    methods: {
        hide() {
            this.$emit('hide')
        }
    }
}
</script>

<style lang="scss" scoped>
.pop {
    padding-top: 50px;
}
</style>
