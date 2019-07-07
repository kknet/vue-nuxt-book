<template>
    <div class="error">
        <div class="col-md-12 block-404 text-center">
            <img class="img-fluid" src="@/assets/img/404.png" alt="404" />
            <h1>对不起的!找不到网页.</h1>
            <p class="caption-text">您访问的页面不存在或已被删除！ (｡•ˇ‸ˇ•｡).</p>
            <div class="mt-5">
                <span @click="$router.replace({name:'index'})">返回首页</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.error {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    width: 100%;
    z-index: 100;
    text-align: center;
    .img-fluid {
        width: 80%;
        margin: 0 auto;
        display: block;
        margin-top: 30px;
    }
    h1 {
        padding: 10px 30px;
        font-size: 42px;
        color: #3f345f;
        line-height: 1.5;
    }
    .caption-text {
        font-size: 15px;
        line-height: 24px;
        color: #7d8b9b;
    }
    .mt-5 {
        margin-top: 100px;
        span {
            padding: 14px 31px;
            background: #5a7ce2;
            background: -moz-linear-gradient(-45deg, #5a7ce2 0%, #8283e8 50%, #5c5de8 51%, #565bd8 71%, #575cdb 100%);
            background: -webkit-linear-gradient(-45deg, #5a7ce2 0%,#8283e8 50%,#5c5de8 51%,#565bd8 71%,#575cdb 100%);
            background: linear-gradient(135deg, #5a7ce2 0%,#8283e8 50%,#5c5de8 51%,#565bd8 71%,#575cdb 100%);
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#5a7ce2', endColorstr='#575cdb',GradientType=1 );
            background-size: 400% 400%;
            -webkit-animation: AnimationName 3s ease infinite;
            -moz-animation: AnimationName 3s ease infinite;
            animation: AnimationName 3s ease infinite;
            -webkit-animation: AnimationName 3s ease infinite;
            -moz-animation: AnimationName 3s ease infinite;
            animation: AnimationName 3s ease infinite;
            border: medium none;
            border-radius: 100px;
            font-size: 13px;
            font-weight: bold;
            letter-spacing: 1px;
            text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.14);
            text-transform: uppercase;
            box-shadow: 0 4px 9px 0 rgba(0, 0, 0, 0.2);
            color: #fff;
            animation: AnimationName 3s ease infinite;
        }
    }
}

 @keyframes AnimationName {
     0%{
        background-position:0% 31%
    }
     50%{
        background-position:100% 70%
    }
     100%{
        background-position:0% 31%
    }
}
</style>
