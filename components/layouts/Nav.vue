<template>
    <ul>
        <li v-for="(val,index) of list" :key="val.title" @click="select(val.path,index)">
            <svg class="icon" aria-hidden="true">
                <use :xlink:href="val.icon"></use>
            </svg>
            <div class="title">{{val.title}}</div>
        </li>
    </ul>
</template>

<script>
export default {
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
                    title: '免费',
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
        } 
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
}
</style>
