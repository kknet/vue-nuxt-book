import Vue from 'vue';
Vue.filter("URL", imgUrl => {
    if (imgUrl) {
        if (!imgUrl.startsWith("/agent/")) {
            return imgUrl;
        }
        return decodeURIComponent((imgUrl).replace('/agent/',''))
    }
});
