<template>
    <div>
        <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" class="border-bottom"></van-nav-bar>
        <div class="warp">
            <div class="top">
                <div class="btns">
                    <span @click="btn('login')">登录<i v-if="!route||route=='login'"></i></span>
                    <span @click="btn('reg')">注册<i v-if="route=='reg'"></i></span>
                </div>
            </div>
            <div class="inputs">
                <input v-model="userName" type="text" class="border-bottom" placeholder="用户名">
                <input v-model="password" type="password" class="border-bottom" placeholder="密码">
                <span @click="submit">{{!route||route=='login'?'登录':'注册'}}</span>
            </div>
            <div class="bottom">
                <div class="line">
                    <i></i>
                    <span>其他方式登录</span>
                    <i></i>
                </div>
                <ul>
                    <li @click="other('github')">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-GitHub"></use>
                        </svg>
                    </li>
                    <li @click="other('qq')">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-QQ"></use>
                        </svg>
                    </li>
                </ul>
            </div>
        </div>
        <Loading v-show="loading"/>
    </div>
</template>

<script>
const {client_id} = require('@/assets/js/github')
import {
    mixin
} from "@/assets/js/mixins";
import Loading from '@/components/public/Load'
export default {
    mixins: [mixin],
    data() {
        return {
            userName: "",
            password: "",
            disabled: true,
            route:'',
            loading:false
        };
    },

    components: {
        Loading,
    },

    created () {
        this.redirect = this.$route.query.redirect || ''
    },

    methods: {
        onClickLeft() {
            this.$router.go(-1);
        },
        btn(txt) {
            this.$router.push({name:'login',query:{c:txt}})
            this.route = txt
        },

        async submit() {
            if (!this.userName || !this.password) {
                return this.$toast('请输入用户名或者密码')
            }
            if (!this.$route.query.c || this.$route.query.c === 'login') {  // 登录
                this.login()
            } else {    // 注册
                this.reg()
            }
        },

        async login() {
            try {
                const data = await this.$axios.$post("/api/login", {
                    userName: this.userName,
                    password: this.password
                });
                if (data.code == 10000) {
                    // 注册成功
                    this.$toast("登录成功~~");
                    this.setUserName(data.userInfo);
                    setTimeout(() => {
                        if (this.redirect) {
                            this.$router.push({ name: `${this.redirect.routerName}`, params: { id:this.redirect.id } })
                        } else {
                            this.$router.push({
                                name: "index"
                            });
                        }
                    }, 1500);
                } else if (data.code == -1) {
                    // 用户名已存在
                    this.$toast(data.msg);
                }
            } catch (error) {}
        },

        async reg() {
            try {
                const data = await this.$axios.$post('/api/register', {
                    userName: this.userName,
                    password: this.password
                })
                if (data.code == 10000) { // 注册成功
                    this.$toast('注册成功~~')
                    this.setUserName(data.userInfo)
                    setTimeout(() => {
                        if (this.redirect) {
                            this.$router.push({ name: `${this.redirect.routerName}`, params: { id:this.redirect.id } })
                        } else {
                            this.$router.push({
                                name: "index"
                            });
                        }
                    }, 1500);
                } else if (data.code == -1) { // 用户名已存在
                    this.$toast(data.msg)
                }

            } catch (error) {

            }
        },

        other(txt) {
            if (txt === 'github') {
                this.loading = true
                window.location.href = `https://github.com/login/oauth/authorize?client_id=${client_id}`
            } 
        }
    }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/glob.scss";

// .warp {
//     width:85%;
//     margin:50px auto;
//     .btn {
//         margin-top: 100px;
//     }
// }
// .reg {
//     text-align: right;
//     margin-top:20px;
//     font-size:12px;
//     color:#0091DE !important;
// }
.warp {
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);

    .top {
        flex: 0 0 50vw;
        background: url('../../assets/img/login-bg.png') no-repeat;
        background-size: 100% 100%;
        position: relative;

        .btns {
            position: absolute;
            height: 40px;
            display: flex;
            align-items: center;
            width: 80%;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            bottom: 0;

            span {
                flex: 0 0 50%;
                height: 100%;
                color: #fff;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                position: relative;

                i {
                    position: absolute;
                    left: 45%;
                    bottom: 0;
                    width: 0;
                    height: 0;
                    border: 6px solid;
                    border-color: transparent transparent #fff;
                }
            }
        }
    }

    .inputs {
        width: 80%;
        margin: 0 auto;
        flex: 1;

        input {
            height: 70px;
            width: 100%;
            border-bottom: 1px solid rgba(0, 0, 0, .05);
            color: #666;
        }

        span {
            display: block;
            height: 12vw;
            background-image: linear-gradient(#fe5a23,
                    #fe5a23),
                linear-gradient(#ff302d,
                    #ff302d);
            background-blend-mode: normal,
                normal;
            border-radius: 6vw;
            color: #fff;
            text-align: center;
            line-height: 12vw;
            font-size: 14px;
            letter-spacing: 2px;
            margin-top: 30px;
        }
    }

    .bottom {
        width: 80%;
        margin: 0 auto;
        align-self: flex-end;
        padding-bottom: 50px;

        .line {
            display: flex;
            align-items: center;

            span {
                flex: 1;
                margin: 0 15px;
                font-size: 14px;
                color: #999999;
            }

            i {
                flex: 0 0 30%;
                height: 1px;
                background: #999;

            }
        }

        ul {
            width: 50%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 20px;

            li {
                width: 50px;
                height: 50px;
                display: flex;
                align-items: center;
                justify-content: center;

                .icon {
                    font-size: 32px;
                }
            }
        }
    }
}
</style>
