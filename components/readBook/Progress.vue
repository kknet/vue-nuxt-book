<template>
        <transition name="slide-up">
            <div class="setting-wrapper"  v-show="menuVisible&&settingVisible==1">
                <div class="setting-progress">
                    <div class="read-time-wrapper">
                        <span class="read-time-text">已阅读10分钟</span>
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-qianjin"></use>
                        </svg>
                    </div>
                    <div class="progress-wrapper">
                        <div class="progress-icon-wrapper" @click="prevSection()">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-houtui"></use>
                            </svg>
                        </div>
                        <input
                            class="progress"
                            type="range"
                            :max="bookRead.catalog.length-1"
                            min="0"
                            step="1"
                            @change="onProgressChange($event.target.value)"
                            :value="chapterCount"
                            
                            ref="progress"
                        />
             <!-- @change="onProgressChange($event.target.value)" -->
              <!-- @input="onProgressInput($event.target.value)" -->
             <!-- :disabled="!bookAvailable" -->
                        <div class="progress-icon-wrapper" @click="nextSection()">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-qianjin"></use>
                            </svg>
                        </div>
                    </div>
                    <div class="text-wrapper">
                        <span class="progress-section-text">{{title}}</span>
                        <!-- <span>({{bookAvailable ? progress + '%' : '加载中...'}})</span> -->
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
import {mixin} from '@/assets/js/mixins'

export default {
    mixins:[mixin],
    props: {
        title:{
            type:String,
            default:'章节名称'
        },

        chapterCount: {
            type:Number,
            default: 0
        }
    },

    methods: {
        onProgressChange(e) {
            this.$emit('change',e)
        },
     
        prevSection() {
            this.$emit('prev')
        },
        nextSection() {
            this.$emit('next')
        },
        
    },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/mixin.scss";

    .menu-wrapper {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 152;
        display: flex;
        width: 100%;
        height: 48px;
        background: white;
        box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);

        &.hide-box-shadow {
            box-shadow: none;
        }

        .icon-wrapper {
            flex: 1;
            @include center;

            .icon-progress {
                font-size: 28px;
            }

            .icon-bright {
                font-size: 24px;
            }
        }
    }

    .setting-wrapper {
        position: absolute;
        bottom: 46px;
        left: 0;
        z-index: 201;
        width: 100%;
        height: 90px;
        background: #cecece;
        box-shadow: 0 -8px 8px rgba(0, 0, 0, 0.15);

        .setting-progress {
            position: relative;
            width: 100%;
            height: 100%;

            .read-time-wrapper {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 40px;
                font-size: 12px;
                @include center;
                .icon {
                    margin-top: -4px;
                }
            }

            .progress-wrapper {
                width: 100%;
                height: 100%;
                @include center;
                padding: 0 15px;
                box-sizing: border-box;

                .progress-icon-wrapper {
                    font-size: 20px;
                }

                .progress {
                    width: 100%;
                    -webkit-appearance: none;
                    height: 2px;
                    margin: 0 10px;
                    background: rgba(0, 0, 0, 0.15);
                    &:focus {
                        outline: none;
                    }

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: #cecece;
                        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
                        border: 1px solid #cecece;
                    }
                }
            }

            .text-wrapper {
                position: absolute;
                left: 0;
                bottom: 10px;
                width: 100%;
                color: #333;
                font-size: 12px;
                @include center;
                padding: 0 15px;
                line-height: 1.2;
                box-sizing: border-box;
                .progress-section-text {
                    @include ellipsis;
                }
            }
        }
    }
</style>
