<template>
    <div>
        <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <div class="warp">
            <van-cell-group>
                <van-field v-model="userName" required clearable label="用户名"  placeholder="请输入用户名"  />
                <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required />
            </van-cell-group>
            <div  class="reg" @click="$router.push({name:'register'})">用户注册</div>
            <van-button type="primary" size="normal" block class="btn" :disabled='!userName||!password' @click="submit">登录</van-button>
        </div>
        
    </div>
    
</template>

<script>
import {mixin} from '@/assets/js/mixins'
export default {
    mixins:[mixin],
    data() {
        return {
            userName: '',
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
                const data = await this.$axios.$post('/api/login',{
                    userName: this.userName,
                    password: this.password
                })
                if (data.code == 10000) { // 注册成功
                    this.$toast('登录成功~~')
                    this.setUserName(data.userInfo)
                    
                    setTimeout(() => {
                        if (this.$route.query.path) {
                            location.href = this.$route.query.path
                            // this.$router.go(-1)
                        } else {
                            this.$router.push({name:'index'})
                        }
                        
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
    width:85%;
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

