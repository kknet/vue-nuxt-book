import * as types from './mutations-type'

const matutaions = {
    [types.HOME_LIST](state,homeList) {
        state.homeList = homeList
    },
    [types.FEMALE_LIST](state,femaleList) {
        state.femaleList = femaleList
    },
    
}

export default matutaions
