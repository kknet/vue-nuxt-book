import { mapMutations, mapGetters, mapActions } from 'vuex'
const mixins = {
    computed: {
        ...mapGetters([
            'homeList',
            'femaleList',
            'book'
        ])
    },

    methods: {
        // ...mapMutations({
        //     setCurrent: 'CURRENT',
        //     setDetails: 'DETAILSCONTENT'
        // }),

        // ...mapActions(['setArticleArr']),
        // details(id) {
        //     this.$router.push({ name: `details-id`, params: { id } })
        // }
    }

}

export default mixins