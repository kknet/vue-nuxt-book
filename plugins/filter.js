import Vue from 'vue';
import moment from 'moment'
Vue.filter("URL", imgUrl => {
    if (imgUrl) {
        if (!imgUrl.startsWith("/agent/")) {
            return imgUrl;
        }
        return decodeURIComponent((imgUrl).replace('/agent/',''))
    }
});

// 过滤头像
Vue.filter('STATIC_URL',imgUrl => {
    return `http://statics.zhuishushenqi.com/${imgUrl}`
})

// 过滤时间
Vue.filter('TIME',timer => {
    return moment(timer).format('YYYY-MM-DD hh:mm:ss')
})