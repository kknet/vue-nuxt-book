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

        ...mapActions(['setBook']),
        // details(id) {
        //     this.$router.push({ name: `details-id`, params: { id } })
        // }
    }

}

export default mixins