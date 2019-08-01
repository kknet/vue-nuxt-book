<template>
<div>
    <NavHeader @select='select' title="我的书架" :nav='nav' category class="border-bottom" :active='active' isSearch />
    <NavFooter active='3' />

    <div v-if="active==0">
        <div v-if="!userInfo.userName" class="no-data">
            <van-button round type="danger" block size="normal" @click="goLogin">登录</van-button>
            <div>登录后实时同步进度 {{userInfo.userName}}</div>
        </div>
        <div class="my" v-else>
            <Scroll class="scroll-warpper-app" ref="scroll">
                <div>
                    <div class="tip border-bottom" @click="edit" v-if='myBookList.length'>编辑</div>
                    <van-swipe-cell  v-for="(val,index) of myBookList" :key="val._id" :on-close="onClose" :data-id='val.id' :data-index='index'>
                        <div class="book-item" :class="{' border-bottom':index<9}"  @click="bookReads(val.id)">
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
                                    <span v-else class="read-chapter">{{val.readChapter}}</span>
                                </div>
                                <div class="book-to-new gray">
                                    <span class="update">更新至 {{val.lastChapter}}</span>
                                    <span class="day">{{val.updated | UPDATED}}</span>
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
                    let id = instance.$el.getAttribute('data-id')
                    let index = instance.$el.getAttribute('data-index')
                    this.$dialog.confirm({
                        title: '提示',
                        message: '删除后阅读历史将清空？'
                    }).then(() => {
                        instance.close();
                        this.deleteBook(id,index)
                    }).catch(e => {})
                    break;
            }
        },

        async deleteBook(id,index) {
            const data = await this.$axios.$post('/api/deleteBook',{id})
            if (data.code == 10000) {
                this.myBookList.splice(index,1)
                // 更新vuex数据
                const book = this.book[id]
                if (this.book[id]) {
                    let book = JSON.parse(JSON.stringify(this.book[id])) 
                    book.isCollection = false
                    this.setBook({id,data:book})
                    // store.dispatch('setBook', {id,data:data.book})
                }
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
            this.$router.push({name:'login'})
            
            // this.$router.push({name:'login',query:{path:location.origin+ this.$route.fullPath}})
        },

        bookReads(id) {
            this.$router.push({name:'readBook-id',params:{id}})
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
    padding: 15px 0;

    img {
        width: 50px;
        height: 70px;
        box-shadow: 0 1px 0.8vw rgba(0, 0, 0, .3);
        margin-right: 2.667vw;
        margin-left: 15px;
    }

    .book-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        font-size: 14px;
        padding: 3px 0;
        box-sizing: border-box;
        margin-right: 15px;
        width: 100%;
        .book-header {
            display: flex;
            justify-content: space-between;
            width: 100%;
            overflow: hidden;
            span:first-child {
                font-size: 14px;
                font-weight: bold;
            }
        }

        .book-to-new {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            width: 100%;
            .update{
                flex: 1;
                @include ellipsis2(1);
                line-height: 1.2;
            }
            .day {
                text-align: center;
            }
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
            .read-chapter {
                flex: 1;
                @include ellipsis2(1);
                line-height: 1.1;
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
