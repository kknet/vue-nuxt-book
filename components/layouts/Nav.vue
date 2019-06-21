<template>
    <ul v-if="!popup">
        <li v-for="(val,index) of list.slice(0,-1)" :key="val.title" @click="select(val.path,index)">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="val.icon"></use>
            </svg>
            <div class="title">{{val.title}}</div>
        </li>
    </ul>
    <ul v-else class="ul">
        <li v-for="(val,index) of list" :class="{nomargin:index<3}" :key="val.title" @click="select(val.path,index)" class="item">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="val.icon"></use>
            </svg>
            <div class="title">{{val.title}}</div>
        </li>
    </ul>
</template>

<script>
export default {
    props:{
        popup: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            list: [{
                    title: '分类',
                    icon: '#icon-fenlei1',
                    path: '/category'
                },
                {
                    title: '排行榜',
                    icon: '#icon-paihangbang-',
                    path: '/rank'
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
                    icon: '#icon-shouye'
                },
            ]
        }
    },

    methods: {
        select(path, index) {
            const query = ['male','female']
            if (this.$route.name === 'index') {
                this.$router.push({
                    path,query:{gender:query[0]}
                })
            } else {
                this.$router.push({
                    path,query:{gender:query[1]}
                })
            }
        },

    }
}
</script>

<style lang="scss" scoped>
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
    padding: 25px 0;
}
</style>
