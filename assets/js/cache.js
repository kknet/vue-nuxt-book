const storage = require('good-storage').default


// 图书分类
const book_classification = {
    setCatBooks(list) {
        return storage.set('catBooks',list)
    },

    setCatBooksLv2(list) {
        return storage.set('catBooksLv2',list)
    },

    getCatBooks() {
        return storage.get('catBooks',[])
    },

    getCatBooksLv2() {
        return storage.get('catBooksLv2',[])
    },
}

module.exports = book_classification