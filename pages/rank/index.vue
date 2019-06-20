<template>
    <div>
        <NavHeader title='排行榜' @select='select' category class="border-bottom" @left='left' :active='active' isSearch/>
        <article>
            <section v-for="(val,index) of rankList" :key="val._id">
                <div class="img">
                    <img :src="bgArr[index]" alt="">
                    <div class="img-top-title">
                        <h3>{{val.title}}</h3>
                        <span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-quanquanxiangyoujiantou"></use>
                            </svg>
                        </span>
                    </div>
                </div>
                <div class="list-book-title">
                    <ul v-if="active==0"> 
                        <li class="border-bottom" @click="bookDetails(item._id)" v-for="(item,idx) of homeList[gender[index]].slice(0,5)" :key="item._id">
                            <h3 class="index">{{idx+1}}.</h3>
                            <h4>{{item.title}}</h4>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-qianjin"></use>
                            </svg>
                        </li>
                    </ul>
                    <ul v-else> 
                        <li class="border-bottom" @click="bookDetails(item._id)" v-for="(item,idx) of femaleList[gender[index]].slice(0,5)" :key="item._id">
                            <h3 class="index">{{idx+1}}.</h3>
                            <h4>{{item.title}}</h4>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-qianjin"></use>
                            </svg>
                        </li>
                    </ul>
                </div>
            </section>
        </article>
    </div>
</template>

<script>
import NavHeader from "@/components/public/NavHeader";
import {mixin} from '@/assets/js/mixins'
import * as types from '@/store/mutations-type'
export default {
    mixins:[mixin],
    data () {
        return {
            active: this.$route.query.gender=='male'?0:1,
            bgArr: [
                "//qidian.gtimg.com/qdm/img/rank/rank-bg-1.c077f.jpg",
                "//qidian.gtimg.com/qdm/img/rank/rank-bg-2.868f8.jpg",
                "//qidian.gtimg.com/qdm/img/rank/rank-bg-3.cd1bc.jpg",
                "//qidian.gtimg.com/qdm/img/rank/rank-bg-4.b5dae.jpg",
                '//qidian.gtimg.com/qdm/img/rank/rank-bg-12.c7185.jpg',
                '//qidian.gtimg.com/qdm/img/rank/rank-bg-11.d5b17.jpg'
            ]
        }
    },

    async asyncData({ $axios,store}) {
        // 判断如果vuex里面有数据的话就不请求接口
        if (store.state.femaleList.hot.length) {
            return
        }
        const data = await $axios.$get('/api/femaleBooks')
        if (data.code == 10000) {
            store.commit(types.FEMALE_LIST, data.femaleList)
        } 
    },

    components: {
        NavHeader,
    },
    
    computed: {
        rankList() {
            if (this.active==0) {
                return this.rankCategory.male.slice(0,6)
            } else {
                return this.rankCategory.female.slice(0,6)
            }
        },

        gender() {
            //男： 最热榜 好评榜 热搜榜 潜力榜 留存榜 完结榜
            //女： 最热榜 好评榜 热搜榜 VIP榜 潜力榜 留存榜
            if (this.active==0) {
                return ['hot','good','hotSearch','potential','retain','endBook']
            } else {
                return ['hot','good','hotSearch','vip','potential','retain']
            }
        }
    },

    mounted () {
        this.getAllBooks()
    },

    methods: {
        left() {
            this.$router.go(-1)
        },

        select(i) {
            this.active = i
            // this.$refs.scroll.scrollTo(0,0,0)
            if (i == 0) {
                this.$router.replace({
                    path: '/rank',query:{gender:'male'}
                })
                // this.getAllBooks('male')
            } else {
                this.$router.replace({
                    path: '/rank',query:{gender:'female'}
                })
                // this.getAllBooks('female')
            }
            
        },

        // 获取所有榜单的分类书籍
        getAllBooks(type = this.$route.query.gender,index) {
            //男： 最热榜 好评榜 热搜榜 潜力榜 留存榜 完结榜
            //女： 最热榜 好评榜 热搜榜 VIP榜 潜力榜 留存榜
            const male = ['hot','good','hotSearch','potential','retain','endBook']
            const female = ['hot','good','hotSearch','vip','potential','retain']
            // homeList[gender[index]].slice(0,5)
            if (type === 'male') {
                return this.homeList[male[index]]
            } else {
                 return this.homeList[female[index]]
            }
            
        }
    },

    watch: {
        '$route.query.gender'(v) {
            this.getAllBooks(v)
        }
    }
}
</script>

<style lang="scss" scoped>
article {
    background: #fff;
    width: 100%;
    section {
        margin-top: 10px;
        width: 100%;
        display: flex;
        .img{
            flex: 0 0 130px;
            width: 130px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
                width: 100%;
            }
            .img-top-title {
                text-align: center;
                color: #fff;
                position: absolute;
                width: 130px;
                min-height: 180px;
                display: flex;
                flex-direction: column;
                align-items: center;
                h3 {
                    font-size: 16px;
                    margin-top: 35px;
                    line-height: 1.4;
                }
                span {
                    display: block;
                    width: 30px;
                    height: 30px;
                    line-height: 30px;
                    letter-spacing: 2px;
                    border-radius: 50%;
                    background: #fff;
                    margin-top: 60px;
                    .icon {
                        font-size: 16px;
                    }
                }
            }
            
        }
        .list-book-title {
            flex: 1;
            ul {
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                li {
                    padding: 12px 10px;
                    display: flex;
                    .index {
                        font-size: 14px;
                        font-weight: bold;
                    }
                    h4 {
                        margin-left: 10px;
                        font-weight: bold;
                        flex: 1;
                    }
                    .icon {
                        font-size: 14px;
                    }
                }
            }
        }
    }
    section:first-child {
        margin-top: 0;
    }
}
</style>
