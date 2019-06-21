<template>
    <ul>
        <li v-for="val of list" :key="val._id">
            <div class="author-cover">
                <img :src="val.author.avatar | STATIC_URL" alt="">
            </div>
                <div class="author-info">
                    <div class="nickname" v-html="val.author.nickname"></div>
                    <van-rate size='3.267vw' allow-half v-model="val.rating" color="#f44" readonly />
                    <div class="author-content" v-html="val.content"></div>
                    <div class="updated">{{ val.updated| TIME}}</div>
                </div>
        </li>
        <!-- <div class="nodedata gray">暂无更多评论~~</div> -->
        <div class="more" v-if="showMore" @click="onShowMore">更多书评</div>
    </ul>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },

        showMore: {
            type:Boolean,
            default: false
        }
    },

    methods: {
        onShowMore() {
            this.$emit('onShowMore')
        }
    }
}
</script>

<style lang="scss" scoped>
li {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f0f1f2;
    padding-bottom: 10px;
    margin: 10px 0;

    .author-cover {
        flex: 0 0 40px;
        width: 40px;
        margin-right: 10px;

        img {
            width: 100%;
            border-radius: 50%;
        }
    }

    .author-info {
        flex: 1;
        width: calc(100% - 50px);
        display: flex;
        flex-direction: column;

        .nickname {
            font-size: 14px;
            letter-spacing: 1px;
            color: #aaa;
            margin-bottom: 5px;
        }

        .author-content {
            font-size: 14px;
            margin: 5px 0;
            line-height:1.4;
        }

        .updated {
            font-size: 14px;
            margin-top: 5px;
            color: #aaa;
        }
    }

}

ul li:last-child {
    margin:0;
}

.more {
    height: 40px;
    line-height:40px;
    text-align: center;
    color: #4284ed;
    font-size: 14px;
}
.nodedata {
    text-align: center;
    margin-top: 20px;
}
</style>
