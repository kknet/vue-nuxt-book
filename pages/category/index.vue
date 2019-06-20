<template>
    <div>
        <NavHeader @select='select' category class="border-bottom" @left='left' :active='active' isSearch/>
        <div class="category">
            <Scroll class="scroll-warpper-app" ref="scroll">
                <div>
                    <div  class="cards" v-for="val of gcatBooks" :key="val.name">
                        <div class="card-title border-bottom">
                            <span class="name">{{val.name}}</span>
                            <span class="count gray">共 {{val.bookCount}} 本作品</span>
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-qianjin"></use>
                            </svg>
                        </div>
                        <div class="card-btns border-bottom" v-for="(item,idx) of gcatBooksLv2" :key="idx" v-show="item.major === val.name">
                            <span v-for="i in item.mins" :key="i" @click="tags(val.name,i)">{{i}}</span>
                        </div>
                    </div>
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
import NavHeader from "@/components/public/NavHeader";
import {mixin} from '@/assets/js/mixins'
import * as types from '@/store/mutations-type'
import Scroll from "@/components/public/Scroll";
export default {
    mixins:[mixin],
    async asyncData({ $axios,store,route}) {
        // 判断如果vuex里面有数据的话就不请求接口
        if (store.state.catBooks.ok === true && store.state.catBooksLv2.ok === true) {
            return {
                catBooks:store.state.catBooks,
                catBooksLv2:store.state.catBooksLv2
            }
        }
        const [data,data2] = await Promise.all([
            $axios.$get('/zhuishu/cats/lv2/statistics'),
            $axios.$get('/zhuishu/cats/lv2'),
        ])
        
        if (data.ok || data2.ok) {
            store.commit(types.CAT_BOOKS, {catBooks:data,catBooksLv2:data2})
            return {
                catBooks: data,
                catBooksLv2:data2
            }
            
        }
    },
    data () {
        return {
            catBooks:[],
            catBooksLv2:[],
            active: this.$route.query.gender=='male'?0:1,
        }
    },

    computed: {
        gcatBooks() {
            if (this.active==0) {
                return this.catBooks.male;
            } else {
                return this.catBooks.female;
            }
        },
        gcatBooksLv2() {
            if (this.active==0) {
                return this.catBooksLv2.male;
            } else {
                return this.catBooksLv2.female;
            }
        }
    },

    components: {
        NavHeader,
        Scroll,
    },
    methods: {
        select(i) {
            this.active = i
            this.$refs.scroll.scrollTo(0,0,0)
            if (i == 0) {
                this.$router.replace({
                    path: 'category',query:{gender:'male'}
                })
                
            } else {
                this.$router.replace({
                    path: 'category',query:{gender:'female'}
                })
            }
        },

        left() {
            this.$router.go(-1)
        },

        tags(item,i) {
            this.$router.push({
                name: 'categoryDetails',query:{
                    gender:this.$route.query.gender,
                    major:item,
                    minor:i,
                    type:'hot'
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.category {
    @include scroll(45px,0,#fff);
}
.cards {
    .card-title {
        display: flex;
        align-items: center;
        padding: 15px 20px;
        .name {
            font-family: FZZCYSK;
            font-size: 16px;
            font-weight: 400;
            margin-right: 15px;
        }
        .count {
            flex: 1;
        }
        .icon {
            font-size: 16px;
            color: gray;
        }
    }
    .card-btns {
        padding: 10px 15px 5px 15px;
        display: flex;
        flex-wrap: wrap;
        span {
            padding: 8px 10px;
            border: 1px solid gray;
            color: gray;
            border-radius: 20px;
            margin-bottom: 10px;
            margin-right: 8px;
        }
        span:last-child {
            margin-right:0;
        }
    }
}
</style>

