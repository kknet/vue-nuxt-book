const storage = require('good-storage').default
const SEARCH_HISYSTORY = 'SEARCH_HISTORY'

// 搜索历史
const searchHisystory = {
    getHistory() {
        return storage.get(SEARCH_HISYSTORY,[])
    },

    setHistory(data) {
        let newData = this.getHistory()
        
        if (newData.length) {
            newData.forEach((item,index) => {
                if (item === data) {
                    newData.splice(index,1)
                }
            })
        }

        newData.unshift(data)
        if (newData.length > 15) {  // 最近浏览最多30条缓存
            newData.pop()
        }
        storage.set(SEARCH_HISYSTORY,newData)
        return newData
    },

    clearHistory() {
        return storage.set(SEARCH_HISYSTORY,[])
    }
}

module.exports = {
    searchHisystory
}