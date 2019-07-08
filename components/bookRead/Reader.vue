<template>
    <div class="reader"  @click="setRead($event)" @touchmove='touchmove'>
        <div class="title-top">
            <div class="chapter-title">{{title}}</div>
        </div>
        <div  class="article"  ref="article-warp">
            <div ref="article" >
                <h4 class="chapter-t" :style="{fontSize:fontSize+0.5+'vw'}">{{title}}</h4>
                <div v-if="Array.isArray(content)">
                    <p :style="{fontSize:fontSize + 'vw'}" v-for="(item,index) in content" :key="index">{{item}}</p>
                </div>
                <div v-else>
                    <p :style="{fontSize:fontSize + 'vw'}">{{content}}</p>
                </div>
                <div class="btns">
                    <van-button class="btn" v-if="content.length&&chapterCount!=0" @click.stop="prev" round type="danger" block size="small">加载上一章</van-button>
                    <van-button class="btn" v-if="content.length&&chapterCount+1!=bookRead.catalog.length" @click.stop="next" round type="danger" block size="small">加载下一章</van-button>
                </div>
            </div>
        </div>
        <!-- <div class="article-page">{{currentPaging + '/' + resultPaging}}</div> -->
    </div>
</template>

<script>
import {mixin} from '@/assets/js/mixins'
let font
if (process.client) {
     font = require('@/assets/js/cache') 
} 
export default {
    props: {
        content: {
            type:[Array,String],
            default() {
                return []
            }
        },
        title: {
            type:String,
            default:''
        },

        // 当前是第几章。下标
        chapterCount: {
            type:Number,
            default:0
        }
    },
    
    computed: {
        bottom () {
            // return this.fontSize == 4.8 ? '6vw' : this.fontSize == 5.867 ? '8.2vw' : '5.333vw'
            if (this.fontSize == 3.733) {
                return '6.6vw'
            } else if(this.fontSize == 4.267) {
                return '8vw'
            } else if(this.fontSize == 4.8) {
                return '8.5vw'
            } else if(this.fontSize == 5.333) {
                return '7vw'
            } else if(this.fontSize == 5.867) {
                 return '11vw'
            } else{
                return '8.2vw'
            }
        }
    },

    mixins:[mixin],
    data() {
        return {
            currentPaging:1,//第一页
            bookCurrentPage:0,  // 小说的章节
            resultPaging: 1,
            margin:15,
            offsetX:0,
            clWidth:0,
            styleObject:{}
        }
    },

    mounted () {
        this.setFontSize(font.fontSize.getFontSize())
        // this.$refs['article-warp'].addEventListener("scroll", this.throttle(this.handleScroll,500,800) );
    },

    // destroyed() {
    //     window.removeEventListener('scroll',this.handleScroll)
    // },
    
    methods: {
        // 计算一张分多少页
        setResultPaging() {
            this.$nextTick(() => {
                setTimeout(() => {
                    let scrollW = this.$refs.article[0].clientHeight
                    let clientW = this.$refs['article-warp'][0].clientHeight
                    this.resultPaging = Math.floor(scrollW / clientW)
                    this.clWidth = document.documentElement.clientWidth || document.body.clientWidth
                    this.offsetX -= (this.currentPaging - 1) * (this.clWidth - this.margin);
                }, 100);
            })
        },

        setRead(e) {
            let clWidth = document.documentElement.clientWidth || document.body.clientWidth;
            let currentX = e.pageX;
            let offsetX = clWidth / 3;
                
            if (currentX <= offsetX) {//用户点击左侧三分之一
                this.showTitleAndMenu(false)
                // this.prevPage()
            }else if (offsetX <= currentX && currentX <= offsetX * 2) {
                this.showTitleAndMenu(true)
            }else if (currentX >= offsetX * 2 && currentX <= clWidth) {
                this.showTitleAndMenu(false)
                // this.nextPage()
                this.currentPaging++
                this.offsetX -= (clWidth - this.margin);
                this.styleObject = {
                transform: 'translateX(' + this.offsetX + 'px' + ')',
                transitionDuration: '0.5s'
                };
            }
        },
        touchmove() {
            this.showTitleAndMenu()
        },

        // 上一页
        prevPage() {
            if (this.bookCurrentPage === 0 && this.currentPaging === 1) {
                this.$toast('已经是第一章了！');
                return
            }
        },

        // 下一页
        nextPage() {
            this.currentPaging++
        },

        showTitleAndMenu(flag) {
            if (flag) {
                if (this.menuVisible) {
                    this.setMenuVisible(false)
                } else {
                    this.setMenuVisible(true)
                }
            } else {
                this.setMenuVisible(false)
            }
            
            this.setSettingVisible(-1)
            this.setShowMore(false)
        },

        /**
         * 函数节流方法
         * @param Function fn 延时调用函数
         * @param Number delay 延迟多长时间
         * @param Number atleast 至少多长时间触发一次
         * @return Function 延迟执行的方法
         */
        // atleast要大于dalay
        throttle (fn, dalay, atleast = 0) {
            let timer = null
            let previous = null
            return (...args) => {
                let now = +new Date()	//获取当前时间戳
                !previous ? now : previous
                if (atleast && now - previous > atleast) {
                    fn.apply(this, args)
                    // 重置上一次开始时间为本次结束时间
                    previous = now
                    clearTimeout(timer)
                } else {
                    clearTimeout(timer)
                    timer = setTimeout(() => {
                        fn.apply(this, args)
                        previous = null
                    }, dalay)
                }
            }
        },

        // handleScroll() {
        //     // 滚动条总高度
        //     const scrollHight = this.$refs['article-warp'].scrollTop
        //     // 可视区高度
        //     const clientHeight = document.documentElement.clientHeight;
        //     // 当前滚动条高度
        //     const scrollTop = this.$refs['article'].scrollHeight;
        //     // 判断是否触底
        //     if (scrollHight + clientHeight >= scrollTop ) {
        //         this.$emit('loadMore')
        //     }
        // },

        // 下一章
        next() {
            this.$emit('loadMore')
        },

        // 上一章
        prev() {
            this.$emit('prev')
        }
    },

    watch: {
        // fontSize() {
        //     this.setResultPaging()
        // }
    }
}
</script>

<style lang="scss" scoped>
.reader {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #cecece;
    color: #575a5f;
}
.title-top {
    position: fixed;
    top: 0;
    z-index: 1;
    height: 40px;
    width: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    color: rgba(0, 0, 0, 0.4);
    .chapter-title {
        width: calc(100% - 40px);
        height: 40px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        font-size: 14px;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
    }
}
.article {
    padding: 0 0 20px 0;
    position: absolute;
    top: 40px;
    bottom: 0;
    overflow-y: auto;
    width: 92%;
    left: 50%;
    transform: translateX(-50%);
    h4 {
        font-weight: bold;
        line-height: 1.4;
    }
    p {
        text-indent: 25px;
        margin: 10px 0px 10px 0px;
        line-height: 1.4;
        color: #575a5f;
        text-align: justify;
    }
}
.article-page {
    color: #585858;
    font-size: 13px;
    position: absolute;
    left: 10px;
    bottom: 10px
}
.btns {
    display: flex;
    justify-content: space-between;
    .btn {
        flex: 1;
        margin: 0 5px;
    }
}
</style>
