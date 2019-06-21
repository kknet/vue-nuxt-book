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
    [types.CATALOG_LIST](state,catalogList) {
        state.catalogList = catalogList
    },
    [types.CAT_BOOKS](state,data) {
        state.catBooks = data.catBooks
        state.catBooksLv2 = data.catBooksLv2
    },
    [types.RANK_CATEGORY](state,rankCategory) {
        state.rankCategory = rankCategory
    },
    [types.SEARCH_WORDS](state,searchWords) {
        state.searchWords = searchWords
    },
}
export default matutaions
