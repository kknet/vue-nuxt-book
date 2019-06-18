<template>
    <div>
        <div class="list" v-if="!align">
            <!-- <TabItem :nav='rankTab' class="rank-tab" @change='rankChange' /> -->
            <ScrollX ref="scroll-y">
                <div class="book-item" @click="book(val._id)" v-for="val of list" :key="val._id">
                    <img  :src="val.cover | URL"/>
                    <div class="book-desc">
                        <p>{{val.title}}</p>
                        <span class="gray">{{val.author}}</span>
                    </div>
                </div>
            </ScrollX>

        </div>
        
        <div class="align-list" v-else>
            <div class="book-item border-bottom" v-for="val of list" :key="val._id">
                <img v-lazy="val.cover" />
                <div class="book-desc">
                    <p class="title">{{val.title}}</p>
                    <p class="desc gray" v-html="val.shortIntro"></p>
                    <div class="book-meta">
                        <div>
                            <svg class="icon gray" aria-hidden="true">
                                <use xlink:href="#icon-icon-user"></use>
                            </svg>
                            <span class="gray author">{{val.author.split(',')[0]}}</span>
                        </div>
                        <div class="book-meta-r">
                            <span>{{val.majorCate}}</span>
                            <span>{{val.allowMonthly?'已完结':'连载中'}}</span>
                            <span>{{val.retentionRatio}}万字</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import ScrollX from './ScrollX'
export default {
    components: {
        ScrollX
    },
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        align: {
            type: Boolean,
            default: false
        }
    },

    methods: {
        rankChange(i) {

        },

        book(id) {
            this.$router.push({ name: `book-id`, params: { id } })
        }
    },

    watch: {
        list() {
            // if (!this.align) {
            //     this.$refs['scroll-y'].scrollTo(0,0,0)
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    display: flex;

    .book-item {
        display: inline-block;
        width: 70px;
        margin-right: 15px;

        .book-desc {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            p {
                margin: 8px 0 5px 0;
                font-size: 14px;
                line-height: 1.3;
                white-space: pre-wrap;
                word-wrap: break-word;
                word-break: break-all;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                /* autoprefixer: ignore next */
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }

            span {
                font-size: 12px;
            }
        }
    }
}

.align-list {
    .book-item {
        display: flex;
        padding-bottom: 15px;
        margin-top: 15px;

        img {
            margin-right: 10px;
        }

        .book-desc {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 5px 0;
            box-sizing: border-box;

            .title {
                font-size: 16px;
                font-weight: 700;

            }

            .desc {
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                /* autoprefixer: ignore next */
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                font-size: 14px;
                line-height: 1.3;
            }
        }

        .book-meta {
            display: flex;
            justify-content: space-between;

            .book-meta-r {
                span {
                    font-size: 12px;
                    color: gray;
                    padding: 1px 2px;
                }

                span:first-child {
                    border: 1px solid gray;
                }

                span:nth-child(2) {
                    color: #ed424b;
                    border: 1px solid #ed424b;
                }

                span:nth-child(3) {
                    color: #4284ed;
                    border: 1px solid #4284ed;
                }
            }
        }
    }

    .book-item:first-child {
        margin-top: 0;
    }
}

img {
    width: 70px;
    height: 95px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
}

.list::-webkit-scrollbar {
    display: none !important;
}
</style>
