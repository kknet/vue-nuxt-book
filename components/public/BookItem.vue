<template>
    <div>
        <div class="list" v-if="!align">
            <!-- <TabItem :nav='rankTab' class="rank-tab" @change='rankChange' /> -->
            <ScrollX ref="scroll-y" :list='list'>
                <div class="book-item" :style="{'margin-right':list.length===4?0:''}" @click="bookDetails(val._id)" v-for="val of list" :key="val._id">
                    <img  :src="val.cover | URL"/>
                    <div class="book-desc">
                        <p>{{val.title}}</p>
                        <span class="gray">{{val.author}}</span>
                    </div>
                </div>
            </ScrollX>
        </div>
        
        <div class="align-list" v-else>
            <div class="book-item border-bottom" v-for="(val,index) of list" :key="val._id" @click="bookDetails(val._id)">
                <span v-if="rank" class="index">{{index+1}} · </span>
                <img v-lazy="val.cover" />
                <div class="book-desc">
                    <p class="title">
                        <span class="title-s" :style="{flex:rank?'0 0 60%':1}">{{val.title}} </span>
                        <span class="title-rank" v-if="rank">{{(val.latelyFollower/10000).toFixed(1) + '万人收藏'}}</span>
                    </p>
                    <p class="desc gray" v-html="val.shortIntro" v-if="!rank"></p>
                    <span class="gray book-tags-span" v-if="rank">{{val.majorCate}} · {{val.minorCate}}</span>
                    <p class="gray book-tags-p" v-if="rank">{{val.shortIntro}}</p>
                    <div class="book-meta">
                        <div>
                            <svg class="icon gray" aria-hidden="true">
                                <use xlink:href="#icon-icon-user"></use>
                            </svg>
                            <span class="gray author">{{val.author.split(',')[0]}}</span>
                        </div>
                        <div class="book-meta-r" v-if="!rank">
                            <span>{{val.majorCate || val.cat}}</span>
                            <span>{{val.allowMonthly?'已完结':'连载中'}}</span>
                            <span>{{val.retentionRatio || 0}}万字</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="nodata gray" v-if="!list.length&&!skeleton">暂无相关数据~~</div>
            <div v-if="!list.length&&skeleton">
                <van-skeleton title :row="3" class="skeleton" v-for="val of 4" :key="val"/>
            </div>
        </div>
    </div>

</template>

<script>
import ScrollX from './ScrollX'
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    components: {
        ScrollX
    },
    data () {
        return {
            skeleton: true,
        }
    },

    created () {
        if (!this.list.length) {
            setTimeout(() => {
                this.skeleton = false
            }, 1100);
        }
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
        },

        rank: { // 是不是排行榜详细
            type: Boolean,
            default: false
        }
    },

    methods: {
        rankChange(i) {

        },

        
    },

    watch: {
        list(newV) {
            this.skeleton = true
            if (!newV.length) {
                setTimeout(() => {
                    this.skeleton = false
                }, 1000);
            }
            // if (!this.align) {
            //     this.$refs['scroll-y'].scrollTo(0,0,0)
            // }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
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
                @include ellipsis2(2);
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
        .index {
            flex:0 0 40px;
            font-weight:bold;
            font-size: 16px;
            display:flex;
            align-items:center;
        }
        img {
            margin-right: 10px;
        }

        .book-desc {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-sizing: border-box;

            .title {
                font-size: 16px;
                font-weight: 700;
                display: flex;
                justify-content: space-between;
                .title-s {
                    line-height:1.3;
                }
                .title-rank {
                    flex:1;
                    color: #ed424b;
                    font-size:14px;
                    font-weight:normal;
                    text-align:right;
                }
            }
            
            .book-tags-span {
                font-style: italic;
            }
            .book-tags-p {
                width:230px;
                font-size: 14px;
                @include ellipsis();
            }
            .desc {
                @include ellipsis2(2);
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
    .book-item:last-child:before{
        border:0;
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
.van-skeleton {
    padding: 0;
    margin-top:10px;
}
.nodata {
    text-align: center;
    margin-top:20px;
    font-size:14px;
}
</style>
