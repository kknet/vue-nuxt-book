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
              max="100"
              min="0"
              step="1"
              @change="onProgressChange($event.target.value)"
              @input="onProgressInput($event.target.value)"
              value="10"
             
              ref="progress"
            >
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
        }
    },

    methods: {
        onProgressChange(progress) {
            this.setProgress(progress).then(() => {
                this.displayProgress();
                this.updataProgressBg();
            });
        },
        onProgressInput(progress) {
            this.setProgress(progress).then(() => {
                this.displayProgress();
                this.updataProgressBg();
            });
        },
        displayProgress() {
            const cfi = this.currentBook.locations.cfiFromPercentage(
                this.progress / 100
            );
            this.display(cfi);
        },
        updataProgressBg() {
            this.$refs.progress.style.cssText = `background-size:${
        this.progress
      }% 100% !important;`;
        },
        prevSection() {
            if (this.section > 0 && this.bookAvailable) {
                this.setSection(this.section - 1).then(() => {
                    this.displaySection();
                });
            }
        },
        nextSection() {
            if (
                this.section < this.currentBook.spine.length - 1 &&
                this.bookAvailable
            ) {
                this.setSection(this.section + 1).then(() => {
                    this.displaySection();
                });
            }
        },
        displaySection() {
            const sectionInfo = this.currentBook.section(this.section);
            if (sectionInfo && sectionInfo.href) {
                this.display(sectionInfo.href);
            }
        }
    },
    updated() {
        this.updataProgressBg();
    }
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

                    &:focus {
                        outline: none;
                    }

                    &::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        height: 20px;
                        width: 20px;
                        border-radius: 50%;
                        background: white;
                        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.15);
                        border: 1px solid #ddd;
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
