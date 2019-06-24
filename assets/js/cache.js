const storage = require('good-storage').default 
const SEARCH_HISYSTORY = 'SEARCH_HISTORY'   // 搜索历史
const THEME = 'theme'       // 主题缓存
const FONT_SIZE = 'fontSize'      // 缓存字体的大小
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
        if (newData.length > 10) {  // 最近浏览最多10条缓存
            newData.pop()
        }
        storage.set(SEARCH_HISYSTORY,newData)
        return newData
    },

    clearHistory() {
        return storage.set(SEARCH_HISYSTORY,[])
    }
}

// 主题切换缓存
const theme = {
    getTheme() {
        return storage.get(THEME,'默认')
    },
    
    setTheme(theme) {
        return storage.set(THEME,theme)
    }
}

// 字体大小缓存
const fontSize = {
    getFontSize() {
        return storage.get(FONT_SIZE,16)
    },

    setFontSize(font) {
        return storage.set(FONT_SIZE,font)
    },
}
module.exports = {
    searchHisystory,
    theme,
    fontSize,
}