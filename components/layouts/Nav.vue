<template>
    <ul>
        <li >
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-fenlei1"></use>
            </svg>
            <div class="title">分类</div>
        </li>
        <li >
            <svg class="icon " aria-hidden="true">
                <use xlink:href="#icon-yiwancheng"></use>
            </svg>
            <div class="title">排行榜</div>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yiwancheng"></use>
            </svg>
            <div class="title">免费</div>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yiwancheng"></use>
            </svg>
            <div class="title">完本</div>
        </li>
        <li>
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-yiwancheng"></use>
            </svg>
            <div class="title">大神</div>
        </li>
    </ul>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
ul {
    display: flex;
    padding: 15px 0;
    background: #fff;
    margin-top: 8px;
    li {
        flex: 0 0 20%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        .icon {
            font-size: 28px;
        }
        .title {
            font-size: 12px;
            font-weight: bold;
            margin-top: 5px;
        }
        
    }
}
</style>
