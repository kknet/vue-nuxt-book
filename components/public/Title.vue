<template>
    <div class="title">
        <div class="title-left">
            <span></span>
            <div class="title-title">{{title}}</div>
            <div class="title-desc">{{desc}}</div>
        </div>
        <div class="title-right" v-if="showMore">
            <span>更多</span>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-qianjin"></use>
            </svg>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        showMore: {
            type: Boolean,
            default: true
        },
    }
};
</script>

<style lang="scss" scoped>
.title {
    position: relative;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title-left {
        display: flex;
        align-items: center;

        span {
            height: 16px;
            width: 2px;
            background: #ed424b;
            margin-right: 10px;
        }

        .title-title {
            font-family: FZZCYSK;
            font-weight: 400;
            display: inline;
            color: #33373d;
            font-size: 16px;
        }

        .title-desc {
            color: #969ba3;
            font-size: 13px;
            margin-left: 8px;
        }
    }

    .title-right {
        display: flex;
        align-items: center;
        font-size: 13px;
        color: #969ba3;

        .icon {
            font-size: 16px;
            margin-left: 5px;
        }
    }
}
</style>
