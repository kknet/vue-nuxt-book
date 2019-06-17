
module.exports = {
    mode: 'universal',
    /*
    ** Headers of the page
    */
    head: {
        title: process.env.npm_package_name || '',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width,minimum-scale=1.0,maximum-scale=1.0' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },
    server: {
        host: '0.0.0.0', // default: localhost
    },
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#3B8070' },
    /*
    ** Global CSS
    */
    css: [
        "@/assets/css/reset.css",
        "@/assets/css/border.css",
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        { src: "~/plugins/vant.js", ssr: true },
        { src: "~/assets/css/iconfont.js", ssr: false },
        { src: "~/plugins/filter.js", ssr: true },
    ],
    router: {
        middleware: ["redirect"],
    },
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/proxy'
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        // baseURL: process.env.NODE_ENV == "production" ? "http://101.132.188.203:3000" : "http://127.0.0.1:3000",
        // withCredentials: true,
    },
    proxy: {
        "/zhuishu": {
            target: "http://api.zhuishushenqi.com",
            changeOrigin: true,
            pathRewrite: {
                "^/zhuishu": ""
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
        },
        postcss: {
            "plugins": {
                "postcss-write-svg": {
                    "utf8": false
                },
                "postcss-preset-env": {},
                "postcss-px-to-viewport": {
                    "viewportWidth": 375,
                    "viewportHeight": 667,
                    "unitPrecision": 3,
                    "viewportUnit": "vw",
                    "selectorBlackList": [
                        ".ignore",
                        ".hairlines"
                    ],
                    "minPixelValue": 1,
                    "mediaQuery": false
                },
                "cssnano": {
                    "cssnano-preset-advanced": {
                        "preset": "advanced",
                        "autoprefixer": false,
                        "postcss-zindex": false,
                        "zindex": false,
                    }
                }
            }
        }
    }
}
