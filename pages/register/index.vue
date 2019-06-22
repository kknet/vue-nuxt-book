<template>
    <div>
        <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <div class="warp">
            <van-cell-group>
                <van-field v-model="username" required clearable label="用户名"  placeholder="请输入用户名"  />
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
            </van-cell-group>
            <div  class="reg" @click="$router.push({name:'login'})">已有账号</div>
            <van-button type="primary" size="normal" block class="btn" :disabled='!username||!password' @click="submit">注册</van-button>
        </div>
        
    </div>
    
</template>

<script>
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    data() {
        return {
            username: '',
            password: '',
            disabled: true
        }
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },

        async submit() {
            try {
                const data = await this.$axios.$post('/api/register',{
                    username: this.username,
                    password: this.password
                })
                if (data.code == 10000) { // 注册成功
                    this.$toast('注册成功~~')
                    this.setUserName(this.username)
                    setTimeout(() => {
                        this.$router.push({name:'index'})
                    }, 1500);
                } else if (data.code == -1) { // 用户名已存在
                    this.$toast(data.msg)
                }

            } catch (error) {

            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/css/vant.scss';
.warp {
    width:90%;
    margin:50px auto;
    .btn {
        margin-top: 100px;
    }
}
.reg {
    text-align: right;
    margin-top:20px;
    font-size:12px;
    color:#0091DE !important;
}
</style>

