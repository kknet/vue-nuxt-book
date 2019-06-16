<template>
    <div class="home">
        <NavHeader />
        <div class="home-warp">
            <Scroll class="scroll-warpper-app" :data='homeList.hot'>
                <div>
                    <Swiper :swiper="swiper" />
                    <SearchBar />
                    <HomeNav />
                    <div class="book-warp">
                        <Title title='热门小说' desc='起点编辑推荐' />
                        <BookItem :list='homeList.hot.slice(0,20)' />
                    </div>
                    <div class="book-warp">
                        <Title title='排行榜' />
                        <TabItem :nav='rankTab' class="rank-tab" @change='rankChange' />
                        <BookItem :list='rankList || homeList.hot.slice(20,40)' />
                    </div>
                    <div class="book-warp">
                        <Title title='新书抢先' desc='24小时热销新书' />
                        <BookItem align :list='homeList.newBook.slice(0,3)' />
                    </div>
                    <div class="book-warp">
                        <Title title='畅销完本' desc='一周热销完本书' />
                        <BookItem align :list='homeList.endBook.slice(0,3)' />
                    </div>
                    <div class="book-warp">
                        <Title title='分类推荐' desc='频道主编推荐' />
                        <TabItem :nav='typeTab1' class="rank-tab" @change='rankChange1' />
                        <BookItem :list='typeList || homeList.fantasy' />
                        <TabItem :nav='typeTab2' class="rank-tab rank-tab2" @change='rankChange2' />
                        <BookItem :list='typeList2 || homeList.history' />
                    </div>
                    <NavFooter />
                </div>
            </Scroll>
        </div>
    </div>
</template>

<script>
import mixin from '@/assets/js/mixins'
import NavHeader from "@/components/public/NavHeader";
import Swiper from "@/components/layouts/Swiper";
import HomeNav from "@/components/layouts/Nav";
import SearchBar from "@/components/layouts/SearchBar";
import Title from "@/components/public/Title";
import BookItem from "@/components/public/BookItem";
import TabItem from "@/components/public/TabItem";
import NavFooter from "@/components/public/NavFooter";
import Scroll from "@/components/public/Scroll";

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
        Scroll,
    },

    data() {
        return {
            rankTab: [
                {name:'热销榜',ros:'hot'},
                {name:'潜力榜',ros:'potential'},
                {name:'好评榜',ros:'good'},
                {name:'VIP排行榜',ros:'vip'}],
            typeTab1:[
                {name:'玄幻奇幻',ros:'fantasy'},
                {name:'武侠仙侠',ros:'knight'},
                {name:'都市职场',ros:'urban'},
            ],
            typeTab2:[
                {name:'历史军事',ros:'history'},
                {name:'游戏体育',ros:'game'},
                {name:'科幻灵异',ros:'science'},
            ],
            rankList: null,
            typeList: null,
            typeList2: null,
            swiper: [
                "//qidian.qpic.cn/qidian_common/349573/185a83020cf454940b3074ca799e78c7/0",
                "//qidian.qpic.cn/qidian_common/349573/7d08609bf6b6f1370c714d157d43c8b2/0",
                "//qidian.qpic.cn/qidian_common/349573/2adf5c980c73a896b64dff676fb2d49d/0",
                "//qidian.qpic.cn/qidian_common/349573/2198d860477a1951e8e5ff0bb4d54dfd/0"
            ]
        };
    },
    methods: {
        // 排行榜单 切换tab
        rankChange(i) {
            this.rankList = this.homeList[this.rankTab[i].ros].slice(0, 20)
        },

        rankChange1(i) {
            this.typeList = this.homeList[this.typeTab1[i].ros]
        },

        rankChange2(i) {
            this.typeList2 = this.homeList[this.typeTab2[i].ros]
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.home-warp {
    @include scroll(45px,0,#f6f7f9);
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
