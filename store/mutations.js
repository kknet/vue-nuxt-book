import * as types from './mutations-type'

const matutaions = {
    [types.HOME_LIST](state,homeList) {
        state.homeList = homeList
    },
    [types.FEMALE_LIST](state,femaleList) {
        state.femaleList = femaleList
    },
    [types.BOOK](state,book) {
        state.book = book
    },
    [types.COMMENTS](state,comments) {
        if (state.comments[comments.id]) {
            state.comments[comments.id] = comments
        }
    },
}
export default matutaions
