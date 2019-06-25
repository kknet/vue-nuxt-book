<template>
    <div class="book-detail">
        <div class="book-layout">
            <img :src='bookInfo.cover | URL' class="cover"/>
            <div class="book-cell">
                <h2 class="book-title">{{bookInfo.title}}</h2>
                <div class="book-author">
                    <span>{{bookInfo.author}}</span>
                    <i>Lv4</i>
                </div>
                <div class="rate">
                    <van-rate size='3.267vw' allow-half v-model="rate" color="#f44" readonly />
                    <span class="score gray">{{bookInfo.rating.score}}分 / {{bookInfo.rating.count}}评过</span>
                </div>
                <div class="book-cat">{{bookInfo.majorCate}}/{{bookInfo.minorCate}}</div>
                <div class="book-count-status">
                    <div class="book-word-count">{{parseInt(bookInfo.wordCount / 10000 *10)/10 + "万字"}}</div>
                    <span> | </span>
                    <div class="book-status">{{bookInfo.isSerial?"连载":"完本"}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        bookInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },

    computed: {
        rate() {
            return this.bookInfo.rating.score / 2
        }
    },
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/mixin.scss';
.book-detail {
    box-sizing: border-box;

    .book-layout {
        display: flex;

        .cover {
            flex: 0 0 80px;
            width: 80px;
            height: 110px;
            margin-right: 8px;
        }

        .book-cell {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            .book-title {
                @include ellipsis();
                font-weight: 700;
                font-size: 16px;
                padding-top: 3px;
            }

            .book-author {
                display: flex;
                align-items: center;

                span {
                    color: #333;
                    font-size: 13px;
                    margin-right: 4px;
                }

                i {
                    font-style: italic;
                    font-size: 10px;
                    background: #f0643a;
                    color: #fff;
                    border-radius: 2px;
                    padding: 1px 3px;
                }
            }

            .rate {
                display: flex;
                align-items: center;

                .score {
                    font-size: 12px;
                    margin-left: 10px;
                }
            }

            .book-cat {
                font-size: 14px;
            }

            .book-count-status {
                display: flex;
                align-items: center;

                span {
                    margin: 0 5px;
                }
            }
        }
    }
}
</style>
