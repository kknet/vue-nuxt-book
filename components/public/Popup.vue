<template>
    <van-popup v-model="showTopMenus" position="top" overlay @click-overlay='setShowTopMenu(false)' class="pop" :close-on-click-overlay='false'>
        <ul class="ul">
        <li v-for="(val,index) of list" :class="{nomargin:index<3}" :key="val.title" @click="select(val)" class="item">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="val.icon"></use>
            </svg>
            <div class="title">{{val.title}}</div>
        </li>
        <van-button class="btn" v-if="userInfo.userName" @click="loginOut" round type="danger" block size="small">退出登录</van-button>
    </ul>
    </van-popup>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    props: {
        show: {
            type: Boolean,
            default: false        
        }
    },

    computed: {
        showTopMenus: {
            get () {
                return this.showTopMenu
            },
            set () {
            }
        }
    },
    data () {
        return {
            list: [{
                    title: '分类',
                    icon: '#icon-fenlei1',
                    path: '/category',
                    query: {gender:'male'}
                },
                {
                    title: '排行榜',
                    icon: '#icon-paihangbang-',
                    path: '/rank',
                    query: {gender:'male'}
                },
                {
                    title: '出版',
                    icon: '#icon-yiwancheng'
                },
                {
                    title: '完本',
                    icon: '#icon-shu'
                },
                {
                    title: '大神',
                    icon: '#icon--huangguan'
                },
                {
                    title: '书架',
                    icon: '#icon-shouye',
                    path: '/myBook'
                },
            ]
        }
    },

    methods: {
      
        select(val) {
            this.setShowTopMenu(false)
            this.$router.push({
                path:val.path,
                query:val.query
            })
        },

        loginOut() {
            this.$axios.$post('/api/loginOut').then(res => {
                if (res.code == 10000) {
                    this.$toast('退出登录成功')
                    this.setUserName({})
                    this.setShowTopMenu(false)
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.pop {
    padding-top: 50px;
}
ul {
    display: flex;
    padding: 15px 0;
    background: #fff;
    margin-top: 8px;
    li {
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        .icon {
            font-size: 28px;
        }

        .title {
            font-size: 12px;
            font-weight: bold;
            margin-top: 5px;
        }

    }
    .item {
        flex: 0 0 33.333%;
        margin-top: 25px;
    }
    .nomargin {
        margin-top: 0;
    }
}
.ul {
    flex-wrap: wrap;
    margin-top: 0;
    padding: 25px 0 15px 0;
}
.btn {
    width: 80%;
    margin: 25px auto 0;
}
</style>
