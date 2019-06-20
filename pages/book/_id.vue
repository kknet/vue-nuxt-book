<template>
    <div>
        <van-nav-bar :title="books.title"  left-arrow @click-left="onClickLeft">
            <van-icon name="search" slot="right" />
            <van-icon name="qr" slot="right" />
        </van-nav-bar>
        <img :src="books.cover | URL" class="book-cover-blur-top">
        <div class="book-details-warp">
            <Scroll class="scroll-warpper-app" :data='homeList.comment'>
                <div>
                    <div class="content">
                        <Detail :bookInfo='books'/>
                        <div class="btns border-bottom">
                            <van-button type="danger" size="small">点击阅读</van-button>
                            <van-button size="small">加入书架</van-button>
                            <van-button size="small">VIP订阅</van-button>
                        </div>
                        <LongIntro :content='books.longIntro'/>
                        <div class="book-directory" @click="goCatalog">
                            <span class="left-text" >目录</span>
                            <div class="right-text">
                                <span >{{day}} · {{books.isSerial?"连载":"完本"}}至{{books.lastChapter}}</span>
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-qianjin"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="book-comment-title">
                        <span>书友评价</span>
                        <span>共{{books.postCount}}条评价</span>
                    </div>
                    <div class="book-comment">
                        <Comment :list='books.comment' showMore @onShowMore='onShowMore'/>
                    </div>
                    <div class="author-card">
                        <div class="author-title border-bottom">本书作者</div>
                        <Author class="c-author" :avatar='books.cover' :author='books.author'/>
                    </div>
                    <div class="tags">
                        <div class="tags-title border-bottom">本书标签</div>
                        <div class="tag-warp">
                            <van-tag size="large" class="tag" :type="val.type" v-for="val of tags" :key="val.tag">{{val.tag}}</van-tag>
                        </div>
                    </div>
                    <img :src="books.cover | URL" class="book-cover-blur">
                </div>
            </Scroll>
        </div>
        
    </div>
</template>

<script>
import {mixin} from "@/assets/js/mixins";
import Detail from '@/components/book/Detail'
import LongIntro from '@/components/book/LongIntro'
import Comment from '@/components/public/Comment'
import Author from '@/components/book/Author'
import * as types from '@/store/mutations-type'
import Scroll from "@/components/public/Scroll";
const {BOOK} = require('@/assets/js/conf')
import moment from 'moment'
export default {
    mixins: [mixin],
    validate ({ params}) {
        if (params.id.length == 24) {
            return true
        }
        return false
    },
    async asyncData({$axios,route,store}) {
        const id = route.params.id
        if (store.state.book.hasOwnProperty(id)) {  // 如果vuex里面有数据就不去请求接口
            return {
                books:store.state.book[id]
            }
        }
        
        const data = await $axios.$get(`/api/book?id=${id}`)
        if (data.code == 10000) {
            data.book.comment = data.comment    // 评论
            store.dispatch('setBook', {id,data:data.book})
            return {
                books:data.book
            }
        }
    },

    data() {
        return {
            books:{},
            tag:['','primary','success','danger','','primary','success','danger']
        }
    },

    components: {
        Detail,
        LongIntro,
        Comment,
        Author,
        Scroll,
    },
    
    computed: {
        day() {
            let updateTime = new Date(moment(this.book.updated).format()).getTime()
            let newTime = +new Date()
            const t = (newTime - updateTime) / 1000;
            const dd = parseInt(t / 86400) / 1000;
            const hh = parseInt((t % 86400) / 3600);
            const mm = parseInt(((t % 86400) % 3600) / 60);
            if (dd > 0) return `${dd}天前`;
            if (hh > 0) return `${hh}小时前`;
            if (mm > 0) return `${mm}分钟前`;
            return '1天前'
        },

        // 书籍标签
        tags() {
            let tag = this.books.tags
            if (!tag.length) {
                return [
                    {type:'success',tag:this.books.majorCate},
                ]
            }
            let arr = []
            for (let i = 0; i < tag.length; i++) {
                arr.push({
                    type:this.tag[i],
                    tag:tag[i]
                })
            }
            return arr
        }
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1)
            // this.$router.push({name:'index'})
        },

        // 更多评论
        onShowMore() {
            this.$router.push({ name: `moreComments-id`, params: { id:this.$route.params.id } })
        },

        // 目录
        goCatalog() {
            this.$router.push({ name: `catalog-id`, params: { id:this.$route.params.id } })
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
@import '~@/assets/css/vant.scss';

.book-details-warp {
    @include scroll(45px,0,#f6f7f9);
}
.content {
    padding: 15px;
}

.btns {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;
    .van-button--small {
        padding: 0 20px;
        font-size: 14px;
    }
}
.book-cover-blur {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: .02;
    opacity: calc(.1 + .05);
    filter: blur(calc(17px + 1px));
    z-index: -1;
}
.book-cover-blur-top {
    width: 100%;
    height: 50px;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    opacity: calc(.1 + .05);
    filter: blur(calc(17px + 1px));
    z-index: -1;
}
// 书籍目录
.book-directory {
    display: flex;
    align-items: center;
    padding: 5px 0;
    height: 30px;
    line-height: 30px;
    .left-text {
        flex: 0 0 28%;
        font-weight: bold;
    }

    .right-text {
        flex: 1;
        font-size: 12px;
        letter-spacing: 1px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        position: relative;
        color: gray;
        .icon {
            position: absolute;
            top: 50%;
            right: 0px;
            transform: translateY(-50%);
            z-index:10;
        }
        span {
            margin-right:5px;
        }
    }
}
// 评论
.book-comment-title {
    display: flex;
    align-items: flex-end;
    padding: 15px;
    border-bottom: 1px solid #ddd;
    border-top: 1px solid #ddd;
    span:first-child {
        font-size: 14px;
        font-weight: 900;
        margin-right: 10px;
    }
    span:last-child {
        font-size: 10px;
        color: gray;
    }
}
.book-comment {
    padding: 15px;
}
// 作者名片

.author-card {
    margin-top: 20px;
    .author-title {
        height: 40px;
        line-height: 40px;
        padding: 0 15px;
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
    }
    .c-author {
        padding: 15px;
    }
}

// 书籍标签
.tags {
    margin-top: 20px;
    .tags-title {
        height: 40px;
        line-height: 40px;
        font-size: 16px;
        padding: 0 15px;
        font-weight: bold;
        border-bottom: 1px solid #ddd;
        border-top: 1px solid #ddd;
    }
    .tag {
        margin-right: 10px;
        margin-top: 10px;
    }
    .tag-warp {
        padding: 0px 15px 15px;
    }
}
</style>

