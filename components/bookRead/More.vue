<template>
<transition name="fade">
    <div class="more">
        <div>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-shuqianbookmark29"></use>
        </svg>
            <span class="add">加入书签</span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yuedu"></use>
        </svg>
            <span>书籍详情</span>
        </div>
        <div>
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-books"></use>
        </svg>
            <span>返回我的书架</span>
        </div>
    </div>
</transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.more {
    position: absolute;
    top: 48px;
    right: 0;
    width: 150px;
    padding: 8px 0;
    color: #fff;
    border-bottom: 0;
    background: #cecece;
    color: #575a5f;
    z-index: 500;

    div {
        padding: 10px 15px;

        .icon {
            font-size: 16px;
            margin-right: 10px;
        }

        span {
            font-size: 14px;
        }

        .add {
            font-weight: bold;
        }
    }
}

</style>
