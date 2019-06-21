<template>
    <div class="home">
        <NavHeader active="1" @select='select'/>
        <div class="home-warp">
            <Scroll class="scroll-warpper-app" :data='femaleList.hot'>
                <div>
                    <Swiper :swiper="swiper" />
                    <SearchBar />
                    <HomeNav />
                    <div class="book-warp">
                        <Title title="热门小说" desc="起点编辑推荐" />
                        <BookItem :list="femaleList.hot.slice(0,20)" />
                    </div>
                    <div class="book-warp">
                        <Title title="排行榜" />
                        <TabItem :nav="rankTab" class="rank-tab" @change="rankChange" />
                        <BookItem :list="rankList || femaleList.hot.slice(20,40)" />
                    </div>
                    <div class="book-warp">
                        <Title title="新书抢先" desc="24小时热销新书" />
                        <BookItem align :list="femaleList.newBook.slice(0,3)" />
                    </div>
                    <div class="book-warp">
                        <Title title="畅销完本" />
                        <BookItem align :list="femaleList.retain.slice(0,3)" />
                    </div>
                    <div class="book-warp">
                        <Title title="分类推荐" desc="频道主编推荐" />
                        <TabItem :nav="typeTab1" class="rank-tab" @change="rankChange1" />
                        <BookItem :list="typeList || femaleList.romance" />
                        <TabItem :nav="typeTab2" class="rank-tab rank-tab2" @change="rankChange2" />
                        <BookItem :list="typeList2 || femaleList.fantasy" />
                    </div>
                    <!-- <NavFooter /> -->
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
import {mixin} from "@/assets/js/mixins";
import NavHeader from "@/components/public/NavHeader";
import Swiper from "@/components/layouts/Swiper";
import HomeNav from "@/components/layouts/Nav";
import SearchBar from "@/components/layouts/SearchBar";
import Title from "@/components/public/Title";
import BookItem from "@/components/public/BookItem";
import TabItem from "@/components/public/TabItem";
import NavFooter from "@/components/public/NavFooter";
import Scroll from "@/components/public/Scroll";
import * as types from '@/store/mutations-type'

export default {
    mixins: [mixin],
    components: {
        NavHeader,
        Swiper,
        HomeNav,
        SearchBar,
        Title,
        BookItem,
        TabItem,
        NavFooter,
        Scroll
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
    data() {
        return {
            rankTab: [{
                    name: '热销榜',
                    ros: 'hot'
                },
                {
                    name: '潜力榜',
                    ros: 'potential'
                },
                {
                    name: '好评榜',
                    ros: 'good'
                },
                {
                    name: 'VIP排行榜',
                    ros: 'vip'
                },
            ],
            typeTab1: [{
                    name: '古代言情',
                    ros: 'romance'
                },
                {
                    name: '仙侠奇缘',
                    ros: 'immortal'
                },
                {
                    name: '现代言情',
                    ros: 'modern'
                },
                {
                    name: '青春校园',
                    ros: 'campus'
                },
            ],
            typeTab2: [{
                    name: '玄幻奇幻',
                    ros: 'fantasy'
                },
                {
                    name: '科幻小说',
                    ros: 'science'
                },
                {
                    name: '悬疑灵异',
                    ros: 'suspense'
                },
                {
                    name: '女尊小说',
                    ros: 'woman'
                },
            ],

            rankList: null,
            typeList: null,
            typeList2: null,
            swiper: [
                "//bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/765d2e6e6d9bdf16d6803bda7da1be99.jpg",
                "//bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/ee75043ffc8d3c2009a30b7d48e67d1c.jpg",
                "//bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/d41a0be0882e53f99553321975ce8d87.jpg",
                "//bossaudioandcomic-1252317822.file.myqcloud.com/activity/document/10a40ef9f7c54e624d698257551b22da.jpg"
            ]
        };
    },
    methods: {
        // 排行榜单 切换tab
        rankChange(i) {
            this.rankList = this.femaleList[this.rankTab[i].ros].slice(0, 20);
        },

        rankChange1(i) {
            this.typeList = this.femaleList[this.typeTab1[i].ros];
        },

        rankChange2(i) {
            this.typeList2 = this.femaleList[this.typeTab2[i].ros];
        },
        select(i) {
            if (i == 0) {
                this.$router.push({
                    name: 'index'
                })
            }
        },

        
    }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

.home-warp {
    @include scroll(45px, 0, #f6f7f9);
}

.list {
    img {
        width: 100px;
        height: 100px;
    }
}

.rank-tab {
    margin-bottom: 12px;
    display: flex;
    justify-content: center;
}

.rank-tab2 {
    margin-top: 20px;
}
</style>
