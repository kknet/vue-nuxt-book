import Vue from 'vue';
import moment from 'moment'
Vue.filter("URL", imgUrl => {
    if (imgUrl) {
        if (!imgUrl.startsWith("/agent/")) {
            return imgUrl;
        }
        return decodeURIComponent((imgUrl).replace('/agent/', ''))
    }
});

// 过滤头像
Vue.filter('STATIC_URL', imgUrl => {
    return `http://statics.zhuishushenqi.com/${imgUrl}`
})

// 过滤时间
Vue.filter('TIME', timer => {
    return moment(timer).format('YYYY-MM-DD hh:mm:ss')
})

// 得到几天前更新
Vue.filter('UPDATED', updated => {
    const date = new Date(...formatDate(updated));
    const newDate = new Date();
    const t = (newDate - date) / 1000;
    const d = parseInt(t / 86400);
    const hh = parseInt((t % 86400) / 3600);
    const mm = parseInt(((t % 86400) % 3600) / 60);
    const updatedt = [d, hh, mm];
    if (updatedt.length <= 0) return
    const [dd, h, m] = updatedt;
    if (dd > 0) {
        if (dd > 365) {
            return `1年前`;
        } else if (dd >= 182 && dd <= 365) {
            return `半年前`;
        }
        return `${d}天前`;
    }
    if (h > 0) return `${h}小时前`;
    if (m > 0) return `${m}分钟前`;
})


const formatDate = t => {
    const [T, Z] = t
        .replace("T", " ")
        .replace("Z", " ")
        .split(" ");
    const [Y, M, D] = T.split("-");
    const [h, m, s] = Z.split(".")[0].split(":");
    return [
        parseInt(Y),
        parseInt(M) - 1,
        parseInt(D),
        parseInt(h) + 8,
        parseInt(m),
        parseInt(s)
    ];
}