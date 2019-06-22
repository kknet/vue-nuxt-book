import Vue from 'vue';
import Vant from 'vant';
import { Lazyload,Toast,Dialog  } from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
Vue.use(Lazyload, {
    preLoad: 1.3,
    loading: require('@/assets/img/loading-img.gif'),
    attempt: 1,
    error: require('@/assets/img/erroe-img.jpg'),
    filter: {
        progressive(imgUrl) {
            if (imgUrl.src && imgUrl.src.startsWith("/agent/")) {
                imgUrl.src = decodeURIComponent((imgUrl.src).replace('/agent/', ''))
            }
        }
    }
});