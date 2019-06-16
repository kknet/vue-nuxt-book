<template>
    <header>
        <div class="left">
            <img src="@/assets/img/logo.svg" v-if="active==0"/>
            <img src="@/assets/img/logo2.svg" v-else/>
        </div>
            <div class="center">
                <slot></slot>
                <span :class="{'active':active==index}" @click="select(index)" v-for="(val,index) of nav" :key="val">{{val}}</span>
            </div>
            <div class="right">
                <svg class="icon user" aria-hidden="true">
                <use xlink:href="#icon-icon-user"></use>
            </svg>
                <svg class="icon book" aria-hidden="true">
                <use xlink:href="#icon-books"></use>
            </svg>
            </div>
    </header>
</template>

<script>
export default {
    props: {
        active: {
            type: [String, Number],
            default: 0
        },
    },

    data() {
        return {
            nav: ['男生', '女生']
        }
    },

    methods: {
        select(i) {
            if (i == 1) {
                this.$router.push({
                    name: 'female'
                })
            } else {
                this.$router.push({
                    name: 'index'
                })
            }
        }
    },
}
</script>

<style lang="scss" scoped>
header {
    padding: 0 15px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        height: 100%;
        display: flex;
        align-items: center;
        flex: 0 0 25%;
    }

    .left {
        img {
            width: 100%;
        }
    }

    .center {
        flex: 0 0 50%;
        display: flex;
        justify-content: center;

        span {
            text-align: center;
            padding: 8px 18px;
            color: #ed424b;
            border: 1px solid #ed424b;
            margin-right: -1px;

            &.active {
                color: #fff;
                background: #ed424b;
            }
        }

        span:first-child {
            border-radius: 4px 0 0 4px;
        }

        span:last-child {
            border-radius: 0 4px 4px 0;
        }
    }

    .right {
        display: flex;
        justify-content: flex-end;

        .icon {
            font-size: 20px;
            padding: 5px;
        }

        .user {
            margin-right: 5px;
        }

        .user,
        .book {
            color: #ed424b;
        }
    }
}
</style>
