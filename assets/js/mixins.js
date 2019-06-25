import { mapMutations, mapGetters, mapActions } from 'vuex'
import ScrollTop from "@/components/public/ScrollTop"
export const mixin = {
    computed: {
        ...mapGetters([
            'homeList',
            'femaleList',
            'book',
            'comments',
            'catalogList',
            'rankCategory',
            'searchWords',
            'userName',
            'bookRead',
            'menuVisible',
            'settingVisible',
            'showMore',
            'showTopMenu',
            'fontSize'
        ])
    },

    methods: {
        ...mapMutations({
            setCommentsMap: 'COMMENTS',
            setCatBooks: 'CAT_BOOKS',
            setUserName: 'USER_NAME',
            setSettingVisible: 'SETTING_VISIBLE',
            setMenuVisible: 'MENU_VISIBLE',
            setShowMore: 'SHOW_MORE',
            setShowTopMenu:'SHOW_TOP_MENU',
            setFontSize:'FONT_SIZE'
        }),

        ...mapActions(['setBook', 'setComments']),

        bookDetails(id) {
            this.$router.push({ name: `detail-id`, params: { id } })
        }
    }

}
export const scrollTop = {
    data() {
        return {
            showFlag: false
        }
    },

    components: {
        ScrollTop,
    },

    methods: {
        scroll(e) {
            Math.abs(e.y) > 1000 ? this.showFlag = true : this.showFlag = false
        },

        backTop() {
            this.$refs.scroll.scrollTo(0, 0, 300)
            setTimeout(() => {
                this.showFlag = false
            }, 300);

        }
    }
}

export const page = {
    data() {
        return {
            dataArr: [],
            total: null,
            loading: false, // 锁
        }
    },

    methods: {
        // newArr, 第二页请求到的数据
        setNewData(newArr) {
            this.dataArr = this.dataArr.concat(newArr)
            // console.log(this.dataArr);

        },

        // 起始的记录数
        getCurrentStart() {
            return this.dataArr.length
        },

        // 是否还有更多数据加载
        hasMore() {
            // 说明没有数据要加载了
            if (this.dataArr.length >= this.total) {
                return false
            }
            return true
        },

        // 总条数
        setTotal(total) {
            this.total = total
        },

        // 清空数组
        clearArr() {
            this.setData({
                dataArr: []
            })
            this.total = null
        },

        // 锁的机制
        isLocked() {
            return this.loading ? true : false
        },

        // 加锁
        locked() {
            this.loading = true

        },

        unLocked() {
            this.loading = false

        }
    }
}