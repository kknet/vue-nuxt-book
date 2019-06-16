import Vue from 'vue';
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);
Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: require('@/assets/img/loading-img.gif'),
    attempt: 5,
    error: require('@/assets/img/erroe-img.jpg'),
    filter: {
        progressive(imgUrl) {
            if (imgUrl.src) {
                if (imgUrl.src.startsWith("/agent/")) {
                    imgUrl.src = decodeURIComponent((imgUrl.src).replace('/agent/', ''))
                }
            }
        }
    }
});