
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
    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
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
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
    ],
    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
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
                        "zindex": false
                    }
                }
            }
        }
    }
}
