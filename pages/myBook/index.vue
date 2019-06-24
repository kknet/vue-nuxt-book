<template>
<div>
    <NavHeader @select='select' title="我的书架" :nav='nav' category class="border-bottom" :active='active' isSearch />
    <NavFooter active='3' />

    <div v-if="active==0">
        <div v-if="!userName" class="no-data">
            <van-button round type="danger" block size="normal" @click="goLogin">登录</van-button>
            <div>登录后实时同步进度</div>
        </div>
        <div class="my" v-else>
            <Scroll class="scroll-warpper-app" ref="scroll">
                <div>
                    <div class="tip border-bottom" @click="edit">编辑</div>
                    <van-swipe-cell v-for="(val,index) of myBookList" :key="val._id" :on-close="onClose" :data-index='val' @click="$router.push({name:'bookRead-id',params:{id:val.id}})">
                        <div class="book-item" :class="{' border-bottom':index<9}">
                            <img :src="val.cover | URL"/>
                            <div class="book-info">
                                <div class="book-header">
                                    <span>{{val.title}}</span>
                                    <span class="gray">
                                    立即阅读
                                <svg class="icon gray" aria-hidden="true">
                                    <use xlink:href="#icon-qianjin"></use>
                                </svg>
                                </span>

                                </div>
                                <div class="book-meta gray">
                                    <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-yonghu"></use>
                                </svg>
                                    <span>{{val.author}}</span>
                                    <span class="line">|</span>
                                    <span v-if="!val.readChapter">尚未阅读</span>
                                    <span v-else>第3章　奇遇连连</span>
                                </div>
                                <div class="book-to-new gray">
                                    <span>更新至 正文 第1177章 底蕴无尽</span>
                                    <span>{{val.updated | UPDATED}}</span>
                                </div>
                            </div>
                        </div>
                        <van-button class="btn" square slot="right" type="danger" text="删除" />
                    </van-swipe-cell>
                    <div class="lately" v-if="!myBookList.length" >
                        <div class="null">
                            <svg class="icon gray" aria-hidden="true">
                                <use xlink:href="#icon-shu1"></use>
                            </svg>
                            <div class="gray">还没有图书哟</div>
                        </div>
                    </div>
                    
                </div>
            </Scroll>
        </div>
    </div>
    <!-- 最近阅读 -->
    <div class="lately" v-else>
        <div v-if="latelyList.length"></div>
        <div v-else class="null">
            <svg class="icon gray" aria-hidden="true">
                <use xlink:href="#icon-shu1"></use>
            </svg>
            <div class="gray">还没有阅读历史哟</div>
        </div>
    </div>
</div>
</template>

<script>
import NavFooter from "@/components/public/NavFooter"
import NavHeader from "@/components/public/NavHeader"
import Scroll from "@/components/public/Scroll";
import {
    mixin
} from '@/assets/js/mixins'
export default {
    mixins: [mixin],
    components: {
        NavFooter,
        NavHeader,
        Scroll
    },

    async asyncData({$axios}) {
        const data = await $axios.$get('/api/getBook')
        if (data.code == 10000) {
            return {
                myBookList:data.data.book
            }
        }
    },
    data() {
        return {
            active: 0,
            nav: ['我的书架', '最近阅读'],
            latelyList:[],  // 最近阅读
            myBookList:[],    // 我的书架
        }
    },

    methods: {
        select(i) {
            this.active = i
        },

        onClose(clickPosition, instance) {
            switch (clickPosition) {
                case 'outside':
                    instance.close();
                    break;
                case 'right':
                    let index = instance.$el.getAttribute('data-index')
                    console.log(index);

                    this.$dialog.confirm({
                        title: '提示',
                        message: '确定删除吗？'
                    }).then(() => {
                        instance.close();
                    }).catch(e => {})
                    break;
            }
        },

        edit() {
            this.$dialog.alert({
                title: '提示',
                message: '向左滑动即可删除~~'
            }).then(() => {
            
            });
        },

        goLogin() {
            this.$router.push({name:'login',query:{path:location.origin+ this.$route.fullPath}})
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';

.my {
    @include scroll(45px, 50px, #fff);
}

.tip {
    padding: 15px;
    text-align: right;
}

.book-item {
    display: flex;
    padding: 15px;

    img {
        width: 50px;
        height: 70px;
        box-shadow: 0 1px 0.8vw rgba(0, 0, 0, .3);
        margin-right: 2.667vw;
    }

    .book-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-sizing: border-box;
        font-size: 14px;
        padding: 3px 0;

        .book-header {
            display: flex;
            justify-content: space-between;

            span:first-child {
                font-size: 14px;
                font-weight: bold;
            }
        }

        .book-to-new {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
        }

        .book-meta {
            display: flex;
            align-items: center;

            .icon {
                font-size: 20px;
                margin-right: 5px;
            }

            .line {
                margin: 0 5px;
            }
        }
    }
}

.btn {
    height: 100%;
}

.no-data {
    width: 80%;
    margin: 200px auto;

    div {
        text-align: center;
        font-size: 16px;
        color: gray;
        margin-top: 20px;
    }
}
.lately {
    display: flex;
    justify-content: center;
    margin-top: 180px;
    .null {
        text-align: center;
        .icon {
            font-size: 50px;
            margin-bottom: 20px;
        }
        div {
            font-size: 14px;
        }
    }
    
}
</style>
